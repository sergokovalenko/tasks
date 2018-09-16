import Bonus from './bonus';
import inherit from './../helpers/inheritance';

function UpgradeBonus(x, y, width, height, sprite) {
  Bonus.call(this, x, y, width, height, sprite);
  this.spriteInfo = sprite;
}
(inherit(UpgradeBonus, Bonus));

UpgradeBonus.prototype.affect = function affect(obj) {
  if (obj.levelUp) {
    obj.levelUp();
  }
};

UpgradeBonus.constructor = UpgradeBonus;

export default UpgradeBonus;
