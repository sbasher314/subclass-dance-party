describe('Addtional Specs', function() {
  //  we want to create a number of dancers --
  //  perhaps a couple of each type?

  //  verify constructor of each dancer is the appropriate constructor -
  //    blinkyDancer.constructor === BlinkyDancer and so forth

  //  ... Then call n-closest dancers. probably n=2
  //  make sure that it does indeed return the correct dancers, and does not reference itself from itself (the returned element should not contain the calling element)

  //  also, make sure our 'delete' method works -- dancer.mouseOver()
  //    should change window.dancers[] length
  //    should release reference to previous dancer
  //    n-closest dancers should reflect the changes as well
  var rotatingDancer, secondDancer, thirdDancer, clock;
  var timeBetweenSteps = 200;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    window.dancers = [];
    rotatingDancer = makeRotatingDancer(10, 20, timeBetweenSteps);
    window.dancers.push(rotatingDancer);
    clock.tick(timeBetweenSteps);
    secondDancer = makeMovingDancer(10, 10, timeBetweenSteps);
    window.dancers.push(secondDancer);
    clock.tick(timeBetweenSteps);
    thirdDancer = makeRotatingDancer(20, 20, timeBetweenSteps);
    window.dancers.push(thirdDancer);
  });

  it('should delete dancer after mouseover', function() {
    expect(window.dancers.length).to.equal(3);
    thirdDancer.$node.mouseover();
    expect(window.dancers.length).to.equal(2);
  });

  it('should set color ', function() {
    sinon.spy(rotatingDancer.$node, 'addClass');
    expect(rotatingDancer.$node.addClass.called).to.be.false;
    rotatingDancer.step();
    expect(rotatingDancer.$node.addClass.called).to.be.true;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(rotatingDancer, 'step');
      expect(rotatingDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(rotatingDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(rotatingDancer.step.callCount).to.be.equal(2);
    });
  });

});