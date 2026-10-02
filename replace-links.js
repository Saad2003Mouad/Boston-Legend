const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');
let replacedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('href="/book"') || content.includes("href='/book'") || content.includes('href: "/book"')) {
    content = content.replace(/href="\/book"/g, 'href="/packages"');
    content = content.replace(/href='\/book'/g, 'href="/packages"');
    content = content.replace(/href:\s*"\/book"/g, 'href: "/packages"');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
    replacedCount++;
  }
});

console.log('Total files updated:', replacedCount);
