function rebuildIncomingObject(obj) {
  const newObj = obj;
  delete newObj.id;
  newObj.price = +newObj.price;
  newObj.count = +newObj.count;
  return newObj;
}

class Api {
  /* eslint-disable class-methods-use-this */
  getAll() {
    return fetch('http://localhost:3001/products/')
      .then(response => response.json());
  }

  getElementById(id) {
    return fetch(`http://localhost:3001/product/${id}`)
      .then(response => response.json());
  }

  removeElement(id) {
    return fetch(`http://localhost:3001/product/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json());
  }

  add(el) {
    const newObj = rebuildIncomingObject(el);
    return fetch('http://localhost:3001/product/', {
      method: 'POST',
      body: JSON.stringify(newObj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json());
  }

  update(el) {
    const productId = el.id;
    const newObj = rebuildIncomingObject(el);

    return fetch(`http://localhost:3001/product/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(newObj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json());
  }

  find(expr) {
    return fetch(`http://localhost:3001/products/${expr}`)
      .then(response => response.json());
  }
  // eslint-enable
}

export default Api;
