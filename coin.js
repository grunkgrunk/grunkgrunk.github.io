const Coin = function(x, y){
  this.pos = new Vector(x, y)
  this.name = "coin"
  this.tag = "solid"
  this.color = "yellow"
  this.spawnedInRound = gameState.rounds
  this.scale = scale
  this.radius = this.scale/2
  this.angle = 0
}
Coin.prototype.update = function (ctx) {
  let livedForRounds = gameState.rounds - this.spawnedInRound
  if(livedForRounds > 2){
    world.remove(this);
  }


}

Coin.prototype.render = function (ctx) {
  this.angle += 0.01
  ctx.fillStyle = this.color
  ctx.save()
  ctx.translate(this.pos.x*this.scale + this.radius,
    this.pos.y*this.scale + this.radius)
  ctx.rotate(this.angle)
  ctx.scale(0.5 ,0.5)
  ctx.fillRect(-this.radius,-this.radius,this.scale,this.scale)
  ctx.lineWidth = 5
  ctx.strokeRect(-this.radius,-this.radius,this.scale,this.scale)
  ctx.restore()
}
