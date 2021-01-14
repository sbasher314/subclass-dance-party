var makeRotatingDancer = function(top, left, timeBetweenSteps) {
  return new RotatingDancer(top, left, timeBetweenSteps);
};

var RotatingDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('rotate square');

};

RotatingDancer.prototype = Object.create(Dancer.prototype);
RotatingDancer.prototype.constructor = RotatingDancer;

RotatingDancer.prototype.oldStep = RotatingDancer.prototype.step;

RotatingDancer.prototype.step = function() {
  this.oldStep();
  this.$node[0].animate([
    { transform: 'rotate(360deg)'}
  ], this.timeBetweenSteps);
};