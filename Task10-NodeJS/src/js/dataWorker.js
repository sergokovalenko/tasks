const data = require('./data.json');

function getMaxIdOfElements(arr) {
  let max = arr[0].id;
  arr.forEach((el) => {
    if (+el.id > max) {
      max = +el.id;
    }
  });

  return max;
}

let newId = getMaxIdOfElements(data);

const dataWorker = {
  getAll() {
    return Promise.resolve(data);
  },
  getElementById(id) {
    return Promise.resolve(data.find(el => +el.id === +id));
  },
  removeElement(id) {
    return new Promise((resolve, reject) => {
      const index = data.findIndex(el => +el.id === +id);

      if (index < 0) {
        reject(new Error(`Product with id ${id} isn't exist`));
      }

      data.splice(index, 1);
      resolve(true);
    });
  },
  add(el) {
    return new Promise((resolve) => {
      const product = el;
      newId += 1;
      product.id = newId;
      data.push(product);
      resolve(newId);
    });
  },
  update(el) {
    return new Promise((resolve, reject) => {
      const index = data.findIndex(row => +row.id === +el.id);

      if (index < 0) {
        reject(new Error(`Product with id ${+el.id} isn't exist`));
      }

      const keys = Object.keys(el);

      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        data[index][key] = el[key];
      }

      resolve(true);
    });
  },
  find(expression) {
    return new Promise((resolve) => {
      let condition = expression;
      let resultArr = [];

      if (condition) {
        condition = new RegExp(condition, 'gi');
        resultArr = data.filter(el => el.name.search(condition) >= 0);
      } else {
        resultArr = data;
      }

      resolve(resultArr);
    });
  },
};

module.exports = dataWorker;
