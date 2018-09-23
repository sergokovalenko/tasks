import $ from 'jquery';
import Api from './api';
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

function addAndRepaint(prod) {
  this.api.add(prod)
    .then(() => this.api.find(this.filterExpression))
    .then((all) => {
      this.redrawTable(all);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function addNew() {
  const prod = {
    name: '',
    email: '',
    count: '',
    price: '',
    country: '',
    city: [],
  };
  this.changeModal.render(prod, addAndRepaint.bind(this), 'Add new');
}


function deleteProduct(id) {
  this.api.removeElement(id)
    .then(() => {
      this.api.find(this.filterExpression)
        .then((all) => {
          this.redrawTable(all);
        });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function sortElements(sortFunc, $curElem) {
  this.api.find(this.filterExpression)
    .then((products) => {
      products.sort(sortFunc);
      $curElem.toggleClass('triangle-top');
      $curElem.toggleClass('triangle-bottom');
      this.redrawTable(products);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

class Table extends Component {
  constructor() {
    super();
    this.templateFunc = tableTemplateFunc;
    this.rowsTemplateFunc = tableRowRedrawTemplate;
    this.uniqueId = Math.random().toString(20).substr(2, 10);
    this.api = new Api();
    this.deleteModal = new DeleteModal(this.uniqueId);
    this.changeModal = new ChangeModal(this.uniqueId);
    this.filterComponent = new Filter(this.uniqueId);
    this.addComponent = new Add(this.uniqueId);
    this.filterExpression = '';
    this.actionTypes = {
      edit: (productId) => {
        this.api.getElementById(productId)
          .then((prod) => {
            this.changeModal.render(prod, this.editAndRepaint.bind(this));
          })
          .catch((err) => {
            console.log(err.message);
          });
      },
      delete: (productId) => {
        this.deleteModal.render(productId, deleteProduct.bind(this));
      },
      sortByName: (id, $curElem) => {
        let sortFunc;
        if ($curElem.hasClass('triangle-top')) {
          sortFunc = ((a, b) => a.name > b.name);
        } else {
          sortFunc = ((a, b) => a.name < b.name);
        }

        sortElements.call(this, sortFunc, $curElem);
      },
      sortByPrice: (id, $curElem) => {
        let sortFunc;
        if ($curElem.hasClass('triangle-top')) {
          sortFunc = ((a, b) => a.price > b.price);
        } else {
          sortFunc = ((a, b) => a.price < b.price);
        }

        sortElements.call(this, sortFunc, $curElem);
      },
    };
  }

  editAndRepaint(prod) {
    this.api.update(prod)
      .then(() => this.api.find(this.filterExpression))
      .then((all) => {
        this.redrawTable(all);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  render(insertSelector) {
    this.api.getAll()
      .then((productList) => {
        const {
          uniqueId: id,
        } = this;

        const table = this.templateFunc({
          id,
          productList,
          productRowTemplateFunc,
        });
        $(insertSelector).html(table);

        this.filterComponent.render(this.filter.bind(this));
        this.addComponent.render(addNew.bind(this));

        $(`#${this.uniqueId} .table`).on('click', '.delete, .edit, .sort', (e) => {
          const $btn = $(e.target);
          const action = $btn.attr('data-action');

          this.actionTypes[action]($btn.attr('data-id'), $btn);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  redrawTable(productList) {
    const table = this.rowsTemplateFunc({
      productList,
      productRowTemplateFunc,
    });
    $('.tableBody:eq(0)').html(table);
  }

  filter(expr) {
    this.filterExpression = expr;
    this.api.find(expr)
      .then((productList) => {
        this.redrawTable(productList);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}

export default Table;
