var rotateInit = false;
var makeRotatingDancer = function(top, left, timeBetweenSteps) {
  if (!rotateInit) {
    $('.dancefloor').append('<div class="rotatingContainer"></div>');
    rotateInit = true;
  }
  return new RotatingDancer(top, left, timeBetweenSteps, '.rotatingContainer');
};

var RotatingDancer = function(top, left, timeBetweenSteps, rotatingContainer) {
  Dancer.call(this, top, left, timeBetweenSteps, rotatingContainer);
  this.$node.addClass('rotate square');
};

RotatingDancer.prototype = Object.create(Dancer.prototype);
RotatingDancer.prototype.constructor = RotatingDancer;

RotatingDancer.prototype.oldStep = RotatingDancer.prototype.step;

RotatingDancer.prototype.step = function() {
  this.oldStep();
  if (this.isLinedUp === false) {
    this.$node[0].animate([
      { transform: 'rotate(360deg)'}
    ], this.timeBetweenSteps);
  }
};