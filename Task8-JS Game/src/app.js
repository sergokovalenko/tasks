import './js/helpers/keyHandler';
import './js/helpers/resourceLoader';
import * as all from './assets/img/allObj.png';
import * as textures from './assets/img/textures.png';
import init from './js/game';

window.onload = () => {
  window.resources.load([all, textures]);
  setTimeout(() => {
    init(all, textures);
  }, 1000);
};
