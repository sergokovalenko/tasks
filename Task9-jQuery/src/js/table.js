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

class Table {
  constructor() {
    this.id = Math.random().toString(20).substr(2, 10);
    this.logic = new Bll();
    this.deleteModal = new DeleteModal(this.id, 'modal-container');
    this.changeModal = new ChangeModal(this.id, 'modal-container');
    this.filterComponent = new Filter();
    this.actionTypes = {
      edit: (productId) => {
        const prod = this.logic.getElementById(productId);
        this.changeModal.show(prod, this.addAndRepaint.bind(this));
      },
      delete: (productId) => {
        this.deleteModal.show(productId);
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
    product.id = 100;
    this.logic.add(product);
    this.redrawTable();
  }

  drawFullTable() {
    const productList = this.logic.getAll();
    const { id } = this;

    const table = tableTemplateFunc({
      id,
      productList,
      productRowTemplateFunc,
    });
    $('#container').html(table);

    this.filterComponent.render(this.filter.bind(this));

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
