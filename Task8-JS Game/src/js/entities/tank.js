import Entity from './entity';

function Tank(x, y, width, height, sprite, speed = 1, keys, dir = 'top', canShoot = true) {
  Entity.call(this, x, y, width, height);
  this.keys = keys;
  this.acceleration = 0.02;
  this.velocity = speed * this.acceleration;
  this.spriteInfo = sprite;
  this.direction = dir;
  this.bulletTimer = 0;
  this.live = 1;
  this.level = 1;
  this.canShoot = canShoot;
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
  if (this.level >= 4) {
    return;
  }

  this.level += 1;
  this.isUpgraded = true;
};

export default Tank;
