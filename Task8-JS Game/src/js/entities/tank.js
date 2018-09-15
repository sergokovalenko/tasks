import Entity from './entity';
import Bullet from './bullet';
import { bulletsSettings } from './../config';

function Tank(x, y, width, height, sprite, speed = 1, keys, dir = 'top', canShoot = true) {
  Entity.call(this, x, y, width, height);
  this.keys = keys;
  this.acceleration = 0.02;
  this.velocity = speed * this.acceleration;
  this.spriteInfo = sprite;
  this.direction = dir;
  this.live = 1;
  this.bulletTimer = 0;
  this.canShoot = canShoot;
  this.isMoving = true;
}

Tank.prototype.shoot = function shoot(step) {
  if (this.bulletTimer <= step) {
    this.bulletTimer = 0.5;

    switch (this.direction) {
      case 'top':
        return new Bullet(
          (this.position.x + (this.size.width / 2)) - 2,
          this.position.y - 6,
          bulletsSettings.bulletWidth,
          bulletsSettings.bulletHeight,
          null,
          bulletsSettings.bulletSpeed,
          'up',
        );

      case 'left':
        return new Bullet(
          this.position.x - 6,
          (this.position.y + (this.size.height / 2)) - 2,
          bulletsSettings.bulletWidth,
          bulletsSettings.bulletHeight,
          null,
          bulletsSettings.bulletSpeed,
          'left',
        );

      case 'down':
        return new Bullet(
          (this.position.x + (this.size.width / 2)) - 2,
          (this.position.y + this.size.height) + 2,
          bulletsSettings.bulletWidth,
          bulletsSettings.bulletHeight,
          null,
          bulletsSettings.bulletSpeed,
          'down',
        );

      case 'right':
        return new Bullet(
          (this.position.x + this.size.width) + 2,
          (this.position.y + (this.size.height / 2)) - 2,
          bulletsSettings.bulletWidth,
          bulletsSettings.bulletHeight,
          null,
          bulletsSettings.bulletSpeed,
          'right',
        );

      default:
        return null;
    }
  }
  return null;
};

Tank.prototype.moveUp = function moveUp() {
  this.position.y -= this.velocity;
  this.direction = 'top';
};

Tank.prototype.moveRight = function moveRight() {
  this.position.x += this.velocity;
  this.direction = 'right';
};

Tank.prototype.moveDown = function moveDown() {
  this.position.y += this.velocity;
  this.direction = 'down';
};

Tank.prototype.moveLeft = function moveLeft() {
  this.position.x -= this.velocity;
  this.direction = 'left';
};

export default Tank;
