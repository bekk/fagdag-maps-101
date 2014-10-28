module.exports = function () {

  return function watch () {

    var gulp       = require('gulp'),
        livereload = require('gulp-livereload');

    var c = require('./config');

    gulp.watch(c.PATH_INDEX,  ['html']);
    gulp.watch(c.all(c.FOLDER_LESS), ['less']);
    gulp.watch(c.all(c.FOLDER_IMAGES), ['images']);

    livereload.listen();
    gulp.watch(c.TARGET_FOLDER_ALL).on('change', livereload.changed);
  };
};

module.exports.deps = ['images', 'html', 'less', 'scripts', 'scripts-vendor', 'server'];
