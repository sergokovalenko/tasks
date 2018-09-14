import './js/helpers/keyHandler';
import './js/helpers/resourceLoader';
import * as all from './assets/img/allObj.png';
import { initialize as init, pauseGame } from './js/game';

window.onload = () => {
  window.resources.load(all);
  setTimeout(() => {
    init(all);
  }, 1000);

  const btnPause = document.getElementById('pause-btn');
  btnPause.addEventListener('click', () => {
    pauseGame();
  });
};
