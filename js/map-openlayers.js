var $ = require('zepto-browserify').$;
var ol = require('ol');

var places = require('./places');

module.exports = {
  create: create,
  addMarker: addMarker,
  enablePopups: enablePopups
};

var config = {
  TileUrl: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  Attribution: new ol.control.Attribution({ collapsible: false })
};

var map;

function create (selector, latlon) {
  var el = $(selector).get(0);
  var blikkboksen = ol.proj.transform([latlon[1], latlon[0]], "EPSG:4326", "EPSG:3857");

  map = new ol.Map({
    target: el,
    view: new ol.View({
      center: blikkboksen,
      zoom: 13
    }),
    controls: ol.control.defaults({ attribution: false }).extend([config.Attribution]),
    layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ]
  });

  return this;
}

function addMarker (latlon, text) {
  var loc = ol.proj.transform([latlon[1], latlon[0]], "EPSG:4326", "EPSG:3857");
  var iconFeature = new ol.Feature({ geometry: new ol.geom.Point(loc), text: text });
  var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [13, 41], // half icon height, whole icon height
      anchorXUnits: 'pixels',
      anchorYUnits: 'pixels',
      src: 'images/marker-icon.png'
    })
  });
  iconFeature.setStyle(iconStyle);

  var vectorSource = new ol.source.Vector({ features: [iconFeature] });
  var vectorLayer = new ol.layer.Vector({ source: vectorSource });
  map.addLayer(vectorLayer);
}

var popup;
function enablePopups (selector) {
  var el = $(selector);
  if (!popup) {
    popup = new ol.Overlay({
      element: el,
      positioning: 'bottom-center',
      stopEvent: false,
      insertFirst: false
    });

    map.addOverlay(popup);

    map.on('click', e => {
      var self = this;
      var feature = map.forEachFeatureAtPixel(e.pixel, (feature, layer) => feature);
      if (feature) {
        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();
        popup.setPosition(coord);

        el.text(feature.get('text'));
        el.show();
      }
      else {
        el.hide();
      }
    });
  }

}

