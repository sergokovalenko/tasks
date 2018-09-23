import $ from 'jquery';
import Bll from './Bll';
import {
  productRowTemplateFunc,
  tableTemplateFunc,
  tableRowRedrawTemplate,
} from './templates';
import DeleteModal from './components/deleteModal';
import ChangeModal from './components/changeModal';
import Filter from './components/search';
import Add from './components/addButton';
import Component from './components/component';

function addNew() {
  const prod = {
    name: '',
    email: '',
    count: '',
    price: '',
    country: '',
    city: [],
  };
  this.changeModal.render(prod, this.addAndRepaint.bind(this), 'Add new');
}

function deleteProduct(id) {
  this.logic.removeElement(id)
    .then(() => {
      this.redrawTable();
    }, (err) => {
      alert(err.message);
    });
}

function getMaxIdOfElements(arr) {
  let max = arr[0];
  arr.forEach((el) => {
    if (+el.id > max) {
      max = +el.id;
    }
  });

  return max;
}

class Table extends Component {
  constructor() {
    super();
    this.templateFunc = tableTemplateFunc;
    this.uniqueId = Math.random().toString(20).substr(2, 10);
    this.logic = new Bll();
    this.deleteModal = new DeleteModal(this.uniqueId);
    this.changeModal = new ChangeModal(this.uniqueId);
    this.filterComponent = new Filter(this.uniqueId);
    this.addComponent = new Add(this.uniqueId);
    this.nextIdForProduct = 0;
    this.filterExpression = '';
    this.actionTypes = {
      edit: (productId) => {
        this.logic.getElementById(productId)
          .then((prod) => {
            this.changeModal.render(prod, this.editAndRepaint.bind(this));
          }, (err) => {
            alert(err.message);
          });
      },
      delete: (productId) => {
        this.deleteModal.render(productId, deleteProduct.bind(this));
      },
      sortByName: (id, $curElem) => {
        if ($curElem.hasClass('triangle-top')) {
          this.logic.getAll().sort((a, b) => a.name > b.name);
        } else {
          this.logic.getAll().sort((a, b) => a.name < b.name);
        }

        $curElem.toggleClass('triangle-top');
        $curElem.toggleClass('triangle-bottom');
        this.redrawTable();
      },
      sortByPrice: (id, $curElem) => {
        if ($curElem.hasClass('triangle-top')) {
          this.logic.getAll().sort((a, b) => a.price > b.price);
        } else {
          this.logic.getAll().sort((a, b) => a.price < b.price);
        }

        $curElem.toggleClass('triangle-top');
        $curElem.toggleClass('triangle-bottom');
        this.redrawTable();
      },
    };
  }

  addAndRepaint(prod) {
    const product = prod;
    product.id = this.nextIdForProduct;
    this.nextIdForProduct += 1;
    this.logic.add(product)
      .then(() => {
        this.redrawTable();
      }, (err) => {
        alert(err.message);
      });
  }

  editAndRepaint(prod) {
    this.logic.update(prod)
      .then(() => {
        this.redrawTable();
      }, (err) => {
        alert(err.message);
      });
  }

  drawFullTable() {
    this.logic.getAll()
      .then((productList) => {
        const {
          uniqueId: id,
        } = this;

        const table = this.templateFunc({
          id,
          productList,
          productRowTemplateFunc,
        });
        $('#container').html(table);

        this.filterComponent.render(this.filter.bind(this));
        this.addComponent.render(addNew.bind(this));

        $('.table').on('click', '.delete, .edit, .sort', (e) => {
          const $btn = $(e.target);
          const action = $btn.attr('data-action');

          this.actionTypes[action]($btn.attr('data-id'), $btn);
        });

        this.nextIdForProduct = getMaxIdOfElements(productList);
      }, (err) => {
        alert(err.message);
      });
  }

  redrawTable() {
    this.logic.getAll()
      .then((productList) => {
        const table = tableRowRedrawTemplate({
          productList,
          productRowTemplateFunc,
        });
        $('#tableBody').html(table);
        $('.table').on('click', '.delete, .edit, .sort', (e) => {
          const $btn = $(e.target);
          const action = $btn.attr('data-action');
          this.actionTypes[action]($btn.attr('data-id'), $btn);
        });
      }, (err) => {
        alert(err.message);
      });
  }

  filter(expr) {
    if (expr) {
      this.filterExpression = expr;
      this.logic.find(expr)
        .then((productList) => {
          const table = tableRowRedrawTemplate({
            productList,
            productRowTemplateFunc,
          });

          $('#tableBody').html(table);
        }, (err) => {
          alert(err.message);
        });
    } else {
      this.redrawTable();
    }
  }
}

export default Table;
