var $ = require('zepto-browserify').$;
var ol = require('ol');

var places = require('./places');

module.exports = {
  create: create,
  addMarker: addMarker,
  addPopup: addPopup
};

var config = {
  TileUrl: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  Attribution: new ol.control.Attribution({ collapsible: false })
};

var map;

function create (selector, latlon) {
  var el = $(selector).get(0);

  map = new ol.Map({
    target: el,
    view: new ol.View({
      center: ol.proj.transform([latlon[1], latlon[0]], "EPSG:4326", "EPSG:3857"),
      zoom: 13
    }),
    controls: ol.control.defaults({ attribution: false }).extend([config.Attribution]),
    layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ]
  });

  return this;
}

function addMarker (latlon) {
  var img = new Image();
  img.src = 'images/marker-icon.png';

  var marker = new ol.Overlay({
    element: img,
    position: ol.proj.transform([latlon[1], latlon[0]], "EPSG:4326", "EPSG:3857"),
    positioning: 'center-center',
    stopEvent: false
  });
  map.addOverlay(marker);
}

var popup;
function addPopup (selector, latlon, text) {
  if (!popup) {
    popup = new ol.Overlay({
      element: $(selector).get(0),
      positioning: 'bottom-center',
      stopEvent: false,
      insertFirst: false
    });
    map.addOverlay(popup);
  }

  var pos = ol.proj.transform([latlon[1], latlon[0]], "EPSG:4326", "EPSG:3857");
  popup.setPosition(pos);

  popup.getElement().innerHTML = text;
}

