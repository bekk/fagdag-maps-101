module.exports = function (minify) {

  return function html () {

    var embedlr    = require('gulp-embedlr'),
        del        = require('del'),
        gulp       = require('gulp'),
        gulpif     = require('gulp-if'),
        minhtml    = require('gulp-htmlmin'),
        path       = require('path');

    var c = require('./config');

    return gulp.src(c.PATH_INDEX)
      .pipe(gulpif(!minify, embedlr()))
      .pipe(gulpif(minify, minhtml({
        // https://github.com/jonschlinkert/gulp-htmlmin
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      })))
      .pipe(gulp.dest(c.target()));
    };
};

module.exports.deps = [];
