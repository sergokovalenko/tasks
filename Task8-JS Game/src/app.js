import './js/keyHandler';

const canvas = document.createElement('canvas');

canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#ff0000';
ctx.fillRect(0, 0, 512, 480);

window.onload = function () {
  console.log('number');
};
