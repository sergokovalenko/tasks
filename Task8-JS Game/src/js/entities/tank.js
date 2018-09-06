import Entity from './entity';

const input = window.input || {};

function Tank(x, y, width, height, sprite, speed = 1, keys, dir = 'top') {
  Entity.apply(this, [x, y, width, height]);
  this.keys = keys;
  this.velocity = speed;
  this.spriteInfo = sprite;
  this.direction = dir;
  this.live = 3;
}

Tank.prototype.shoot = () => {
  // realization
};

Tank.prototype.update = function update(dt) {
  if (input.isDown(this.keys.up) || input.isDown('w')) {
    this.position.y -= this.velocity * dt;
    this.direction = 'top';
    return;
  }

  if (input.isDown(this.keys.right) || input.isDown('d')) {
    this.position.x += this.velocity * dt;
    this.direction = 'right';
    return;
  }

  if (input.isDown(this.keys.down) || input.isDown('s')) {
    this.position.y += this.velocity * dt;
    this.direction = 'down';
    return;
  }

  if (input.isDown(this.keys.left) || input.isDown('a')) {
    this.position.x -= this.velocity * dt;
    this.direction = 'left';
    return;
  }

  if (input.isDown('SPACE')) {
    this.shoot();
  }
};

export default Tank;
