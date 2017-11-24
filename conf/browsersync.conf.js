const conf = require('./gulp.conf');

module.exports = function () {
  var opts = {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  };
  return Object.assign(opts, conf.vars.browsersync ? conf.vars.browsersync.serve : {});
};
