// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {
  var dancer = new Dancer(top, left, timeBetweenSteps);
  dancer.step();
  return dancer;
};

var Dancer = function(top, left, timeBetweenSteps) {
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.$node = $('<span class="dancer"></span>');
  this.setPosition(top, left);
};

Dancer.prototype.step = function() {

  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  console.log(this);
  setTimeout(this.step, this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};