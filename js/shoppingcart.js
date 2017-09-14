(function (w, d, $) {
    function Cart() {
        this.productArr = localStorage.getItem('productCart') && JSON.parse(localStorage.getItem('productCart'));
        this.jugeCart();
        this.initCart().bindNumber().bindDeleBtn();
    }

    Cart.prototype = (function () {

        return {
            //判断当前购物车 是否有货物
            jugeCart: function () {
                var productArr = localStorage.getItem('productCart') && JSON.parse(localStorage.getItem('productCart'));
                if (!productArr || productArr.length < 1) {
                    $('.shopping-cart').hide();
                    $('.no-product').show();
                    $('#go-index').on('click', function (e) {
                        e.preventDefault();
                        location.href = 'index.html';
                    })
                    return;
                } else {
                    $('.no-product').hide();
                }
            },
            // 根据localstorage 来组装购物车
            initCart: function () {
                var productArr = this.productArr;
                var template = '';
                for (var i = 0; i < productArr.length; i++) {
                    var single = '<table class="shopping-table shopping-table-' + i + '">\n' +
                        '        <tbody>\n' +
                        '        <tr>\n' +
                        '            <td width="30" align="left"><input class="single-check" type="checkbox" name="single-check" checked></td>\n' +
                        '            <td>\n' +
                        '                    <span class="shop-img">\n' +
                        '                        <a href="" target="_blank">\n' +
                        '                            <img width="100" height="100" src="' + productArr[i].imgURL + '">\n' +
                        '                        </a>\n' +
                        '                    </span>\n' +
                        '            </td>\n' +
                        '            <td align="left">\n' +
                        '                <a target="_blank" href="">\n' +
                        '                    <span class="product-name">' + productArr[i].name + '</span>\n' +
                        '                </a>\n' +
                        '                <div class="product-des">\n' +
                        '                    <p>颜色：' + productArr[i].style + '</p>\n' +
                        '                    <p>尺寸：' + productArr[i].size + '</p>\n' +
                        '                </div>\n' +
                        '            </td>\n' +
                        '            <td width="10%" class="single-price ff6600">&yen;' + productArr[i].price + '</td>\n' +
                        '            <td width="10%"><input class="total-number" type="number" max="99" min="0" value="' + productArr[i].number + '"></td>\n' +
                        '            <td width="20%">\n' +
                        '                <span class="package-type">普通包装</span>\n' +
                        '                <span class="package-price">免费</span>\n' +
                        '            </td>\n' +
                        '            <td width="10%">\n' +
                        '                <span class="product-price-count ff6600">¥' + productArr[i].price + '</span>\n' +
                        '            </td>\n' +
                        '            <td width="5%">\n' +
                        '                <a href="javascript:;" class="link-delete"></a>\n' +
                        '            </td>\n' +
                        '        </tr>\n' +
                        '        </tbody>\n' +
                        '    </table>'

                    template += single;
                }
                // 插入节点
                $('.cart-summary').before(template);
                return this
            },
            calSingle: function (table) {
                //single-price ;  total-number ;  package-price; product-price-count
                var $singlePrice = table.find('.single-price');
                var singlePrice = $singlePrice.html().match(/[\d]+/g)[0];
                var $packagePrice = table.find('.package-price');
                var packagePrice = $packagePrice.html().match(/[\d]+ |免费/g)[0];
                if (packagePrice === '免费') {
                    packagePrice = 0;
                }

                var totalNumber = table.find('.total-number').val();
                var $priceCount = table.find('.product-price-count');
                $priceCount.html('&yen;' + (singlePrice * totalNumber + packagePrice));
            },
            calTotal: function () {
                var totalSettlement = 0;
                // 计算总价
                $('.product-price-count').each(function () {
                    totalSettlement += Number($(this).html().match(/[\d]+/g)[0]);
                });
                $('.cart-sum-price').html('&yen;' + totalSettlement);
            },
            // 绑定input number
            bindNumber: function () {
                var self = this;
                $('.total-number').each(function (index, ele) {

                    $(this).on('input', function (e) {
                        var target = e.target;
                        var $table = $(target).parents().eq(3);
                        // 小结
                        self.calSingle($table);
                        if ($table.find('.single-check').is(':checked')) {
                            self.calTotal();
                        }
                    });

                });
                return this
            },
            // 绑定 选中 BUG
            bindChooseAll: function () {
                $('.checkbox').on('click', function () {

                    if ($(this).is(':checked')) {
                        $('.single-check').each(
                            function () {
                                $(this).attr('checked', true)
                            }
                        )
                    } else {
                        $('.single-check').each(
                            function () {
                                $(this).attr('checked', false)
                            }
                        )
                    }
                })
            },
            // 删除所有商品
            bindDeleBtn: function () {
                // 删除购物商品
                $('.link-delete').each(function () {
                    $(this).on('click', function (e) {
                        // 1. 清除 localStorage
                        var arr = JSON.parse(localStorage.getItem('productCart'));
                        var tableNumber = $(this).parents('.shopping-table').attr('class').match(/[\d]+/g)[0];
                        // 询问确认的弹窗
                        $.modal({
                            message: '确定要删除该商品吗？',
                            sureCallback: function () {
                                // 1. 删除该商品
                                arr.splice(tableNumber, 1);
                                localStorage.setItem('productCart', JSON.stringify(arr));
                                console.log(JSON.parse(localStorage.getItem('productCart')));
                                // 2. 移除dom 节点
                                $(e.target).parents().eq(3).remove();
                                this.jugeCart();
                            },
                            cancelCallback: function () {
                                return;
                            }
                        })
                    })
                })

                $('.delete-all').on('click', function (e) {
                    // 询问确认的弹窗
                    e.preventDefault();
                    $.modal({
                        message: '确定要删除全部商品吗？',
                        sureCallback: function () {
                            var productArr = localStorage.getItem('productCart') && JSON.parse(localStorage.getItem('productCart'));
                            productArr = [];
                            localStorage.setItem('productCart',JSON.stringify(productArr));
                            this.jugeCart();
                        },
                        cancelCallback: function () {
                            return;
                        }
                    })

                })
                return this
            }



        }

    })()

    w.cart = function () {
        new Cart();
    }
})(window, document, jQuery)

cart();