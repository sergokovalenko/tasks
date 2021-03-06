import { playerSettings as config } from './../config';
import LifeBonus from './../entities/lifeBonus';
import UpgradeBonus from './../entities/upgradeBonus';

let lifeBonusSprite;
let upgradeBonusSprite;

function WeaponFactory(lifeSprite, starSprite) {
  lifeBonusSprite = lifeSprite;
  upgradeBonusSprite = starSprite;
}

WeaponFactory.prototype = {
  constructor: WeaponFactory,
  makeLife(x = 0, y = 0) {
    return new LifeBonus(
      x,
      y,
      config.blockWidth,
      config.blockHeight,
      lifeBonusSprite,
    );
  },
  makeStar(x = 0, y = 0) {
    return new UpgradeBonus(
      x,
      y,
      config.blockWidth,
      config.blockHeight,
      upgradeBonusSprite,
    );
  },
};

export default WeaponFactory;
