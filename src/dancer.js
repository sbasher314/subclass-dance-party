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
  this.$node.on('mouseover', this.mouseOver);
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

Dancer.prototype.mouseOver = function(e) {
  var targetID = $(e.target).attr('id');
  for (var i = 0; i < window.dancers.length; i++) {
    if (window.dancers[i].id === Number(targetID)) {
      window.dancers.splice(i, 1);
    }
  }
  $(e.target).remove();
  delete this;
};

Dancer.prototype.distanceFrom = function(top, left) {
  var diffInTop = Math.abs(top - this.top);
  var diffInLeft = Math.abs(left - this.left);
  var distance = (diffInTop ** 2 + diffInLeft ** 2) ** 0.5;

  return distance;
};

Dancer.prototype.nClosestDancers = function(n) {
  var dancerDistances = [];
  var closestDancers = [];
  for (var i = 0; i < window.dancers.length; i++) {
    let comparison = window.dancers[i];
    dancerDistances.push(this.distanceFrom(comparison.top, comparison.left));
  }
  // suuuuper inneficent but it works
  while (closestDancers.length < n) {
    var lowestDistanceIndex;
    var lowestDistance = 1000;
    var zeroCount = 0;
    for (var i = 0; i < dancerDistances.length; i++) {
      if (dancerDistances[i] > 0 && dancerDistances[i] < lowestDistance) {
        lowestDistanceIndex = i;
        lowestDistance = dancerDistances[i];
      }
      if (dancerDistances[i] === 0) {
        zeroCount++;
      }
    }

    if (zeroCount === window.dancers.length) { break; }

    dancerDistances[lowestDistanceIndex] = 0;
    closestDancers.push(window.dancers[lowestDistanceIndex]);
  }
  return closestDancers;
};