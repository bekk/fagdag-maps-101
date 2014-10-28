var $ = require('zepto-browserify').$;
var L = require('leaflet');

L.Icon.Default.imagePath = "images";

var geojson = require('../geojson');
var places = require('../places');

module.exports = {
  create: create,
  addMarker: addMarker,
  toggleGeojsonFylker: toggleGeojsonFylker,
  toggleGeojsonKommuner: toggleGeojsonKommuner
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

// TODO oppgave 1
function addMarker (latlon, text) {
  return L.marker(latlon)
          .bindPopup(text)
          .addTo(map);
}

var geojsonLayerFylker;
function toggleGeojsonFylker () {
  if (geojsonLayerFylker) {
    map.removeLayer(geojsonLayerFylker);
    geojsonLayerFylker = undefined;
  }
  else {
    geojson.fylker(function (fylker) {
      geojsonLayerFylker = L.geoJson(fylker).addTo(map);
    });
  }
}

var geojsonLayerKommuner;
function toggleGeojsonKommuner () {
  if (geojsonLayerKommuner) {
    map.removeLayer(geojsonLayerKommuner);
    geojsonLayerKommuner = undefined;
  }
  else {
    geojson.kommuner(function (kommuner) {
      geojsonLayerKommuner = L.geoJson(kommuner).addTo(map);
    });
  }
}
