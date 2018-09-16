import { bulletsSettings as config } from './../config';
import Bullet from './../entities/bullet';

let bulletSprite;

function WeaponFactory(spriteForBullet = null) {
  bulletSprite = spriteForBullet;
}

WeaponFactory.prototype = {
  constructor: WeaponFactory,
  makeBullet(x = 0, y = 0, direction = 'top') {
    return new Bullet(
      x, y, config.bulletWidth,
      config.bulletHeight,
      bulletSprite,
      config.bulletSpeed,
      direction,
    );
  },
};

export default WeaponFactory;
