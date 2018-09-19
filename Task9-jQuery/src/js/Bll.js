import Dal from './Dal';

class Bll {
  constructor() {
    this.dal = new Dal();
  }

  getAll() {
    return this.dal.getAll();
  }

  getElementById(id) {
    return this.dal.getElementById(id);
  }

  removeElement(id) {
    return this.dal.removeElement(id);
  }

  add(el) {
    return this.dal.add(el);
  }

  update(el) {
    return this.dal.update(el);
  }

  find(expr) {
    return this.dal.find(expr);
  }
}

export default Bll;
