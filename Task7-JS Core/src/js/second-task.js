APP.createNamespace("APP.tasks.second");

APP.tasks.second = (function () {
    var result = 0,
        inputVal = "",
        input = {},
        resultBlock = {},
        submitBtn = {};

    function getResultForSecondTask() {
        var words = [],
            letters = [],
            i = 0,
            j = 0,
            result = '',
            flag = false;

        inputVal = input.value;
        result = inputVal.split('');
        words = inputVal.split(/[\.?,;:!]|\s/g).filter(function (n) {
            return n != ''
        });;

        if (words.length === 0) {
            return inputVal;
        }

        if (words.length === 1) {
            return words[0];
        }

        letters = words[0].split('');
        letters = letters.filter(function (el, ind) {
            var i = 0,
                j = 0,
                flag = false,
                regexpString = '',
                otherLetters = [];

            for (i = 1; i < words.length; i += 1) {
                otherLetters = words[i].split('');
                flag = false;

                for (j = 0; j < otherLetters.length; j++) {
                    if (el == otherLetters[j]) {
                        flag = true;
                        break;
                    }
                }

                if (!flag)
                    return false;
            }

            return true;
        })

        result = removeDuplicatedLetters(letters, result);

        return result.join('');
    }

    function removeDuplicatedLetters(letters, str) {
        for (i = 0; i < str.length; i++) {
            for (j = 0; j < letters.length; j++) {
                if (str[i] == letters[j]) {
                    str[i] = '';
                    break;
                }
            }
        }

        return str;
    }

    function showResult() {
        var result = getResultForSecondTask();
        resultBlock.innerText = result;
    }

    function init() {
        resultBlock = document.getElementsByClassName('result-value')[1];
        input = document.getElementsByClassName("second-task-val")[0];
        submitBtn = document.getElementsByClassName("submit-second-task")[0];
        submitBtn.addEventListener('click', function () {
            showResult();
        });
    }

    return {
        getResultForSecondTask: getResultForSecondTask,
        init: init
    }
})();

window.onload = function () {
    var calculator = APP.tasks.first,
        replacer = APP.tasks.second;

    calculator.init();
    replacer.init();
}