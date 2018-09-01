var APP = APP || {};

APP.createNamespace('APP.tasks.stringReplacer');

APP.tasks.stringReplacer = (function () {
    function replaceDuplicatedLettersInString(str) {
        var words = [],
            shortestWordInfo = {},
            letters = [],
            inputVal = '',
            result = '';

        inputVal = str;
        result = inputVal.split('');
        words = inputVal.split(/[.?,;:!]|\s/).filter(function (n) {
            return n !== '';
        });

        if (words.length === 0 || words.length === 1) {
            return inputVal;
        }

        shortestWordInfo = getShortestWord(words);
        letters = getUniqueLetters(shortestWordInfo.word);

        letters = letters.filter(function (el) {
            var i = 0;

            for (i = 0; i < words.length; i += 1) {
                if (shortestWordInfo.ind === i) {
                    continue;
                }

                if (words[i].indexOf(el) === -1) {
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
            result = {
                word: words[0],
                ind: 0
            };

        for (i = 1; i < words.length; i++) {
            if (result.word.length > words[i].length) {
                result.word = words[i];
                result.ind = i;
            }
        }

        return result;
    }

    function getUniqueLetters(word) {
        var i = 0,
            arr = word.toLowerCase().split(''),
            result = [];

        for (i = 0; i < arr.length; i += 1) {
            if (result.indexOf(arr[i]) === -1) {
                result.push(arr[i]);
            }
        }

        return result;
    }

    function removeDuplicatedLetters(letters, str) {
        var i = 0,
            j = 0;

        for (i = 0; i < str.length; i++) {
            for (j = 0; j < letters.length; j++) {
                if (str[i].toLowerCase() === letters[j]) {
                    str[i] = '';
                    break;
                }
            }
        }

        return str;
    }

    return {
        replaceDuplicatedLettersInString: replaceDuplicatedLettersInString
    };
}());
