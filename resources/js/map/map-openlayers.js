var $ = require('zepto-browserify').$;
var ol = require('ol');
var proj4 = require('proj4');

var projections = require('./projections');
var geojson = require('../geojson');
var places = require('../places');

module.exports = {
  create: create,
  centerTo: centerTo,
  convertFromWgs84ToWebMercator: convertFromWgs84ToWebMercator,
  convertFromUtm33ToWebMercator: convertFromUtm33ToWebMercator,
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
// http://openlayers.org/en/v3.0.0/apidoc/ol.Map.html
function centerTo (xy) {
  map.setView(new ol.View({ center: xy, zoom: 18 }));
}


// oppgave
// https://github.com/proj4js/proj4js#using
//
// hint:
// - må konvertere fra WGS84 (Lat/lon - EPSG:4326) til WebMercator (EPSG:3857)
// - proj4() tar inn [lon, lat] og returnerer [x, y]
function convertFromWgs84ToWebMercator (latlon) {
  var lonlat = [latlon[1], latlon[0]];

  // var xy = ol.proj.transform(lonlat, projections.WGS84, projections.WebMercator);;
  // eller
  var xy = proj4(projections.WGS84, projections.WebMercator, lonlat);

  return xy;
}


// oppgave
// https://github.com/proj4js/proj4js#using
//
// hint:
// - må konvertere fra UTM33 (EPSG:32633) til WebMercator (EPSG:3857)
// - proj4() tar inn [x, y] og returnerer [x, y]
function convertFromUtm33ToWebMercator (xy) {
  xy = proj4(projections.UTM33, projections.WebMercator, xy);
  return xy;
}


// oppgave
// http://openlayers.org/en/v3.0.0/examples/icon.js
// http://openlayers.org/en/v3.0.0/apidoc/ol.Feature.html
//
// hint:
// - må konvertere fra WGS84 (Lat/lon - EPSG:4326) til WebMercator (EPSG:3857)
// - kan projisere,  enten med openlayers eller proj4
function addMarker (latlon, text) {
  var xy = convertFromWgs84ToWebMercator(latlon);

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
      var source = new ol.source.GeoJSON({ projection: projections.WebMercator, object: fylker });
      geojsonLayerFylker = new ol.layer.Vector({ source: source });
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
    var source = new ol.source.GeoJSON({ projection: projections.WebMercator, url: '/js/vendor/kommuner.json' });
    geojsonLayerKommuner = new ol.layer.Vector({ source: source });
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
