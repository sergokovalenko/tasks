import Sprite from './../entities/sprite';

function SpriteMaker(all, textures) {
  this.all = all;
  this.textures = textures;
  const playerSprite = new Sprite(all, 0, 0, 16, 16);
  const standartEnemy = new Sprite(all, 128, 64, 16, 16);
  const wallSprite = new Sprite(all, 256, 128, 16, 16);
  const stillSprite = new Sprite(textures, 0, 0, 16, 16);
  this.types = {
    player: () => playerSprite,
    enemy: () => standartEnemy,
    wall: () => wallSprite,
    stillWall: () => stillSprite,
  };
}

SpriteMaker.prototype.getSpriteFor = function getSpriteFor(type) {
  return this.types[type]();
};

export default SpriteMaker;
