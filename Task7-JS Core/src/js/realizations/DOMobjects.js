'use strict';
var APP = APP || {};

APP.createNamespace('APP.models.inputs');
APP.createNamespace('APP.models.buttons');
APP.createNamespace('APP.models.outputs');

APP.models = (function () {
    var inputs = {
            firstInput: null,
            secondInput: null,
            thirdInput: null,
            dateInput: null
        },
        buttons = {
            submitFirstTask: null,
            submitSecondTask: null,
            submitThirdTask: null,
            generateDate: null
        },
        outputs = {
            firstResultBlock: null,
            secondResultBlock: null,
            thirdResultBlock: null
        };

    function init() {
        var btnArr = document.getElementsByClassName('submit-task'),
            outputArr = document.getElementsByClassName('result-value');

        inputs.firstInput = document.getElementById('task1-value');
        inputs.secondInput = document.getElementById('task2-value');
        inputs.thirdInput = document.getElementById('task3-value');
        inputs.dateInput = document.getElementById('task3-date');

        buttons.submitFirstTask = btnArr[0];
        buttons.submitSecondTask = btnArr[1];
        buttons.submitThirdTask = btnArr[2];
        buttons.generateDate = document.getElementsByClassName('generate-date')[0];

        outputs.firstResultBlock = outputArr[0];
        outputs.secondResultBlock = outputArr[1];
        outputs.thirdResultBlock = outputArr[2];
    }

    return {
        inputs: inputs,
        outputs: outputs,
        buttons: buttons,
        init: init
    };
}());
