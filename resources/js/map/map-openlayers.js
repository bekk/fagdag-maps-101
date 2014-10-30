var $ = require('zepto-browserify').$;
var ol = require('ol');
var proj4 = require('proj4');

var projections = require('./projections');
var geojson = require('../geojson');
var nvdb = require('../nvdb');
var places = require('../places');

module.exports = {
  create: create,
  centerTo: centerTo,
  convertFromWgs84ToWebMercator: convertFromWgs84ToWebMercator,
  convertFromUtm33ToWebMercator: convertFromUtm33ToWebMercator,
  addMarker: addMarker,
  toggleGeojsonFylker: toggleGeojsonFylker,
  toggleGeojsonKommuner: toggleGeojsonKommuner,
  toggleKumlokk: toggleKumlokk,
  enablePopups: enablePopups
};

var config = {
  Attribution: new ol.control.Attribution({ collapsible: false })
};

var map;
function create (selector) {
  var el = $(selector).get(0);

  map = new ol.Map({
    target: el,
    view: new ol.View({
      center: [0, 0],
      zoom: 1
    }),
    controls: ol.control.defaults({ attribution: false }).extend([config.Attribution]),
    layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ]
  });

  return this;
}


// oppgave
// http://openlayers.org/en/v3.0.0/apidoc/ol.Map.html
function centerTo (xy) {

}


// oppgave
// https://github.com/proj4js/proj4js#using
//
// hint:
// - må konvertere fra WGS84 (Lat/lon - EPSG:4326) til WebMercator (EPSG:3857)
// - proj4() tar inn [lon, lat] og returnerer [x, y]
function convertFromWgs84ToWebMercator (latlon) {

}


// oppgave
// https://github.com/proj4js/proj4js#using
//
// hint:
// - må konvertere fra UTM33 (EPSG:32633) til WebMercator (EPSG:3857)
// - proj4() tar inn [x, y] og returnerer [x, y]
function convertFromUtm33ToWebMercator (xy) {

}


// oppgave
// http://openlayers.org/en/v3.0.0/examples/icon.html
// http://openlayers.org/en/v3.0.0/apidoc/ol.Feature.html
//
// hint:
// - noe vanskeligere
// - må konvertere fra WGS84 (Lat/lon - EPSG:4326) til WebMercator (EPSG:3857)
// - kan projisere,  enten med openlayers eller proj4
function addMarker (latlon, text) {

}


// oppgave
// http://openlayers.org/en/v3.0.0/examples/geojson.html
//
// hint:
// - geojson.fylker(callback) laster ned `fylker.json` og kaller callback med resultatet
// - må angi `projection` og `object` (features) til ol.source.GeoJSON
var geojsonLayerFylker;
function toggleGeojsonFylker () {
  if (geojsonLayerFylker) {

  }
  else {
    geojson.fylker(function (fylker) {

    });
  }
}


// oppgave
//
// hint:
// - geojson.kommuner(callback) laster ned `kommuner.json` og kaller callback med resultatet
// - må angi `projection` til ol.source.GeoJSON
// - ol.source.GeoJson kan også ta url til en geojson-fil, feks `/js/vendor/kommuner.json`
var geojsonLayerKommuner;
function toggleGeojsonKommuner () {
  if (geojsonLayerKommuner) {

  }
  else {

  }
}


// oppgave
//
// hint:
// - noe vanskeligere
// - ol.format.WKT kan lage features av wkt-strenger
// - forskjellige features kan styles forskjellig, se http://openlayers.org/en/v3.0.0/examples/geojson.html for eksempler
//
var kumlokkLayer;
function toggleKumlokk () {
  if (kumlokkLayer) {

  }
  else {
    nvdb.kumlokk(function (kumlokk) {

    });
  }
}


// oppgave
// http://openlayers.org/en/v3.0.0/apidoc/ol.Overlay.html
// http://openlayers.org/en/v3.0.0/examples/popup.html
//
// hint:
// - vanskelig
// - html for en openlayers popup ligger i index.html
// - popupen må skjules/vises manuelt
// - kan lytte på `map.on('click', function (e) { ... });` og lese ut hvilke features man har klikket på fra eventet
// - popupen må flyttes rundt i kartet
// - `feature.getCoordinates()` inneholder informasjon om en enkelt feature sin posisjon
var popup;
function enablePopups (selector) {

}
