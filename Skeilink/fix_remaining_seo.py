import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

pattern = r"(\s*)useSeo\((\{.*?\})\);\s*"

# We will just replace useSeo(...) with nothing, and then manually find the return statements for the components that had them.
# Let's do it component by component.
# Actually, the python script can find useSeo(...); then find the *next* return (... or return <...
# and insert `<SEO ... />` right after the opening bracket of the return.

def replacer(match):
    indent = match.group(1)
    props = match.group(2)
    return f"\n{indent}/* SEO_PROPS: {props} */\n"

# Step 1: Replace useSeo with a comment holding the props
content = re.sub(pattern, replacer, content, flags=re.DOTALL)

# Step 2: Move the SEO_PROPS into the next return statement
pattern_move = r"/\* SEO_PROPS: (\{.*?\}) \*/(.*?)(return\s*\(\s*(?:<[a-zA-Z0-9_.-]+[^>]*>|<>))"

def replacer_move(match):
    props = match.group(1)
    between = match.group(2)
    ret_stmt = match.group(3)
    # We want to insert <SEO {...props} /> right after the return opening
    return f"{between}{ret_stmt}\n      <SEO {{...{props}}} />"

content = re.sub(pattern_move, replacer_move, content, flags=re.DOTALL)

with open('src/App.jsx', 'w') as f:
    f.write(content)
print("Done")
