import Entity from './entity';
import Bullet from './bullet';
import { bulletsSettings } from './../config';

const input = window.input || {};

function Tank(x, y, width, height, sprite, speed = 1, keys, dir = 'top') {
  Entity.apply(this, [x, y, width, height]);
  this.keys = keys;
  this.acceleration = 0.02;
  this.velocity = speed * this.acceleration;
  this.spriteInfo = sprite;
  this.direction = dir;
  this.live = 3;
  this.bulletTimer = 0;
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

Tank.prototype.moveRight = function moveUp() {
  this.position.x += this.velocity;
  this.direction = 'right';
};

Tank.prototype.moveDown = function moveUp() {
  this.position.y += this.velocity;
  this.direction = 'down';
};

Tank.prototype.moveLeft = function moveUp() {
  this.position.x -= this.velocity;
  this.direction = 'left';
};

Tank.prototype.update = function update(step) {
  this.bulletTimer -= step;

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
  }
};

export default Tank;
