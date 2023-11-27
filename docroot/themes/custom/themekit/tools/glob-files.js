const glob = require('glob');
const path = require('path');

function processGlob(acc, path, type) {
  const pathArr = path.split('/');
  const partialsIndex = pathArr.indexOf('partials');
  const entry = pathArr[pathArr.length - 1].replace(`.${type}`, '').replace('_', '');
  if (entry !== pathArr[pathArr.length - 2]) {
    return acc;
  }
  let prefix = '';
  pathArr.splice(0, partialsIndex + 1);
  if (pathArr.includes('_components')) {
    const regex = /[^a-z]/ig;
    prefix = pathArr[1].replace(regex, '');
    pathArr.splice(0, 2);
  }
  pathArr.pop();
  const newType = (type === 'scss' ? 'css' : type);
  if (prefix.length > 0) {
    prefix += '--';
  }
  acc[`${newType}/${prefix}${pathArr.join('--')}`] = path;
  return acc;
}

const globList = {
  scss: [
    `${path.resolve('partials')}/**/*.scss`,
  ],
  js: [
    `${path.resolve('partials')}/**/*.js`,
  ],
};
const entries = {};
Object.keys(globList).forEach((key) => {
  globList[key].forEach((entry) => {
    const globEntries = glob.sync(entry).reduce((acc, path) => processGlob(acc, path, key), {});
    Object.assign(entries, globEntries);
  });
});

module.exports = entries;
