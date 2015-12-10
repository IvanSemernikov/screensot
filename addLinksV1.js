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
            return element.id.contains('error') && element.innerHTML.indexOf($this.startTag) > 0;
        },
        addLink: function (element, getter) {
            var text = element.innerHTML;

            var start = text.indexOf($this.startTag),
                end = text.substring(start).indexOf($this.endTag) + $this.endTag.length;

            var before = text.substring(0, start),
                after = text.substring(end);

            element.innerHTML = before + after + getter(text.substring(start, end));
        },
        getLink: function (src) {
            return ' <a target="_blank" href="' + src.substring($this.startTag.length, src.length) + '">Screenshot</a>';
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
