with open('src/App.jsx', 'r') as f:
    lines = f.readlines()

depth = 0
last_func = ""
for i, line in enumerate(lines):
    if "function " in line:
        last_func = line.strip()
    for c in line:
        if c == '{': depth += 1
        if c == '}': depth -= 1
    if depth < 0:
        print(f"Negative depth at line {i+1}: {line.strip()}")

print("Final depth:", depth)
