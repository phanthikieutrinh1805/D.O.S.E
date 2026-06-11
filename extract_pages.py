"""
Extract the added CSS lines from git diff and fill the page CSS files.
Lines starting with '+' (not '+++') in the diff are newly added content.
"""
import sys, os, subprocess
sys.stdout.reconfigure(encoding='utf-8')

# Get the git diff of tailwind.css
result = subprocess.run(
    ['git', 'diff', 'HEAD', 'src/styles/tailwind.css'],
    capture_output=True, text=True, encoding='utf-8', errors='replace',
    cwd='.'
)
diff = result.stdout

# Extract all added lines (lines starting with '+' but not '+++')
added_lines = []
for line in diff.split('\n'):
    if line.startswith('+') and not line.startswith('+++'):
        added_lines.append(line[1:])  # strip the leading '+'

print(f"Total added lines: {len(added_lines)}")

# Find the 3 block starts by looking for their comment headers
INNER_MARKER = "INNER PAGES - Premium styling based on Home page design"
AUTH_MARKER = "AUTH \xb7 ONBOARDING \xb7 DASHBOARD \xb7 DISABILITY PAGES"
COMMUNITY_MARKER = "PAGE-SPECIFIC STYLES - Community, Opportunity, Quiz"

# Find boundary indices
inner_start = auth_start = community_start = None
for i, line in enumerate(added_lines):
    if INNER_MARKER in line and inner_start is None:
        inner_start = i
    elif AUTH_MARKER in line and auth_start is None:
        auth_start = i
    elif COMMUNITY_MARKER in line and community_start is None:
        community_start = i

print(f"inner_start: {inner_start}")
print(f"auth_start:  {auth_start}")
print(f"community_start: {community_start}")

PAGES = 'src/styles/pages'
os.makedirs(PAGES, exist_ok=True)

def write_block(path, lines_slice, desc):
    content = '\n'.join(lines_slice).rstrip('\n') + '\n'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(f"/* D.O.S.E Design System - {desc} */\n\n")
        f.write(content)
    lc = len(lines_slice)
    sz = os.path.getsize(path)
    print(f"  {path}: {lc} lines, {sz:,} bytes")

if inner_start is not None and auth_start is not None:
    write_block(
        os.path.join(PAGES, 'inner.css'),
        added_lines[inner_start:auth_start],
        "Education / Access / Opportunity / Humanity"
    )

if auth_start is not None and community_start is not None:
    write_block(
        os.path.join(PAGES, 'auth.css'),
        added_lines[auth_start:community_start],
        "Auth / Onboarding / Dashboard / Disability"
    )

if community_start is not None:
    write_block(
        os.path.join(PAGES, 'community.css'),
        added_lines[community_start:],
        "Community / Quiz / Assessment extras"
    )

print("\nDone!")
