const resourceCache = {};
const readyCallbacks = [];

function isReady() {
  let ready = true;
  const keys = Object.keys(resourceCache);

  for (let i = 0; i < keys.length; i += 1) {
    if (!resourceCache[keys[i]]) {
      ready = false;
    }
  }

  return ready;
}

function loadByUrl(url) {
  if (resourceCache[url]) {
    return;
  }
  const img = new Image();
  img.src = url;
  img.onload = function onload() {
    resourceCache[url] = img;

    if (isReady()) {
      readyCallbacks.forEach((func) => {
        func();
      });
    }
  };
  resourceCache[url] = false;
}

function load(urlOrArr) {
  if (urlOrArr instanceof Array) {
    urlOrArr.forEach((url) => {
      loadByUrl(url);
    });
  } else {
    loadByUrl(urlOrArr);
  }
}

function getImg(url) {
  return resourceCache[url];
}

function onReady(...func) {
  for (let i = 0; i < func.length; i += 1) {
    readyCallbacks.push(func[i]);
  }
}

window.resources = {
  load,
  getImg,
  onReady,
  isReady,
  resourceCache,
};

export default {
  load,
  getImg,
  onReady,
  isReady,
  resourceCache,
};
