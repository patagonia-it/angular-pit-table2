const conf = require('./gulp.conf');

module.exports = function () {
  return conf.vars.jsonServer ? conf.vars.jsonServer : {};
};
