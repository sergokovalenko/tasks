import './js/helpers/keyHandler';
import './js/helpers/resourceLoader';
import * as all from './assets/img/allObj.png';
import init from './js/game';

window.onload = () => {
  window.resources.load(all);
  setTimeout(() => {
    init(all);
  }, 1000);
};
