const all = {
  fps: 60,
  updatesPerSecond: 30,
  gameWidth: 800,
  gameHeight: 650,
  playerSpeed: 100,
  bulletSpeed: 1000,
  bulletWidth: 5,
  bulletHeight: 5,
  bulletRealoadTimeForPlayers: 0.5,
  playerKeys: {
    up: 'UP',
    right: 'RIGHT',
    down: 'DOWN',
    left: 'LEFT',
  },
  blockWidth: 48,
  blockHeight: 48,
};

const bulletsSettings = {
  bulletSpeed: 600,
  bulletWidth: 5,
  bulletHeight: 5,
  bulletRealoadTimeForPlayers: 0.5,
};

const gameSettings = {
  fps: 60,
  updatesPerSecond: 30,
  gameWidth: 800,
  gameHeight: 800,
};

export { all, bulletsSettings, gameSettings };
