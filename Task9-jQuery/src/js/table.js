import $ from 'jquery';
import Bll from './Bll';
import {
  productRowTemplateFunc,
  tableTemplateFunc,
  tableRowRedrawTemplate,
} from './templates';
import DeleteModal from './components/deleteModal';
import ChangeModal from './components/changeModal';
// import { convertNumberToPrice } from './utilities/priceConvertor';

class Table {
  constructor() {
    this.logic = new Bll();
    this.deleteModal = new DeleteModal(this.logic, 'modal-container');
    this.changeModal = new ChangeModal(this.logic, 'modal-container');
    this.edit = function edit(productId) {
      this.changeModal.show(productId);
    };
    this.delete = function del(productId) {
      this.deleteModal.show(productId);
    };
    this.sortByName = function sortByName(id, $curElem) {
      if ($curElem.hasClass('triangle-top')) {
        this.logic.getAll().sort((a, b) => a.name > b.name);
      } else {
        this.logic.getAll().sort((a, b) => a.name < b.name);
      }

      $curElem.toggleClass('triangle-top');
      $curElem.toggleClass('triangle-bottom');
      this.redrawTable();
    };
    this.sortByPrice = function sortByPrice(id, $curElem) {
      if ($curElem.hasClass('triangle-top')) {
        this.logic.getAll().sort((a, b) => a.price > b.price);
      } else {
        this.logic.getAll().sort((a, b) => a.price < b.price);
      }

      $curElem.toggleClass('triangle-top');
      $curElem.toggleClass('triangle-bottom');
      this.redrawTable();
    };
  }

  drawFullTable() {
    const productList = this.logic.getAll();

    const table = tableTemplateFunc({
      productList,
      productRowTemplateFunc,
    });
    $('#container').html(table);

    $('.table').on('click', '.delete, .edit, .sort', (e) => {
      const $btn = $(e.target);
      const action = $btn.attr('data-action');

      this[action]($btn.attr('data-id'), $btn);
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
    const productList = this.logic.find(expr);

    const table = tableRowRedrawTemplate({
      productList,
      productRowTemplateFunc,
    });

    $('#tableBody').html(table);
  }
}

export default Table;
