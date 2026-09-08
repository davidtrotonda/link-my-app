with open('src/App.jsx', 'r') as f:
    lines = f.readlines()

in_seo = False
for i in range(len(lines)):
    if "<SEO " in lines[i]:
        in_seo = True
    if in_seo and "});" in lines[i]:
        lines[i] = lines[i].replace("});", "}} />")
        in_seo = False
    elif in_seo and "}} />" in lines[i]:
        in_seo = False

with open('src/App.jsx', 'w') as f:
    f.writelines(lines)
print("Done fixing syntax")
