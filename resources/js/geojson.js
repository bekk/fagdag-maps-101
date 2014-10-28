var ajax = require('./ajax');

exports.fylker = function (fn) {
  ajax.get('js/vendor/fylker.json', function (res) {
    fn(res.body);
  });
};

exports.kommuner = function (fn) {
  ajax.get('js/vendor/kommuner.json', function (res) {
    fn(res.body);
  });
};
