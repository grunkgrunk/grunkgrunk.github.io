const input = new Input()
let world
let player
let scale

let gameState = {
  rounds: 0,
  score: 0
}
window.onload = function() {
  Art.music.maintheme.play()
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  const width = window.innerHeight*0.6
  const height = window.innerHeight*0.6

  let min = Math.min(width, height)
  scale = min / 8
  const guiHeight = scale/2
  canvas.width = width
  canvas.height = height + guiHeight

  const guiCoin = new Coin(0,0)
  world = new World(8, 8)

  mousePosition = new Vector(0,0)
  document.addEventListener("mousemove", mouseMoveHandler, false)



  player = new Player(0, 0, world, input)
  world.add(player)
  world.add(new Goal(world, player))


  update()

  function update() {

    world.update()
    let walls = world.getNames("wall")
    let particles = world.getNames("particle")

    for (let p = 0; p < particles.length; p++) {
      let particle = particles[p]

      if(!particle.landed){
        for (let w = 0; w < walls.length; w++) {
          let wall = walls[w]
          if(isColliding(wall, particle)) {
            particle.landed = true
          }
        }
      }

      if (particle.alpha == 0) {

        world.remove(particle)
      }
    }

    ctx.save()
    ctx.fillStyle = "rgb(95,95,95)"
    ctx.fillRect(0,0,width, guiHeight)
    ctx.translate(-scale / 4, 0)
    ctx.scale(0.5, 0.5)
    for (let i = 0; i < player.health; i++) {
      ctx.translate(scale * 2, 0)
      guiCoin.render(ctx)
    }
    console.log(guiCoin);

    ctx.restore()
    ctx.save()
    ctx.translate(0, guiHeight)
    ctx.fillStyle = "rgb(100,100,100)"
    ctx.fillRect(0,0,width, height)

    world.render(ctx)
    ctx.restore()
    //particles.forEach(p => p.render(ctx))
    //goal.pathfinder.render(ctx, world.scale)

    input.updatePrev()


    //Draw score
    let elem = document.getElementById("score")
    elem.innerHTML = "Score: " + (gameState.rounds)


    requestAnimationFrame(update)
  }
}

function mouseMoveHandler(e) {
  let rect = canvas.getBoundingClientRect()
  mousePosition.x = e.clientX - rect.left
  mousePosition.y = e.clientY - rect.top
}
function isColliding(rect1,rect2) {

  return rect1.pos.x * scale < rect2.pos.x* scale + rect2.scale.x &&
     rect1.pos.x* scale + rect1.scale > rect2.pos.x * scale &&
     rect1.pos.y * scale< rect2.pos.y * scale+ rect2.scale.y &&
     rect1.scale + rect1.pos.y * scale> rect2.pos.y* scale
}
