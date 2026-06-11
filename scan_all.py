import re

files_to_scan = [
    'src/page-content/auth.ts',
    'src/page-content/onboarding.ts',
    'src/page-content/dashboard.ts',
    'src/page-content/education-community.ts',
    'src/page-content/education-disability.ts',
    'src/page-content/disability-vision.ts',
    'src/page-content/disability-hearing.ts',
    'src/page-content/disability-mobility.ts',
    'src/page-content/disability-cognitive.ts',
    'src/page-content/disability-mental.ts',
    'src/page-content/opportunity.ts',
    'src/page-content/humanity.ts',
    'src/page-content/access.ts',
]

all_classes = set()
for f in files_to_scan:
    try:
        with open(f, 'r', encoding='utf-8') as fp:
            content = fp.read()
        classes = re.findall(r'class=\\"([^"]+)\\"', content)
        for c in classes:
            all_classes.add(c.strip())
    except:
        pass

for c in sorted(all_classes):
    print(c)
