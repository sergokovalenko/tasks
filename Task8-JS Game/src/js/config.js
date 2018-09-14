const fps = 60;
const updatesPerSecond = 30;
const gameWidth = 768;
const gameHeight = 768;
const bulletSpeed = 1000;
const bulletWidth = 5;
const bulletHeight = 5;
const bulletRealoadTimeForPlayers = 0.5;
const playerKeys = {
  up: 'UP',
  right: 'RIGHT',
  down: 'DOWN',
  left: 'LEFT',
  shoot: ['SPACE'],
};
const playerSpeed = 100;
const blockWidth = 40;
const blockHeight = 40;
const wallWidth = 48;
const wallHeight = 48;

const all = {
  fps,
  updatesPerSecond,
  gameWidth,
  gameHeight,
  bulletSpeed,
  bulletWidth,
  bulletHeight,
  bulletRealoadTimeForPlayers,
  playerKeys,
  playerSpeed,
  blockWidth,
  blockHeight,
};

const playerSettings = {
  playerKeys,
  playerSpeed,
  blockWidth,
  blockHeight,
};

const bulletsSettings = {
  bulletSpeed,
  bulletWidth,
  bulletHeight,
  bulletRealoadTimeForPlayers,
};

const gameSettings = {
  fps,
  updatesPerSecond,
  gameWidth,
  gameHeight,
};

const wallSetting = {
  wallWidth,
  wallHeight,
};

export {
  all,
  bulletsSettings,
  gameSettings,
  playerSettings,
  wallSetting,
};
