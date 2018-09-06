import Entity from './entity';

function Bullet(x, y, width, height, sprite, speed = 1100, dir = 'top') {
  Entity.apply(this, [x, y, width, height]);
  this.velocity = speed;
  this.spriteInfo = sprite;
  this.direction = dir;
}

Bullet.prototype.update = function update(dt) {
  if (this.direction === 'down') {
    this.position[1] += this.velocity * dt;
  }

  if (this.direction === 'up') {
    this.position[1] -= this.velocity * dt;
  }

  if (this.direction === 'left') {
    this.position[0] -= this.velocity * dt;
  }

  if (this.direction === 'right') {
    this.position[0] += this.velocity * dt;
  }
};
