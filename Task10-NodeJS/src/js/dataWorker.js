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
    return data;
  },
  getElementById(id) {
    return data.find(el => +el.id === +id);
  },
  removeElement(id) {
    const index = this.data.findIndex(el => +el.id === +id);

    if (index < 0) {
      return false;
    }

    data.splice(index, 1);
    return true;
  },
  add(el) {
    const product = el;
    newId += 1;
    product.id = newId;
    data.push(el);
    return newId;
  },
  update(el) {
    const index = data.findIndex(row => +row.id === +el.id);

    if (index < 0) {
      return false;
    }

    const keys = Object.keys(el);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      data[index][key] = el[key];
    }

    return true;
  },
  find(expression) {
    let condition = expression;

    if (condition) {
      condition = new RegExp(condition, 'gi');
    }

    const resultArr = data.filter(el => el.name.search(condition) >= 0);

    return resultArr;
  },
};

module.exports = dataWorker;
