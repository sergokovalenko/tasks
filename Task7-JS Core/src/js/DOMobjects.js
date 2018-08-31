"use strict";
APP.createNamespace("APP.models.inputs");
APP.createNamespace("APP.models.buttons");
APP.createNamespace("APP.models.outputs");

APP.models = (function () {
    var inputs = {
            firstInput: null,
            secondInput: null,
            thirdInput: null
        },
        buttons = {
            submitFirstTask: null,
            submitSecnodTask: null,
            submitThirdTask: null
        },
        outputs = {
            firstResultBlock: null,
            secondResultBlock: null,
            thirdResultBlock: null
        };

    function init() {
        var inputArr = document.getElementsByClassName('task-value'),
            btnArr = document.getElementsByClassName('submit-task'),
            outputArr = document.getElementsByClassName('result-value');

        inputs.firstInput = inputArr[0];
        inputs.secondInput = inputArr[1];
        inputs.thirdInput = inputArr[2];

        buttons.submitFirstTask = btnArr[0];
        buttons.submitSecnodTask = btnArr[1];
        buttons.submitThirdTask = btnArr[2];

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