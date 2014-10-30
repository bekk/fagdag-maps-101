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
function create (selector) {
  var el = $(selector).get(0);

  map = new ol.Map({
    target: el,
    view: new ol.View({
      center: [0, 0],
      zoom: 1
    }),
    controls: ol.control.defaults({ attribution: false }).extend([config.Attribution]),
    layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ]
  });

  return this;
}


// oppgave
// https://github.com/proj4js/proj4js#using
//
// hint:
// - må konvertere fra
// - proj4() tar inn [lon, lat] og returnerer [x, y]
function zoomToLatLon (latlon, fromProjection, toProjection) {
  var lonlat = [latlon[1], latlon[0]];
  var xy = proj4(fromProjection, toProjection, lonlat);
  map.setView(new ol.View({ center: xy, zoom: 18 }));
}


// oppgave
// https://github.com/proj4js/proj4js#using
//
// hint:
// - må konvertere fra
// - proj4() tar inn [x, y] og returnerer [x, y]
function zoomToXY (xy, fromProjection, toProjection) {
  xy = proj4(fromProjection, toProjection, xy);
  map.setView(new ol.View({ center: xy, zoom: 18 }));
}


// oppgave
// http://openlayers.org/en/v3.0.0/examples/icon.js
// http://openlayers.org/en/v3.0.0/apidoc/ol.Feature.html
//
// hint:
// - må konvertere fra
// - kan projisere,  enten med openlayers eller proj4
function addMarker (latlon, text) {
  // var xy = ol.proj.transform([latlon[1], latlon[0]], "EPSG:4326", "EPSG:3857");
  // eller
  var xy = proj4("EPSG:4326", "EPSG:3857", [latlon[1], latlon[0]]);

  var iconFeature = new ol.Feature({ geometry: new ol.geom.Point(xy), text: text });

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


// oppgave
// http://openlayers.org/en/v3.0.0/examples/geojson.html
//
// hint:
// - geojson.fylker(callback) laster ned `fylker.json` og kaller callback med resultatet
// - må angi `projection` og features til ol.source.GeoJSON
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

// oppgave
//
// hint:
// - geojson.kommuner(callback) laster ned `kommuner.json` og kaller callback med resultatet
// - må angi `projection` til ol.source.GeoJSON
// - ol.source.GeoJson kan også ta url til en geojson-fil, feks `/js/vendor/kommuner.json`
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

// oppgave
// http://openlayers.org/en/v3.0.0/apidoc/ol.Overlay.html
// http://openlayers.org/en/v3.0.0/examples/popup.html
//
// hint:
// - mer omfattende
// - html for en openlayers popup ligger i index.html
// - popupen må skjules/vises manuelt
// - kan lytte på `map.on('click', function (e) { ... });` og lese ut hvilke features man har klikket på fra eventet
// - popupen må flyttes rundt i kartet
// - `feature.getCoordinates()` inneholder informasjon om en enkelt feature sin posisjon
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
