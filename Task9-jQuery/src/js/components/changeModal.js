import $ from 'jquery';
import { changeModalTemplateFunc } from './../templates';
import validator from './../utilities/valid';

function setEvents() {
  $('#close').on('click', () => {
    this.modal.css('display', 'none');
  });

  $('#name').on('blur', function nameClick() {
    const value = $(this).val();
    const hasError = validator.validate({
      name: value,
    });
    const errorBlock = $('.error-name:eq(0)');
    if (hasError) {
      console.log('invalid');
      errorBlock.html(validator.messages[0]);
      console.log(validator.messages);
    } else {
      console.log('valid');
      errorBlock.html('');
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
  }

  hide() {
    this.modal.css('display', 'none');
  }
}

export default ChangeModal;
