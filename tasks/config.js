var notify = require('gulp-notify'),
    path   = require('path');

var c = exports;
c.all = allFiles;
c.target = targetFolder;

c.TARGET_FOLDER = "./dist";

// images
c.FOLDER_IMAGES        = './resources/images';
c.TARGET_FOLDER_IMAGES = 'images';

// less
c.FOLDER_LESS       = './resources/less';
c.PATH_LESS_ENTRY   = './resources/less/app.less';
c.TARGET_FILE_CSS   = 'app.css';
c.TARGET_PATH_CSS   = 'css/app.css';
c.TARGET_FOLDER_CSS = 'css';

// js
c.FOLDER_JS        = './resources/js';
c.PATH_JS_ENTRY    = './resources/js/app.js';
c.TARGET_FILE_JS   = 'app.js';
c.TARGET_PATH_JS   = 'js/app.js';
c.TARGET_FOLDER_JS = 'js';

c.FOLDER_JS_VENDOR = './resources/js/vendor';
c.TARGET_FOLDER_JS_VENDOR = 'js/vendor';

// index file
c.PATH_INDEX = "./resources/html/index.html";

c.TARGET_FOLDER_ALL = [
    c.TARGET_FOLDER_CSS,
    c.TARGET_FOLDER_FONTS,
    c.TARGET_FOLDER_IMAGES,
    c.TARGET_FOLDER_JS
  ]
  .map(targetFolder)
  .map(function (folder) {
    return path.join(folder, "**");
  });

c.notify = function (title, message) {
  return notify({ title: title, message: message });
};

c.notifyError = function notifyError (description) {
  return function () {
    var args = [].slice.call(arguments);
    notify.onError({
      title: description + " error",
      message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
  };
};

function allFiles (folder) {
  return path.join(folder, '**');
}

function targetFolder (folder) {
  var root = c.TARGET_FOLDER;
  if (folder) {
    return path.join(root, folder);
  }
  return root;
}
