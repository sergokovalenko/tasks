const gameWidth = 768;
const gameHeight = 768;
const canvasHeight = gameHeight;
const canvasWidth = gameWidth + 150;

export const playerSpriteParams = {
  x: 0,
  y: 0,
  width: 16,
  height: 16,
  frameCount: 2,
  animationTimer: 0.1,
};

export const enemySpriteParams = {
  x: 128,
  y: 64,
  width: 16,
  height: 16,
  frameCount: 2,
  animationTimer: 0.1,
};

export const wallSpriteParams = {
  x: 256,
  y: 208,
  width: 16,
  height: 16,
  frameCount: 0,
  animationTimer: 0,
};

export const stillSpriteParams = {
  x: 256,
  y: 144,
  width: 16,
  height: 16,
  frameCount: 0,
  animationTimer: 0,
};

export const starBonusSpriteParams = {
  x: 256,
  y: 64,
  width: 16,
  height: 16,
  frameCount: 2,
  animationTimer: 0.5,
};

export const lifeBonusSpriteParams = {
  x: 256,
  y: 96,
  width: 16,
  height: 16,
  frameCount: 2,
  animationTimer: 0.5,
};

export const playerSettings = {
  respawn: {
    x: 400,
    y: 728,
  },
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
  bulletSpeed: 10,
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
  wallWidth: 48,
  wallHeight: 48,
  timeForGameOverMessage: 3,
  timeBeetwenBonuses: 40,
  fontSizeMessage: 40,
  fontSizeInfo: 22,
};

export const wallSetting = {
  wallWidth: 48,
  wallHeight: 48,
};

setTimeout(() => {
  if (window.innerHeight < 768) {
    gameSettings.gameWidth = 512;
    gameSettings.gameHeight = 512;
    gameSettings.canvasHeight = 512;
    gameSettings.canvasWidth = 662;
    gameSettings.wallWidth = 32;
    gameSettings.wallHeight = 32;

    playerSettings.respawn.y = 256;
    playerSettings.respawn.y = 488;
    playerSettings.blockHeight = 24;
    playerSettings.blockWidth = 24;
    playerSettings.playerSpeed = 1;

    wallSetting.wallHeight = 32;
    wallSetting.wallWidth = 32;

    bulletsSettings.bulletWidth = 2.5;
    bulletsSettings.bulletHeight = 2.5;
  }
}, 100);
