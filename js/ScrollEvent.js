/* 滑动显示 */
(function (w,d,$) {
    function ScrollEvent(options) {
        this.options = $.extend({},this.DEFAULT,options);
        this.scrollTop = 0;
        this.documentH = $(window).height();
        this._initDom()._bindScroll();

    }
    ScrollEvent.prototype = (function () {

        return{
            DEFAULT:{},
            _initDom:function () {
                var self = this;
                self.$bd = $(self.options.bdSelector);
                self.$top = $(self.options.topSelector);
                self.$showMan = $(self.options.showManSelector);
                self.$fixedTop = $(self.options.topFixedSelector);
                return self;
            },
            _showFixedTop:function () {
                var self = this;
                self.$fixedTop.removeClass("f-dn");
            },
            _hideFixedTop:function () {
                var self = this;
                self.$fixedTop.addClass('f-dn');
            },
            _hideToTop:function () {
                var self = this;
                self.$top.hide();
            },
            _showToTop:function () {
                var self = this;
                self.$top.show();
            },
            _bindScroll:function () {
                var self = this;
                $(window).on('scroll',function (e) {
                    self.scrollTop = Math.floor($(window).scrollTop());
                    // 显示 隐藏 直达顶部 按钮
                    if(self.scrollTop <= 20){
                        console.log(self.scrollTop,1);
                        self._hideToTop();
                    } else {
                        self._showToTop();
                    }
                    // 顶部固定 导航
                    if(self.scrollTop > self.$bd.offset().top + 84){
                        self._showFixedTop();
                        console.log(self.documentH,self.$bd.offset().top + 84);
                    } else if (self.scrollTop <= 20){

                        self._hideFixedTop();
                    }
                    // 动态加载
                    if(self.documentH+self.scrollTop > self.$showMan.offset().top + self.$showMan.height()/2 ) {
                        $.get("data.json", null, function (data) {
                                self._appendProducts(data);
                            }
                        )
                    }
                }.bind(self));
                return self;
            },
            _appendProducts:function (data) {
                var self = this;
                var li = "";
                data.small.forEach(function (t) {
                    li += '   <li class="item-small">\n' +
                        '                <div class="hd">\n' +
                        '                    <a href=""><img src="'+ t.picUrl + '" width="204"></a>\n' +
                        '                </div>\n' +
                        '                <div class="bd">\n' +
                        '                    <a href="'+ t.url + '"><p class="item-small-intro f-toe">'+ t.intro + '</p></a>\n' +
                        '                    <span class="item-samll-price">&yen;'+ t.price + '</span>\n' +
                        '                </div>\n' +
                        '            </li>'
                })
                var $showMain = $('<div class="m-show f-center man">\n' +
                    '        <div class="nav f-cb">\n' +
                    '            <h3 class="m-title">'+ data.productTitle + '</h3>\n' +
                    '            <a class="nav-right" href="'+data.more-url+'">查看全部&gt;</a>\n' +
                    '        </div>\n' +
                    '        <ul class="m-show-wrap f-cb">\n' +
                    '            <li class="item-large">\n' +
                    '                <div class="hd">\n' +
                    '                    <a href="'+ data.large.url +'"><img src="'+ data.large.picUrl +'" width="423"></a>\n' +
                    '                </div>\n' +
                    '                <div class="bd">\n' +
                    '                    <p class="item-large-intro f-toe">'+ data.large.intro +'</p>\n' +
                    '                </div>\n' +
                    '            </li>\n' + li +
                    '             </ul></div>');
                console.log($showMain);
                self.$showMan.appendChild($showMain);
            }

        }
    })()
    $.extend({
        scrollEvent:function (options) {
            new ScrollEvent(options);
        }
    })
})(window,document,jQuery);