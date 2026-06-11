"""Fix corrupted sidebar.ts by reconstructing lines 685-805."""
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/pages/sidebar.ts', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")

# The corruption: lines 685-804 have the link click handler interrupted
# by duplicate keytip code. We need to replace lines 688-804 with the
# correct completion of the link click handler and the IIFE close.

correct_ending = '''  sidebar.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href") || "";
      if (href.startsWith("#")) {
        setCurrentSidebarLink(link);
        keepCurrentSidebarItemInView("smooth");
      }

      if (!appShell && window.innerWidth <= 992 && sidebar.classList.contains("is-open")) {
        sidebar.classList.remove("is-open");
        if (backdrop) backdrop.hidden = true;
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
'''

# Find where line 685 starts (0-indexed: 684)
# And where the chat widget starts
chat_start = None
for i, line in enumerate(lines):
    if '/* ──────────────────────────────────────────────────────────────────' in line and 'GLOBAL CHAT WIDGET' in ''.join(lines[i:i+3]):
        chat_start = i
        break

if chat_start is None:
    # Find by the initChatWidget function
    for i, line in enumerate(lines):
        if '(function initChatWidget()' in line:
            # Back up 5 lines to include the comment
            chat_start = max(0, i - 5)
            break

print(f"Chat widget starts at line (0-indexed): {chat_start}")
print(f"Line at chat_start: {lines[chat_start].rstrip()}")

# Keep everything before line 685 (0-indexed: 684)
before = lines[:684]
# Keep everything from chat widget start onwards
after = lines[chat_start:]

# Build new file
new_lines = before + [correct_ending + '\n'] + after

with open('src/pages/sidebar.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Fixed! New line count: {len(new_lines)}")
