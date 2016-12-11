const World = function(onX, onY) {
  this.objs = []
  this.objsToRemove = []
  this.onY = onY
  this.onX = onX
  this.scale = scale

  for (let i = -1; i < onY + 1; i++) {
    this.objs.push(new Wall(-1, i))
    this.objs.push(new Wall(onX, i))

    this.objs.push(new Wall(i, -1))
    this.objs.push(new Wall(i, onY))
  }

  this.objs.forEach(o => {
    if (o.name == "wall") {o.spawnedInRound = -4}
  })


}

World.prototype.update = function () {
  this.objsToRemove.forEach(o => this.objs.splice(this.objs.indexOf(o), 1))
  this.objsToRemove = []
  this.objs.forEach(o => o.update())
}

World.prototype.render = function (ctx) {
  this.objs.forEach(o => o.render(ctx))
}
World.prototype.add = function (obj) {
  this.objs.push(obj)
}

World.prototype.remove = function(obj) {
  this.objsToRemove.push(obj)
}



World.prototype.getNames = function(name) {
  return this.objs.filter(o => o.name === name)
}

World.prototype.getTags = function(tag) {
  return this.objs.filter(o => o.tag === tag)
}

World.prototype.collidesWith = function(obj, name) {
  return this.objs.filter(o => o.name === name)
  .some(o => o.pos.equals(obj.pos))
}
