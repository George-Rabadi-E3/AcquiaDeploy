const write_yaml = require('write-yaml');
const merge = require('lodash.merge');
const _set = require('lodash.set');
const glob = require('glob');

const partialConfig = glob.sync('./partials/**/*(*.scss|*.js)').reduce((acc, path) => {
  const pathArr = path.split('/');
  const libName = pathArr.slice(pathArr.indexOf('partials') + 1, -1);
  if (libName.includes('_components')) {
    const regex = /[^a-z]/ig;
    prefix = libName[1].replace(regex, '');
    libName.splice(0, 2);
    libName.unshift(prefix);
  }
  const entry = libName.join('--');
  let ext = pathArr[pathArr.length - 1].split('.').pop();

  if (!Object.prototype.hasOwnProperty.call(acc, entry)) {
    acc[entry] = {};
    _set(acc[entry], 'dependencies', ['themekit/themekit']);
  }
  if (ext === 'scss') {
    ext = 'css';
    _set(acc[entry], `css.theme['dist/css/${entry}.css']`, {});
  }

  if (ext === 'js') {
    const file = pathArr[pathArr.length - 1].replace('.js', '').replace('_', '');
    if (file !== 'config') {
      _set(acc[entry], `js['dist/js/${entry}.js']`, {});
    } else {
      const config = require('.' + path);
      // set the default dep
      if (Object.prototype.hasOwnProperty.call(config, 'dependencies')) {
        config.dependencies.push('themekit/themekit');
      }
      // merge in the config js. does not support attributes yet.
      const merged = merge(acc[entry], config);
      acc[entry] = merged;
    }
  }

  return acc;
}, {});


const data = partialConfig;

write_yaml('partials.yml', data, (err) => {
  console.log('generating partials.yml');
  if (err) {
    console.error('ERROR: Could not generate partials.yml');
  }
});
