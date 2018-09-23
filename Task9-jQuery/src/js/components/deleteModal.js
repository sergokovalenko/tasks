import $ from 'jquery';
import { deleteModalTemplateFunc } from './../templates';
import Component from './component';

class DeleteModal extends Component {
  constructor(parentId = '') {
    super();
    this.templateFunc = deleteModalTemplateFunc;
    this.parentId = parentId;
    this.modal = null;
  }

  render(id, callback) {
    const modal = this.templateFunc({
      id,
    });
    $('.modal-container:eq(0)').html(modal);
    this.modal = $('.modalWindow:eq(0)');
    this.modal.css('display', 'block');

    $(`#${this.parentId} .close-btn:eq(0)`).on('click', () => {
      this.hide();
    });

    $(`#${this.parentId} .delete-btn:eq(0)`).on('click', () => {
      if (callback) {
        callback(id);
      }
      this.hide();
    });
  }

  hide() {
    this.modal.css('display', 'none');
  }
}


export default DeleteModal;
