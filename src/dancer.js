// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps, containerClass) {
  return new Dancer(top, left, timeBetweenSteps, containerClass);
};

var Dancer = function(top, left, timeBetweenSteps, containerClass) {
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.containerClass = containerClass;
  this.id = Date.now();
  this.$node = $('<span class="dancer" id=' + this.id + '></span>');
  this.$node.appendTo(containerClass);
  this.setPosition(top, left);
  this.css = this.setPosition;
  this.step();
  this.isLinedUp = window.dancers['linedUp'];
};

Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.css = styleSettings;
  this.$node.css(styleSettings);
};

Dancer.prototype.step = function() {
  setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.lineUp = function() {
  if (this.isLinedUp) {
    this.setPosition(this.top, this.left);
    this.isLinedUp = false;
    $(this.containerClass).removeClass('linedUp');
    this.$node.css(this.css);
  } else {
    this.isLinedUp = true;
    $(this.containerClass).addClass('linedUp');
    this.css = this.$node.attr('style');
    this.$node.removeAttr('style');
  }
};