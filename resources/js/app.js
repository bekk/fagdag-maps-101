var $ = require('zepto-browserify').$;

var LeafletMap = require('./map/map-leaflet');
var OpenlayersMap = require('./map/map-openlayers');
var MapControl = require('./map/map-control.js');

var places = require('./places');
var Blikkboksen = places.Blikkboksen;

// Leaflet
var leafletControl = new MapControl('.map-control--leaflet');
var leafletMap = LeafletMap.create('.map-leaflet');

// OpenLayers
var olControl = new MapControl('.map-control--openlayers');
var olMap = OpenlayersMap.create('.map-openlayers');

//
// oppgaver
//

/* oppgave - zoom til blikkboksen i leaflet */
leafletControl.on('zoom-til-blikkboksen', function () {
  leafletMap.centerTo(places.Blikkboksen);
});
/* oppgave - zoom til blikkboksen i openlayers */
olControl.on('zoom-til-blikkboksen', function () {
  var xy = olMap.convertFromWgs84ToWebMercator(places.Blikkboksen);
  olMap.centerTo(xy);
});


/* oppgave - zoom til utm 33 koordinat i leaflet */
leafletControl.on('zoom-til-utm33-koordinat', function () {
  var xyInUtm33 = [262030, 6649354];
  var latlon = leafletMap.convertFromUtm33ToWgs84(xyInUtm33);
  leafletMap.centerTo(latlon);
});
/* oppgave - zoom til utm 33 koordinat i openlayers */
olControl.on('zoom-til-utm33-koordinat', function () {
  var xyInUtm33 = [262030, 6649354];
  var xy = olMap.convertFromUtm33ToWebMercator(xyInUtm33);
  olMap.centerTo(xy);
});


/* oppgave - add marker i leaflet */
var leafletMarker = leafletMap.addMarker(Blikkboksen, 'Blikkboksen!');
/* oppgave - add marker i openlayers */
var olMarker = olMap.addMarker(Blikkboksen, "Blikkboksen!");


/* oppgave - toggle geojson fylker i leaflet */
leafletControl.on('toggle-geojson-fylker', function (onOrOff) {
  leafletMap.toggleGeojsonFylker();
});
/* oppgave - toggle geojson fylker i openlayers */
olControl.on('toggle-geojson-fylker', function (onOrOff) {
  olMap.toggleGeojsonFylker();
});


/* oppgave - toggle geojson kommuner i leaflet */
leafletControl.on('toggle-geojson-kommuner', function (onOrOff) {
  leafletMap.toggleGeojsonKommuner();
});
/* oppgave - toggle geojson kommuner i openlayers */
olControl.on('toggle-geojson-kommuner', function (onOrOff) {
  olMap.toggleGeojsonKommuner();
});


/* oppgave - popups i openlayers (omfattende) */
olMap.enablePopups('.map-openlayers-popup');
