import Dal from './fakeDal';

class Bll {
  constructor() {
    this.dal = new Dal();
  }

  getAll() {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        const elements = this.dal.getAll();
        if (elements) {
          resolve(elements);
        }

        reject(new Error('Server Error'));
      }, 500);
    });
  }

  getElementById(id) {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        const element = this.dal.getElementById(id);
        if (element) {
          resolve(element);
        }

        reject(new Error('Not found'));
      }, 500);
    });
  }

  removeElement(id) {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.dal.removeElement(id)) {
          resolve(true);
        }

        reject(new Error('Not found'));
      }, 500);
    });
  }

  add(el) {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.dal.add(el)) {
          resolve(true);
        }

        reject(new Error('Server error'));
      }, 500);
    });
  }

  update(el) {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.dal.update(el)) {
          resolve(true);
        }

        reject(new Error('Server error'));
      }, 500);
    });
  }

  find(expr) {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        const arr = this.dal.find(expr);
        if (arr) {
          resolve(arr);
        }

        reject(new Error('Server error'));
      }, 500);
    });
  }
}

export default Bll;
