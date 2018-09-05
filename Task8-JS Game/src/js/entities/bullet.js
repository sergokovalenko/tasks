let position;
let size;
let velocity;
let spriteInfo;
let direction;

function Bullet(x, y, width, height, sprite, speed = 1, dir = 'top') {
  position.x = x;
  position.y = y;
  size.width = width;
  size.height = height;
  velocity = speed;
  spriteInfo = sprite;
  direction = dir;
}

Bullet.prototype.update = function update(dt) {
  if (direction === 'down') {
    position[1] += velocity * dt;
  }

  if (direction === 'up') {
    position[1] -= velocity * dt;
  }

  if (direction === 'left') {
    position[0] -= velocity * dt;
  }

  if (direction === 'right') {
    position[0] += velocity * dt;
  }
};
