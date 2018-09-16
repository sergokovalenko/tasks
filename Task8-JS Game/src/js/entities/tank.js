import Entity from './entity';
import { playerSettings as config } from './../config';

function Tank(x, y, width, height, sprite, speed = 2, keys, dir = 'top', canShoot = true) {
  Entity.call(this, x, y, width, height);
  this.keys = keys;
  this.velocity = speed;
  this.spriteInfo = sprite;
  this.direction = dir;
  this.live = config.startLives;
  this.canShoot = canShoot;
  this.level = 1;
  this.bulletTimer = 0;
  this.isMoving = true;
  this.isUpgraded = false;
}

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

Tank.prototype.levelUp = function levelUp() {
  if (this.level >= config.maxLevel) {
    return;
  }

  this.level += 1;
  this.isUpgraded = true;
  this.velocity += 0.5;
};

export default Tank;
