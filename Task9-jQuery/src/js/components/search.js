import $ from 'jquery';
import Component from './component';
import { searchTemplate } from '../templates';


class Filter extends Component {
  constructor() {
    super();
    this.templateFunc = searchTemplate;
  }

  render(callback) {
    const field = this.templateFunc();
    $('#searchBlock').html(field);
    $('#searchBtn').on('click', () => {
      const expr = $('#search-field').val().trim();
      callback(expr);
    });
  }
}

export default Filter;
