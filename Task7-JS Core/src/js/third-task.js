var APP = APP || {};

APP.createNamespace('APP.tasks.dateFormater');

APP.tasks.dateFormater = (function () {
    var input = {},
        resultBlock = {},
        submitBtn = {},
        regexp = /M{1,4}|yy(?:yy)?|([HMhmsd])\1?/g,
        currentL18n = {},
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
            MMM: function (date) {
                return shorten(currentL18n.monthNames[date.getMonth()], 3);
            },
            MMMM: function (date) {
                return currentL18n.monthNames[date.getMonth()];
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
            h: function (date) {
                return date.getHours();
            },
            hh: function (date) {
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

    function showFormatedDate(pattern, l18nString) {
        var date = new Date(2015, 2, 4, 5, 7, 8);

        l18nString = l18nString || 'en-US';
        currentL18n = getL18n(l18nString);

        pattern = pattern.replace(regexp, function (match) {
            return formatFlags[match](date);
        });

        return pattern;
    }

    function shorten(value, length) {
        return value.substr(0, length);
    }

    function showResult() {
        var result = showFormatedDate(input.value);

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

    function getL18n(l18nString) {
        var l18n = {};

        switch (l18nString.toLowerCase()) {
            case 'ru-ru':
                l18n.monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
                break;
            default:
                l18n.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                break;
        }

        return l18n;
    }

    return {
        showFormatedDate: showFormatedDate,
        init: init
    };
}());

window.onload = function () {
    var calculator = APP.tasks.first,
        replacer = APP.tasks.second,
        dateFormater = APP.tasks.dateFormater;

    calculator.init();
    replacer.init();
    dateFormater.init();
};
