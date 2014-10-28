var $ = require('zepto-browserify').$;

var LeafletMap = require('./map/map-leaflet');
var OpenlayersMap = require('./map/map-openlayers');
var MapControl = require('./map/map-control.js');

var places = require('./places');
var Blikkboksen = places.Blikkboksen;

// Leaflet
var leafletMap = LeafletMap.create('.map-leaflet', Blikkboksen);
var leafletMarker = leafletMap.addMarker(Blikkboksen, 'Blikkboksen!');

var leafletControl = new MapControl('.map-control--leaflet');

leafletControl.on('toggle-geojson-fylker', function (onOrOff) {
  console.log('Implement toggling a geojson layer with fylker.json for leaflet!');
  leafletMap.toggleGeojsonFylker();
});
leafletControl.on('toggle-geojson-kommuner', function (onOrOff) {
  console.log('Implement toggling a geojson layer with kommuner.json for leaflet!');
  leafletMap.toggleGeojsonKommuner();
});


// OpenLayers
var olMap = OpenlayersMap.create('.map-openlayers', Blikkboksen);
olMap.enablePopups('.map-openlayers-popup');

var olMarker = olMap.addMarker(Blikkboksen, "Blikkboksen!");

var olControl = new MapControl('.map-control--openlayers');

olControl.on('toggle-geojson-fylker', function (onOrOff) {
  console.log('Implement toggling a geojson layer with kommuner.json for openlayers!');
  olMap.toggleGeojsonFylker();
});

olControl.on('toggle-geojson-kommuner', function (onOrOff) {
  console.log('Implement toggling a geojson layer with kommuner.json for openlayers!');
  olMap.toggleGeojsonKommuner();
});
