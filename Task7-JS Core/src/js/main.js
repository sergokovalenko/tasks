var APP;

window.onload = function () {
    var calculator = APP.tasks.calculator,
        replacer = APP.tasks.stringReplacer,
        formater = APP.tasks.dateFormater,
        models = APP.models;

    models.init();

    Date.prototype.format = function (formatString, l10nString) {
        return formater.showFormatedDate(formatString, l10nString);
    };

    models.buttons.submitFirstTask.addEventListener('click', function () {
        var result = calculator.calculate(models.inputs.firstInput.value);

        models.outputs.firstResultBlock.innerHTML = result;
    });

    models.buttons.submitSecondTask.addEventListener('click', function () {
        var result = replacer.replaceDublicatedLettersInString(models.inputs.secondInput.value);

        models.outputs.secondResultBlock.innerHTML = result;
    });

    models.buttons.submitThirdTask.addEventListener('click', function () {
        var result = replacer.replaceDublicatedLettersInString(models.inputs.thirdInput.value);

        models.outputs.thirdResultBlock.innerHTML = result;
    });

    models.inputs.dateInput.addEventListener('input', function () {
        models.inputs.dateInput.value = models.inputs.dateInput.value.replace(/[^0-9\s]/g, '');
    });
};
