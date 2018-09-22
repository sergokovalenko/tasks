import data from './data.json';

class Dal {
  constructor() {
    this.data = data;
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
    this.data.push(el);
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
