import config from './config';

function hasCollisionWithBorderds(obj) {
  if (obj.position.x <= 0) {
    return 'left';
  }

  if (obj.position.x + obj.size.width >= config.gameWidth) {
    return 'right';
  }

  if (obj.position.y <= 0) {
    return 'top';
  }

  if (obj.position.y + obj.size.height >= config.gameHeight) {
    return 'bottom';
  }

  return false;
}

export default hasCollisionWithBorderds;
