var $ = require('zepto-browserify').$;

var LeafletMap = require('./map-leaflet');
var OpenlayersMap = require('./map-openlayers');

LeafletMap.create('.map-leaflet');
OpenlayersMap.create('.map-openlayers');
