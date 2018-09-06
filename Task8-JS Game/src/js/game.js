import config from './config';
import Tank from './entities/tank';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let dt = 0;
const step = 1 / config.fps;
let last = performance.now();
const player = new Tank(100, 100, 48, 48, null, config.playerSpeed, config.playerKeys);

canvas.width = config.gameWidth;
canvas.height = config.gameHeight;
document.body.appendChild(canvas);

function render() {
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(0, 0, 800, 800);

  ctx.fillStyle = '#00ff00';
  ctx.fillRect(player.position.x, player.position.y, player.size.width, player.size.height);
}

function update() {
  player.update(step);
}

const frame = () => {
  const now = performance.now();
  dt += now - last;
  // dt += Math.min(1, (now - last) / 1000);

  while (dt > step) {
    dt -= step;
  }
  last = now;
  update();

  render();
  requestAnimationFrame(frame);
};

requestAnimationFrame(frame);
