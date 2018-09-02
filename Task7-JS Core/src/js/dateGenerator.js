'use strict';

var APP = APP || {};

APP.createNamespace('APP.utilities.dateGenerator');

APP.utilities.dateGenerator = (function () {
    var curDate = new Date(),
        generatedDate = null;

    function getRandomDate() {
        var year = 0,
            month = 0;

        year = getRandomInt(1000, curDate.getFullYear());
        month = getRandomInt(0, 11);
        generatedDate = new Date(year, month);
        generatedDate.setDate(getRandomInt(0, daysInMonth(generatedDate)));
        generatedDate.setHours(getRandomInt(0, 23));
        generatedDate.setMinutes(getRandomInt(0, 60));
        generatedDate.setSeconds(getRandomInt(0, 60));

        return generatedDate;
    }

    function getParamString() {
        var date = getRandomDate();

        return date.getFullYear() + " " + date.getMonth() + " " + date.getDate() + " " + date.getHours() + " " + date.getMinutes() + " " + date.getSeconds();
    }

    function getGeneratedDate() {
        return generatedDate ? generatedDate : getRandomDate();
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function daysInMonth(date) {
        return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate();
    }

    return {
        getRandomDate: getRandomDate,
        getParamString: getParamString,
        getGeneratedDate: getGeneratedDate
    };
}());
