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

L.Icon.Default.imagePath = "images"; // leaflet needs this to work

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
    maxZoom: 18 // leaflet needs this to work
  };

  L.tileLayer(config.TileUrl, options).addTo(map);

  return this;
}


// http://leafletjs.com/reference.html#map-set-methods
function zoomToLatLon (point, fromProjection, toProjection) {
  map.setView(point, 18); // leaflet apiet bruker lat-lon
}


// oppgave
// https://github.com/proj4js/proj4js#using
//
// hint:
// - må konvertere fra
// - proj4() tar inn [x, y] og returnerer [lon, lat]
function zoomToXY (xy, fromProjection, toProjection) {
  var lonlat = proj4(fromProjection, toProjection, xy);
  var latlon = [lonlat[1], lonlat[0]];
  map.setView(latlon, 18);
}


// oppgave
// http://leafletjs.com/reference.html#marker
function addMarker (latlon, text) {
  return L.marker(latlon)
          .bindPopup(text)
          .addTo(map);
}


// oppgave
// http://leafletjs.com/reference.html#geojson
//
// hint:
// - geojson.fylker(callback) laster ned `fylker.json` og kaller callback med resultatet
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


// oppgave
// http://leafletjs.com/reference.html#geojson
//
// hint:
// - geojson.kommuner(callback) laster ned `kommuner.json` og kaller callback med resultatet
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
