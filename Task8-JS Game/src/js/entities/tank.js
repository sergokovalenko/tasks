import Entity from './entity';

const input = window.input || {};

function Tank(x, y, width, height, sprite, speed = 1, keys, dir = 'top') {
  Entity.apply(this, [x, y, width, height]);
  this.keys = keys;
  this.acceleration = 0.02;
  this.velocity = speed * this.acceleration;
  this.spriteInfo = sprite;
  this.direction = dir;
  this.live = 3;
}

Tank.prototype.shoot = () => {
  // realization
};

Tank.prototype.update = function update() {
  if (input.isDown(this.keys.up) || input.isDown('w')) {
    this.position.y -= this.velocity;
    this.direction = 'top';
    return;
  }

  if (input.isDown(this.keys.right) || input.isDown('d')) {
    this.position.x += this.velocity;
    this.direction = 'right';
    return;
  }

  if (input.isDown(this.keys.down) || input.isDown('s')) {
    this.position.y += this.velocity;
    this.direction = 'down';
    return;
  }

  if (input.isDown(this.keys.left) || input.isDown('a')) {
    this.position.x -= this.velocity;
    this.direction = 'left';
    return;
  }

  if (input.isDown('SPACE')) {
    this.shoot();
  }
};

export default Tank;
