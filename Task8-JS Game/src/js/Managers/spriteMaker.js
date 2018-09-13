import Sprite from './../entities/sprite';

function SpriteMaker(all, textures) {
  this.all = all;
  this.textures = textures;
  const playerSprite = new Sprite(all, 0, 0, 16, 16);
  const standartEnemy = new Sprite(all, 128, 64, 16, 16);
  this.types = {
    player: () => playerSprite,
    enemy: () => standartEnemy,
  };
}

SpriteMaker.prototype.getSpriteFor = function getSpriteFor(type) {
  return this.types[type]();
};

export default SpriteMaker;
