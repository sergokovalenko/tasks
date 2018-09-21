import $ from 'jquery';
import { deleteModalTemplateFunc } from './../templates';

function setEvents() {
  $('#close').on('click', () => {
    this.modal.css('display', 'none');
  });
}

class DeleteModal {
  constructor(logic, elemId) {
    this.logic = logic;
    this.elem = $(`#${elemId}`);
    this.modal = null;
    // setEvents.bind(this);
  }

  show(id) {
    const modal = deleteModalTemplateFunc({
      id,
    });
    this.elem.html(modal);
    this.modal = $('#modalWindow');
    this.modal.css('display', 'block');

    setEvents.bind(this)();
    // setEvents();
  }

  hide() {
    this.modal.css('display', 'none');
  }
}


export default DeleteModal;
