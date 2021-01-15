describe('rotatingDancer', function() {

  var rotatingDancer, clock;
  var timeBetweenSteps = 200;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    rotatingDancer = makeRotatingDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(rotatingDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes it rotate', function() {
    sinon.spy(rotatingDancer.$node[0], 'animate');
    expect(rotatingDancer.$node[0].animate.called).to.be.false;
    rotatingDancer.step();
    expect(rotatingDancer.$node[0].animate.called).to.be.true;
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