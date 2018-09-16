import Sprite from './../entities/sprite';

function SpriteMaker(all) {
  this.all = all;
  const playerSprite = new Sprite(all, 0, 0, 16, 16, 2);
  const standartEnemy = new Sprite(all, 128, 64, 16, 16, 2);
  const wallSprite = new Sprite(all, 256, 208, 16, 16);
  const stillSprite = new Sprite(all, 256, 144, 16, 16);
  const starSprite = new Sprite(all, 256, 64, 16, 16, 2, 0.5);
  const lifeSprite = new Sprite(all, 256, 96, 16, 16, 2, 0.5);
  this.types = {
    player: () => playerSprite,
    enemy: () => standartEnemy,
    wall: () => wallSprite,
    stillWall: () => stillSprite,
    lifeBonus: () => lifeSprite,
    starBonus: () => starSprite,
  };
}

SpriteMaker.prototype.getSpriteFor = function getSpriteFor(type) {
  return this.types[type]();
};

export default SpriteMaker;
