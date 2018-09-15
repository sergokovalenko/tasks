import Bonus from './bonus';

function UpgradeBonus(x, y, width, height, sprite) {
  Bonus.call(this, x, y, width, height, sprite);
  this.spriteInfo = sprite;
}

UpgradeBonus.prototype.affect = function affect(obj) {
  if (obj.levelUp) {
    obj.levelUp();
  }
};

export default UpgradeBonus;
