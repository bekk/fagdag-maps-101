module.exports = function (minify) {

  return function html () {

    var gulp = require('gulp');

    var c = require('./config');

    return gulp.src(c.all(c.FOLDER_JS_VENDOR))
      .pipe(gulp.dest(c.target(c.TARGET_FOLDER_JS_VENDOR)));
    };
};

module.exports.deps = [];
