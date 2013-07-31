var ready = require('../')
  , util = require('util')
  , should = require('should')
  ;

function SomeClass() {
  this.property = 'value';
}
ready.mixin(SomeClass.prototype);
SomeClass.prototype.method = function() {
  return 'method';
};

describe('inherits', function() {
  var someClass = new SomeClass();
  it('should have Ready properties', function() {
    someClass.should.have.property('ready');
  });

  var anotherClass = new SomeClass();
  it('should be separate from other instances', function() {
    anotherClass.ready(function() {});
    someClass.ready(function() {});
    someClass.ready(function() {});
    anotherClass.should.have.property('_readyCallbacks').with.length(1);
    someClass.should.have.property('_readyCallbacks').with.length(2);
  });

  it('should ready(obj) directly work', function () {
    var foo = {};
    should.not.exist(foo.ready);
    ready(foo);
    foo.ready.should.be.a('function');
  });
});

describe('ready', function() {
  var someClass = new SomeClass();
  it('should queue callbacks', function() {
    someClass.ready(function() {});
    someClass.should.have.property('_readyCallbacks').with.length(1);
    someClass.ready(function() {});
    someClass.should.have.property('_readyCallbacks').with.length(2);
  });

  it('should execute and dequeue callbacks', function(done) {
    someClass.should.have.property('_readyCallbacks').with.length(2);
    someClass.ready(function() {
      someClass.should.have.property('_readyCallbacks').with.length(0);
      done();
    });
    someClass.ready(true);
  });

  it('should immediatly call callback when already ready', function(done) {
    someClass.ready(function() {
      done();
    });
  });

  it('should not call when ready set to false', function(done) {
    someClass.ready(false);
    someClass.ready(function(done) {
      done('should not execute because it is not ready');
    });
    setTimeout(function() {
      done();
    }, 10);
  });
});