import { wallSetting as config } from './../config';
import Wall from './../entities/wall';

let wallSprite;
let stillSprite;

function TextureFactory(spriteForWall, spriteForStill) {
  wallSprite = spriteForWall;
  stillSprite = spriteForStill;
}

TextureFactory.prototype = {
  constructor: TextureFactory,
  makeBreakWall: function makeBreakWall(x = 0, y = 0) {
    return new Wall(x, y, config.wallWidth, config.wallHeight, wallSprite);
  },
  makeStilWall: function makeStilWall(x = 0, y = 0) {
    return new Wall(x, y, config.wallWidth, config.wallHeight, stillSprite, false);
  },
  makeEagle: function makeEagle(x = 0, y = 0, sprite = null) {
    return new Wall(x, y, config.wallWidth, config.wallHeight, sprite);
  },
};

export default TextureFactory;
