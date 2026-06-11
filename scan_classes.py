import os

files = [
    'src/page-content/auth.ts',
    'src/page-content/onboarding.ts',
    'src/page-content/dashboard.ts',
    'src/page-content/disability-vision.ts',
    'src/page-content/disability-hearing.ts',
]

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    # Find all class= occurrences 
    import re
    classes = re.findall(r'class=\\"([^"]+)\\"', content)
    unique = sorted(set(classes))
    print(f'\n=== {f} ===')
    for c in unique:
        print(c)
