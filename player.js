const Player = function(x, y, world, input) {
  this.pos = new Vector(x, y)
  this.shownPos = new Vector(x, y)

  this.positions = [this.pos]
  this.posIndex = 0
  this.color = Art.colors.player
  this.tag = "solid"
  //this.input = new Input()
  this.world = world
  this.name = "player"
  this.input = input
  this.isReturning = false
  this.timeoutID = undefined
  this.alpha = 1
  this.shownAlpha = 0

  this.health = 3
}

Player.prototype.render = function(ctx) {
  // this.shownPos.x = lerp(this.shownPos.x, this.pos.x, 0.5)
  // this.shownPos.y = lerp(this.shownPos.y, this.pos.y, 0.5)
  ctx.fillStyle = this.color
  if (!this.isReturning) {
    this.shownPos = this.shownPos.lerp(this.pos, 0.3)

  } else if (this.posIndex != 0){
    this.shownPos = this.shownPos.lerp(this.positions[this.posIndex], 0.4)
    if (this.shownPos.dist(this.positions[this.posIndex]) < 0.2) {
      this.posIndex--
    }
  } else {
    this.positions = [this.pos]
    this.isReturning = false
  }
  this.shownAlpha = lerp(this.shownAlpha, this.alpha, 0.3)
  ctx.globalAlpha = this.shownAlpha
  ctx.save()
  ctx.translate(this.shownPos.x*scale + scale / 2, this.shownPos.y*scale + scale / 2)
  ctx.fillRect(-scale / 1.5 / 2, -scale / 1.5 / 2, scale / 1.5, scale / 1.5)
  ctx.restore()
  ctx.globalAlpha = 1
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

  let newPos = this.pos
  if (!this.isReturning) {
    newPos = this.pos.add(dir)
  }
  if (!dir.equals(new Vector()) && !this.world.collidesWith({pos: newPos}, "wall")){
    this.pos = newPos
    this.positions.push(this.pos)

  }
  if(!this.isInside(newPos)){
    upCounter++
  }
  if(upCounter > 20){
    window.location.href = 'http://schrunkin.github.io';
  }
  if (this.world.collidesWith({pos: newPos}, "wall") && this.isInside(newPos)) {
    if (this.health > 0) {
      this.isReturning = true
      this.posIndex = this.positions.length - 1
      this.health--
      for (let x = 0; x < 1; x += 0.05) {
        for (let y = 0; y < 1; y += 0.05) {
          this.world.add(new Particle(this.pos.add(new Vector(x, y))))
        }
      }
      let lostPos
      if (gameState.rounds % 2 === 0) {
        lostPos = new Vector(0,0)
      } else {
        lostPos = new Vector(this.world.onX - 1, this.world.onY - 1)
      }

      this.pos = lostPos

    } else {
      this.alpha = 0
      for (let x = 0; x < 1; x += 0.05) {
        for (let y = 0; y < 1; y += 0.05) {
          this.world.add(new Particle(this.pos.add(new Vector(x, y))))
        }
      }

      this.world.remove(this)
      this.timeoutID = setInterval(()=> {
        shouldDrawIntroScreen = true

      },500)


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

}
