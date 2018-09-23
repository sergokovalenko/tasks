import $ from 'jquery';
import Bll from './Bll';
import {
  productRowTemplateFunc,
  tableTemplateFunc,
  tableRowRedrawTemplate,
} from './templates';
import DeleteModal from './components/deleteModal';
import ChangeModal from './components/changeModal';
import Filter from './components/search';
import Add from './components/addButton';
import Component from './components/component';

function addNew() {
  const prod = {
    name: '',
    email: '',
    count: '',
    price: '',
    country: '',
    city: [],
  };
  this.changeModal.render(prod, this.addAndRepaint.bind(this), 'Add new');
}

function deleteProduct(id) {
  this.logic.removeElement(id);
  this.redrawTable();
}

function getMaxIdOfElements(arr) {
  let max = arr[0];
  arr.forEach((el) => {
    if (+el.id > max) {
      max = +el.id;
    }
  });

  return max;
}

class Table extends Component {
  constructor() {
    super();
    this.templateFunc = tableTemplateFunc;
    this.uniqueId = Math.random().toString(20).substr(2, 10);
    this.logic = new Bll();
    this.deleteModal = new DeleteModal(this.uniqueId);
    this.changeModal = new ChangeModal(this.uniqueId);
    this.filterComponent = new Filter(this.uniqueId);
    this.addComponent = new Add(this.uniqueId);
    this.nextIdForProduct = getMaxIdOfElements(this.logic.getAll()) + 1;
    this.actionTypes = {
      edit: (productId) => {
        const prod = this.logic.getElementById(productId);
        this.changeModal.render(prod, this.editAndRepaint.bind(this));
      },
      delete: (productId) => {
        this.deleteModal.render(productId, deleteProduct.bind(this));
      },
      sortByName: (id, $curElem) => {
        if ($curElem.hasClass('triangle-top')) {
          this.logic.getAll().sort((a, b) => a.name > b.name);
        } else {
          this.logic.getAll().sort((a, b) => a.name < b.name);
        }

        $curElem.toggleClass('triangle-top');
        $curElem.toggleClass('triangle-bottom');
        this.redrawTable();
      },
      sortByPrice: (id, $curElem) => {
        if ($curElem.hasClass('triangle-top')) {
          this.logic.getAll().sort((a, b) => a.price > b.price);
        } else {
          this.logic.getAll().sort((a, b) => a.price < b.price);
        }

        $curElem.toggleClass('triangle-top');
        $curElem.toggleClass('triangle-bottom');
        this.redrawTable();
      },
    };
  }

  addAndRepaint(prod) {
    const product = prod;
    product.id = this.nextIdForProduct;
    this.nextIdForProduct += 1;
    this.logic.add(product);
    this.redrawTable();
  }

  editAndRepaint(prod) {
    this.logic.update(prod);
    this.redrawTable();
  }

  drawFullTable() {
    const productList = this.logic.getAll();
    const { uniqueId: id } = this;

    const table = this.templateFunc({
      id,
      productList,
      productRowTemplateFunc,
    });
    $('#container').html(table);

    this.filterComponent.render(this.filter.bind(this));
    this.addComponent.render(addNew.bind(this));

    $('.table').on('click', '.delete, .edit, .sort', (e) => {
      const $btn = $(e.target);
      const action = $btn.attr('data-action');

      this.actionTypes[action]($btn.attr('data-id'), $btn);
    });
  }

  redrawTable() {
    const productList = this.logic.getAll();

    const table = tableRowRedrawTemplate({
      productList,
      productRowTemplateFunc,
    });
    $('#tableBody').html(table);
  }

  filter(expr) {
    if (expr) {
      const productList = this.logic.find(expr);
      const table = tableRowRedrawTemplate({
        productList,
        productRowTemplateFunc,
      });

      $('#tableBody').html(table);
    } else {
      this.redrawTable();
    }
  }
}

export default Table;
