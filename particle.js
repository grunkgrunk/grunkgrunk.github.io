const Particle = function(pos){

  this.pos = pos
  this.vel = new Vector(Math.random()*2-1,Math.random()*2-1).setMag(Math.random() * 0.05 + 0.05)
  this.acc = new Vector()
  this.color = "black"
  this.name = "particle"
  this.landed = false;
  this.scale = new Vector(2, 2)

  this.lifeSpan = 60
  this.lifeCounter = this.lifeSpan
  this.alpha = 1
  this.spawnedInRound = gameState.rounds
}

Particle.prototype.update = function () {
  //console.log(this.landed);
  if(!this.landed){
    //let toTarget = world.getNames("goal")[0].pos.sub(this.pos).setMag(0.005)
    //this.vel = this.vel.add(toTarget)

    this.vel = this.vel.mult(0.95)
    this.pos = this.pos.add(this.vel)

    this.alpha = this.lifeCounter/this.lifeSpan
    this.scale.x = this.vel.mag() * 100 + 2
    if(this.lifeCounter>0){
      this.lifeCounter--
    }

  }
  else {
    let livedForRounds = gameState.rounds - this.spawnedInRound
    if (livedForRounds > 3) {
      this.alpha = 0
    } else {
      this.alpha = 1 / (livedForRounds * livedForRounds + 1)
      //this.scale.x = this.alpha
    }
  }


}

Particle.prototype.render = function (ctx) {
  ctx.fillStyle = this.color
  ctx.save()
  ctx.globalAlpha = this.alpha
  ctx.translate(this.pos.x * scale + this.scale.x / 2, this.pos.y * scale + this.scale.x / 2)
  ctx.rotate(Math.atan2(this.vel.y, this.vel.x))
  ctx.fillRect(-this.scale.x / 2, -this.scale.x / 2, this.scale.x, this.scale.y)
  ctx.globalAlpha = 1
  ctx.restore()
}
