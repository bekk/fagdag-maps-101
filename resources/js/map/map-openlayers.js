var $ = require('zepto-browserify').$;
var ol = require('ol');
var proj4 = require('proj4');

var geojson = require('../geojson');
var places = require('../places');

module.exports = {
  create: create,
  zoomToLatLon: zoomToLatLon,
  zoomToXY: zoomToXY,
  addMarker: addMarker,
  toggleGeojsonFylker: toggleGeojsonFylker,
  toggleGeojsonKommuner: toggleGeojsonKommuner,
  enablePopups: enablePopups
};

var config = {
  Attribution: new ol.control.Attribution({ collapsible: false })
};

var map;

function create (selector, latlon) {
  var el = $(selector).get(0);

  map = new ol.Map({
    target: el,
    view: new ol.View({ center: [0, 0], zoom: 1 }),
    controls: ol.control.defaults({ attribution: false }).extend([config.Attribution]),
    layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ]
  });

  return this;
}

// TODO oppgave
function zoomToLatLon (latlon, fromProjection, toProjection) {
  var lonlat = [latlon[1], latlon[0]];
  var xy = proj4(fromProjection, toProjection, lonlat); // proj4 bruker lon, lat
  map.setView(new ol.View({ center: xy, zoom: 18 }));
}

// TODO oppgave
function zoomToXY (xy, fromProjection, toProjection) {
  xy = proj4(fromProjection, toProjection, xy); // proj4 bruker x, y
  map.setView(new ol.View({ center: xy, zoom: 18 }));
}

// TODO oppgave
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

// TODO oppgave
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
      var found = map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        if (!feature) {
          return false;
        }

        var pos, text, geometry = feature.getGeometry();

        if (layer == geojsonLayerKommuner) {
          popup.setPosition(ol.extent.getCenter(geometry.getExtent()));
          showPopup(feature.getProperties().NAVN);
          return true;
        }
        else if (layer == geojsonLayerFylker) {
          popup.setPosition(ol.extent.getCenter(geometry.getExtent()));
          showPopup(feature.getProperties().NAVN);
          return true;
        }
        else {
          popup.setPosition(geometry.getCoordinates());
          showPopup(feature.get('text'));
          return true;
        }

        return false;
      });

      if (!found) {
        el.hide();
      }
    });
  }

  function showPopup (text) {
    el.text(text).show();
  }
}

// TODO oppgave
var geojsonLayerFylker;
function toggleGeojsonFylker () {
  if (geojsonLayerFylker) {
    map.removeLayer(geojsonLayerFylker);
    geojsonLayerFylker = undefined;
  }
  else {
    geojson.fylker(function (fylker) {
      var source = new ol.source.GeoJSON({ projection : 'EPSG:3857', object: fylker });
      geojsonLayerFylker = new ol.layer.Vector({ source : source });
      map.addLayer(geojsonLayerFylker);
    });
  }
}

// TODO oppgave
var geojsonLayerKommuner;
function toggleGeojsonKommuner () {
  if (geojsonLayerKommuner) {
    map.removeLayer(geojsonLayerKommuner);
    geojsonLayerKommuner = undefined;
  }
  else {
    // another way
    var source = new ol.source.GeoJSON({ projection : 'EPSG:3857', url : '/js/vendor/kommuner.json' });
    geojsonLayerKommuner = new ol.layer.Vector({ source : source });
    map.addLayer(geojsonLayerKommuner);
  }
}
