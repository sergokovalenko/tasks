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
      this.logic.find(this.filterExpression)
        .then((all) => {
          this.redrawTable(all);
        });
    })
    .catch((err) => {
      console.log(err.message);
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

function sortElements(sortFunc, $curElem) {
  this.logic.find(this.filterExpression)
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

  addAndRepaint(prod) {
    const product = prod;
    product.id = this.nextIdForProduct;
    this.nextIdForProduct += 1;
    this.logic.add(product)
      .then(() => {
        this.logic.find(this.filterExpression)
          .then((all) => {
            this.redrawTable(all);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  editAndRepaint(prod) {
    this.logic.update(prod)
      .then(() => this.logic.find(this.filterExpression))
      .then((all) => {
        this.redrawTable(all);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  render() {
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
        $('.container').html(table);

        this.filterComponent.render(this.filter.bind(this));
        this.addComponent.render(addNew.bind(this));

        $(`#${this.uniqueId} .table`).on('click', '.delete, .edit, .sort', (e) => {
          const $btn = $(e.target);
          const action = $btn.attr('data-action');

          this.actionTypes[action]($btn.attr('data-id'), $btn);
        });

        this.nextIdForProduct = getMaxIdOfElements(productList);
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
    $('#tableBody').html(table);
  }

  filter(expr) {
    this.filterExpression = expr;
    this.logic.find(expr)
      .then((productList) => {
        this.redrawTable(productList);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}

export default Table;
