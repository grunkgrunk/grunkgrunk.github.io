const PathFinder = function() {
  this.illegalPositions =[]
}

PathFinder.prototype.isReachable = function (start, end ,notallowedObjs) {
  let dirs = {
    up: new Vector(0, -1),
    down: new Vector(0, 1),
    left: new Vector(-1, 0),
    right: new Vector(1, 0)
  }

  let illegalPositions = []
  let recentPositions = [start.copy()]

  notallowedObjs.forEach(p => illegalPositions.push(p.pos))
  while (recentPositions.length > 0 && recentPositions.length < 1000) {
    let currPos = recentPositions.pop()
    if(currPos.equals(end)){
      return true
    }
    illegalPositions.push(currPos)
    this.illegalPositions = illegalPositions
    for(let k in dirs){
      if(this.isValid(currPos.add(dirs[k]),illegalPositions)){
        recentPositions.push(currPos.add(dirs[k]))
      }
    }
  }
  return false
}

PathFinder.prototype.isValid = function(pos,illegalPositions){
  return !illegalPositions.some(p => p.equals(pos))
}

PathFinder.prototype.render = function(ctx, scale) {
  this.illegalPositions.forEach(p => {
    ctx.fillStyle = "red"
    ctx.fillRect(p.x * scale, p.y * scale, scale, scale)
  })
}
