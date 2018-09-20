function convertPriceToNumber(number) {
  return number.toString().replace(/[$]|,/g, '');
}

function convertNumberToPrice(number) {
  let integer = number.toString().match(/[0-9]*/)[0];
  const fractional = number.toString().match(/[.][0-9]{1,2}/) ? number.toString().match(/[.][0-9]{1,2}/)[0] : '';
  let result = '$';
  const tmp = integer.length % 3;
  let matches = [];

  if (tmp === 2 || tmp === 1) {
    result += integer.slice(0, tmp);
    integer = integer.slice(tmp);
  }

  if (integer) {
    matches = integer.toString().match(/[0-9]{3}/g);

    for (let i = 0; i < matches.length; i += 1) {
      if (tmp === 0 && i === 0) {
        result += matches[i];
      } else {
        result += `,${matches[i]}`;
      }
    }
  }

  result += fractional;

  return result;
}

window.priceConvertor = {
  convertPriceToNumber,
  convertNumberToPrice,
};

export {
  convertPriceToNumber,
  convertNumberToPrice,
};
