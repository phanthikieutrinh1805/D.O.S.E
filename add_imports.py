import re

files = ['src/page-content/home.ts', 'src/page-content/opportunity.ts']

imports = """import imgVision from "../pages/asset/khiemthi.png";
import imgHearing from "../pages/asset/khiemthinh.png";
import imgMobility from "../pages/asset/khokhanvandong.png";
import imgCognitive from "../pages/asset/khokhannhanthuc,hoc tap.png";
import imgMental from "../pages/asset/khokhansuckhoetamthan.png";
"""

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'imgVision' not in content:
        # Add imports right after the first line (usually import type...)
        lines = content.split('\n')
        lines.insert(1, imports)
        content = '\n'.join(lines)
    
    # Replace the src strings
    content = content.replace('src=\\"asset/khiemthi.png\\"', 'src=\\"" + imgVision + "\\"')
    content = content.replace('src=\\"asset/khiemthinh.png\\"', 'src=\\"" + imgHearing + "\\"')
    content = content.replace('src=\\"asset/khokhanvandong.png\\"', 'src=\\"" + imgMobility + "\\"')
    content = content.replace('src=\\"asset/khokhannhanthuc,hoc tap.png\\"', 'src=\\"" + imgCognitive + "\\"')
    content = content.replace('src=\\"asset/khokhansuckhoetamthan.png\\"', 'src=\\"" + imgMental + "\\"')

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Replaced successfully.')
