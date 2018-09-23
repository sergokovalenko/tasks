import $ from 'jquery';
import './assets/scss/main.scss';
import './js/utilities/priceConvertor';
import Table from './js/table';

$('document').ready(() => {
  const table = new Table();

  table.render('.container');
});
