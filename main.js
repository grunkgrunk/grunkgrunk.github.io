const input = new Input()
let world
let player
let scale
let shouldDrawIntroScreen = true
let alphaTarget = 1;
let currentAlpha = 1;
let upCounter = 0

let gameState = {
  rounds: 0,
  score: 0
}

function lerp(A, B, t) {
  return A + t * (B - A)
}

function moveTitle(translation) {
  document.getElementById("score").style.color = Art.colors.text
  document.body.style.backgroundColor = Art.colors.background
  document.getElementById("credits").style.color = Art.colors.text
  document.getElementById("description").style.color = Art.colors.text
  document.getElementById("title").style.color = Art.colors.text

  document.getElementById("title").style.transform = "translateY(" + (Math.floor(translation)) + "px)"
  document.getElementById("score").style.transform = "translateY(" + (Math.floor(translation)) + "px)"
  document.getElementById("info").style.transform = "translateY(" + (Math.floor(-translation)) + "px)"
}

function setup(){
  upCounter = 0
  world = new World(8, 8)
  player = new Player(0, 0, world, input)
  world.add(player)
  world.add(new Goal(world, player))
  gameState = {
    rounds: 0,
    score: 0
  }


}

window.onload = function() {
  Art.music.maintheme.addEventListener('ended', function() {
    this.currentTime = 1
    this.play();
  }, false);
  Art.music.maintheme.currentTime = 1
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



// Disable keys
var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

  disableScroll()


  let guiCoins = []
  for (let i = 0; i < 7; i++) {
    let coin = new Coin(0,0, true)
    guiCoins.push(coin)
  }

  mousePosition = new Vector(0,0)
  document.addEventListener("mousemove", mouseMoveHandler, false)

  setup()

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
    ctx.fillStyle = Art.colors.background
    ctx.fillRect(0,0,width, guiHeight)
    ctx.translate(-scale / 4, 0)
    ctx.scale(0.5, 0.5)
    for (let i = 0; i < player.health; i++) {
      guiCoins[i].scaleOut()
      ctx.translate(guiCoins[i].scale * 2, 0)
      guiCoins[i].render(ctx)

    }
    ctx.restore()

    ctx.save()
    ctx.translate(0, guiHeight)
    ctx.fillStyle = Art.colors.canvas
    ctx.fillRect(0,0,width, height)


    world.render(ctx)
    ctx.restore()

    if (shouldDrawIntroScreen) {
      if(player.timeoutID){
        clearInterval(player.timeoutID)
      }
      document.getElementById("canvas").style.opacity = 0
      moveTitle(height/2)

      if (input.getClicked("space") || input.getClicked("left") || input.getClicked("right") || input.getClicked("up") || input.getClicked("down")) {
        setup()
        shouldDrawIntroScreen = false
      }
    } else {
      document.getElementById("canvas").style.opacity = 1
      // document.getElementById("score").style.color = "white"
      moveTitle(0)
    }
    //currentAlpha = lerp(currentAlpha,alphaTarget,0.05)
    //ctx.globalAlpha = currentAlpha
    //ctx.fillStyle = Art.colors.background
    //ctx.fillRect(0,0,width,height+guiHeight)
    //ctx.globalAlpha = 0

    if (gameState.rounds > 0) {

    }
    //particles.forEach(p => p.render(ctx))
    //goal.pathfinder.render(ctx, world.scale)

    input.updatePrev()


    //Draw score
    let elem = document.getElementById("score")
    elem.innerHTML = gameState.rounds


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

function drawDeathScreen(){
  ctx.fillStyle = Art.colors.background
  ctx.fillRect(0,0,width,height+guiHeight)

  if (input.getClicked("space")) {
    setup()
    shouldDrawDeathScreen = false
  }
}
