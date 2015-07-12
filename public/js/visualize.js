function trim(s) {
    return s.replace(/^\s+/, '').replace(/\s+$/, '');
}

window.addEventListener('DOMContentLoaded', function() {
    raphael = require('regulex').Raphael;
    parse = require('regulex').parse;
    visualize = require('regulex').visualize;
    Kit = require('regulex').Kit;
    init(raphael, visualize, parse, Kit);
});

function init(R, visualize, parse, K) {
    var paper = R('regex_visualize', 0, 0);
    var errorBox = document.getElementById('regex_visualize_errors');
    var input = document.getElementById('regex');
    var flags = document.getElementById('options');
    var getInputValue = function() {
        return trim(input.value);
    };
    var setInputValue = function(v) {
        return input.value = trim(v);
    };

    initListeners();
    visualizeContainer();

    function visualizeContainer(skipError) {
        var re = getInputValue();
        hideError();
        var ret;
        try {
            ret = parse(re)
        } catch (e) {
            if (e instanceof parse.RegexSyntaxError) {
                if (!skipError) {
                    showError(re, e);
                }
            } else throw e;
            return false;
        }
        visualize(ret, getFlags(), paper);
        return true;
    }

    function hideError() {
        errorBox.style.display = 'none';
    }

    function showError(re, err) {
        errorBox.style.display = 'block';
        var msg = ["Error:" + err.message, ""];
        if (typeof err.lastIndex === 'number') {
            msg.push(re);
            msg.push(K.repeats('-', err.lastIndex) + "^");
        }
        setInnerText(errorBox, msg.join("\n"));
    }

    function initListeners() {
        var LF = '\n'.charCodeAt(0),
            CR = '\r'.charCodeAt(0);
        input.addEventListener('keydown', onEnter);
        input.addEventListener('keyup', onKeyup);
        input.addEventListener('paste', function(evt) {
            var content = trim(evt.clipboardData.getData('text'));
            if (content[0] === '/' && /\/[img]*$/.test(content)) {
                evt.preventDefault();
                var endIndex = content.lastIndexOf('/');
                content = content.slice(1, endIndex);
                setInputValue(content);
            }
            setTimeout(visualizeContainer, 50);
        });

        flags.addEventListener('change', onChangeFlags);

        function onChangeFlags(e) {
            visualizeContainer();
        }
        var onKeyupTid;

        function onKeyup(e) {
            if (e.keyCode === LF || e.keyCode === CR) {
                return true;
            }
            clearTimeout(onKeyupTid);
            onKeyupTid = setTimeout(function() {
                var skipError = true;
                visualizeContainer(skipError);
            }, 100);
        }

        function onEnter(e) {
            if (e.keyCode === LF || e.keyCode === CR) {
                e.preventDefault();
                e.stopPropagation();
                visualizeContainer();
            }
        }
    }

    function getFlags() {
        return flags.value;
    }

    function setInnerText(ele, s) {
        ele.innerHTML = '';
        var t = document.createTextNode('');
        t.nodeValue = s;
        ele.appendChild(t);
        return s;
    }

}
