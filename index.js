function Ready() {
  this._ready = false;
  this._readyCallbacks = [];
}

Ready.prototype.ready = function(flagOrFunction) {
  // operate even if inheriting class doesn't properly call constructor
  var ready = !!this._ready
    , callbacks = this._readyCallbacks = this._readyCallbacks || []
    ;

  if ('function' === typeof(flagOrFunction)) {
    callbacks.push(flagOrFunction);
  } else {
    ready = this._ready = !!flagOrFunction;
  }

  if (ready) {
    callbacks.splice(0, Infinity).forEach(function(callback) {
      process.nextTick(function() {
        callback();
      });
    });
  }
}

module.exports = Ready;
