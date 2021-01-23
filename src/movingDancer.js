var movingInit = false;
var makeMovingDancer = function(top, left, timeBetweenSteps) {
  if (!movingInit) {
    $('.dancefloor').append('<div class="movingContainer"></div>');
    movingInit = true;
  }
  return new MovingDancer(top, left, timeBetweenSteps, '.movingContainer');
};

var MovingDancer = function(top, left, timeBetweenSteps, containerClass) {
  Dancer.call(this, top, left, timeBetweenSteps, containerClass);
  this.$node.addClass('moving triangle');
  this.newTop = this.top + Math.random() * 200 - 100;
  this.newLeft = this.left + Math.random() * 200 - 100;
  this.hasMoved = false;
  this.transitionType = 'linear';
};

MovingDancer.prototype = Object.create(Dancer.prototype);
MovingDancer.prototype.constructor = MovingDancer;

MovingDancer.prototype.oldStep = MovingDancer.prototype.step;

MovingDancer.prototype.step = function() {
  if (this.isLinedUp === false) {
    //this.$node.css(this.css);
    if (this.hasMoved) {
      var styleSettings = {
        top: this.top,
        left: this.left
        //transition: 'top ' + this.timeBetweenSteps / 1000 + 's ' + this.transitionType
      };
    } else {
      var styleSettings = {
        top: this.newTop,
        left: this.newLeft
        //transition: 'all ' + this.timeBetweenSteps / 1000 + 's ' + this.transitionType
      };
    }
    this.hasMoved = !this.hasMoved;
    this.$node.animate(styleSettings, this.timeBetweenSteps);
    this.css = this.$node.attr('style');
  } else if (this.isLinedUp === true) {
    this.$node.removeAttr('style');
  }
  this.oldStep();
};