var ajax = require('./ajax');

var url = 'https://www.vegvesen.no/nvdb/api/sok?kriterie={"lokasjon":{"kommune":[301]},"objektTyper":[{"id":83,"antall":1000}]}';

exports.kumlokk = function (fn) {
  ajax.get(url)
    .set('accept', 'application/json')
    .end(function (res) {
      var resultater = res.body.resultater[0];
      fn(resultater.vegObjekter);
    });
};
