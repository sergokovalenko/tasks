function rebuildIncomingObject(obj) {
  const newObj = obj;
  delete newObj.id;
  newObj.price = +newObj.price;
  newObj.count = +newObj.count;
  return newObj;
}

class Api {
  getAll() {
    console.log(this.dal);
    return fetch('http://localhost:3001/products/')
      .then(response => response.json());
  }

  getElementById(id) {
    console.log(this.dal);
    return fetch(`http://localhost:3001/product/${id}`)
      .then(response => response.json());
  }

  removeElement(id) {
    console.log(this.dal);
    return fetch(`http://localhost:3001/product/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json());
  }

  add(el) {
    console.log(this.dal);
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
    console.log(this.dal);
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
    console.log(this.dal);
    return fetch(`http://localhost:3001/products/${expr}`)
      .then(response => response.json());
  }
}


export default Api;
