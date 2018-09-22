import $ from 'jquery';
import { changeModalTemplateFunc } from './../templates';
import validator from './../utilities/valid';

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
  const $selectAllBox = $(`#${this.parentId} #select-all`);

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
        callback(product);
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

class ChangeModal {
  constructor(parentId = '') {
    this.parentId = parentId;
    this.modal = null;
    setEvents.bind(this);
    mapObject.bind(this);
  }

  show(product, callback, type = 'Edit') {
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
