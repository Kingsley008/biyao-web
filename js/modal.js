(function (w,d,$) {
    var template = '\n' +
        '\n' +
        '    <div class="m-modal-wrap">\n' +
        '        <p class="text"></p>\n' +
        '        <button class="sure">确定</button>\n' +
        '        <button class="cancel">取消</button>\n' +
        '    </div>';

    // { message:'xxxxx', cancelCallback, sureCallback}
    function html2node() {
        var container = d.createElement('div');
        container.innerHTML = template;
        return container.children[0];
    }
    function Modal(options) {
        this.options = $.extend({},this.DEFAULT, options);
        this.prepareText().showModal().callback();
    }

    Modal.prototype = (function () {


        return {
            DEFAULT: {

            },
            _layout: html2node().cloneNode(true),
            prepareText:function () {
                var self = this;
                $(self._layout).find('.text').html(this.options.message);
                return self;
            },
            showModal: function () {
                $('.m-modal').show();
                d.body.appendChild(this._layout);
                return this;
            },
            callback:function () {
                var self = this;
                $(self._layout).find('.cancel').on('click', function () {
                    self.options.cancelCallback();
                    $('.m-modal').hide();
                    $(self._layout).remove();
                });

                $(self._layout).find('.sure').on('click', function () {
                    self.options.sureCallback();
                    $('.m-modal').hide();
                    $(self._layout).remove();
                })
            }
        }
    })();
    
    $.extend({
        modal: function (options) {
            new Modal(options);
        }
    })


})(window, document, jQuery)

