"use strict";
APP.createNamespace("APP.tasks.first");

APP.tasks.first = (function () {
    var result = 0,
        inputVal = "",
        input = {},
        resultBlock = {},
        submitBtn = {};

    function calculate() {
        var str = '',
            i = 0,
            errorMessage = "Invalid value",
            numbers = [],
            operators = [],
            inputVal = document.getElementsByClassName("first-task-val")[0].value;

        if (!validate(inputVal)) {
            return errorMessage;
        }

        str = inputVal.replace(/[^0-9\.+\-*/=]/g, '');

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
            }
        }

        return roundNumber(result, 2);
    }

    function roundNumber(number, count) {
        count = Math.pow(10, count);

        return Math.round(number * count) / count;
    }

    function validate(value) {
        return (!value || /[0-9]+.*={1}|[-/*+]/g.test(value));
    }

    function showResult() {
        var result = calculate();
        resultBlock.innerText = result;
    }

    function init() {
        resultBlock = document.getElementsByClassName('result-value')[0];
        input = document.getElementsByClassName("first-task-val")[0];
        submitBtn = document.getElementsByClassName("submit-first-task")[0];
        submitBtn.addEventListener('click', function () {
            showResult();
        });
    }

    return {
        calculate: calculate,
        init: init
    }
}());

window.onload = function () {
    var calculator = APP.tasks.first;
    calculator.init();
}