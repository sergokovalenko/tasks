import $ from 'jquery';
import Component from './component';
import { addTemplate } from '../templates';

class Add extends Component {
  constructor() {
    super();
    this.templateFunc = addTemplate;
  }

  render(callback) {
    const field = this.templateFunc();
    $('#addBlock').html(field);
    $('#addNew').on('click', () => {
      callback();
    });
  }
}

export default Add;
