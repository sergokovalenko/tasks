const regexps = APP.utilities.validation.regexp;

function setValidatation(input, errorBlock, validateFunc) {
  var text = input.val().trim();
  errorMessage = validateFunc(text);
  if (errorMessage) {
    input.toggleClass('invalid');
    errorBlock.innerHTML = errorMessage;
  }
  input.val(text);
}

function removeError(input, errorBlock) {
  if (input.hasClass('invalid')) {
    input.removeClass('invalid')
  }
  errorBlock.innerHTML = '';
}

function validateName(text) {
  if (!text) {
    return 'Name is empty';
  }
  const matches = text.match(regexps.onlyEnglish);
  if (text.search(regexps.onlySpace) >= 0) {
    return 'The field should contain letters';
  }
  if (text.length > 15) {
    return 'The lenght must be less then 15 symbols';
  }
  if (!matches || matches.length !== text.length) {
    return 'Use only english letters and numbers';
  }
  return '';
}

function validateCount(text) {
  if (text.length > 3) {
    return 'Max count is 999';
  }
  if (text.search(regexps.onlyInteger) === -1) {
    return 'Uncorrect number';
  }
  return '';
}

function validatePrice(text) {
  if (text.length > 12) {
    return 'Max price length is 12 digits';
  }
  if (text.search(regexps.onlyDouble) === -1) {
    return 'Uncorrect price. Min: 0, max: 99999999.99';
  }
  return '';
}

export {
  setValidatation,
  validateCount,
  validateName,
  validatePrice,
  removeError,
};
