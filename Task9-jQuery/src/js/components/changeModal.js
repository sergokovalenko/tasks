import $ from 'jquery';
import { changeModalTemplateFunc } from './../templates';

class ChangeModal {
  constructor(logic, elemId) {
    this.logic = logic;
    this.elem = $(`#${elemId}`);
    this.modal = null;
  }

  show(id) {
    const product = this.logic.getElementById(id);
    const modal = changeModalTemplateFunc({
      product,
    });
    this.elem.html(modal);
    this.modal = $('#modalWindow');
    this.modal.css('display', 'block');


    $('#close').on('click', () => {
      this.modal.css('display', 'none');
    });
  }

  hide() {
    this.modal.css('display', 'none');
  }
}

export default ChangeModal;
