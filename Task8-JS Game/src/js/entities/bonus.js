import Entity from './entity';

function Bullet(x, y, width, height, sprite, bonusType = 'live') {
  Entity.apply(this, [x, y, width, height]);
  this.spriteInfo = sprite;
  this.type = bonusType;
}

Bullet.prototype.affect = function () {
};
