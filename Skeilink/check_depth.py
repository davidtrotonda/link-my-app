with open('src/App.jsx', 'r') as f:
    lines = f.readlines()

depth = 0
for i, line in enumerate(lines):
    if "function " in line and not line.strip().startswith("//"):
        print(f"Line {i+1}: Depth before '{line.strip()}' is {depth}")
    for c in line:
        if c == '{': depth += 1
        if c == '}': depth -= 1

print("Final depth:", depth)
