describe('feature test', function() {
    var airport;
    var plane;

    beforeEach(function() {
      airport = new Airport();
      plane = new Plane(01241);
    });

    describe('under normal conditions',function(){
      beforeEach(function(){
        spyOn(Math,'random').and.returnValue(0);
      });

      it('planes can land at the airport and confirmation is given when they do', function() {
        expect(airport.land(plane)).toBe("Plane landed")
      });

      it('planes array is empty when the airport is created', function() {
        expect(airport.planes()).toEqual([])
      })

      it('adds landed plane to the planes array', function() {
        airport.land(plane)
        expect(airport.planes()).toContain(plane)
      });

      it('planes can take off from the airport and confirmation is given when they do', function() {
        airport.land(plane)
        expect(airport.takeOff(plane)).toBe("Plane took off")
      });

      it('removes taken off plane from the planes array', function() {
        airport.land(new Plane(1))
        airport.land(plane)
        airport.land(new Plane(2))
        airport.takeOff(plane)
        expect(airport.planes()).not.toContain(plane)
      });

      it('can\'t land a plane if airport is full', function() {
        var times = 20;
        for(var i=0; i < times; i++){
          airport.land(new Plane(i))
        }
        expect(function(){airport.land(plane); }).toThrowError('Airport is full, cannot land plane')
      });

      it('can\'t take off if there are not planes in the airport', function() {
        expect(function(){airport.takeOff(plane); }).toThrowError('Plane is not at this airport')
      });
    });

    describe('under stormy conditions',function(){

      it('blocks takeoff when weather is stormy', function(){
        spyOn(Math,'random').and.returnValue(0);
        airport.land(plane)
        spyOn(airport.weather,'isStormy').and.returnValue(true);
        expect(function(){ airport.takeOff();}).toThrowError('cannot takeoff during storm');
        expect(airport.planes()).toContain(plane);
      });

    it('blocks landing when weather is stormy', function(){
      spyOn(Math,'random').and.returnValue(1);
      expect(function(){ airport.land(plane); }).toThrowError('cannot land during storm');
      expect(airport.planes()).toEqual([]);
    });
  });
})
