import Sprite from './../entities/sprite';
import {
  playerSpriteParams,
  enemySpriteParams,
  wallSpriteParams,
  stillSpriteParams,
  starBonusSpriteParams,
  lifeBonusSpriteParams,
} from './../config';

function SpriteMaker(all) {
  this.all = all;
  const playerSprite = new Sprite(
    all,
    playerSpriteParams.x,
    playerSpriteParams.y,
    playerSpriteParams.width,
    playerSpriteParams.height,
    playerSpriteParams.frameCount,
    playerSpriteParams.animationTimer,
  );
  const standartEnemy = new Sprite(
    all,
    enemySpriteParams.x,
    enemySpriteParams.y,
    enemySpriteParams.width,
    enemySpriteParams.height,
    enemySpriteParams.frameCount,
    enemySpriteParams.animationTimer,
  );
  const wallSprite = new Sprite(
    all,
    wallSpriteParams.x,
    wallSpriteParams.y,
    wallSpriteParams.width,
    wallSpriteParams.height,
    wallSpriteParams.frameCount,
    wallSpriteParams.animationTimer,
  );
  const stillSprite = new Sprite(
    all,
    stillSpriteParams.x,
    stillSpriteParams.y,
    stillSpriteParams.width,
    stillSpriteParams.height,
    stillSpriteParams.frameCount,
    stillSpriteParams.animationTimer,
  );
  const starSprite = new Sprite(
    all,
    starBonusSpriteParams.x,
    starBonusSpriteParams.y,
    starBonusSpriteParams.width,
    starBonusSpriteParams.height,
    starBonusSpriteParams.frameCount,
    starBonusSpriteParams.animationTimer,
  );
  const lifeSprite = new Sprite(
    all,
    lifeBonusSpriteParams.x,
    lifeBonusSpriteParams.y,
    lifeBonusSpriteParams.width,
    lifeBonusSpriteParams.height,
    lifeBonusSpriteParams.frameCount,
    lifeBonusSpriteParams.animationTimer,
  );
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
