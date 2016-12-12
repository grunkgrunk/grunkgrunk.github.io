const Wall = function(x, y) {
  this.pos = new Vector(x, y)
  this.color = Art.colors.wall
  this.name = "wall"
  this.tag = "solid"
  this.alpha = 1
  this.shownAlpha = 0
  this.scale = scale
  this.spawnedInRound = gameState.rounds
}


Wall.prototype.render = function(ctx) {
  this.shownAlpha = lerp(this.shownAlpha, this.alpha, 0.1)
  ctx.globalAlpha = this.shownAlpha
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
