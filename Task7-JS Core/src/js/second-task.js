APP.createNamespace("APP.tasks.second");

APP.tasks.second = (function () {
    var result = 0,
        inputVal = "",
        input = {},
        resultBlock = {},
        submitBtn = {};

    function getResultForSecondTask() {

    }

    function init() {
        resultBlock = document.getElementsByClassName('result-value')[1];
        input = document.getElementsByClassName("second-task-val")[0];
        submitBtn = document.getElementsByClassName("submit-first-task")[0];
        submitBtn.addEventListener('click', function () {
            showResult();
        });
    }

    return {
        getResultForSecondTask: getResultForSecondTask,
        init: init
    }
})();