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
    return fetch('http://localhost:3000/api/products/')
      .then(response => response.json());
  }

  getElementById(id) {
    return fetch(`http://localhost:3000/api/product/${id}`)
      .then(response => response.json());
  }

  removeElement(id) {
    return fetch(`http://localhost:3000/api/product/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json());
  }

  add(el) {
    const newObj = rebuildIncomingObject(el);
    return fetch('http://localhost:3000/api/product/', {
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

    return fetch(`http://localhost:3000/api/product/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(newObj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json());
  }

  find(expr) {
    return fetch(`http://localhost:3000/api/products/${expr}`)
      .then(response => response.json());
  }
  // eslint-enable
}

export default Api;
