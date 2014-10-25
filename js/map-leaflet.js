var $ = require('zepto-browserify').$;
var L = require('leaflet');

L.Icon.Default.imagePath = "images";

var places = require('./places');

module.exports = {
  create: create,
  addMarker: addMarker,
  addPopup: addPopup
};

var config = {
  TileUrl: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  Attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
};

var map;

function create (selector) {
  var el = $(selector).get(0);
  map = L.map(el).setView(places.Blikkboksen, 13);

  var options = {
    attribution: config.Attribution,
    maxZoom: 18 // leaflet needs this
  };

  L.tileLayer(config.TileUrl, options).addTo(map);

  return this;
}

function addMarker (latlon) {
  return L.marker(latlon).addTo(map);
}

function addPopup (marker, text) {
  var options = {};
  marker.bindPopup(text, options).openPopup();
}

