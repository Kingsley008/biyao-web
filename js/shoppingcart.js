(function (w, d, $) {
    /**
    *
    **/
    function Shoppingcart(options) {
        this.options = $.extend({},this.DEFAULT,options);

    }

    Shoppingcart.prototype = (function () {
        return {
            DEFAULT:{},
            initDOM: function () {

            }
        }
    })()

    $.extend({
        handleClick:function (options) {
            new Shoppingcart(options);
        }
    })

})(window, document. jQuery)