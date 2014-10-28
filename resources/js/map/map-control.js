var $ = require('zepto-browserify').$;
var EventEmitter = require('events').EventEmitter;
var util = require('util');

module.exports = MapControl;

function MapControl (selector) {
  var $el = $(selector);
  this.el = $el.find('.map-control');
  this.attachListeners($el);
}
util.inherits(MapControl, EventEmitter);

MapControl.prototype.attachListeners = function (el) {
  var self = this,
      prefix = 'map-control',
      selector = '[class|='+prefix+']';

  el.on('change', selector +' input', function (e) {
    var input = e.currentTarget;
    var ev = $(input).closest(selector).attr('class').replace(prefix+'-', '');
    self.emit(ev, input.checked);
  });
};
