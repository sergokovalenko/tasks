import { wallSetting as config } from './config';
import TextureFactory from './factories/textureFactory';

const factory = new TextureFactory();

function getTexturesForLevel(arr) {
  const textures = [];

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length; j += 1) {
      let texture;

      switch (arr[i][j]) {
        case 1:
          texture = factory.makeBreakWall(j * config.wallWidth, i * config.wallWidth);
          break;
        case 2:
          texture = factory.makeStilWall(j * config.wallWidth, i * config.wallWidth);
          break;
        case 100:
          texture = factory.makeEagle(j * config.wallWidth, i * config.wallWidth);
          break;
        default:
          break;
      }

      if (texture) {
        textures.push(texture);
      }
    }
  }

  return textures;
}

export default getTexturesForLevel;
