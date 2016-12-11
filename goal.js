const Goal = function(world, player){
  this.startpos = new Vector(world.onX-1,world.onY-1)
  this.pos = this.startpos.copy()
  this.name = "goal"
  this.tag = "solid"
  this.world = world
  this.color = "white"
  this.pathfinder = new PathFinder()
  this.player = player
}

Goal.prototype.render = function (ctx) {
  ctx.fillStyle = this.color
  ctx.save()
  ctx.translate(this.pos.x*scale + scale / 2, this.pos.y*scale + scale / 2)
  ctx.fillRect(-scale / 1.5 / 2, -scale / 1.5 / 2, scale / 1.5, scale / 1.5)
  ctx.restore()
}


Goal.prototype.update = function () {
  if (this.world.collidesWith(this, "player")) {
    // Increment livedForRounds
    gameState.rounds++

    //move to position
    if (this.pos.equals(this.startpos)) {
      this.pos = new Vector()
    } else {
      this.pos = this.startpos.copy()
    }

    // positions where we can spawn walls
    let possiblePositions = []
    for (let i = 1; i < this.player.positions.length -1; i++) {
      let o = this.player.positions[i]
      if (possiblePositions.indexOf(o) == -1) {
        possiblePositions.push(o)
      }
    }


    this.player.positions = [this.player.pos]




    // make sure the wall is spawned legally
    let isLegal = false
    let obstacles = this.world.getNames("wall")



    let randomWall =
    this.placeObjInWorldRandom(
      obstacles,
      possiblePositions,
      Wall,
      this.pos,
      this.player.pos
    )

    if (randomWall) {
      this.world.add(randomWall)
    }

    // while (!isLegal && possiblePositions.length > 2) {
    //   let randI = Math.floor(Math.random()*(possiblePositions.length-2))+1
    //   let randPos = possiblePositions[randI]
    //   let wall = new Wall(randPos.x,randPos.y)
    //   obstacles.push(wall)
    //
    //   isLegal =
    //   this.pathfinder.isReachable(this.player.pos, this.pos, obstacles)
    //
    //   if (!isLegal) {
    //     let i = obstacles.indexOf(wall)
    //     obstacles.splice(i, 1)
    //     possiblePositions.splice(randI, 1)
    //   } else {
    //     this.world.add(wall)
    //   }
    // }

    //Spawn coin

    if(this.world.getNames("coin").length < 1 && gameState.rounds > 3 && player.health < 6 && Math.random() > 0.75){
      let freeSpaces = []
      let solids = world.getTags("solid").map(o => o.pos)
      for(let x = 0; x < this.world.onX -1; x++){
        for(let y = 0; y < this.world.onY -1 ; y++){
          let vec = new Vector(x,y)
          if(!solids.some(s => s.equals(vec))){
            freeSpaces.push(vec)
          }
        }
      }
      //console.log(freeSpaces);
      let isLegal = false
      while(freeSpaces.length > 2){
        let randI = Math.floor(Math.random()*freeSpaces.length)
        let coinpos = freeSpaces[randI]
        isLegal =
        this.pathfinder.isReachable(coinpos, this.player.pos, this.world.getNames("wall"))
        //console.log(isLegal,coinpos);
        if(isLegal){
          this.world.add(new Coin(coinpos.x,coinpos.y,this.world.scale))
          freeSpaces = []
        } else {
          freeSpaces.splice(randI,1)

        }
      }
    }
  }
}



Goal.prototype.placeObjInWorldRandom = function(obstacles, possiblePositions, Constructor, start, end) {

  while (possiblePositions.length > 2) {
    let randI = Math.floor(Math.random()*(possiblePositions.length))
    let randPos = possiblePositions[randI]
    let obj = new Constructor(randPos.x,randPos.y)
    obstacles.push(obj)

    let isLegal =
    this.pathfinder.isReachable(start, end, obstacles)
    if (!isLegal) {
      let i = obstacles.indexOf(obj)
      obstacles.splice(i, 1)
      possiblePositions.splice(randI, 1)
    } else {
      return obj
    }
  }
  return false
}
