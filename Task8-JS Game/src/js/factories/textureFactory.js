import { wallSetting as config } from './../config';
import Wall from './../entities/wall';

function TextureFactory(playerUrl, enemyUrl) {
  this.playerUrl = playerUrl;
  this.enemyUrl = enemyUrl;
}

TextureFactory.prototype = {
  constructor: TextureFactory,
  makeBreakWall: function makeBreakWall(x = 0, y = 0, sprite = null) {
    return new Wall(x, y, config.wallWidth, config.wallHeight, sprite);
  },
  makeStilWall: function makeStilWall(x = 0, y = 0, sprite = null) {
    return new Wall(x, y, config.wallWidth, config.wallHeight, sprite, false);
  },
  makeEagle: function makeEagle(x = 0, y = 0, sprite = null) {
    return new Wall(x, y, config.wallWidth, config.wallHeight, sprite);
  },
};

export default TextureFactory;
