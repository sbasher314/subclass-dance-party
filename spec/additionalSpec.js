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
    secondDancer = makeMovingDancer(10, 50, timeBetweenSteps);
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

  it('Should change color when close to other dancers', function() {
    sinon.spy(rotatingDancer.$node, 'addClass');
    expect(rotatingDancer.$node.addClass.called).to.be.false;
    rotatingDancer.step();
    expect(rotatingDancer.$node.addClass.called).to.be.true;
    expect(rotatingDancer.$node.hasClass('closeTo')).to.be.true;
  });

  it('Should find correct closest Dancer', function() {
    expect(rotatingDancer.nClosestDancers(2)[0]).to.eql(thirdDancer);
    expect(rotatingDancer.nClosestDancers(2)[1]).to.eql(secondDancer);
  });

});