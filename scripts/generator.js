const _ = require('lodash');
const fs = require('fs');
const mkdirp = require('mkdirp-promise');
const replace = require('replace-in-file');

const createComponent = function (baseDir, name) {
  const componentName = _.startCase(name).replace(" ", "");
  const path = `${baseDir}/${name}`;
  mkdirp(path).then(function(path) {
    copyTo(path, componentName, 'js');
    copyTo(path, componentName, 'scss');
    replaceComponentName(path, componentName);
  });
}

const copyTo = function(path, name, extension) {
  fs.createReadStream(`./scripts/generators/component.${extension}`).pipe(
    fs.createWriteStream(`${path}/${name}.${extension}`)
  );
}

const replaceComponentName = function(filepath, name) {
  const options = {
    files: `${filepath}/${name}.js`,
    from: /component/g,
    to: name,
  };
  replace(options)
  .then(changedFiles => {
    console.log('Modified files:', changedFiles.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
}

let args = process.argv.slice(2);
createComponent("src", args[0]);
