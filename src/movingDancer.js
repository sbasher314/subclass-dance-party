var makeMovingDancer = function(top, left, timeBetweenSteps) {
  return new MovingDancer(top, left, timeBetweenSteps);
};

var MovingDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('moving triangle');
  this.newTop = this.top + 100;
  this.newLeft = this.left - 100;
  this.hasMoved = false;
  this.transitionType = 'linear';
};

MovingDancer.prototype = Object.create(Dancer.prototype);
MovingDancer.prototype.constructor = MovingDancer;

MovingDancer.prototype.oldStep = MovingDancer.prototype.step;

MovingDancer.prototype.step = function() {
  this.oldStep();
  if (this.hasMoved) {
    var styleSettings = {
      top: this.top,
      left: this.left//,
      //transition: 'all ' + this.timeBetweenSteps / 1000 + 's ' + this.transitionType
    };
  } else {
    var styleSettings = {
      top: this.newTop,
      left: this.newLeft//,
      //transition: 'all ' + this.timeBetweenSteps / 1000 + 's ' + this.transitionType
    };
  }
  this.hasMoved = !this.hasMoved;
  this.$node.animate(styleSettings, this.timeBetweenSteps / 1000);
};