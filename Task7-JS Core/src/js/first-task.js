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
        var str = [],
            i = 0,
            j = 0,
            ind = 0,
            parsedNumber = 0;
        inputVal = document.getElementsByClassName("first-task-val")[0].value;
        str = inputVal.replace(/[^0-9\.+\-*/=]/g, '');
        result = parseFloat(str);
        ind = str.search(/[-+*/]/);

        if (ind == -1) {
            return result;
        }

        str = str.substring(ind + 1);

        for (i = 0, j = 0; i < str.length; i++) {
            var a = str[i];

            if (/[-+*/=]/.test(a)) {
                parsedNumber = parseFloat(str.substring(j, i));

                switch (a) {
                    case '+':
                        result += parsedNumber;
                        break;
                    case '-':
                        result -= parsedNumber;
                        break;
                    case '*':
                        result *= parsedNumber;
                        break;
                    case '/':
                        result /= parsedNumber;
                        break;
                    case '=':
                        return result;
                        break;
                    default:
                        break;
                }

                j = i;
            }
        }

        return result + parseFloat(str.substring(j));
    }

    function validate(value) {

    }

    function showResult() {
        var result = getResultForFirstTask();
        document.getElementsByClassName('result-value')[0].innerText += result;
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