var $ = require('zepto-browserify').$;
var L = require('leaflet');
var proj4 = require('proj4');

var geojson = require('../geojson');
var places = require('../places');

module.exports = {
  create: create,
  zoomToLatLon: zoomToLatLon,
  zoomToXY: zoomToXY,
  addMarker: addMarker,
  toggleGeojsonFylker: toggleGeojsonFylker,
  toggleGeojsonKommuner: toggleGeojsonKommuner
};

L.Icon.Default.imagePath = "images"; // leaflet needs this

var config = {
  TileUrl: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  Attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
};

var map;

function create (selector) {
  var el = $(selector).get(0);
  map = L.map(el).setView([0, 0], 1);

  var options = {
    attribution: config.Attribution,
    maxZoom: 18 // leaflet needs this
  };

  L.tileLayer(config.TileUrl, options).addTo(map);

  return this;
}

// TODO oppgave
function zoomToLatLon (point, fromProjection, toProjection) {
  map.setView(point, 18); // leaflet bruker lat-lon
}

// TODO oppgave
function zoomToXY (xy, fromProjection, toProjection) {
  var lonlat = proj4(fromProjection, toProjection, xy); // proj4 bruker x, y
  var latlon = [lonlat[1], lonlat[0]];
  map.setView(latlon, 18);
}

// TODO oppgave
function addMarker (latlon, text) {
  return L.marker(latlon)
          .bindPopup(text)
          .addTo(map);
}

// TODO oppgave
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

// TODO oppgave
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
