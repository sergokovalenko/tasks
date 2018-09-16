const gameWidth = 768;
const gameHeight = 768;
const canvasHeight = gameHeight;
const canvasWidth = gameWidth + 150;

export const playerSprite = {
  x: 0,
  y: 0,
  width: 16,
  height: 16,
  frameCount: 2,
  animationTimer: 0.1,
};

export const enemySprite = {
  x: 128,
  y: 64,
  width: 16,
  height: 16,
  frameCount: 2,
  animationTimer: 0.1,
};

export const wallSprite = {
  x: 256,
  y: 208,
  width: 16,
  height: 16,
  frameCount: 0,
  animationTimer: 0,
};

export const stillSprite = {
  x: 256,
  y: 208,
  width: 16,
  height: 16,
  frameCount: 0,
  animationTimer: 0,
};

export const starBonusSprite = {
  x: 256,
  y: 64,
  width: 16,
  height: 16,
  frameCount: 2,
  animationTimer: 0.5,
};

export const lifeBonusSprite = {
  x: 256,
  y: 96,
  width: 16,
  height: 16,
  frameCount: 2,
  animationTimer: 0.5,
};

export const playerSettings = {
  playerKeys: {
    up: 'UP',
    right: 'RIGHT',
    down: 'DOWN',
    left: 'LEFT',
    shoot: ['SPACE'],
  },
  playerSpeed: 2,
  blockWidth: 40,
  blockHeight: 40,
  maxLevel: 4,
  startLives: 3,
};

export const bulletsSettings = {
  bulletSpeed: 1000,
  bulletWidth: 5,
  bulletHeight: 5,
  bulletRealoadTimeForPlayers: 0.5,
};

export const gameSettings = {
  fps: 60,
  gameWidth,
  gameHeight,
  canvasWidth,
  canvasHeight,
  timeForGameOverMessage: 3,
  timeBeetwenBonuses: 40,
  fontSizeMessage: 40,
  fontSizeInfo: 22,
};

export const wallSetting = {
  wallWidth: 48,
  wallHeight: 48,
};
