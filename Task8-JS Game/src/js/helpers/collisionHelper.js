import { gameSettings as config } from './../config';

export const hasCollisionWithBorderds = (obj) => {
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
};

export const macroCollision = (obj1, obj2) => {
  let XColl = false;
  let YColl = false;

  if ((obj1.position.x + obj1.size.width >= obj2.position.x) &&
    (obj1.position.x <= obj2.position.x + obj2.size.width)) {
    XColl = true;
  }

  if ((obj1.position.y + obj1.size.height >= obj2.position.y) &&
    (obj1.position.y <= obj2.position.y + obj2.size.height)) {
    YColl = true;
  }

  return XColl && YColl;
};
