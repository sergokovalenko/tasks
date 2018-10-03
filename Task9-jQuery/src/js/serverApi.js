import Dal from './fakeDal';

const timeOutTime = 0;

class Api {
  constructor() {
    this.dal = new Dal();
  }

  getAll() {
    console.log(this.dal.newId);
    const a = fetch('http://localhost:3001/products/');

    return a.then(response => response.json());
  }

  getElementById(id) {
    console.log(this.dal.newId);
    return fetch(`http://localhost:3001/product/${id}`)
      .then(response => response.json());
  }

  removeElement(id) {
    console.log(this.dal.newId);
    return fetch(`http://localhost:3001/product/${id}`, { method: 'DELETE' })
      .then(response => response.json());
  }

  add(el) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.dal.add(el)) {
          resolve(true);
        }

        reject(new Error('Server error'));
      }, timeOutTime);
    });
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
