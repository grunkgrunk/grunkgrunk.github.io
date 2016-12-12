const Coin = function(x, y, willScaleOut){
  this.pos = new Vector(x, y)
  this.name = "coin"
  this.tag = "solid"
  this.color = Art.colors.coin  
  this.spawnedInRound = gameState.rounds
  this.scale = scale
  this.willScaleOut = willScaleOut || false
  if (this.willScaleOut) {
    this.scale = 0
  }

  this.angle = 0

}

Coin.prototype.scaleOut = function() {

  this.scale = lerp(this.scale, scale, 0.1)
}

Coin.prototype.update = function (ctx) {
  this.angle += 0.01
  let livedForRounds = gameState.rounds - this.spawnedInRound
  if(livedForRounds > 2){
    world.remove(this);
  }

}

Coin.prototype.render = function (ctx) {
  // if (this.willScaleOut) {
  //   this.scaleOut()
  // }

  ctx.fillStyle = this.color
  ctx.save()
  ctx.translate(this.pos.x*this.scale + this.scale / 2,
  this.pos.y*this.scale + this.scale / 2)
  ctx.rotate(this.angle)
  ctx.scale(0.5,0.5)
  ctx.fillRect(-this.scale / 2,-this.scale / 2,this.scale,this.scale)
  // ctx.lineWidth = 5
  // ctx.strokeRect(-this.scale / 2,-this.scale / 2,this.scale,this.scale)
  ctx.restore()
}
