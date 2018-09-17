import Entity from './entity';
import inherit from './../helpers/inheritance';

function Wall(x, y, width, height, sprite, isDestr = true, hasColl = true, hasCollWithBul = true) {
  Entity.call(this, x, y, width, height);
  this.spriteInfo = sprite;
  this.isDestr = isDestr;
  this.hasColl = hasColl;
  this.hasCollWithBul = hasCollWithBul;
}
(inherit(Wall, Entity));

Wall.constructor = Wall;

export default Wall;
