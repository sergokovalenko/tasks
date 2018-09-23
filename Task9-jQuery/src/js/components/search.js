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
    $(`#${this.parentId} #searchBlock`).html(field);
    $(`#${this.parentId} #searchBtn`).on('click', () => {
      const expr = $(`#${this.parentId} #search-field`).val().trim();
      callback(expr);
    });
  }
}

export default Filter;
