var Ready = require('../')
  , util = require('util')
  , should = require('should')
  ;

function SomeClass() {
  Ready.call(this);
  this.property = 'value';
}
util.inherits(SomeClass, Ready);
SomeClass.prototype.method = function() {
  return 'method';
};


describe('inherits', function() {
  var someClass = new SomeClass();
  it('should have Ready properties', function() {
    someClass.should.have.property('ready');
    someClass.should.have.property('_ready');
    someClass.should.have.property('_readyCallbacks');
  });

  var anotherClass = new SomeClass();
  it('should be separate from other instances', function() {
    anotherClass.ready(function() {});
    anotherClass.should.have.property('_readyCallbacks').with.length(1);
    someClass.should.have.property('_readyCallbacks').with.length(0);
  });
});

describe('ready', function() {
  var ready = new Ready();
  it('should queue callbacks', function() {
    ready.should.have.property('_readyCallbacks').with.length(0);
    ready.ready(function() {});
    ready.should.have.property('_readyCallbacks').with.length(1);
    ready.ready(function() {});
    ready.should.have.property('_readyCallbacks').with.length(2);
  });

  it('should execute and dequeue callbacks', function(done) {
    ready.should.have.property('_readyCallbacks').with.length(2);
    ready.ready(function() {
      ready.should.have.property('_readyCallbacks').with.length(0);
      done();
    });
    ready.ready(true);
  });

  it('should immediatly call callback when already ready', function(done) {
    ready.ready(function() {
      done();
    });
  });

  it('should not call when ready set to false', function(done) {
    ready.ready(false);
    ready.ready(function(done) {
      done('should not execute because it is not ready');
    });
    setTimeout(function() {
      done();
    }, 10);
  });
});