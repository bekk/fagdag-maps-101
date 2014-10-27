var fs   = require('fs'),
    gulp = require('gulp');

var isProduction = (process.env.NODE_ENV === 'production');

fs.readdirSync('./tasks')
  .filter(without("config.js"))
  .map(strip(".js"))
  .forEach(function (taskname) {
    var task = require('./tasks/' + taskname);
    var deps = task.deps || [];
    gulp.task(taskname, deps, task(isProduction));
  });

function without (filename) {
  return function (f) {
    return f.indexOf(filename) == -1;
  };
}

function strip (str) {
  return function (f) {
    return f.replace(str, "");
  };
}
