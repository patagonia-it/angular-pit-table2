const conf = require('./gulp.conf');

module.exports = function () {
  var opts = {
    server: {
      baseDir: [
        conf.paths.dist
      ]
    }
  };
  return Object.assign(opts, conf.vars.browsersync ? conf.vars.browsersync.dist : {});
};
