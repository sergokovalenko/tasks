APP.createNamespace("APP.tasks.third");

APP.tasks.third = (function () {
    var result = 0,
        inputVal = "",
        input = {},
        resultBlock = {},
        regexp = /M{1,4}|yy(?:yy)?|([HMhmsd])\1?/g,
        submitBtn = {},
        dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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