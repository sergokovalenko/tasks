var APP = APP || {};

APP.createNamespace('APP.tasks.dateFormater');

APP.tasks.dateFormater = (function () {
    var regexp = /M{1,4}|yy(?:yy)?|([HMhmsd])\1?/g,
        currentL10n = {},
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
                return shorten(currentL10n.monthNames[date.getMonth()], 3);
            },
            MMMM: function (date) {
                return currentL10n.monthNames[date.getMonth()];
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
                return date.getHours() % 12 || 12;
            },
            hh: function (date) {
                return withZero(date.getHours() % 12 || 12);
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
            value = '0' + value;
        }
        return value;
    }

    function showFormatedDate(pattern, l10nString, date) {
        var curDate = null,
            curl10n = '',
            result = '';

        curDate = date || new Date();
        curl10n = l10nString || 'en-US';
        currentL10n = getL10n(curl10n);

        result = pattern.replace(regexp, function (match) {
            return formatFlags[match](curDate);
        });

        return result;
    }

    function shorten(value, length) {
        return value.substr(0, length);
    }

    function getL10n(l10nString) {
        var l18n = {};

        switch (l10nString.toLowerCase()) {
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
        showFormatedDate: showFormatedDate
    };
}());
