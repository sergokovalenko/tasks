var APP = APP || {};

window.onload = function () {
    var calculator = APP.tasks.calculator,
        replacer = APP.tasks.stringReplacer,
        models = APP.models;

    models.init();
    models.buttons.submitFirstTask.addEventListener('click', function () {
        var result = calculator.calculate(models.inputs.firstInput.value);

        models.outputs.firstResultBlock.innerHTML = result;
    });

    models.buttons.submitSecondTask.addEventListener('click', function () {
        var result = replacer.replaceDuplicatedLettersInString(models.inputs.secondInput.value);

        models.outputs.secondResultBlock.innerHTML = result;
    });
};
