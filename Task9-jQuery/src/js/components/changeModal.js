import $ from 'jquery';
import { changeModalTemplateFunc } from './../templates';
import validator from './../utilities/valid';
import Component from './component';
import { convertNumberToPrice, convertPriceToNumber } from '../utilities/priceConvertor';

function blurEvent($field, fieldName, $submitBtn) {
  let value = $field.val();
  if (fieldName.localeCompare('price') === 0) {
    value = convertPriceToNumber($field.val());
  }

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

function mapObject(formClass) {
  const product = {};
  const serialized = $(`#${this.parentId} .${formClass}:eq(0)`).serializeArray();
  product.price = convertPriceToNumber(product.price);
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
  const $superBtn = $(`#${this.parentId} .superBtn:eq(0)`);
  const $close = $(`#${this.parentId} .close:eq(0)`);
  const $name = $(`#${this.parentId} .name-input:eq(0)`);
  const $email = $(`#${this.parentId} .email-input:eq(0)`);
  const $count = $(`#${this.parentId} .count-input:eq(0)`);
  const $price = $(`#${this.parentId} .price-input:eq(0)`);
  const $delivery = $(`#${this.parentId} .delivery:eq(0)`);
  const $selectAllBox = $(`#${this.parentId} .select-all:eq(0)`);
  const $countriesBlock = $(`#${this.parentId} .countries:eq(0)`);
  const $citiesBlock = $(`#${this.parentId} .cities:eq(0)`);
  let prevSelection = '';

  $delivery.on('click', () => {
    const text = $(`#${this.parentId} .delivery:eq(0) option:selected`).text();
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

  $count.bind('input propertychange', () => {
    $count.val($count.val().replace(/[^0-9]/g, ''));
  });

  $price.on('blur', () => {
    blurEvent($price, 'price', $superBtn);
    $price.val(convertNumberToPrice($price.val()));
  });

  $price.on('focus', () => {
    $price.val(convertPriceToNumber($price.val()));
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
      if (validator.validate({
        city: product.city,
        country: product.country,
      })) {
        $(`#${this.parentId} .error-delivery`).html(validator.messages[0]);
        return;
      }

      $(`#${this.parentId} .error-delivery`).html(validator.messages[0]);
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
    this.templateFunc = changeModalTemplateFunc;
    this.modal = null;
    setEvents.bind(this);
    mapObject.bind(this);
  }

  render(product, callback, type = 'Edit') {
    const modal = this.templateFunc({
      product,
    });
    $(`#${this.parentId} .modal-container:eq(0)`).html(modal);
    this.modal = $(`#${this.parentId} .modalWindow:eq(0)`);
    this.modal.css('display', 'block');

    $(`#${this.parentId} .superBtn`).text(type);
    setEvents.call(this, callback, type);
  }

  hide() {
    this.modal.css('display', 'none');
  }
}

export default ChangeModal;
