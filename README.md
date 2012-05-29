ready
=====

NodeJS mixin to add one-time ready event

## Purpose
Events are great. You should use events, but not for signaling ready! Ready implies state, and once you are ready, you stay ready.

This is a module for everyone who has bound an event handler.on('ready', function() {}) that doesn't execute because you added the handler after the 'ready' event already fired.

## Warning
If you use Ready for inheritance, you must have 'ready', '_ready', and '_readyCallbacks' available on your class. Ready will stomp on these variables if you're trying to use them in your class.

## Example
```javascript
var Ready = require('ready')
  , util  = require('util')
  ;

function MyClass() {
  Ready.call(this); // Call Ready constructor for proper inheritance
}
util.inherits(MyClass, Ready); // Add Ready methods

// Normal class prototype functions
MyClass.prototype.doSomeWork = function() {}; 

// Create a new class that uses Ready
var myClass = new MyClass();

// Add callback for when myClass is ready
myClass.ready(function() {
  console.log('I am now ready');
});

myClass.doSomeWork();

// We are now ready, fire callbacks!
myClass.ready(true);

// Adding a new callback once we're already ready gets executed immediately
myClass.ready(function() {
  console.log('I came late to the party, but I will still execute.');
});

// Ok, you can set the ready state to false now as well... for whatever reason
myClass.ready(false);
myClass.ready(function() {
  console.log('I will not fire until you set ready to true again. Why you set it to false is beyond me.');
});
```
