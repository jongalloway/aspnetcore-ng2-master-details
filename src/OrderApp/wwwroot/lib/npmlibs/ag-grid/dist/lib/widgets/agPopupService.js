/**
 * ag-grid - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v3.3.3
 * @link http://www.ag-grid.com/
 * @license MIT
 */
var utils_1 = require('../utils');
var constants_1 = require("../constants");
var PopupService = (function () {
    function PopupService() {
    }
    PopupService.prototype.init = function (ePopupParent) {
        this.ePopupParent = ePopupParent;
    };
    PopupService.prototype.positionPopup = function (eventSource, ePopup, keepWithinBounds) {
        var sourceRect = eventSource.getBoundingClientRect();
        var parentRect = this.ePopupParent.getBoundingClientRect();
        var x = sourceRect.left - parentRect.left;
        var y = sourceRect.top - parentRect.top + sourceRect.height;
        // if popup is overflowing to the right, move it left
        if (keepWithinBounds) {
            var minWidth;
            if (ePopup.clientWidth > 0) {
                minWidth = ePopup.clientWidth;
            }
            else {
                minWidth = 200;
            }
            var widthOfParent = parentRect.right - parentRect.left;
            var maxX = widthOfParent - minWidth;
            if (x > maxX) {
                x = maxX;
            }
            if (x < 0) {
                x = 0;
            }
        }
        ePopup.style.left = x + "px";
        ePopup.style.top = y + "px";
    };
    //adds an element to a div, but also listens to background checking for clicks,
    //so that when the background is clicked, the child is removed again, giving
    //a model look to popups.
    PopupService.prototype.addAsModalPopup = function (eChild, closeOnEsc) {
        var eBody = document.body;
        if (!eBody) {
            console.warn('ag-grid: could not find the body of the document, document.body is empty');
            return;
        }
        var popupAlreadyShown = utils_1.default.isVisible(eChild);
        if (popupAlreadyShown) {
            return;
        }
        this.ePopupParent.appendChild(eChild);
        var that = this;
        // if we add these listeners now, then the current mouse
        // click will be included, which we don't want
        setTimeout(function () {
            if (closeOnEsc) {
                eBody.addEventListener('keydown', hidePopupOnEsc);
            }
            eBody.addEventListener('click', hidePopup);
            eChild.addEventListener('click', consumeClick);
        }, 0);
        var eventFromChild = null;
        function hidePopupOnEsc(event) {
            var key = event.which || event.keyCode;
            if (key === constants_1.default.KEY_ESCAPE) {
                hidePopup(null);
            }
        }
        function hidePopup(event) {
            if (event && event === eventFromChild) {
                return;
            }
            that.ePopupParent.removeChild(eChild);
            eBody.removeEventListener('keydown', hidePopupOnEsc);
            eBody.removeEventListener('click', hidePopup);
            eChild.removeEventListener('click', consumeClick);
        }
        function consumeClick(event) {
            eventFromChild = event;
        }
        return hidePopup;
    };
    return PopupService;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PopupService;
