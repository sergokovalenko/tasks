import { playerSettings as config } from './../config';
import Bonus from './../entities/bonus';

function WeaponFactory() {

}

WeaponFactory.prototype = {
  constructor: WeaponFactory,
  makeLife(x = 0, y = 0) {
    return new Bonus(
      x, y, config.bulletWidth,
      config.bulletHeight,
      null,
    );
  },
};

export default WeaponFactory;
