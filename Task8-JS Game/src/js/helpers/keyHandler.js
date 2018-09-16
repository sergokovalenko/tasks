let pressedKeys = {};

function setKey(event, status) {
  const code = event.keyCode;
  let key;
  event.preventDefault();

  switch (code) {
    case 32:
      key = 'SPACE';
      break;
    case 37:
      key = 'LEFT';
      break;
    case 38:
      key = 'UP';
      break;
    case 39:
      key = 'RIGHT';
      break;
    case 40:
      key = 'DOWN';
      break;
    default:
      key = String.fromCharCode(code);
  }

  pressedKeys[key] = status;
}

document.body.addEventListener('keydown', (e) => {
  setKey(e, true);
});

document.body.addEventListener('keyup', (e) => {
  setKey(e, false);
});

window.addEventListener('blur', () => {
  pressedKeys = {};
});

export default {
  isDown: key =>
    pressedKeys[key.toUpperCase()],
};
