const fps = 60;
const updatesPerSecond = 30;
const gameWidth = 768;
const gameHeight = 768;
const canvasHeight = gameHeight;
const canvasWidth = gameWidth + 150;
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
const playerSpeed = 2;
const maxLevel = 4;
const startLives = 3;
const blockWidth = 40;
const blockHeight = 40;
const wallWidth = 48;
const wallHeight = 48;
const timeForGameOverMessage = 3;
const timeBeetwenBonuses = 40;

const fontSizeMessage = 40;
const fontSizeInfo = 22;

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
  maxLevel,
  startLives,
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
  canvasWidth,
  canvasHeight,
  timeForGameOverMessage,
  timeBeetwenBonuses,
  fontSizeMessage,
  fontSizeInfo,
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
