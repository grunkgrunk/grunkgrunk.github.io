const Player = function(x, y, world, input) {
  this.pos = new Vector(x, y)
  this.positions = [this.pos]
  this.color = "green"
  this.tag = "solid"
  //this.input = new Input()
  this.world = world
  this.name = "player"
  this.input = input

  this.health = 3
}

Player.prototype.render = function(ctx) {
  ctx.fillStyle = this.color
  ctx.save()
  ctx.translate(this.pos.x*scale + scale / 2, this.pos.y*scale + scale / 2)
  ctx.fillRect(-scale / 1.5 / 2, -scale / 1.5 / 2, scale / 1.5, scale / 1.5)
  ctx.restore()
  // ctx.beginPath()
  // ctx.moveTo(this.positions[0].x * scale + scale / 2, this.positions[0].y * scale + scale/2)
  // this.positions.forEach(p => ctx.lineTo(p.x*scale + scale/2,p.y*scale + scale/2))
  // ctx.strokeStyle = "black"
  // ctx.stroke();
}

Player.prototype.update = function() {
  let dir = new Vector(0,0)
  if (this.input.getClicked("up")) {
    dir.y -= 1
} else if (this.input.getClicked("down")) {
    dir.y += 1
  } else if (this.input.getClicked("left")) {
    dir.x -= 1
  } else if (this.input.getClicked("right")) {
    dir.x += 1
  }
  if (this.input.getClicked("space")) {
    for (let i = 0; i < 200; i++) {
      this.world.add(new Particle(this.pos.add(new Vector(0.5, 0.5))))
    }
  }

  let newPos = this.pos.add(dir)
  if (!dir.equals(new Vector()) && !this.world.collidesWith({pos: newPos}, "wall")){
    this.pos = newPos
    this.positions.push(this.pos)
  }

  if (this.world.collidesWith({pos: newPos}, "wall") && this.isInside(newPos)) {
    if (this.health > 0) {
      this.health--
      for (let i = 0; i < 200; i++) {
        this.world.add(new Particle(this.pos.add(new Vector(0.5, 0.5))))
      }
      let lostPos
      if (gameState.rounds % 2 === 0) {
        lostPos = new Vector(0,0)
      } else {
        lostPos = new Vector(this.world.onX - 1, this.world.onY - 1)
      }
      player.pos = lostPos
      player.positions = [this.pos]
    } else {

    }
  }

  if (this.world.collidesWith({pos: newPos}, "coin")){
    this.world.remove(this.world.getNames("coin")[0])
    this.health++
  }
}
Player.prototype.isInside = function (pos) {
  return pos.x >= 0 && pos.x < this.world.onX &&
         pos.y >= 0 && pos.y < this.world.onY

};
