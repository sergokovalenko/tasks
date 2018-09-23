import Dal from './fakeDal';

const timeOutTime = 500;

class Api {
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
      }, timeOutTime);
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
      }, timeOutTime);
    });
  }

  removeElement(id) {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.dal.removeElement(id)) {
          resolve(true);
        }

        reject(new Error('Not found'));
      }, timeOutTime);
    });
  }

  add(el) {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.dal.add(el)) {
          resolve(true);
        }

        reject(new Error('Server error'));
      }, timeOutTime);
    });
  }

  update(el) {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.dal.update(el)) {
          resolve(true);
        }

        reject(new Error('Server error'));
      }, timeOutTime);
    });
  }

  find(expr) {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        let arr = [];
        if (expr) {
          arr = this.dal.find(expr);
        } else {
          arr = this.dal.getAll();
        }

        if (arr) {
          resolve(arr);
        }

        reject(new Error('Server error'));
      }, timeOutTime);
    });
  }
}

export default Api;
