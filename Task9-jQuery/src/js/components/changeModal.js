import $ from 'jquery';
import { changeModalTemplateFunc } from './../templates';
import validator from './../utilities/valid';

function blurEvent(field, fieldName, $submitBtn) {
  const value = $(field).val();
  const hasError = validator.validate({
    name: value,
  });
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
  const serialized = $(`#${formId}`).serializeArray();
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
  const $superBtn = $('#superBtn');
  const $close = $('#close');
  const $name = $('#name');
  const $email = $('#email');
  const $count = $('#count');
  const $price = $('#price');
  const $selectAllBox = $('#select-all');

  $close.on('click', () => {
    this.modal.css('display', 'none');
  });

  $name.on('blur', function nameClick() {
    blurEvent(this, 'name', $superBtn);
  });

  $email.on('blur', function emailClick() {
    blurEvent(this, 'email', $superBtn);
  });

  $count.on('blur', function countClick() {
    blurEvent(this, 'count', $superBtn);
  });

  $count.bind('input propertychange', function a() {
    const input = $(this);
    input.val(input.val().replace(/[^0-9]/g, ''));
  });

  $price.on('blur', function nameClick() {
    blurEvent(this, 'price', $superBtn);
    const product = mapObject('modalForm');

    console.log(product);
  });

  $selectAllBox.on('click', () => {
    const flag = $selectAllBox.prop('checked');

    $('input[name="city"]').each((i, el) => {
      $(el).prop('checked', flag);
    });
  });

  $superBtn.on('click', (e) => {
    e.preventDefault();

    if (!$superBtn.prop('disabled')) {
      const product = mapObject('modalForm');

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
  constructor(logic, elemId) {
    this.logic = logic;
    this.elem = $(`#${elemId}`);
    this.modal = null;
    setEvents.bind(this);
  }

  show(id, callback) {
    let modal;
    if (id <= -1000) {
      const product = {
        name: '',
        price: '',
        email: '',
        count: '',
      };
      modal = changeModalTemplateFunc({
        product,
      });
    } else {
      const product = this.logic.getElementById(id);
      modal = changeModalTemplateFunc({
        product,
      });
    }
    this.elem.html(modal);
    this.modal = $('#modalWindow');
    this.modal.css('display', 'block');

    setEvents.call(this, callback);
  }

  hide() {
    this.modal.css('display', 'none');
  }
}

export default ChangeModal;
