import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# Replace <SEO {...{ ... }); with <SEO {...{ ... }} />
pattern = r"(<SEO\s*\{\.\.\.\{.*?\})(\}\);)"
content = re.sub(pattern, r"\1}} />", content, flags=re.DOTALL)

with open('src/App.jsx', 'w') as f:
    f.write(content)
print("Fixed")
