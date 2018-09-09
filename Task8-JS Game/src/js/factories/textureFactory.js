import { playerSettings as config } from './../config';
import Wall from './../entities/wall';

function TextureFactory(playerUrl, enemyUrl) {
  this.playerUrl = playerUrl;
  this.enemyUrl = enemyUrl;
}

TextureFactory.prototype = {
  constructor: TextureFactory,
  makeBreakWall: function makeBreakWall(x = 0, y = 0) {
    return new Wall(x, y, config.blockWidth, config.blockHeight, null);
  },
  makeStilWall: function makeStilWall(x = 0, y = 0) {
    return new Wall(x, y, config.blockWidth, config.blockHeight, null, false);
  },
  makeEagle: function makeEagle(x = 0, y = 0) {
    return new Wall(x, y, config.blockWidth, config.blockHeight, null);
  },
};

export default TextureFactory;
