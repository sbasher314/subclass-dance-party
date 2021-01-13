var makeBlinkyDancer = function(top, left, timeBetweenSteps) {
  return new BlinkyDancer(top, left, timeBetweenSteps);
};

var BlinkyDancer = function (top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.oldStep = BlinkyDancer.prototype.step;

BlinkyDancer.prototype.step = function(ref) {
  this.oldStep();
  this.$node.toggle();
};