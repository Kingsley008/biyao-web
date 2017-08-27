/*m-slider 1*/
(function (w, d, $) {
    function MySlider(options) {
        this.options = $.extend({}, this.DEFAULT, options);
        this.offsetAll = 0;
        this.offset = 1;
        this.currentIndex = 0;
        this.TimeHandler = "";
        this._initDom()._showNext()._bindNext()._bindPrev()._bindInterval()._hover();
    }

    MySlider.prototype = (function () {
        return {
            DEFAULT: {
                imgs: null
            },
            /* 初始化DOM节点 */
            _initDom: function () {
                var self = this;
                self.$sliders = $(self.options.slidersSelector);
                self.$prev = $(self.options.prevSelector);
                self.$next = $(self.options.nextSelector);
                self.$hint = $(self.options.hintSelector);
                self.$banner = $(self.options.bannerSelector);
                self.picLength = self.$sliders.children().length;
                return self;
            },
            /* 展示下一张幻灯片 */
            _showNext: function () {
                var self = this;
                self.offsetAll += self.offset;
                self.calca();
                self._bindHint();
                return self;
            },
            /* 展示前一张 */
            _showPrev: function () {
                var self = this;
                self.offsetAll -= self.offset;
                self.calca();
                self._bindHint();
                return self;
            },
            /* 计算当前展示的图片下标 */
            calca: function () {
                var self = this;
                self.currentIndex = self.offsetAll % self.picLength;
                self.$sliders.children().removeClass('showSlider');
                self.$sliders.children().eq(self.currentIndex - 1).addClass("showSlider");

            },
            /* 绑定向前按钮 */
            _bindPrev: function () {
                var self = this;
                self.$prev.on("click", function () {
                    self._showPrev()._bindHint();
                });
                return self;
            },
            /* 绑定向后按钮*/
            _bindNext: function () {
                var self = this;
                self.$next.on("click", function () {
                    self._showNext()._bindHint();
                });
                return self;
            },
            /* 绑定圆点 索引*/
            _bindHint: function () {
                var self = this;
                if (self.$hint.children().length !== self.$sliders.children().length) {
                    return;
                } else {
                    self.$hint.children().eq(self.currentIndex - 1).siblings().removeClass('hintActive');
                    self.$hint.children().eq(self.currentIndex - 1).addClass('hintActive');
                }
                self.$hint.on('click', function (e) {
                    var target = e.target;
                    var num = parseInt($(target).attr("data-num"));
                    self.offsetAll = num;
                    self._showNext();
                });
                return self;

            },
            /* 绑定计时器 */
            _bindInterval: function () {
                var self = this;
                self.TimeHandler = setInterval(self._showNext.bind(self), 3000);
                return self;
            },
            /* 解除计时器 */
            _removeInterval: function () {
                var self = this;
                clearInterval(self.TimeHandler);
                return self;
            },
            /* 定义hover 定时器 加绑 解绑 以及 图标显示*/
            _hover: function () {
                var self = this;
                self.$sliders.children().hover(self._removeInterval.bind(self), self._bindInterval.bind(self));
                self.$banner.hover(function () {
                    self.$prev.fadeIn();
                    self.$next.fadeIn();
                }, function () {
                    self.$prev.fadeOut();
                    self.$next.fadeOut();
                });
            }

        }
    })();

    $.extend({
        mySlider: function (options) {
            new MySlider(options);
        }
    })
})(window, document, jQuery);
/*m-slider 2*/
var hoverSelected = function () {
    var $items = $('.selected-items')
    $items.children().hover(function (e) {
        $(this).siblings().removeClass('hovered');
        $(this).removeClass('hoveredElse');
        $(this).addClass('hovered');
        $(this).siblings().addClass('hoveredElse');
    }, function (e) {
        $items.children().eq(0).siblings().removeClass('hovered');
        $items.children().eq(0).removeClass('hoveredElse');
        $items.children().eq(0).addClass('hovered');
        $items.children().eq(0).siblings().addClass('hoveredElse');
    });
};
/*m-new-product*/
(function (w, d, $) {
    function ShowNewProducts(options) {
        this.options = $.extend({}, this.DEFAULT, options);
        this.intervalHandler = "";
        this.initDom()._bindBtn()._autoPlay()._hover();
    }

    ShowNewProducts.prototype = (function () {

        return {
            DEFAULT: {},
            initDom: function () {
                var self = this;
                self.$sliderMove = $(self.options.sliderMoveSelector);
                self.$prve = $(self.options.prveSelector);
                self.$next = $(self.options.nextSelector);
                return self;
            },
            _bindBtn: function () {
                var self = this;
                self.$next.on('click', function () {
                    self._next();
                });
                self.$prve.on('click', function () {
                    self._prve();
                });
                return self;
            },
            _autoPlay: function () {
                var self = this;
                if (self.options.autoPlay) {
                    self.intervalHandler = setInterval(self._next.bind(self), self.options.time);
                }
                return self;
            },
            _hover: function () {
                var self = this;
                self.$sliderMove.hover(function () {
                        self._removeAutoPlay(self.intervalHandler);
                    },
                    self._autoPlay.bind(self)
                );
                self.$prve.hover(function () {
                        self._removeAutoPlay(self.intervalHandler);
                    },
                    self._autoPlay.bind(self)
                );
                self.$next.hover(function () {
                        self._removeAutoPlay(self.intervalHandler);
                    },
                    self._autoPlay.bind(self)
                );
                return self;
            },
            _removeAutoPlay: function (handler) {
                clearInterval(handler);
            },
            _next: function () {
                var self = this;
                var offset = Math.min(self.options.max, parseInt(self.$sliderMove.css('right')) + self.options.step);
                self.$sliderMove.css('right', offset + "px");
                self._reset();
            },
            _prve: function () {
                var self = this;
                var offset = Math.max(self.options.min, parseInt(self.$sliderMove.css('right')) - self.options.step);
                self.$sliderMove.css('right', offset + "px");
            },
            _reset:function () {
                var self = this;
                if(self.options.reset && parseInt(self.$sliderMove.css('right')) >= 5400){

                    self.$sliderMove.css('right',"0px");
                }
                return self;
            }


        }
    })();
    $.extend({
        showNewProducts: function (options) {
            new ShowNewProducts(options);
        }
    })
})(window, document, jQuery);


var _main = function () {
    $.mySlider({
        slidersSelector: ".sliders",
        prevSelector: ".t-banner .prev",
        nextSelector: ".t-banner .next",
        hintSelector: ".hint",
        bannerSelector: ".banner-slider",
    });
    hoverSelected();
    $.showNewProducts({
        sliderMoveSelector: ".m-move",
        prveSelector: ".new-prev",
        nextSelector: ".new-next",
        step: 1080,
        min: 0,
        max: 5400,
        autoPlay: false,
        reset:false,
    });
    $.showNewProducts(
        {
            sliderMoveSelector: ".m-move-sub-comment",
            prveSelector: ".comment-prev",
            nextSelector: ".comment-next",
            step: 360,
            min: 0,
            max: 5400,
            autoPlay: true,
            time: 3000,
            reset:true,
        }
    )
    $.scrollEvent({
        bdSelector:".t-bd", //滚动到bd显示 固定的顶部栏
        topSelector:".rightBar-top", // 在顶部时 进行隐藏
        showManSelector:".m-show.man", // 滚动到这个节点 动态加载下一个节点
        topFixedSelector:".fixed-top", // 用于显示隐藏
    })
};
_main();