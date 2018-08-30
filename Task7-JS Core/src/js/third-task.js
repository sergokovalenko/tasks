APP.createNamespace("APP.tasks.third");

APP.tasks.third = (function () {
    var result = 0,
        inputVal = "",
        input = {},
        resultBlock = {},
        regexp = /M{1,4}|yy(?:yy)?|([HMhmsd])\1?/g,
        submitBtn = {},
        dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
            MMM: function (date, i18n) {
                return i18n.monthNamesShort[date.getMonth()];
            },
            MMMM: function (date, i18n) {
                return i18n.monthNames[date.getMonth()];
            },
            d: function (date) {
                return date.getDay();
            },
            dd: function (date) {
                return withZero(date.getDay());
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
        val = String(val);
        len = len || 2;
        while (val.length < len) {
            val = '0' + val;
        }
        return val;
    }

    function getResultForThirdTask() {

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
        input = document.getElementsByClassName("third-task-val")[0];
        submitBtn = document.getElementsByClassName("submit-third-task")[0];
        submitBtn.addEventListener('click', function () {
            showResult();
        });

    }

    return {
        getResultForThirdTask: getResultForThirdTask,
        init: init
    };
})();

window.onload = function () {
    var calculator = APP.tasks.first,
        replacer = APP.tasks.second,
        dateWorker = APP.tasks.third;

    calculator.init();
    replacer.init();
    dateWorker.init();
};