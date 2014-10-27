var $ = require('zepto-browserify').$;
var LeafletMap = require('./map-leaflet');
var OpenlayersMap = require('./map-openlayers');

var places = require('./places');
var Blikkboksen = places.Blikkboksen;

// Leaflet
var lmap = LeafletMap.create('.map-leaflet', Blikkboksen);
var lmarker = lmap.addMarker(Blikkboksen, 'Blikkboksen!');

// OpenLayers
var omap = OpenlayersMap.create('.map-openlayers', Blikkboksen);
omap.enablePopups('.map-openlayers-popup');

var omarker = omap.addMarker(Blikkboksen, "Blikkboksen!");
