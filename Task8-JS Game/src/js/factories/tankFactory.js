import { playerSettings as config } from './../config';
import Tank from './../entities/tank';
import Enemy from './../entities/enemyTank';

function TankFactory(playerUrl, enemyUrl) {
  this.playerUrl = playerUrl;
  this.enemyUrl = enemyUrl;
}

TankFactory.prototype = {
  constructor: TankFactory,
  makePlayer: function makePlayer(keys = config.playerKeys) {
    return new Tank(
      400,
      750,
      config.blockWidth,
      config.blockWidth,
      null,
      config.playerSpeed,
      keys,
    );
  },
  makeStandartEnemy: function makeStandartEnemy() {
    return new Enemy(
      0,
      0,
      config.blockWidth,
      config.blockWidth,
      null,
      config.playerSpeed,
      null,
      'down',
    );
  },
};

export default TankFactory;
