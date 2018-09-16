import BonusFactory from './factories/bonusFactory';
import getRandomInt from './helpers/randomizer';
import { gameSettings as config } from './config';

let factory;
let bonusSpawnTimer;

function BonusGenerator(bonusTimer = 30, lifeSprite, starSprite) {
  factory = new BonusFactory(lifeSprite, starSprite);
  bonusSpawnTimer = bonusTimer;
  this.timer = bonusTimer;
  this.getTimer = () => bonusSpawnTimer;
}

BonusGenerator.prototype.generateBonus = function generateBonus(step) {
  this.timer -= step;

  if (this.timer <= 0) {
    this.timer = this.getTimer();
    let bonus;
    const x = getRandomInt(0, config.gameWidth - config.wallWidth);
    const y = getRandomInt(0, config.gameHeight - config.wallHeight);
    const bonusRandom = getRandomInt(0, 2);
    switch (bonusRandom) {
      case 0:
        bonus = factory.makeLife(x, y);
        break;
      case 1:
        bonus = factory.makeStar(x, y);
        break;

      default:
        bonus = factory.makeLife(x, y);
        break;
    }

    return bonus;
  }

  return null;
};

export default BonusGenerator;
