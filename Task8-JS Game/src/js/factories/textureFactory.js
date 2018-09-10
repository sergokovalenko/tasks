import { wallSetting as config } from './../config';
import Wall from './../entities/wall';

function TextureFactory(playerUrl, enemyUrl) {
  this.playerUrl = playerUrl;
  this.enemyUrl = enemyUrl;
}

TextureFactory.prototype = {
  constructor: TextureFactory,
  makeBreakWall: function makeBreakWall(x = 0, y = 0) {
    return new Wall(x, y, config.wallWidth, config.wallHeight, null);
  },
  makeStilWall: function makeStilWall(x = 0, y = 0) {
    return new Wall(x, y, config.wallWidth, config.wallHeight, null, false);
  },
  makeEagle: function makeEagle(x = 0, y = 0) {
    return new Wall(x, y, config.wallWidth, config.wallHeight, null);
  },
};

export default TextureFactory;
