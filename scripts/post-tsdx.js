const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist/');
const cjsIndexFile = path.join(distDir, 'index.js');
const cjsModuleBase = `storybook-addon-apollo-client.cjs`;
const cjsModuleProd = `${cjsModuleBase}.production`;

const cjsIndexContent = fs.readFileSync(cjsIndexFile, 'utf8');

const cjsEntryContent = moduleName =>
  cjsIndexContent.replace(
    RegExp(`(${cjsModuleProd}|${cjsModuleBase})`, 'gi'),
    moduleName
  );

// write register cjs entry file for register
fs.writeFile(
  path.join(distDir, 'register.js'),
  cjsEntryContent('register'),
  err => {
    if (err) return console.log(err);
    console.log('created dist/register.js');
  }
);

// update register cjs entry file for index to match the custom `tsdx.config.js`
fs.writeFile(path.join(distDir, 'index.js'), cjsEntryContent('index'), err => {
  if (err) return console.log(err);
  console.log('updated dist/index.js');
});
