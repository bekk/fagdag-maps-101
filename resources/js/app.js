var $ = require('zepto-browserify').$;

var LeafletMap = require('./map/map-leaflet');
var OpenlayersMap = require('./map/map-openlayers');
var MapControl = require('./map/map-control.js');

var places = require('./places');
var Blikkboksen = places.Blikkboksen;


var EPSG_UTM33 = "+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";


// Leaflet
var leafletControl = new MapControl('.map-control--leaflet');
var leafletMap = LeafletMap.create('.map-leaflet', Blikkboksen);

// oppgave
var leafletMarker = leafletMap.addMarker(Blikkboksen, 'Blikkboksen!');

// oppgave
leafletControl.on('zoom-til-blikkboksen', function () {
  leafletMap.zoomToLatLon(places.Blikkboksen);
});

// oppgave
leafletControl.on('zoom-til-utm33-koordinat', function () {
  var pointInUtm33Wgs84 = [262030, 6649354];
  leafletMap.zoomToXY(pointInUtm33Wgs84, EPSG_UTM33, "EPSG:4326");
});

// oppgave
leafletControl.on('toggle-geojson-fylker', function (onOrOff) {
  leafletMap.toggleGeojsonFylker();
});

// oppgave
leafletControl.on('toggle-geojson-kommuner', function (onOrOff) {
  leafletMap.toggleGeojsonKommuner();
});


// OpenLayers
var olControl = new MapControl('.map-control--openlayers');
var olMap = OpenlayersMap.create('.map-openlayers', Blikkboksen);

// oppgave
var olMarker = olMap.addMarker(Blikkboksen, "Blikkboksen!");

// oppgave
olControl.on('zoom-til-blikkboksen', function () {
  olMap.zoomToLatLon(places.Blikkboksen, "EPSG:4326", "EPSG:3857");
});

// oppgave
olControl.on('zoom-til-utm33-koordinat', function () {
  var pointInUtm33Wgs84 = [262030, 6649354];
  olMap.zoomToXY(pointInUtm33Wgs84, EPSG_UTM33, "EPSG:3857");
});

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

