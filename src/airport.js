function Airport() {
  this.hangar = [];
  this.CAPACITY = 20;
  this.weather = typeof weather !== 'undefined' ? weather : new Weather();
}

Airport.prototype.planes = function () {
  return this.hangar;
};

Airport.prototype.land = function(plane) {
  if(this.weather.isStormy()) {
    throw new Error('cannot land during storm');
  }
  else if (this.hangar.length === this.CAPACITY) {
    throw new Error('Airport is full, cannot land plane')
  } else {
    this.hangar.push(plane)
    return "Plane landed"
  }
};

Airport.prototype.takeOff = function(plane) {
  if(this.weather.isStormy()) {
    throw new Error('cannot takeoff during storm');
  } else if (this.hangar.includes(plane)) {
    var index = this.hangar.indexOf(plane)
    this.hangar.splice(index)
    return "Plane took off"
  } else {
    throw new Error('Plane is not at this airport')
  }
};
