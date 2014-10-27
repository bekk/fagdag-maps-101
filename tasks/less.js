module.exports = function (minify) {

  return function less () {

    var autoprefix = require('gulp-autoprefixer'),
        gulp       = require('gulp'),
        gulpif     = require('gulp-if'),
        concat     = require('gulp-concat'),
        less       = require('gulp-less'),
        mincss     = require('gulp-minify-css'),
        sourcemaps = require('gulp-sourcemaps');

    var c = require('./config');

    return gulp.src(c.PATH_LESS_ENTRY)
      .pipe(gulpif(!minify, sourcemaps.init()))
      .pipe(gulpif(minify, less(), less().on('error', c.notifyError('Less'))))
      .pipe(autoprefix('last 1 versions'))
      .pipe(gulpif(!minify, sourcemaps.write()))
      .pipe(gulpif(minify, mincss({
        // https://github.com/jonathanepollack/gulp-minify-css
        noRebase: true,
        noAdvanced: true,
        compatibility: true
      })))
      .pipe(gulp.dest(c.target(c.TARGET_FOLDER_CSS)))
      .pipe(gulpif(!minify, c.notify("Less", 'reloaded')));
  };
};
