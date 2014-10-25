var $ = require('zepto-browserify').$;
var ol = require('ol');

var places = require('./places');

module.exports = {
  create: create,
  addMarker: addMarker,
  addPopup: addPopup
};

var config = {
  TileUrl: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  Attribution: new ol.control.Attribution({ collapsible: false })
};

var map;

function create (selector) {
  var el = $(selector).get(0);

  map = new ol.Map({
    target: el,
    view: new ol.View({
      center: ol.proj.transform([places.Blikkboksen[1], places.Blikkboksen[0]], "EPSG:4326", "EPSG:3857"),
      zoom: 13
    }),
    controls: ol.control.defaults({ attribution: false }).extend([config.Attribution]),
    layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ]
  });

  return this;
}

function addMarker (latlon) {

}

function addPopup (marker, text) {

}
