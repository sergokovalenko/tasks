import Entity from './entity';

function Wall(x, y, width, height, sprite, isDestr = true, hasColl = true, hasCollWithBul = true) {
  Entity.call(this, x, y, width, height);
  this.spriteInfo = sprite;
  this.isDestr = isDestr;
  this.hasColl = hasColl;
  this.hasCollWithBul = hasCollWithBul;
}

export default Wall;
