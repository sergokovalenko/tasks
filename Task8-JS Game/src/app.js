import './js/keyHandler';
import './js/resourceLoader';
import * as all from './assets/img/allObj.png';
import * as textures from './assets/img/textures.png';
import * as bullets from './assets/img/bulletsA.png';
import init from './js/game';

window.onload = () => {
  window.resources.load([all, textures, bullets]);
  setTimeout(() => {
    init(all);
  }, 1000);
};
