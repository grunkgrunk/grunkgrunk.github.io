const Input = function() {
  this.state = {
    up: {pressed: false, keyCode: 38},
    down: {pressed: false, keyCode: 40},
    left: {pressed: false,  keyCode: 37},
    right: {pressed: false, keyCode: 39},
    space: {pressed: false, keyCode: 32}
  }

  this.prevState = {
    up: {pressed: false, keyCode: 38},
    down: {pressed: false, keyCode: 40},
    left: {pressed: false,  keyCode: 37},
    right: {pressed: false, keyCode: 39},
    space: {pressed: false, keyCode: 32}
  }

  //console.log(this.state);



  window.addEventListener("keydown", this.checkKeyPressed.bind(this), false)
  window.addEventListener("keyup", this.checkKeyReleased.bind(this), false)
}

Input.prototype.checkKeyPressed = function(e) {

  for (let k in this.state) {
    if (e.keyCode == this.state[k].keyCode) {
      this.state[k].pressed = true
    }
  }
}

Input.prototype.checkKeyReleased = function(e) {
  for (let k in this.state) {
    if (e.keyCode == this.state[k].keyCode) {
      this.state[k].pressed = false
    }
  }
}

Input.prototype.getKey = function(key) {
  return this.state[key].pressed
}

Input.prototype.getClicked = function(key) {
  return this.state[key].pressed && this.state[key].pressed
    != this.prevState[key].pressed
}

Input.prototype.updatePrev = function() {
  for (let k in this.state) {
    this.prevState[k].pressed = this.state[k].pressed
  }
}
