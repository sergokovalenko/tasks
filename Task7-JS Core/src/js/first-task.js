'use strict';
var APP = APP || {};

APP.createNamespace('APP.tasks.calculator');

APP.tasks.calculator = (function () {
    function calculate(inputValue) {
        var result = 0,
            str = '',
            i = 0,
            errorMessage = 'Invalid value',
            numbers = [],
            operators = [];

        if (!validate(inputValue)) {
            return errorMessage;
        }

        str = inputValue.replace(/[^0-9.+\-*/=]/g, '');
        str = str.substring(0, str.indexOf('=') + 1);

        numbers = str.match(/[0-9]+(\.[0-9]+)?/g);
        operators = str.match(/[-+/*]/g);

        if (!numbers) {
            return errorMessage;
        }

        result = +numbers[0];

        if (!operators) {
            return result;
        }

        if (numbers.length <= operators.length) {
            return errorMessage;
        }

        for (i = 1; i < numbers.length; i += 1) {
            switch (operators[i - 1]) {
                case '+':
                    result += +numbers[i];
                    break;
                case '-':
                    result -= +numbers[i];
                    break;
                case '*':
                    result *= +numbers[i];
                    break;
                case '/':
                    result /= +numbers[i];
                    break;
                default:
                    break;
            }
        }

        return roundNumber(result, 2);
    }

    function roundNumber(number, count) {
        var pow = Math.pow(10, count);

        return Math.round(number * pow) / pow;
    }

    function validate(value) {
        return /^[^=]*[0-9][^=]*=[^=]*$/.test(value);
    }

    return {
        calculate: calculate
    };
}());
