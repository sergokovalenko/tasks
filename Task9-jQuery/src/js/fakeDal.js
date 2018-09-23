import data from './data.json';


function getMaxIdOfElements(arr) {
  let max = arr[0].id;
  arr.forEach((el) => {
    if (+el.id > max) {
      max = +el.id;
    }
  });

  return max;
}

class Dal {
  constructor() {
    this.data = [...data];
    this.newId = getMaxIdOfElements(this.data);
  }
  getAll() {
    return this.data;
  }

  getElementById(id) {
    return this.data.find(el => +el.id === +id);
  }

  removeElement(id) {
    const index = this.data.findIndex(el => +el.id === +id);

    if (index < 0) {
      return false;
    }

    this.data.splice(index, 1);
    return true;
  }

  add(el) {
    const product = el;
    this.newId += 1;
    product.id = this.newId;
    this.data.push(el);
    return this.newId;
  }

  update(el) {
    const index = this.data.findIndex(row => +row.id === +el.id);

    if (index < 0) {
      return false;
    }

    const keys = Object.keys(el);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      this.data[index][key] = el[key];
    }

    return true;
  }

  find(expression) {
    let condition = expression;

    if (condition) {
      condition = new RegExp(condition, 'gi');
    }

    const resultArr = this.data.filter(el => el.name.search(condition) >= 0);

    return resultArr;
  }
}

export default Dal;
