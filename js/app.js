var $ = require('zepto-browserify').$;

var LeafletMap = require('./map-leaflet');
var OpenlayersMap = require('./map-openlayers');

var places = require('./places');

var lmap = LeafletMap.create('.map-leaflet');
var lmarker = lmap.addMarker(places.Blikkboksen);
lmap.addPopup(lmarker, "Blikkboksen!");

var omap = OpenlayersMap.create('.map-openlayers');
