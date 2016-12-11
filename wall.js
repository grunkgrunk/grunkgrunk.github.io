const Wall = function(x, y) {
  this.pos = new Vector(x, y)
  this.color = "black"
  this.name = "wall"
  this.tag = "solid"
  this.alpha = 1
  this.scale = scale
  this.spawnedInRound = gameState.rounds
}


Wall.prototype.render = function(ctx) {
  ctx.globalAlpha = this.alpha
  ctx.fillStyle = this.color
  ctx.fillRect(this.pos.x*scale, this.pos.y*scale, scale,scale)
  ctx.globalAlpha = 1
}

Wall.prototype.update = function () {
  let livedForRounds = gameState.rounds - this.spawnedInRound
  if (livedForRounds > 3) {
    this.alpha = 0
  } else {
    this.alpha = 1 / (livedForRounds * livedForRounds + 1)
  }
}
