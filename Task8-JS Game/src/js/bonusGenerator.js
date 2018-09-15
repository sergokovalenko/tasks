import BonusFactory from './factories/bonusFactory';

let factory;
let bonusSpawnTimer;

function BonusGenerator(bonusTimer = 30, lifeSprite, starSprite) {
  factory = new BonusFactory(lifeSprite, starSprite);
  bonusSpawnTimer = bonusTimer;
  this.timer = bonusTimer;
}

export default BonusGenerator;
