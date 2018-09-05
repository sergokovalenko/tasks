import input from './../keyHandler';

let position;
let size;
let velocity;
let spriteInfo;
let direction;
let live;

function Tank(x, y, width, height, sprite, speed = 1, dir = 'top') {
  position.x = x;
  position.y = y;
  size.width = width;
  size.height = height;
  velocity = speed;
  spriteInfo = sprite;
  direction = dir;
  live = 3;
}

function shoot() {
  // realization
}

Tank.prototype.update = function update(dt) {
  if (input.isDown('DOWN') || input.isDown('s')) {
    position[1] += velocity * dt;
  }

  if (input.isDown('UP') || input.isDown('w')) {
    position[1] -= velocity * dt;
  }

  if (input.isDown('LEFT') || input.isDown('a')) {
    position[0] -= velocity * dt;
  }

  if (input.isDown('RIGHT') || input.isDown('d')) {
    position[0] += velocity * dt;
  }

  if (input.isDown('SPACE')) {
    shoot();
  }
};

Tank.prototype.update = shoot;