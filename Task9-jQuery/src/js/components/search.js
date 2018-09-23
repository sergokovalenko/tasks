import $ from 'jquery';
import Component from './component';
import { searchTemplate } from '../templates';


class Filter extends Component {
  constructor(parentId) {
    super();
    this.parentId = parentId;
    this.templateFunc = searchTemplate;
  }

  render(callback) {
    const field = this.templateFunc();
    $(`#${this.parentId} .search-block:eq(0)`).html(field);
    $(`#${this.parentId} .search-btn:eq(0)`).on('click', () => {
      const expr = $(`#${this.parentId} .search-field:eq(0)`).val().trim();
      callback(expr);
    });
  }
}

export default Filter;
