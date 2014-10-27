var request = require('superagent');

exports.get = function (url, fn) {
  return request.get(url, fn);
}
