function Vector(x, y) {
  this.x = x || 0
  this.y = y || 0
}


Vector.prototype.add = function(v) {
  return new Vector(this.x + v.x, this.y + v.y)
}

Vector.prototype.sub = function(v) {
  return new Vector(this.x - v.x, this.y - v.y)
}

Vector.prototype.mult = function(k) {
  return new Vector(this.x * k, this.y * k)
}

Vector.prototype.copy = function() {
  return new Vector(this.x, this.y)
}

Vector.prototype.mag = function() {
  return Math.pow(this.x * this.x + this.y * this.y, 0.5)
}

Vector.prototype.dist = function(target) {
  return target.sub(this).mag()
}

Vector.prototype.set = function(v) {
  return new Vector(v.x, v.y)
}

Vector.prototype.setMag = function(mag) {
  return this.normalize().mult(mag)
}

Vector.prototype.normalize = function() {
  return this.mult(1/this.mag())
}

Vector.prototype.limit = function(maxMag) {
  if(this.mag() > maxMag) {
    return this.setMag(maxMag)
  }
  return this
}

Vector.prototype.dot = function(v) {
  return this.x * v.x + this.y * v.y
}

Vector.prototype.projected = function(v) {
  return this.mult(this.dot(v) / Math.pow(this.mag(), 2))
}

Vector.prototype.toAngle = function(a) {
  return new Vector(Math.cos(a), Math.sin(a)).mult(this.mag())
}

Vector.prototype.hat = function() {
  return new Vector(-this.y, this.x)
}

Vector.prototype.equals = function(v) {
    return this.x === v.x && this.y === v.y
}
