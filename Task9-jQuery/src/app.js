import $ from 'jquery';
import './assets/scss/main.scss';
import Table from './js/table';
import './js/utilities/priceConvertor';

$('document').ready(() => {
  const $searchBtn = $('#searchBtn');
  const $searchField = $('#search-field');
  const table = new Table();

  $searchBtn.on('click', () => {
    const expr = $searchField.val().trim();
    if (!expr) {
      table.drawFullTable();
    } else {
      table.filter(expr);
    }
  });

  table.drawFullTable();
});
