const fs = require('fs');
const lines = fs.readFileSync('src/App.jsx', 'utf-8').split('\n');
let depth = 0;
let lastFunc = "";
for(let i=0; i<lines.length; i++) {
  const line = lines[i];
  if (line.includes('function ')) lastFunc = line.trim();
  for (let c of line) {
    if (c === '{') depth++;
    if (c === '}') depth--;
  }
}
console.log("Final depth:", depth);
