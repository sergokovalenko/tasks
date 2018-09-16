import { playerSettings as config } from './../config';
import Tank from './../entities/tank';
import Enemy from './../entities/enemyTank';

let playerSprite;
let enemySprite;

function TankFactory(spriteForPlayer, spriteForEnemy) {
  playerSprite = spriteForPlayer;
  enemySprite = spriteForEnemy;
}

TankFactory.prototype = {
  constructor: TankFactory,
  makePlayer: function makePlayer(keys = config.playerKeys) {
    return new Tank(
      config.respawn.x,
      config.respawn.y,
      config.blockWidth,
      config.blockWidth,
      playerSprite,
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
      enemySprite,
      config.playerSpeed,
      null,
      'down',
    );
  },
};

export default TankFactory;
