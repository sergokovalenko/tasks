var APP = APP || {};
APP.createNamespace = function (path) {
    var parts = path.split('.'),
        parent = APP,
        i = 0;

    if (parts[i] === 'APP') {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }

    return parent;
}

APP.createNamespace("APP.tasks.first");

APP.tasks.first = (function () {
    var result = 0,
        inputVal = "",
        input = {},
        resultBlock = {},
        submitBtn = {};

    function getResultForFirstTask() {
        var str = '',
            i = 0,
            j = 0,
            parsedNumber = 0,
            numbers = [],
            operators = [];
        inputVal = document.getElementsByClassName("first-task-val")[0].value;
        str = inputVal.replace(/[^0-9\.+\-*/=]/g, '');
        numbers = str.match(/[0-9]+(\.[0-9]+)?/g);
        operators = str.match(/[-+/*]/g);
        console.log(numbers);
        console.log(operators);

        if (numbers.length <= operators.length) {
            return "Invalid value";
        }
        result = +numbers[0];

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

        return result;
    }

    function validate(value) {
        if (!value || !/={2,}|[^0-9]+|[^-+/*]*/g.test(value)) {
            return false;
        }

        return true;
    }

    function showResult() {
        var result = getResultForFirstTask();
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
        getResultForFirstTask: getResultForFirstTask,
        showResult: showResult,
        init: init
    }
}());

window.onload = function () {
    var calculator = APP.tasks.first;
    calculator.init();
}