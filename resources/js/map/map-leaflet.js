var $ = require('zepto-browserify').$;
var L = require('leaflet');
var proj4 = require('proj4');
var omnivore = require('omnivore');

var projections = require('./projections');
var geojson = require('../geojson');
var places = require('../places');
var nvdb = require('../nvdb');

module.exports = {
  create: create,
  centerTo: centerTo,
  convertFromUtm33ToWgs84: convertFromUtm33ToWgs84,
  addMarker: addMarker,
  toggleGeojsonFylker: toggleGeojsonFylker,
  toggleGeojsonKommuner: toggleGeojsonKommuner,
  toggleKumlokk: toggleKumlokk
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


// oppgave
// http://leafletjs.com/reference.html#map-set-methods
function centerTo (latlon) {
  map.setView(latlon, 18); // leaflet apiet bruker lat-lon
}


// oppgave
// https://github.com/proj4js/proj4js#using
//
// hint:
// - må konvertere fra UTM33 (EPSG:32633) til WGS84 (EPSG:4326)
// - proj4() tar inn [x, y] og returnerer [lon, lat]
function convertFromUtm33ToWgs84 (xy) {
  var lonlat = proj4(projections.UTM33, projections.WGS84, xy);
  var latlon = [lonlat[1], lonlat[0]];
  return latlon;
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


// frivillig
var kumlokkLayer;
function toggleKumlokk () {
  if (kumlokkLayer) {
    map.removeLayer(kumlokkLayer);
    kumlokkLayer = undefined;
  }
  else {
    nvdb.kumlokk(function (kumlokk) {
      var features = kumlokk.map(function (lokk) {
        var wgs84str = lokk.lokasjon.geometriWgs84;
        var feature = omnivore.wkt.parse(wgs84str);

        var popupText = lokk.objektTypeNavn + " (objektId: " + lokk.objektId + ")";
        feature.bindPopup(popupText);

        return feature;
      });
      L.featureGroup(features).addTo(map);
    });
  }
}
