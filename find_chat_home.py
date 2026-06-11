"""Remove old floatingChatButton + chatBoxContainer from home.ts HTML string."""
import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/page-content/home.ts', encoding='utf-8') as f:
    content = f.read()

print(f"Original length: {len(content)}")

# The HTML is stored as a JS string with escaped chars like \\n, \\\"
# We need to remove the old chat button + container
# Pattern: from the \n\n    <button id=\"floatingChatButton\" ... to ... </div>\n\n    <aside
# In the escaped string: \\n\\n    <button id=\\\"floatingChatButton\\\"
# through to: </div>\\n\\n    <aside

btn_marker = 'id=\\"floatingChatButton\\"'
btn_start_in_str = content.find(btn_marker)
if btn_start_in_str == -1:
    btn_marker = "id=\\\\\"floatingChatButton\\\\\""
    btn_start_in_str = content.find(btn_marker)

print(f"floatingChatButton found at: {btn_start_in_str}")

# Walk backwards to find the \n\n before the button
# Go back to find the start of the button tag: <button
back = btn_start_in_str
while back > 0 and content[back:back+2] != '\\n':
    back -= 1

print(f"Before button (15 chars): {repr(content[btn_start_in_str-15:btn_start_in_str])}")
print(f"Button marker context: {repr(content[btn_start_in_str-5:btn_start_in_str+50])}")

# Find chatBoxContainer end
chat_box_end_marker = '</div>\\n\\n    <aside'
chat_end_idx = content.find(chat_box_end_marker, btn_start_in_str)
print(f"chatBoxContainer ends at: {chat_end_idx}")
if chat_end_idx > 0:
    print(f"After chat div: {repr(content[chat_end_idx:chat_end_idx+30])}")
