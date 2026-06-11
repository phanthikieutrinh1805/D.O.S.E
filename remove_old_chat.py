"""
Remove the entire old chat widget (button + box) from home.ts.
The chat widget in the HTML string spans from:
  <button id=\"floatingChatButton\" ...>...</button>
  <div id=\"chatBoxContainer\" ...>...</div>

Strategy: find the start of floatingChatButton and the end of chatBoxContainer's closing </div>.
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/page-content/home.ts', encoding='utf-8') as f:
    content = f.read()

print(f"Length: {len(content)}")

# Key markers in the raw file content:
# floatingChatButton is at index ~7286
# The chat widget is surrounded by escaped newlines

# Strategy: use find to locate 'floatingChatButton' then find its opening <button
# and find the chatBoxContainer's final </div>

fb_idx = content.find('floatingChatButton')
print(f"floatingChatButton at: {fb_idx}")

# Find <button before it (opening tag)
btn_tag_start = content.rfind('<button', 0, fb_idx)
print(f"<button tag at: {btn_tag_start}, char before: {repr(content[btn_tag_start-5:btn_tag_start])}")

# Find chatBoxContainer
cbc_idx = content.find('chatBoxContainer')
print(f"chatBoxContainer at: {cbc_idx}")

# Now find the LAST </div> that closes the chatBoxContainer
# The container has nested divs inside, so we need to count
# Instead, search for the next <aside after chatBoxContainer
aside_idx = content.find('<aside', cbc_idx)
print(f"<aside after chatBoxContainer at: {aside_idx}")
print(f"Context before <aside: {repr(content[aside_idx-20:aside_idx+10])}")

# The text just before <aside should be: </div>\\n\\n    <aside
# or: </div>\\n      <aside etc.
# Let's find the </div> just before <aside
div_before_aside = content.rfind('</div>', cbc_idx, aside_idx)
print(f"</div> before <aside at: {div_before_aside}")
print(f"Context: {repr(content[div_before_aside:div_before_aside+30])}")

if btn_tag_start > 0 and div_before_aside > btn_tag_start:
    # Remove from btn_tag_start to end of </div>
    remove_start = btn_tag_start
    remove_end = div_before_aside + len('</div>')
    
    removed_text = content[remove_start:remove_end]
    print(f"\nWill remove {remove_end - remove_start} chars")
    print(f"Removal starts with: {repr(removed_text[:80])}")
    print(f"Removal ends with: {repr(removed_text[-60:])}")
    
    new_content = content[:remove_start] + content[remove_end:]
    print(f"New length: {len(new_content)}")
    
    # Verify no chatBoxContainer left
    assert 'chatBoxContainer' not in new_content, "chatBoxContainer still present!"
    assert 'floatingChatButton' not in new_content, "floatingChatButton still present!"
    
    with open('src/page-content/home.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS - old chat completely removed!")
else:
    print(f"ABORT: btn_tag_start={btn_tag_start}, div_before_aside={div_before_aside}")
