import $ from 'jquery';
import Bll from './Bll';
import { productRowTemplateFunc, tableTemplateFunc } from './templates';
import DeleteModal from './components/deleteModal';

class Table {
  constructor() {
    this.logic = new Bll();
    this.deleteModal = new DeleteModal(this.logic, 'modal-container');
    this.edit = function edit(productId) {
      console.log(`edit ${productId}`);
    };
    this.delete = function del(productId) {
      this.deleteModal.show(productId);
      console.log(`delete ${productId}`);
    };
  }

  drawFullTable() {
    const productList = this.logic.getAll();

    const table = tableTemplateFunc({
      productList,
      productRowTemplateFunc,
    });
    $('#container').html(table);

    $('.table').on('click', '.delete, .edit', (e) => {
      const $btn = $(e.target);
      const action = $btn.attr('data-action');

      this[action]($btn.attr('data-id'));
    });
  }
}

export default Table;
