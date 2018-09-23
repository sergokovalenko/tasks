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
    $(`#${this.parentId} #addBlock`).html(field);
    $(`#${this.parentId} #addNew`).on('click', () => {
      callback();
    });
  }
}

export default Add;
