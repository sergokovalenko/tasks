import Bonus from './bonus';

function LifeBonus(x, y, width, height, sprite) {
  Bonus.call(this, x, y, width, height, sprite);
  this.spriteInfo = sprite;
}

LifeBonus.prototype.affect = function affect(obj) {
  const tank = obj;
  tank.live += 1;
};

export default LifeBonus;
