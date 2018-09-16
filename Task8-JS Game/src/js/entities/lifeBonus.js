import Bonus from './bonus';
import inherit from './../helpers/inheritance';

function LifeBonus(x, y, width, height, sprite) {
  Bonus.call(this, x, y, width, height, sprite);
  this.spriteInfo = sprite;
}
(inherit(LifeBonus, Bonus));

LifeBonus.constructor = LifeBonus;

LifeBonus.prototype.affect = function affect(obj) {
  const tank = obj;
  tank.live += 1;
};

export default LifeBonus;
