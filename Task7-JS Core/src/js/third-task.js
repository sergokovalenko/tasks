var APP = APP || {};

APP.createNamespace('APP.tasks.third');

APP.tasks.third = (function () {
    var input = {},
        resultBlock = {},
        submitBtn = {},
        regexp = /M{1,4}|yy(?:yy)?|([HMhmsd])\1?/g,
        monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        formatFlags = {
            yy: function (date) {
                return String(date.getFullYear()).substr(2);
            },
            yyyy: function (date) {
                return withZero(date.getFullYear(), 4);
            },
            M: function (date) {
                return date.getMonth() + 1;
            },
            MM: function (date) {
                return withZero(date.getMonth() + 1);
            },
            MMM: function (date, localization) {
                return shorten(monthNames[date.getMonth()], 3);
            },
            MMMM: function (date, localization) {
                return monthNames[date.getMonth()];
            },
            d: function (date) {
                return date.getDay() + 1;
            },
            dd: function (date) {
                return withZero(date.getDay() + 1);
            },
            H: function (date) {
                return date.getHours();
            },
            HH: function (date) {
                return withZero(date.getHours());
            },
            h: function (date, localization) {
                return date.getHours();
            },
            hh: function (date, localization) {
                return withZero(date.getHours());
            },
            m: function (date) {
                return date.getMinutes();
            },
            mm: function (date) {
                return withZero(date.getMinutes());
            },
            s: function (date) {
                return date.getSeconds();
            },
            ss: function (date) {
                return withZero(date.getSeconds());
            }
        };

    function withZero(val, len) {
        var value = String(val),
            length = len || 2;

        while (value.length < length) {
            value = '0' + value.toString();
        }
        return value;
    }

    function getResultForThirdTask() {
        var value = input.value,
            date = new Date(2015, 2, 4, 5, 7, 8);

        value = value.replace(regexp, function (match) {
            return formatFlags[match](date);
        });

        return value;
    }

    function shorten(value, length) {
        return value.substr(0, length);
    }

    function showResult() {
        var result = getResultForThirdTask();

        resultBlock.innerText = result;
    }

    function init() {
        resultBlock = document.getElementsByClassName('result-value')[2];
        input = document.getElementsByClassName('third-task-val')[0];
        submitBtn = document.getElementsByClassName('submit-third-task')[0];
        submitBtn.addEventListener('click', function () {
            showResult();
        });
    }

    return {
        getResultForThirdTask: getResultForThirdTask,
        init: init
    };
}());

window.onload = function () {
    var calculator = APP.tasks.first,
        replacer = APP.tasks.second,
        dateWorker = APP.tasks.third;

    calculator.init();
    replacer.init();
    dateWorker.init();
};
