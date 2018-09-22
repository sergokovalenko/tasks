import $ from 'jquery';
import { deleteModalTemplateFunc } from './../templates';

class DeleteModal {
  constructor(parentId = '') {
    this.parentId = parentId;
    this.modal = null;
  }

  show(id, callback) {
    const modal = deleteModalTemplateFunc({
      id,
    });
    $('#modal-container').html(modal);
    this.modal = $('#modalWindow');
    this.modal.css('display', 'block');

    $(`#${this.parentId} #close`).on('click', () => {
      this.hide();
    });

    $(`#${this.parentId} #delete`).on('click', () => {
      callback(id);
      this.hide();
    });
  }

  hide() {
    this.modal.css('display', 'none');
  }
}


export default DeleteModal;
