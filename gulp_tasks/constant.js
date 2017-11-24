const gulp = require('gulp');
const ngConstant = require('gulp-ng-constant');
const replace = require('gulp-replace');
const conf = require('../conf/gulp.conf');

gulp.task('constant:environment', constantEnvironment);

function constantEnvironment() {
  return constant('environment.json');
}

function constant(filename) {
  return gulp.src(filename)
    .pipe(ngConstant({
      name: 'angular-pit-table',
      wrap: false,
      space: '  ',
      deps: false
    }))
    .pipe(replace(/("[\S]*":)/g, function (match) {
      return match.replace(/"/g, '');
    }))
    .pipe(replace('"', '\''))
    .pipe(gulp.dest(conf.path.src('app/constants/')));
}
