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
    emitEvent(e, e.currentTarget.checked);
  });

  el.on('click', selector +' button', emitEvent);

  function emitEvent (e) {
    var el = e.currentTarget;
    var ev = $(el).closest(selector).attr('class').replace(prefix+'-', '');
    self.emit(ev);
  }
};
