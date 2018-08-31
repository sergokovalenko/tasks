var APP = APP || {};

APP.createNamespace('APP.tasks.stringReplacer');

APP.tasks.stringReplacer = (function () {
    var inputVal = '';

    function replaceDublicatedLettersInString(str) {
        var words = [],
            letters = [],
            result = '';

        inputVal = str;
        result = inputVal.split('');
        words = inputVal.split(/[.?,;:!]|\s/g).filter(function (n) {
            return n !== '';
        });

        if (words.length === 0) {
            return inputVal;
        }

        if (words.length === 1) {
            return words[0];
        }

        letters = getShortestWord(words).split('');

        letters = letters.filter(function (el) {
            var i = 0,
                j = 0,
                flag = false,
                otherLetters = [];

            for (i = 1; i < words.length; i += 1) {
                otherLetters = words[i].split('');
                flag = false;

                for (j = 0; j < otherLetters.length; j++) {
                    if (el === otherLetters[j]) {
                        flag = true;
                        break;
                    }
                }

                if (!flag) {
                    return false;
                }
            }

            return true;
        });

        result = removeDuplicatedLetters(letters, result);

        return result.join('');
    }

    function getShortestWord(words) {
        var i = 1,
            result = words[0];

        for (i = 1; i < words.length; i++) {
            if (result.length > words[i].length) {
                result = words[i];
                result.length = words[i].length;
            }
        }

        return result;
    }

    function removeDuplicatedLetters(letters, str) {
        var i = 0,
            j = 0;

        for (i = 0; i < str.length; i++) {
            for (j = 0; j < letters.length; j++) {
                if (str[i] === letters[j]) {
                    str[i] = '';
                    break;
                }
            }
        }

        return str;
    }

    return {
        replaceDublicatedLettersInString: replaceDublicatedLettersInString
    };
}());
