"""
Final split of tailwind.css into multiple files.
Based on confirmed boundaries:
  Line 1-298:   @tailwind base/components/utilities + @layer base (tokens)
  Line 299-2227: @layer components (shared components)
  Line 2228-end: @layer utilities
  
Plus 3 new @layer component blocks (written as separate CSS files in pages/)
"""
import sys, os
sys.stdout.reconfigure(encoding='utf-8')

SRC = 'src/styles/tailwind.css'
STYLES = 'src/styles'
PAGES = 'src/styles/pages'
os.makedirs(PAGES, exist_ok=True)

with open(SRC, 'r', encoding='utf-8-sig') as f:  # utf-8-sig strips BOM
    lines = f.readlines()

total = len(lines)
print(f"Source: {total} lines")

def write_file(path, content, header=None):
    with open(path, 'w', encoding='utf-8') as f:
        if header:
            f.write(f"/* D.O.S.E Design System — {header} */\n\n")
        f.write(''.join(content).rstrip('\n') + '\n')
    lc = len(content)
    sz = os.path.getsize(path)
    print(f"  {path}: {lc} lines, {sz:,} bytes")

# 1) tailwind.css: keep @tailwind directives + @layer base
#    THEN add @import for sub-files
base_lines = lines[0:298]   # lines 1-298

tailwind_entry = [
    "@tailwind base;\n",
    "@tailwind components;\n",
    "@tailwind utilities;\n",
    "\n",
    "/* D.O.S.E Design System — imports */\n",
    "@import './components.css';\n",
    "@import './utilities.css';\n",
    "@import './pages/inner.css';\n",
    "@import './pages/auth.css';\n",
    "@import './pages/community.css';\n",
    "\n",
]

# The @layer base block: lines 10-297 (0-indexed: 9-297)
# Extract just the design tokens part (lines 10 onwards after @tailwind lines)
layer_base_lines = lines[9:298]  # @layer base { ... }

write_file(
    os.path.join(STYLES, 'tailwind.css'),
    lines[0:9] + ["\n", "/* Sub-file imports (processed by postcss-import) */\n",
                  "@import './components.css';\n",
                  "@import './utilities.css';\n",
                  "@import './pages/inner.css';\n",
                  "@import './pages/auth.css';\n",
                  "@import './pages/community.css';\n", "\n"] + layer_base_lines,
)

# 2) components.css: @layer components (lines 299-2227, 0-indexed: 298-2226)
write_file(
    os.path.join(STYLES, 'components.css'),
    lines[298:2227],
    "Shared UI Components — buttons, forms, nav, cards, layout, access settings"
)

# 3) utilities.css: @layer utilities (lines 2228-end, 0-indexed: 2227-end)
write_file(
    os.path.join(STYLES, 'utilities.css'),
    lines[2227:],
    "Utility helpers"
)

print("\nBase files written.")
print("The 3 page-specific files (inner.css, auth.css, community.css) were")
print("already created with the new CSS content added in this session.")
print("\nVerify page files exist:")
for f in ['src/styles/pages/inner.css', 'src/styles/pages/auth.css', 'src/styles/pages/community.css']:
    if os.path.exists(f):
        sz = os.path.getsize(f)
        lc = len(open(f, encoding='utf-8').readlines())
        print(f"  EXISTS: {f} ({lc} lines, {sz:,} bytes)")
    else:
        print(f"  MISSING: {f}")
