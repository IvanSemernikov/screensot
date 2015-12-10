document.addEventListener('DOMContentLoaded', function () {
    controller.init()
}, false);

var controller = (function () {

    $this = {
        startTag: '@link@',
        endTag: '.png',

        addLinks: function () {
            var elemList = $this.getElements("#main-panel-content td.pane div.failure-summary pre");
            for (i = 0; i < elemList.length; i++) {
                $this.addLink(elemList[i], $this.getLink);
            }
        },

        getElements: function (selector) {
            var result = [],
                elemList = document.querySelectorAll(selector);

            for (i = 0; i < elemList.length; i++) {
                if ($this.hasLinkSrc(elemList[i])) {
                    result.push(elemList[i]);
                }
            }
            return result;
        },

        hasLinkSrc: function (element) {
            return element.innerHTML.indexOf($this.startTag) > 0
        },

        addLink: function (element, getter) {

            var text = element.innerHTML;
            var start = text.indexOf($this.startTag),
                end = text.indexOf($this.endTag + 4);

            var before = text.substring(0, start),
                after = text.substring(end);

            element.innerHTML = before + after + getter(text.substring(start, end + 4));
        },

        getLink: function (src) {
            return ' <a target="_blank" href="' + src.substring(6, src.length) + '">Screenshot</a>';
        }
    };

    return {
        init: function () {
            document.body.addEventListener('click', function (e) {
                if (e.target.classList.contains("icon-document-add")) {
                    setTimeout($this.addLinks, 500);
                }
            });
        }
    }
})();