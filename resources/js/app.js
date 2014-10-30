var $ = require('zepto-browserify').$;

var LeafletMap = require('./map/map-leaflet');
var OpenlayersMap = require('./map/map-openlayers');
var MapControl = require('./map/map-control.js');

var places = require('./places');
var Blikkboksen = places.Blikkboksen;


//
// Leaflet
//
var leafletControl = new MapControl('.map-control--leaflet');
var leafletMap = LeafletMap.create('.map-leaflet');

// oppgave
leafletControl.on('zoom-til-blikkboksen', function () {
  leafletMap.centerTo(places.Blikkboksen);
});

// oppgave
leafletControl.on('zoom-til-utm33-koordinat', function () {
  var pointInUtm33Wgs84 = [262030, 6649354];
  var latlon = leafletMap.convertFromUtm33ToWgs84(pointInUtm33Wgs84);
  leafletMap.centerTo(latlon);
});

// oppgave
var leafletMarker = leafletMap.addMarker(Blikkboksen, 'Blikkboksen!');

// oppgave
leafletControl.on('toggle-geojson-fylker', function (onOrOff) {
  leafletMap.toggleGeojsonFylker();
});

// oppgave
leafletControl.on('toggle-geojson-kommuner', function (onOrOff) {
  leafletMap.toggleGeojsonKommuner();
});


//
// OpenLayers
//
var olControl = new MapControl('.map-control--openlayers');
var olMap = OpenlayersMap.create('.map-openlayers');

// oppgave
olControl.on('zoom-til-blikkboksen', function () {
  var xy = olMap.convertFromWgs84ToWebMercator(places.Blikkboksen);
  olMap.centerTo(xy);
});

// oppgave
olControl.on('zoom-til-utm33-koordinat', function () {
  var pointInUtm33Wgs84 = [262030, 6649354];
  var xy = olMap.convertFromUtm33ToWebMercator(pointInUtm33Wgs84);
  olMap.centerTo(xy);
});

// oppgave
var olMarker = olMap.addMarker(Blikkboksen, "Blikkboksen!");

// oppgave
olControl.on('toggle-geojson-fylker', function (onOrOff) {
  olMap.toggleGeojsonFylker();
});

// oppgave
olControl.on('toggle-geojson-kommuner', function (onOrOff) {
  olMap.toggleGeojsonKommuner();
});

// oppgave
olMap.enablePopups('.map-openlayers-popup');

