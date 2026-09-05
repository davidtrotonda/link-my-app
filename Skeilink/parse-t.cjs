const fs = require('fs');
const babel = require('@babel/core');

const code = fs.readFileSync('src/App.jsx', 'utf-8');

babel.transformSync(code, {
  presets: ['@babel/preset-react'],
  plugins: [
    function() {
      return {
        visitor: {
          Identifier(path) {
            if (path.node.name === 't' && path.isReferencedIdentifier()) {
              if (!path.scope.hasBinding('t')) {
                const fnNode = path.getFunctionParent();
                const fnName = fnNode && fnNode.node.id ? fnNode.node.id.name : 'Unknown';
                console.log(`Undeclared 't' in function: ${fnName} at line ${path.node.loc.start.line}`);
              }
            }
          }
        }
      };
    }
  ]
});
