import './js/helpers/keyHandler';
import './js/helpers/resourceLoader';
import * as all from './assets/img/allObj.png';
import {
  initialize as init,
  pauseGame,
  restart,
} from './js/game';

window.onload = () => {
  window.resources.load(all);
  const btnStart = document.getElementById('start-btn');

  function start() {
    this.innerText = 'Pause';
    init(all);
    this.removeEventListener('click', start);
    this.addEventListener('click', pauseGame);
  }

  btnStart.addEventListener('click', start);

  const btnReset = document.getElementById('reset-btn');
  btnReset.addEventListener('click', restart);
};
