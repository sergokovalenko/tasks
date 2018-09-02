var APP = APP || {};

window.onload = function () {
    var calculator = APP.tasks.calculator,
        replacer = APP.tasks.stringReplacer,
        formater = APP.tasks.dateFormater,
        dateGenerator = APP.utilities.dateGenerator,
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
        var result = replacer.replaceDuplicatedLettersInString(models.inputs.secondInput.value);

        models.outputs.secondResultBlock.innerHTML = result;
    });

    models.buttons.submitThirdTask.addEventListener('click', function () {
        var dateInputVal = models.inputs.dateInput.value,
            date = {},
            result = '';
        var a = dateInputVal.split(' ').filter(function (n) {
            return n !== '';
        });

        console.log(a);

        if (!a && a.length !== 6) {
            models.buttons.generateDate.click();
            result = formater.showFormatedDate(models.inputs.thirdInput.value, 'en-US', dateGenerator.getGeneratedDate());
            models.outputs.thirdResultBlock.innerHTML = result;
            return;
        }

        date = new Date(a[0], a[1], a[2], a[3], a[4], a[5]);

        if (!date.getFullYear()) {
            models.buttons.generateDate.click();
            result = formater.showFormatedDate(models.inputs.thirdInput.value, 'en-US', dateGenerator.getGeneratedDate());
            models.outputs.thirdResultBlock.innerHTML = result;
            return;
        }

        result = formater.showFormatedDate(models.inputs.thirdInput.value, 'en-US', date);
        models.outputs.thirdResultBlock.innerHTML = result;
    });

    models.inputs.dateInput.addEventListener('input', function () {
        models.inputs.dateInput.value = models.inputs.dateInput.value.replace(/[^0-9\s]/g, '');
    });

    models.buttons.generateDate.addEventListener('click', function () {
        models.inputs.dateInput.value = dateGenerator.getParamString();
    });
};
