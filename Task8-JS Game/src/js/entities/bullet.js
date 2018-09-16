import Entity from './entity';
import inherit from './../helpers/inheritance';

function Bullet(x, y, width, height, sprite, speed = 1100, dir = 'up') {
  Entity.call(this, x, y, width, height);
  this.velocity = speed;
  this.spriteInfo = sprite;
  this.direction = dir;
}
(inherit(Bullet, Entity));

Bullet.constructor = Bullet;

Bullet.prototype.update = function update(dt = 0.02) {
  if (this.direction === 'down') {
    this.position.y += this.velocity * dt;
  }

  if (this.direction === 'up') {
    this.position.y -= this.velocity * dt;
  }

  if (this.direction === 'left') {
    this.position.x -= this.velocity * dt;
  }

  if (this.direction === 'right') {
    this.position.x += this.velocity * dt;
  }
};

export default Bullet;
