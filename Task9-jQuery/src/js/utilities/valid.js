const validator = {
  types: {
    isNonEmpty: {
      validate(value) {
        return value !== '';
      },
      errorMessage: 'the value cannot be empty',
    },
    isInteger: {
      validate(value) {
        return /^[1-9][0-9]{0,2}$/.test(value);
      },
      errorMessage: 'the value can only contain numbers',
    },
    isDoubleNumber: {
      validate(value) {
        return /^([1-9][0-9]{0,7}(.[0-9]{1,2})?)|(0[.][0-9]{1,2})$/.test(value);
      },
      errorMessage: 'the value can only contain double numbers',
    },
    isAlphaNum: {
      validate(value) {
        return /[a-z0-9]+/i.test(value);
      },
      errorMessage: 'the value can only contain characters and numbers, no special symbols',
    },
    isNumber: {
      validate(value) {
        return !Number.isNaN(value);
      },
      errorMessage: 'the value can only be a valid number, e.g.1, 3.14 or 2010',
    },
    isEmail: {
      validate(value) {
        return /^[a-z0-9]+([a-z0-9._-]*[a-z0-9]+)?@([a-z0-9]+([a-z0-9-]*[a-z0-9]+)?\.)+[a-z]{2,6}$/.test(value);
      },
      errorMessage: 'invalid email address',
    },
    isNonEmptyArr: {
      validate(value) {
        return value.length > 0;
      },
      errorMessage: 'you should select city',
    },
  },

  messages: [],

  config: {
    name: ['isNonEmpty', 'isAlphaNum'],
    email: ['isNonEmpty', 'isEmail'],
    count: ['isInteger'],
    price: ['isDoubleNumber'],
    country: ['isNonEmpty'],
    city: ['isNonEmptyArr'],
  },

  validate(data) {
    this.messages = [];
    const keys = Object.keys(data);
    keys.forEach((key) => {
      if (this.config[key]) {
        this.config[key].forEach((i) => {
          const checker = this.types[i];
          if (i) {
            if (!checker) {
              const obj = {
                name: 'ValidationError',
                message: `No handler to validate type ${i}`,
              };
              throw obj;
            }

            const resultOk = checker.validate(data[key]);
            if (!resultOk) {
              const msg = `Invalid value for * ${key} * , ${checker.errorMessage}`;
              this.messages.push(msg);
            }
          }
        });
      }
    });

    return this.hasErrors();
  },

  hasErrors() {
    return this.messages.length !== 0;
  },
};

export default validator;
