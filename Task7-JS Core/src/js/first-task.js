'use strict';
var APP = APP || {};

APP.createNamespace('APP.tasks.calculator');

APP.tasks.calculator = (function () {
    function calculate(inputValue) {
        var result = 0,
            matchArr = [],
            i = 0,
            errorMessage = 'Invalid value',
            str = '',
            expression = '',
            lastElem = ',',
            searchPattern = /[+-]?[0-9]+(\.[0-9]+)?|[-+*/]/g;

        if (!validate(inputValue)) {
            return errorMessage;
        }

        str = inputValue.replace(/([^0-9])\./g, '$1');
        str = str.replace(/[^0-9.+\-*/=]/g, '');
        str = str.replace(/([0-9])\.([^0-9])/g, '$1$2');
        str = str.substring(0, str.indexOf('=') + 1);
        expression = str;

        str = str.replace(/([^-+*/])[+]([^-+*/])/g, '$1++$2');
        str = str.replace(/([^-+*/])[-]([^-+*/])/g, '$1+-$2');

        matchArr = str.match(searchPattern);

        if (!matchArr || matchArr.length < 1) {
            return errorMessage;
        }

        lastElem = matchArr[matchArr.length - 1];

        if (lastElem === '+' || lastElem === '-' || lastElem === '*' || lastElem === '/') {
            return errorMessage;
        }

        result = +matchArr[0];

        for (i = 1; i < matchArr.length - 1; i++) {
            switch (matchArr[i]) {
                case '+':
                    result += +matchArr[i + 1];
                    break;
                case '-':
                    result -= +matchArr[i + 1];
                    break;
                case '*':
                    result *= +matchArr[i + 1];
                    break;
                case '/':
                    result /= +matchArr[i + 1];
                    break;
                case '=':
                    break;
                default:
                    continue;
            }
        }

        return expression + roundNumber(result, 2);
    }

    function roundNumber(number, count) {
        var pow = Math.pow(10, count);

        return (Math.round(number * pow) / pow).toFixed(count);
    }

    function validate(value) {
        if (!/^[^*/=]*[0-9][^=]*=[^=]*$/.test(value)) {
            return false;
        }

        return !/\/\*|\*\/|\/\/|\*\*/g.test(value) && !/[-+*/]{3,}/g.test(value) && !/[0-9]+\.[0-9]+\.[0-9]+/g.test(value);
    }

    return {
        calculate: calculate
    };
}());
