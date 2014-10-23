var $ = require('zepto-browserify').$;
var L = require('leaflet');

L.Icon.Default.imagePath = "images";

module.exports = {
  create: create
};

function create (selector) {
  var el = $(selector);
  var map = L.map(el.get(0)).setView([51.505, -0.09], 13);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([51.5, -0.09]).addTo(map)
  .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
  .openPopup();
}


function create (selector) {
  var el = $(selector).get(0);
  var map = new L.map(el);

  var url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osm = new L.TileLayer(url, {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  });

  map.addLayer(osm);
}
