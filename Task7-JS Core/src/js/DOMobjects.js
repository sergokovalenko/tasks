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

        firstInput = inputArr[0];
        secondInput = inputArr[1];
        thirdInput = inputArr[2];

        submitFirstTask = btnArr[0];
        submitSecnodTask = btnArr[1];
        submitThirdTask = btnArr[2];

        firstResultBlock = outputArr[0];
        secondResultBlock = outputArr[1];
        thirdResultBlock = outputArr[2];
    }    
}());