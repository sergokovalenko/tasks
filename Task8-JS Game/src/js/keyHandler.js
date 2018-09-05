(function () {
  let pressedKeys = {};

  function setKey(event, status) {
    const code = event.keyCode;
    let key;

    switch (code) {
      case 32:
        key = 'SPACE';
        break;
      case 38:
        key = 'UP';
        break;
      case 37:
        key = 'LEFT';
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

    console.log(`Pressed key: ${key}`);

    pressedKeys[key] = status;
  }

  document.addEventListener('keydown', (e) => {
    setKey(e, true);
  });

  document.addEventListener('keyup', (e) => {
    setKey(e, false);
  });

  window.addEventListener('blur', () => {
    pressedKeys = {};
  });

  window.input = {
    isDown: key =>
      pressedKeys[key.toUpperCase()],
  };
}());
