import Dal from './fakeDal';

const timeOutTime = 0;

class Api {
  constructor() {
    this.dal = new Dal();
  }

  getAll() {
    console.log(this.dal.newId);
    return fetch('http://localhost:3001/products/')
      .then(response => response.json());
  }

  getElementById(id) {
    console.log(this.dal.newId);
    return fetch(`http://localhost:3001/product/${id}`)
      .then(response => response.json());
  }

  removeElement(id) {
    console.log(this.dal.newId);
    return fetch(`http://localhost:3001/product/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json());
  }

  add(el) {
    console.log(this.dal.newId);
    const a = el;
    delete a.id;
    a.price = +a.price;
    a.count = +a.count;
    return fetch('http://localhost:3001/product/', {
      method: 'POST',
      body: JSON.stringify(a),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json());
  }

  update(el) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.dal.update(el)) {
          resolve(true);
        }

        reject(new Error('Server error'));
      }, timeOutTime);
    });
  }

  find(expr) {
    console.log(this.dal.newId);
    return fetch(`http://localhost:3001/products/${expr}`)
      .then(response => response.json());
  }
}

export default Api;
