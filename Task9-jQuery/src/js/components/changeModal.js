import $ from 'jquery';
import { changeModalTemplateFunc } from './../templates';
import validator from './../utilities/valid';
import Component from './component';

function blurEvent($field, fieldName, $submitBtn) {
  const value = $field.val();
  const obj = {};
  obj[fieldName] = value;
  const hasError = validator.validate(obj);
  const errorBlock = $(`.error-${fieldName}:eq(0)`);
  if (hasError) {
    errorBlock.html(validator.messages[0]);
    $submitBtn.prop('disabled', true);
  } else {
    errorBlock.html('');
    const isValid = $('.error').toArray().every(el => !el.innerHTML);
    if (isValid) {
      $submitBtn.prop('disabled', false);
    }
  }
}

function mapObject(formId) {
  const product = {};
  const serialized = $(`#${this.parentId} #${formId}`).serializeArray();
  serialized.forEach((el) => {
    product[el.name] = el.value;
  });
  product.city = [];
  $('input[name="city"]').each((i, el) => {
    const $el = $(el);
    if ($el.prop('checked')) {
      product.city.push($el.val());
    }
  });

  return product;
}

function setEvents(callback) {
  // TODO: делегирование событий
  const $superBtn = $(`#${this.parentId} #superBtn`);
  const $close = $(`#${this.parentId} #close`);
  const $name = $(`#${this.parentId} #name`);
  const $email = $(`#${this.parentId} #email`);
  const $count = $(`#${this.parentId} #count`);
  const $price = $(`#${this.parentId} #price`);
  const $delivery = $(`#${this.parentId} #delivery`);
  const $selectAllBox = $(`#${this.parentId} #select-all`);
  const $countriesBlock = $(`#${this.parentId} #countries`);
  const $citiesBlock = $(`#${this.parentId} #cities`);
  let prevSelection = '';

  $delivery.on('click', () => {
    const text = $(`#${this.parentId} #delivery option:selected`).text();
    if (prevSelection.localeCompare(text) === 0) {
      return;
    }

    prevSelection = text;
    switch (text) {
      case 'Country':
        $countriesBlock.css('visibility', 'visible');
        $countriesBlock.css('border', '1px solid rgba(0,0,0,.125)');
        $citiesBlock.css('visibility', 'hidden');
        $citiesBlock.css('border', 'none');
        break;
      case 'City':
        $countriesBlock.css('visibility', 'hidden');
        $countriesBlock.css('border', 'none');
        $citiesBlock.css('visibility', 'visible');
        $citiesBlock.css('border', '1px solid rgba(0,0,0,.125)');
        break;
      default:
        break;
    }
  });

  $close.on('click', () => {
    this.modal.css('display', 'none');
  });

  $name.on('blur', () => {
    blurEvent($name, 'name', $superBtn);
  });

  $email.on('blur', () => {
    blurEvent($email, 'email', $superBtn);
  });

  $count.on('blur', () => {
    blurEvent($count, 'count', $superBtn);
  });

  $count.bind('input propertychange', function a() {
    const input = $(this);
    input.val(input.val().replace(/[^0-9]/g, ''));
  });

  $price.on('blur', () => {
    blurEvent($price, 'price', $superBtn);
  });

  $selectAllBox.on('click', () => {
    const flag = $selectAllBox.prop('checked');

    $(`#${this.parentId} input[name="city"]`).each((i, el) => {
      $(el).prop('checked', flag);
    });
  });

  $superBtn.on('click', (e) => {
    e.preventDefault();

    if (!$superBtn.prop('disabled')) {
      const product = mapObject.call(this, 'modalForm');

      if (!validator.validate(product)) {
        if (callback) {
          callback(product);
        }
        this.hide();
      } else {
        $name.blur();
        $email.blur();
        $count.blur();
        $price.blur();
      }
    }
  });
}

class ChangeModal extends Component {
  constructor(parentId = '') {
    super();
    this.parentId = parentId;
    this.modal = null;
    setEvents.bind(this);
    mapObject.bind(this);
  }

  render(product, callback, type = 'Edit') {
    const modal = changeModalTemplateFunc({
      product,
    });
    $('#modal-container').html(modal);
    this.modal = $(`#${this.parentId} #modalWindow`);
    this.modal.css('display', 'block');

    $(`#${this.parentId} #superBtn`).text(type);
    setEvents.call(this, callback, type);
  }

  hide() {
    this.modal.css('display', 'none');
  }
}

export default ChangeModal;
