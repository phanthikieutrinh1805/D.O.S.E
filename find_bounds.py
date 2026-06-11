"""
Correctly split tailwind.css (1962 lines from git HEAD) into:
  tailwind.css      - @tailwind directives + @layer base (design tokens, dark, HC)
  components.css    - @layer components (shared UI)
  utilities.css     - @layer utilities
Then print boundary line numbers for manual verification.
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/styles/tailwind.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

total = len(lines)
print(f"Lines: {total}")

# Find key boundaries
for i, line in enumerate(lines, 1):
    s = line.strip()
    if s.startswith('@layer components') or s.startswith('@layer utilities') or s.startswith('@layer base'):
        print(f"  Line {i}: {s}")
    if '/* ═══' in s or '/* AUTH' in s or '/* ONBOARDING' in s or '/* DASHBOARD' in s:
        print(f"  Line {i}: {s[:60]}")
