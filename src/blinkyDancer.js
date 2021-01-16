var blinkyInit = false;
var makeBlinkyDancer = function(top, left, timeBetweenSteps) {
  if (!blinkyInit) {
    $('.dancefloor').append('<div class="blinkyContainer"></div>');
    blinkyInit = true;
  }
  return new BlinkyDancer(top, left, timeBetweenSteps, '.blinkyContainer');
};

var BlinkyDancer = function (top, left, timeBetweenSteps, containerClass) {
  Dancer.call(this, top, left, timeBetweenSteps, containerClass);
  this.$node.addClass('blink');
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.oldStep = BlinkyDancer.prototype.step;

BlinkyDancer.prototype.step = function(ref) {
  this.oldStep();
  if (!this.isLinedUp) {
    this.$node.toggle();
  } else {
    this.$node.toggle(true);
  }

};
