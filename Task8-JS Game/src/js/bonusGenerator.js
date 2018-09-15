import BonusFactory from './factories/bonusFactory';

let factory;
let bonusSpawnTimer;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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
    const x = getRandomInt(0, 700);
    const y = getRandomInt(0, 700);
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
