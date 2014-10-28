var $ = require('zepto-browserify').$;
var ol = require('ol');

var geojson = require('../geojson');
var places = require('../places');

module.exports = {
  create: create,
  addMarker: addMarker,
  enablePopups: enablePopups,
  toggleGeojsonFylker: toggleGeojsonFylker,
  toggleGeojsonKommuner: toggleGeojsonKommuner
};

var config = {
  Attribution: new ol.control.Attribution({ collapsible: false })
};

var map;

function create (selector, latlon) {
  var el = $(selector).get(0);

  // TODO oppgave zoom til punkt i
  var blikkboksen = ol.proj.transform([latlon[1], latlon[0]], "EPSG:4326", "EPSG:3857");

  // TODO openlayers kartet skal ikke være zooma til blikkboksen, det er en oppgave
  map = new ol.Map({
    target: el,
    view: new ol.View({
      // center: [0, 0],
      center: blikkboksen,// TODO fjern
      zoom: 4
    }),
    controls: ol.control.defaults({ attribution: false }).extend([config.Attribution]),
    layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ]
  });

  return this;
}

// TODO oppgave 1.2
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

// TODO oppgave 1.3
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

    map.on('click', function (e) {
      var feature = map.forEachFeatureAtPixel(e.pixel, function (feature, layer) { return feature; });
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

var geojsonLayerFylker;
function toggleGeojsonFylker () {
  if (geojsonLayerFylker) {
    map.removeLayer(geojsonLayerFylker);
    geojsonLayerFylker = undefined;
  }
  else {
    var source = new ol.source.GeoJSON({ projection : 'EPSG:3857', url : '/js/vendor/fylker.json' });
    geojsonLayerFylker = new ol.layer.Vector({ source : source });
    map.addLayer(geojsonLayerFylker);
  }
}

var geojsonLayerKommuner;
function toggleGeojsonKommuner () {
  if (geojsonLayerKommuner) {
    map.removeLayer(geojsonLayerKommuner);
    geojsonLayerKommuner = undefined;
  }
  else {
    var source = new ol.source.GeoJSON({ projection : 'EPSG:3857', url : '/js/vendor/kommuner.json' });
    geojsonLayerKommuner = new ol.layer.Vector({ source : source });
    map.addLayer(geojsonLayerKommuner);
  }
}
