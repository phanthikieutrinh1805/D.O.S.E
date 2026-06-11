"""
Remove old chat widgets (floatingChatButton + chatBoxContainer style)
from ALL page-content files that have them.
"""
import sys, os, re
sys.stdout.reconfigure(encoding='utf-8')

files_to_fix = [
    'src/page-content/home.ts',
    'src/page-content/education.ts',
    'src/page-content/onboarding.ts',
    'src/page-content/dashboard.ts',
]

def remove_chat_from_file(filepath):
    with open(filepath, encoding='utf-8') as f:
        content = f.read()
    
    original_len = len(content)
    changed = False
    
    # Pattern 1: floatingChatButton + chatBoxContainer (from home.ts)
    if 'floatingChatButton' in content or 'floating-chat-button' in content:
        fb_idx = content.find('floatingChatButton')
        if fb_idx == -1:
            fb_idx = content.find('floating-chat-button')
        
        btn_tag_start = content.rfind('<button', 0, fb_idx)
        
        # Find <aside or end of chat container
        cb_idx = content.find('chatBoxContainer', fb_idx)
        if cb_idx >= 0:
            aside_idx = content.find('<aside', cb_idx)
            if aside_idx > 0:
                div_before_aside = content.rfind('</div>', cb_idx, aside_idx)
                if div_before_aside > btn_tag_start:
                    remove_end = div_before_aside + len('</div>')
                    print(f"  Removing floatingChatButton+chatBoxContainer: {btn_tag_start} to {remove_end}")
                    content = content[:btn_tag_start] + content[remove_end:]
                    changed = True
    
    # Pattern 2: chat-box-container (standalone div)
    while 'chat-box-container' in content:
        cbc_idx = content.find('chat-box-container')
        # Find opening <div
        div_start = content.rfind('<div', 0, cbc_idx)
        # Find matching closing </div> - count nesting
        pos = div_start + 4
        depth = 1
        while pos < len(content) and depth > 0:
            open_pos = content.find('<div', pos)
            close_pos = content.find('</div>', pos)
            if close_pos == -1:
                break
            if open_pos != -1 and open_pos < close_pos:
                depth += 1
                pos = open_pos + 4
            else:
                depth -= 1
                pos = close_pos + 6
        close_tag_end = pos
        print(f"  Removing chat-box-container div: {div_start} to {close_tag_end}")
        content = content[:div_start] + content[close_tag_end:]
        changed = True
    
    # Pattern 3: floating-chat-button standalone button
    while 'floating-chat-button' in content:
        fcb_idx = content.find('floating-chat-button')
        btn_start = content.rfind('<button', 0, fcb_idx)
        btn_end = content.find('</button>', fcb_idx) + len('</button>')
        print(f"  Removing floating-chat-button: {btn_start} to {btn_end}")
        content = content[:btn_start] + content[btn_end:]
        changed = True
    
    # Pattern 4: AI Mentor mentions in HTML strings (just the label text if standalone)
    # Don't remove if it's only a text mention, only remove widget-related
    
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Saved: {original_len} -> {len(content)} chars")
        return True
    return False

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        continue
    print(f"\nProcessing: {filepath}")
    remove_chat_from_file(filepath)

print("\nDone!")

# Verify
for filepath in files_to_fix:
    if not os.path.exists(filepath):
        continue
    c = open(filepath, encoding='utf-8').read()
    has_old = any(k in c for k in ['floatingChatButton','floating-chat-button','chat-box-container'])
    print(f"{filepath}: old_chat={'YES - NEEDS FIX' if has_old else 'clean'}")
