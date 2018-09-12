import { bulletsSettings as config } from './../config';
import Bullet from './../entities/bullet';

function WeaponFactory() {

}

WeaponFactory.prototype = {
  constructor: WeaponFactory,
  makeBullet(x = 0, y = 0, direction = 'top') {
    return new Bullet(
      x, y, config.bulletWidth,
      config.bulletHeight,
      null,
      config.bulletSpeed,
      direction,
    );
  },
};

export default WeaponFactory;
