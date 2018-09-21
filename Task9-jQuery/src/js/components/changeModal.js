import $ from 'jquery';
import { changeModalTemplateFunc } from './../templates';
import validator from './../utilities/valid';

function setEvents() {
  $('#close').on('click', () => {
    this.modal.css('display', 'none');
  });

  $('#name').on('blur', function nameClick() {
    const value = this.innerText;
    const hasError = validator.validate({
      name: value,
    });
    const errorBlock = $('.error-name:eq(0)');
    if (hasError) {
      errorBlock.html('');
      console.log('invalid');
    } else {
      errorBlock.html(validator.messages[0]);
      console.log(validator.messages);
      console.log('valid');
    }
  });
}

class ChangeModal {
  constructor(logic, elemId) {
    this.logic = logic;
    this.elem = $(`#${elemId}`);
    this.modal = null;
    setEvents.bind(this);
  }

  show(id) {
    const product = this.logic.getElementById(id);
    const modal = changeModalTemplateFunc({
      product,
    });
    this.elem.html(modal);
    this.modal = $('#modalWindow');
    this.modal.css('display', 'block');

    setEvents.bind(this)();
    // $('#close').on('click', () => {
    //   this.modal.css('display', 'none');
    // });
  }

  hide() {
    this.modal.css('display', 'none');
  }
}

export default ChangeModal;
