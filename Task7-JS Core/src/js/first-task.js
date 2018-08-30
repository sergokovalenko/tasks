"use strict";
APP.createNamespace("APP.tasks.calculator");

APP.tasks.calculator = (function () {
    function calculate(inputValue) {
        var result = 0,
            str = '',
            i = 0,
            errorMessage = "Invalid value",
            numbers = [],
            operators = [];

        if (!validate(inputValue)) {
            return errorMessage;
        }

        str = inputValue.replace(/[^0-9\.+\-*/=]/g, '');

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
        return (!value || /^[0-9]+[^=]*={1}[^=]*$/g.test(value));
    }

    return {
        calculate: calculate
    }
}());

window.onload = function () {
    var calculator = APP.tasks.calculator,
        models = APP.models;

    models.init();
    models.buttons.submitFirstTask.addEventListener('click', function(){
        var result = calculator.calculate(models.inputs.firstInput.value);
        models.outputs.firstResultBlock.innerHTML = result;
    });
}