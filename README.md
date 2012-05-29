ready
=====

NodeJS mixin to add one-time ready event

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
  console.log('I came late to the party, but I want to execute too!');
});
```
