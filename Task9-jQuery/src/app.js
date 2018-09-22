import $ from 'jquery';
import './assets/scss/main.scss';
import Table from './js/table';
import './js/utilities/priceConvertor';
import ChangeModal from './js/components/changeModal';

$('document').ready(() => {
  const $searchBtn = $('#searchBtn');
  const $searchField = $('#search-field');
  const $addhBtn = $('#addNew');
  const table = new Table();
  const changeModal = new ChangeModal(table.logic, 'modal-container');

  $searchBtn.on('click', () => {
    const expr = $searchField.val().trim();
    if (!expr) {
      table.drawFullTable();
    } else {
      table.filter(expr);
    }
  });

  $addhBtn.on('click', () => {
    changeModal.show(-1000);
    $('#superBtn').on('click', (e) => {
      e.preventDefault();
      changeModal.hide();
    });
  });

  table.drawFullTable();
});
