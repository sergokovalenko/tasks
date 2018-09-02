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
            result = '',
            parsedDateString = '',
            selector = document.getElementById('l10n'),
            l10n = selector.options[selector.options.selectedIndex].value;

        parsedDateString = dateInputVal.split(' ').filter(function (n) {
            return n !== '';
        });

        console.log(parsedDateString);

        if (!parsedDateString && parsedDateString.length !== 6) {
            invalidDateActions();
            return;
        }

        date = new Date(parsedDateString[0], parsedDateString[1], parsedDateString[2], parsedDateString[3], parsedDateString[4], parsedDateString[5]);

        if (!date.getFullYear()) {
            invalidDateActions();
            return;
        }

        result = formater.showFormatedDate(models.inputs.thirdInput.value, l10n, date);
        models.outputs.thirdResultBlock.innerHTML = result;

        function invalidDateActions() {
            models.buttons.generateDate.click();
            result = formater.showFormatedDate(models.inputs.thirdInput.value, l10n, dateGenerator.getGeneratedDate());
            models.outputs.thirdResultBlock.innerHTML = result;
        }
    });

    models.inputs.dateInput.addEventListener('input', function () {
        models.inputs.dateInput.value = models.inputs.dateInput.value.replace(/[^0-9\s]/g, '');
    });

    models.buttons.generateDate.addEventListener('click', function () {
        models.inputs.dateInput.value = dateGenerator.getParamString();
    });
};