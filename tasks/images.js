module.exports = function () {

  return function images () {

    var gulp = require('gulp');

    var c = require('./config');

    return gulp.src(c.all(c.FOLDER_IMAGES))
      .pipe(gulp.dest(c.target(c.TARGET_FOLDER_IMAGES)));
  };
};
