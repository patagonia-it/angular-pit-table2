const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');

const conf = require('../conf/gulp.conf');

gulp.task('clean', clean);
gulp.task('other', other);
gulp.task('fonts', fonts);

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{scss,js,html}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}

function fonts() {
  return gulp.src([
  	'bower_components/font-awesome/fonts/fontawesome-webfont.woff',
  	'bower_components/font-awesome/fonts/fontawesome-webfont.woff2',
  	'bower_components/font-awesome/fonts/fontawesome-webfont.svg',
  	'bower_components/font-awesome/fonts/fontawesome-webfont.eot',
  	'bower_components/material-design-icons/iconfont/MaterialIcons-Regular.woff',
  	'bower_components/material-design-icons/iconfont/MaterialIcons-Regular.woff2',
  	'bower_components/material-design-icons/iconfont/MaterialIcons-Regular.svg',
  	'bower_components/material-design-icons/iconfont/MaterialIcons-Regular.eot'
  ])
    .pipe(gulp.dest(conf.path.tmp()+'/fonts/'));

}
