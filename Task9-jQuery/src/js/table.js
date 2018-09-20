import _ from 'underscore';
import $ from 'jquery';
import Bll from './Bll';

class Table {
  constructor() {
    this.logic = new Bll();
  }

  drawFullTable() {
    const productList = this.logic.getAll();
    const productRowHtml = $('#tableRowTemplate').html();
    const productRowTemplateFunc = _.template(productRowHtml);
    const tableHtml = $('#tableTemplate').html();
    const tableTemplateFunc = _.template(tableHtml);

    const table = tableTemplateFunc({
      productList,
      productRowTemplateFunc,
    });
    $('#container').html(table);
  }
}

export default Table;
