import $ from 'jquery';
import Component from './component';
import { addTemplate } from '../templates';

class Add extends Component {
  constructor(parentId) {
    super();
    this.parentId = parentId;
    this.templateFunc = addTemplate;
  }

  render(callback) {
    const field = this.templateFunc();
    $(`#${this.parentId} .add-block:eq(0)`).html(field);
    $(`#${this.parentId} .add-new:eq(0)`).on('click', () => {
      callback();
    });
  }
}

export default Add;
