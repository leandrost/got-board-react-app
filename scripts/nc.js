const _ = require('lodash');
const fs = require('fs');
const mkdirp = require('mkdirp-promise');

const createComponent = function (baseDir, name) {
  const componentName = _.startCase(name).replace(" ", "");
  const path = `${baseDir}/${name}/`;
  mkdirp(path).then(function(path) {
    touch(`${path}/${componentName}.js`);
    touch(`${path}/${componentName}.scss`);
  });
}

const touch = function(filepath) {
  fs.closeSync(fs.openSync(filepath, 'w'));
  console.log(filepath);
}

let args = process.argv.slice(2);
createComponent("src", args[0]);
