/*右边栏*/
var loginStatus = false;  //用户登陆状态
var domain_passprot = window.jxdomain.login;
var domain_detail = window.jxdomain.detail;
var domain_help = window.jxdomain.help;
var domain_cart = window.jxdomain.cart;
var domain_member = window.jxdomain.member;
var domain_jifen = window.jxdomain.jifen;
var domain_sale = window.jxdomain.sale;
var domain_img10 = "http://img10.jiuxian.com";

var cartDiv = '';
var scIsExist = false;
var userInfoIsExist = false;
var jxuserId = getCookie("jx_user_id");
//页面URL
var local = window.location.href;
$(document).ready(function () {
    //我  + 收藏
    sidebarinfo();
    //收藏按钮
    $(".rightSidebarCon .collectSidebar").bind({
        "mouseenter": function () {
            if (!scIsExist) {
                if (jxuserId == null || jxuserId == undefined || jxuserId == '') {
                    scIsExist = true;
                    scNumShow();
                } else {
                    sidebarScNum(scNumShow);
                }

            } else {
                scNumShow();
            }

        },
        "mouseleave": function () {
            $(this).removeClass("on");
            //$(this).find(".rsItemCon").hide();
            $(".rsItemCon").hide();
            $(".sidebarUserLogin").hide();
        }
    });


    function scNumShow() {
        var _scThis = $(".rightSidebarCon .collectSidebar");
        if (loginStatus) {
            if ($("#rsCartBox").attr('flag') == 'hide') {
                _scThis.find(".rsItemCon").show();
            }
        }
        else {
            if ($("#rsCartBox").attr('flag') == 'hide') {
                var toTopHeight = _scThis.offset().top;
                $(".sidebarUserLogin").show();
                var className = _scThis.attr("name");
                $(".sidebarUserLogin").css("top", toTopHeight - $(document).scrollTop()).attr("box", className);
            }

        }
        _scThis.addClass("on");
    }

    $(".rightSidebarCon .collectSidebar").bind("click", function () {
        if (loginStatus) {
            window.open(domain_member + "/trademanage/my_collect.htm?rome=all");
            rsCartHide();
            couponsHide();
        } else {
            if ($("#rsCartBox").attr('flag') == 'show') {
                var toTopHeight = $(this).offset().top;
                $(".sidebarUserLogin").show();
                var className = $(this).attr("name");
                $(".sidebarUserLogin").css("top", toTopHeight - $(document).scrollTop()).attr("box", className);
                rsCartHide();
                couponsHide();
            }
        }
    });

    //用户按钮
    $(".rightSidebarCon .user").bind({
        "mouseenter": function () {
            if (!userInfoIsExist) {
                if (jxuserId == null || jxuserId == undefined || jxuserId == '') {
                    userInfoIsExist = true;
                    userNameShow();
                } else {
                    userInfos(userNameShow);
                }

            } else {
                userNameShow();
            }

        },
        "mouseleave": function () {
            $(this).removeClass("on");
            $(this).find(".rsItemCon").hide();
            $(".infoNumber").show();
        }
    });
    function userNameShow() {
        var _this = $(".rightSidebarCon .user");
        if (loginStatus) {
            if ($("#rsCartBox").attr('flag') == 'hide') {
                _this.find(".rsItemCon").show();
                _this.find("#sidUserLogin").show();
                _this.find("#sidUserLoginNot").hide();
                _this.find(".opeNews .opeNews-amount").show();
            } else {
                _this.find(".rsItemCon").hide();
            }
        }
        else {
            if ($("#rsCartBox").attr('flag') == 'hide') {
                _this.find(".rsItemCon").show();
                _this.find("#sidUserLogin").hide();
                _this.find("#sidUserLoginNot").show();
                _this.find(".opeNews .opeNews-amount").hide();
            } else {
                _this.find(".rsItemCon").hide();
            }
        }
        _this.addClass("on");
        $(".infoNumber").hide();
    }

    $(".rightSidebarCon .user").bind('click', function () {
        $(this).find(".rsItemCon").show();
        rsCartHide();
        couponsHide();
    })

    //我的订单跳转
    $(".opeOrder").click(function () {
        if (loginStatus) {
            location.href = domain_member + "/trademanage/my_order-9.htm";
        } else {
            location.href = domain_passprot + "/?from=" + domain_member + "/trademanage/my_order-9.htm";
        }
    });
    //订单跟踪跳转
    $(".opeTrack").click(function () {
        if (loginStatus) {
            location.href = domain_member + "/trademanage/my_order-9.htm";
        } else {
            location.href = domain_passprot + "/?from=" + domain_member + "/trademanage/my_order-9.htm";
        }
    });
    //会员俱乐部跳转
    $(".opeMember").click(function () {
        window.open(domain_jifen + "/club_index.htm");
    });

    //我的优惠券跳转
    $(".opeNews").click(function () {
        if (loginStatus) {
            location.href = domain_member + "/purse/my_coupon-11.htm";
        } else {
            location.href = domain_passprot + "/?from=" + domain_member + "/purse/my_coupon-11.htm";
        }
    });

    //返回顶部
    $(".backTop").bind("click", function () {
        $("html,body").animate({scrollTop: 0}, 500);
    });

    $(".sidebarClose").bind('click', function (event) {
        $(this).parent().hide();
        $(this).parents(".rSidebarItem").removeClass("on");
        event.stopPropagation();
    });
    function rsCartHide() {
        $("#rSidebarCart").removeClass("on");
        $("#rsCartBox").hide();
        $("#rsCartBox").attr('flag', 'hide');
    }

    function couponsHide() {
        $("#rSidebarCoupons").removeClass("on");
        $("#couponsBox").hide();
        $("#couponsBox").attr('flag', 'hide');
    }

    $(".sidebarUserLogin").bind({
        "mouseenter": function () {
            var className = $(this).attr("box");
            $(this).show();
            $("." + className).addClass("on");

        }, "mouseleave": function () {
            var className = $(this).attr("box");
            $(this).hide();
            $("." + className).removeClass("on");
        }
    });

    //在线客服
    $(".onlineService").bind({
        "mouseenter": function () {
            $(this).addClass("on");


        }, "mouseleave": function () {
            $(this).removeClass("on");

        }
    });

    //意见反馈
    $(".rightSidebarBot .feedback").bind({
        "mouseenter": function () {
            $(this).addClass("on");
            if ($(".sidebarUserLogin").attr('flag02') == 'hide') {
                $(this).find(".rsItemCon").show();
            } else {
                $(this).find(".rsItemCon").hide();
            }
        },
        "mouseleave": function () {
            $(this).removeClass("on");
            $(this).find(".rsItemCon").hide();
            $(".sidebarUserLogin").hide();
            $(".sidebarUserLogin").attr('flag02', 'hide');
        }
    });
    $(".rightSidebarBot .feedback").bind("click", function () {
        if (loginStatus) {
            rsCartHide();
            couponsHide();
        }
        else {
            if ($("#rsCartBox").attr('flag') == 'show') {
                rsCartHide();
                if ($(".sidebarUserLogin").attr('flag02') == 'hide') {
                    var toTopHeight = $(this).offset().top;
                    $(".sidebarUserLogin").show();
                    var className = $(this).attr("name");
                    $(".sidebarUserLogin").css("top", (toTopHeight - $(document).scrollTop()) + "px").attr("box", className);
                    $(this).find(".rsItemCon").hide();
                    $(".sidebarUserLogin").attr('flag02', 'show');
                } else {
                    $(".sidebarUserLogin").hide();
                    $(this).find(".rsItemCon").show();
                    $(".sidebarUserLogin").attr('flag02', 'hide');
                }
            }
        }
        window.open(domain_sale + "/feedback.htm");
    });
    $(".research-close").bind('click', function () {
        $(this).parent().hide();
    })

    //返回顶部
    $(".rightSidebarBot .code,.rightSidebarBot .backTop").bind({
        "mouseenter": function () {
            $(this).addClass("on");
            $(this).find(".rsItemCon").show();
        },
        "mouseleave": function () {
            $(this).removeClass("on");
            $(this).find(".rsItemCon").hide();
        }
    });

    //隐藏购物车box
    /*function rsCartHide(){
     $("#rSidebarCart").removeClass("on");
     $("#rsCartBox").hide();
     $("#rsCartBox").attr('flag','hide');
     }*/

    //购物车按钮
    $(".rightSidebarCon .cart").bind({
        "mouseenter": function () {
            $(this).addClass("on");
        },
        "mouseleave": function () {
            if ($("#rsCartBox").attr('flag') == 'hide') {
                $(this).removeClass("on");
            } else {
                $(this).addClass("on");
            }
        }
    });
    //点击购物车按钮
    $("#rSidebarCart").bind('click', function () {
        if ($("#rsCartBox").attr('flag') == 'hide') {
            $(this).addClass("on");
            $("#rsCartBox").show();
            $("#rsCartBox").attr('flag', 'show');

//				var cartSign = $("#rsCartBox").attr("cartSign");

//				if(cartSign==undefined || cartSign==''){
            loadCart()
            couponsHide();
//					$("#rsCartBox").attr("cartSign","cartSign");
//				}else{
//					$("#rsCartBox").html(cartDiv);
//					cartCaozuo();
//				}


        } else {
            rsCartHide();
        }
        //event.stopPropagation();
    });
    $("#rSidebarCoupons").bind('click', function (event) {
        if ($("#couponsBox").attr('flag') == 'hide') {
            $(this).addClass("on");
            $("#couponsBox").show();
            $("#couponsBox").attr('flag', 'show');
            var winHei = $(window).height();
            $(".rightSidebar").css('height', winHei + 'px');
            $("#couponsBox").css('height', winHei + 'px');
            $('.couponsWrap').css('height', (winHei - 53) + 'px');
            // 获取商品id goodsId 全局变量
            getCouponList(goodsId);
            rsCartHide();
        } else {
            couponsHide();
        }
        event.stopPropagation();
    })

    $("#rsCartBox").bind("mouseenter", function () {
        $("#rSidebarCart").addClass("on");
    });
    $("#rSidebarCoupons").bind("mouseenter", function () {
        $(this).addClass("on");
    });
    //优惠券按钮
    $(".rightSidebarCon .coupons").bind({
        "mouseenter":function(){
            $(this).addClass("on");
        },
        "mouseleave":function(){
            if($("#couponsBox").attr('flag')=='hide'){
                $(this).removeClass("on");
            }else
            {
                $(this).addClass("on");
            }
        }
    });
    $(".rightSidebarBox").bind('click', function (event) {
        event.stopPropagation();
    });
    $(document).bind('click', function () {
        rsCartHide();
        couponsHide();
    });

    $("#rsCartBox .rsCartClose,.rightSidebarBot .code,.rightSidebarBot .backTop").bind('click', function () {
        rsCartHide();
        couponsHide();
    });


    //购物车高度
    $(window).bind('resize', function () {
        var winHei_1 = $(window).height();
        $("#rsCartBox").css('height', winHei_1 + 'px');
        $("#rsCartBox .rsCartTabBox").css('height', (winHei_1 - 203) + 'px');
        $(".rightSidebar").css('height', winHei_1 + 'px');
        $("#couponsBox").css('height', winHei_1 + 'px');
        $('.couponsWrap').css('height', (winHei_1 - 53) + 'px');
    });

});
//优惠券
function getCouponList(productId) {
    $.ajax({
        type: "get",
        url: window.jxdomain.detail + '/pro/getCouponList.htm',
        data: {productId: productId, pageNum: 1, pageSize: 20},
        dataType: "text",
        success: function (data) {

            $("#couponsBox").html(data);

        }
    });
}
/*右边栏end*/
function sidebarinfo() {
    var goods_count = getCookie("cart_goods_count");
    if (goods_count) {
        //侧边栏用户购物车商品数量
        $("#side_goods_count").text(goods_count);
        //头部用户购物车数量
        $(".jx_car_num").text(goods_count);
    } else {
        //侧边栏用户购物车商品数量
        $("#side_goods_count").text(0);
        //头部用户购物车数量
        $(".jx_car_num").text(0);
    }
}

function userInfos(callback) {
    userInfoIsExist = true;
    $("#me_login").attr("href", domain_passprot + "/?from=" + local);
    $("#other_login").attr("href", domain_passprot + "/?from=" + local);

    var url_sidebarinfo = domain_help + "/sidebarjson.htm?t=" + new Date().getTime();
    var proxy_url = "/httpProxyAccess.htm?t=" + new Date().toTimeString();
    jQuery.ajax({
        type: 'post',
        url: proxy_url,
        data: {target: url_sidebarinfo},
        dataType: 'json',
        cache: false,
        success: function (data) {
            if (data.islogin == true) {
                loginStatus = true;
                if (data.userCommonInfo) {
                    if (data.userCommonInfo.headImagePath) {
                        if (data.userCommonInfo.headImagePath.indexOf("http") == 0) {
                            $("#headerImg").attr("src", data.userCommonInfo.headImagePath);
                        } else {
                            $("#headerImg").attr("src", domain_img10 + data.userCommonInfo.headImagePath);
                        }
                    }

                    var username = data.userCommonInfo.userName;
                    if (username.length > 7) {
                        username = username.substring(0, 7) + "...";
                    }
                    $("#userName").text(username);
                    $("#info_no").html('<em class="infoNumber" id="infoNumber">' + data.messageCount + '</em>');
                    if (data.couponNum == null || data.couponNum == '' || data.couponNum == undefined || data.couponNum == '0') {
                    } else {
                        $("#myCounpon").html('<em class="opeNews-amount" id="messageCount">' + data.couponNum + '</em>');
                    }


                    var isClubUser = data.userCommonInfo.isClubUser;
                    var rankid = data.userCommonInfo.userRankId;
                    switch (rankid) {
                        case 1 :
                            $("#level").html('<i class="pngIcon level1"></i><a href="' + domain_jifen + '/memberintro.htm" title="酒虫会员" >酒虫会员</a>');
                            break;
                        case 2 :
                            $("#level").html('<i class="pngIcon level2"></i><a href="' + domain_jifen + '/memberintro.htm" title="酒鬼会员" >酒鬼会员</a>');
                            break;
                        case 3 :
                            $("#level").html('<i class="pngIcon level3"></i><a href="' + domain_jifen + '/memberintro.htm" title="酒圣会员" >酒圣会员</a>');
                            break;
                        case 4 :
                            $("#level").html('<i class="pngIcon level4"></i><a href="' + domain_jifen + '/memberintro.htm" title="酒神会员" >酒神会员</a>');
                            break;
                        case 5 :
                            $("#level").html('<i class="pngIcon level5"></i><a href="' + domain_jifen + '/memberintro.htm" title="酒仙会员" >酒仙会员</a>');
                            break;
                            defulat :$("#level").html('<i class="pngIcon level1"></i><a href="' + domain_jifen + '/memberintro.htm" title="酒虫会员" >酒虫会员</a>');
                    }

                    if (isClubUser) {
                        $(".clubMumber").show();
                        $(".clubBuy").hide();
                    } else {
                        $(".clubMumber").hide();
                        $(".clubBuy").show();
                    }


                }
            }
            callback();
        },
        error: function () {
        }
    });
}


function sidebarScNum(scNumShow) {
    scIsExist = true;
    $("#me_login").attr("href", domain_passprot + "/?from=" + local);
    $("#other_login").attr("href", domain_passprot + "/?from=" + local);

    var url_sidebarinfo = domain_help + "/sidebarScNum.htm?t=" + new Date().getTime();
    var proxy_url = "/httpProxyAccess.htm?t=" + new Date().toTimeString();
    jQuery.ajax({
        type: 'post',
        url: proxy_url,
        data: {target: url_sidebarinfo},
        dataType: 'json',
        cache: false,
        success: function (data) {
            if (data.islogin == true) {
                loginStatus = true;
                if (data.collectCount) {
                    $("#collectCount").text(data.collectCount);
                }
            }
            scNumShow();

        },
        error: function () {
        }
    });
}

//购物车
function loadCart() {
    var url_kc = domain_cart + "/myCartJson.htm?t=" + new Date().getTime();
    var proxy_url = "/httpProxyAccess.htm?t=" + new Date().toTimeString();
    jQuery.ajax({
        type: 'post',
        url: proxy_url,
        data: {target: url_kc},
        dataType: 'json',
        cache: false,
        success: function (data) {
            var cartHtml = '';
            var result1 = data.result;
            if (result1 != null) {
                cartHtml += '<div class="rsCartClose publicIcon"></div>';
                cartHtml += '<div class="rsCartTit"><h3>购物车</h3></div>';
                cartHtml += '<div class="rsCartCon">';
                cartHtml += '<div class="rsCartTabBox">';
                var cartItems = result1.list;
                if (cartItems != null && cartItems.length > 0) {
                    cartHtml += '<div class="rsCartTable" id="rsCartTable">';
                    for (var i = 0; i < cartItems.length; i++) {
                        var cartItem = cartItems[i];
                        if (cartItem.type != 'TYPE_GENERAL_GOODS' && cartItem.type != 'TYPE_GOODS_PACK') {
                            continue;
                        }
                        var cartGoodsList = cartItem.items;
                        //控制加减号是否显示
                        var proIsOrNoDhm = cartItem.disable_count;
                        var tags = cartItem.tags;
                        var isYhtzOrRnt = false;
                        var tagName = '';
                        if (tags != null) {
                            for (var k = 0; k < tags.length; k++) {
                                var tag = tags[k];
                                if (tag.act_type == '31') {
                                    tagName = '任你挑';
                                    isYhtzOrRnt = true;
                                    break;
                                } else if (tag.act_type == '33') {
                                    tagName = '优惠套装';
                                    isYhtzOrRnt = true;
                                    break;
                                }
                            }
                        }
                        if (isYhtzOrRnt) {//优惠套装或任你挑
                            cartHtml += '<div class="rsCartComb">';
                            cartHtml += '<div class="rsCartComb-tit"><span class="tag"><i class="publicIcon"></i><em>' + tagName + '</em></span><span class="pri">￥' + cartItem.total_price + '</span></div>'
                            cartHtml += '<div class="publicIcon rsCartItem-del" cart_unit="' + cartItem.sku + '"></div>'
                        }
                        for (var j = 0; j < cartGoodsList.length; j++) {
                            var cartGoods = cartGoodsList[j];
                            var goodsName = decodeURIComponent(cartGoods.goods_name);
                            cartHtml += '<div class="rsCartItem clearfix">';
                            cartHtml += '<div class="cartItemInfo info01">';
                            cartHtml += '<div class="rsCartCom-pic"><a href="' + domain_detail + '/goods-' + cartGoods.goods_id + '.html" target="_blank"><img alt="' + goodsName + '" src="' + cartGoods.goods_thmubs.small + '" width="52" height="52" /></a></div>';
                            cartHtml += '<div class="rsCartCom-name"><p><a href="' + domain_detail + '/goods-' + cartGoods.goods_id + '.html" target="_blank" title="' + goodsName + '">' + goodsName + '</a></p></div>';
                            cartHtml += '</div>';
                            //限购数量
                            var proXgNum = cartGoods.buyRestriction;

                            if (!isYhtzOrRnt) {
                                if (proIsOrNoDhm == 1) {
                                    cartHtml += '<div class="cartItemInfo info02"><div class="comAmount"><span id="xgnum" proXgNum="' + proXgNum + '">' + cartItem.count + '</span></div></div>';
                                } else {
                                    cartHtml += '<div class="cartItemInfo info02"><div class="comAmount"><a class="publicIcon minus" cart_unit="' + cartItem.sku + '"></a><span id="xgnum" proXgNum="' + proXgNum + '">' + cartItem.count + '</span><a class="publicIcon plus" cart_unit="' + cartItem.sku + '"></a></div></div>';
                                }


                            } else {
                                cartHtml += '<div class="cartItemInfo info02"><div class="comAmount"><span id="xgnum" proXgNum="' + proXgNum + '">' + cartItem.count + '</span></div></div>';
                            }
                            //var a =Number(cartGoods.goods_price*10000);
                            //var b = Number(cartItem.count*10000);
                            //var proPrice = a*b/(10000*10000);
                            var proPrice = cartGoods.goods_price;

                            cartHtml += '<div class="cartItemInfo info03" title="￥' + proPrice + '">￥' + proPrice + '</div>';
                            if (!isYhtzOrRnt) {
                                cartHtml += '<div class="publicIcon rsCartItem-del" cart_unit="' + cartItem.sku + '"></div>';
                            }
                            cartHtml += '</div>';
                        }
                        if (isYhtzOrRnt) {//优惠套装或任你挑
                            cartHtml += '</div>';
                        }
                    }
                    cartHtml += '</div>';
                    //$("#side_goods_count").text(result1.total_number);
                    //$(".jx_car_num").text(result1.total_number);
                    setCookie("cart_goods_count", result1.total_number, 7);
                    //var cart_goods_count_csh = getCookie("cart_goods_count");
                    if ($(".jx_car_num") != null) {
                        $(".jx_car_num").html(result1.total_number);
                    }
                } else {
                    cartHtml += '<div class="rsCartTable" id="rsCartEmpty" style="display:block">';
                    cartHtml += '<div class="cartEmpty"><p class="emptyPho"><i></i></p><p class="emptyText">您还未选中要购买的商品，<br />快去挑选吧~</p></div>';
                    cartHtml += '</div>';
                    $("#rsCartEmpty").show();
                    //$("#side_goods_count").text(0);
                    //$(".jx_car_num").text(0);
                    setCookie("cart_goods_count", 0, 7);
                    if ($(".jx_car_num") != null) {
                        $(".jx_car_num").html(0);
                    }
                }
                cartHtml += '</div>';
                var tprice = result1.total_price;
                var yhprice = result1.discount;
                var np = Number(tprice) - Number(yhprice);
                if (cartItems != null) {
                    cartHtml += '<div class="rsCartTotal clearfix"><div class="amountAll" id="amountAll"><b>' + result1.total_number + '</b>件商品</div><div class="priAll" id="priAll">￥<span>' + np + '</span></div></div>';
                    cartHtml += '<div class="rsCartBut"><a class="rsCartBut-bay" href="' + domain_cart + '">去购物车结算</a></div>';

                    //侧边栏用户购物车商品数量
//						$("#side_goods_count").text(result1.total_number);
                    //头部用户购物车数量
//						if($(".jx_car_num") != null){
//							$(".jx_car_num").text(result1.total_number)
//						}

                }
                cartHtml += '</div>';
                cartDiv = cartHtml;
                $("#rsCartBox").html(cartHtml);
                cartCaozuo();
            }
        },
        error: function () {

        }


    });
}

function cartCaozuo() {
    $("#rsCartBox").bind("mouseenter", function () {
        $("#rSidebarCart").addClass("on");
    });

    $("#rsCartBox .rsCartClose").bind('click', function () {
        $("#rSidebarCart").removeClass("on");
        $("#rsCartBox").hide();
        $("#rsCartBox").attr('flag', 'hide');
    });

    var winHei = $(window).height();
    $("#rsCartBox").css('height', winHei + 'px');
    $("#rsCartBox .rsCartTabBox").css('height', (winHei - 203) + 'px');
    $(".rightSidebar").css('height', winHei + 'px');


    //购物车 鼠标滑过商品
    $(".rsCartBox").delegate('.rsCartTable > .rsCartItem', 'mouseenter', function () {
        $(this).find(".comAmount a").css('display', 'inline-block');
        $(this).find(".rsCartItem-del").css('display', 'inline-block');
        $(this).css('background', '#f8f8f8');
    });
    $(".rsCartBox").delegate('.rsCartTable > .rsCartItem', 'mouseleave', function () {
        $(this).find(".comAmount a").css('display', 'none');
        $(this).find(".rsCartItem-del").css('display', 'none');
        $(this).css('background', 'none');
    });
    $(".rsCartTable .rsCartComb").hover(function () {
        $(this).find(".rsCartItem-del").show();
    }, function () {
        $(this).find(".rsCartItem-del").hide();
    });


    //移除商品
    $(".rsCartItem-del").bind('click', function () {
        $(this).parent(".rsCartItem,.rsCartComb").remove();
        var itemLen = $(".rsCartTable .rsCartItem").length;
        if (itemLen == 0) {
            $("#rsCartTable").hide();
            $("#rsCartEmpty").show();
            $(".rsCartTotal").hide();
            $(".rsCartBut").hide();
        } else {
            $("#rsCartTable").show();
            $("#rsCartEmpty").hide();
        }
        var cart_unit = $(this).attr("cart_unit");
        //updateCart(cart_unit,0,"",true);
        doRemoveCart(cart_unit);
    });

    //购物车 加减商品数量
    $(".rsCartItem").each(function () {
        var amount = $(this).find(".comAmount span").text();
        if (amount == 1) {
            $(this).find(".comAmount .minus").addClass("on");
        }
        if (amount == 99) {
            $(this).find(".comAmount .plus").addClass("on");
        }
    });
    //扣减
    $(".comAmount .minus").bind('click', function () {
        var amount = $(this).siblings("span").text();
        var kj = 0;
        if (amount > 1) {
            amount--;
            kj--;
            $(this).siblings("span").text(amount);
            if (amount == 1) {
                $(this).addClass("on");
            }
            if (amount < 99) {
                $(this).siblings(".plus").removeClass("on");
            }
        }
        var cart_goods_count = parseInt(getCookie("cart_goods_count")) + parseInt(kj);
        setCookie("cart_goods_count", cart_goods_count, 7);
        $(".jx_car_num").text(cart_goods_count);

        var cart_unit = $(this).attr("cart_unit");
        updateCart(cart_unit, amount, "", true);
    })
    //增加
    $(".comAmount .plus").bind('click', function () {
        var amount = $(this).siblings("span").text();

        var xgnum = $(this).siblings("#xgnum").attr("proxgnum");
        if (Number(xgnum) > 0 && (Number(amount) > Number(xgnum) || Number(amount) == Number(xgnum))) {
            $(this).addClass("on");
            return;
        }
        var n = 0;
        if (amount < 99) {
            amount++;
            n++;
            $(this).siblings("span").text(amount);
            if (amount == 99) {
                $(this).addClass("on");
            }
            if (amount > 1) {
                $(this).siblings(".minus").removeClass("on");
            }
        }
        var cart_goods_count = parseInt(getCookie("cart_goods_count")) + parseInt(n);
        setCookie("cart_goods_count", cart_goods_count, 7);
        $(".jx_car_num").text(cart_goods_count);

        var cart_unit = $(this).attr("cart_unit");
        updateCart(cart_unit, amount, "", true);

    });
}


//删除购物车
function doRemoveCart(cart_unit) {
    var url_kc = domain_cart + "/remove.htm?t=" + new Date().getTime();
    var proxy_url = "/httpProxyAccess.htm?t=" + new Date().toTimeString();
    jQuery.ajax({
        type: 'post',
        url: proxy_url,
        data: {target: url_kc, "skuId": cart_unit},
        dataType: 'json',
        cache: false,
        success: function (data) {
            //setCookie("cart_goods_count",data.goods_count,7);
            //if($(".jx_car_num") != null){
            //	$(".jx_car_num").html(data.goods_count);
            //}
            //$("#side_goods_count").text(data.goods_count);
            loadCart();
            if(typeof CouponSearchPcJs == 'object'){
            	CouponSearchPcJs.getCartInfoByCouponId();
            }
            //侧边栏用户购物车商品数量

        },
        error: function () {
        }
    });
}


//更新购物车
function updateCart(cart_unit, count, goods, donow) {
    if (donow) {
        doUpdateCart(cart_unit, count, goods);
    }
    else {
        try {
            clearTimeout(doUpdateCartTrigger)
        } catch (e) {
        }
        doUpdateCartTrigger = setTimeout("doUpdateCart('" + cart_unit + "'," + count + ",'" + goods + "')", 500);
    }
}

//更新购物车
function doUpdateCart(cart_unit, count, packgoods) {
    var url_kc = domain_cart + "/update.htm?t=" + new Date().getTime();
    var proxy_url = "/httpProxyAccess.htm?t=" + new Date().toTimeString();
    jQuery.ajax({
        type: 'post',
        url: proxy_url,
        data: {target: url_kc, "skuId": cart_unit, "count": count, "packgoods": packgoods},
        dataType: 'json',
        cache: false,
        success: function (data) {
            //setCookie("cart_goods_count",data.goods_count,7);
            //if($(".jx_car_num") != null){
            //	$(".jx_car_num").html(data.goods_count);
            //}
            //$("#side_goods_count").text(data.goods_count);
            loadCart();
            if(typeof CouponSearchPcJs == 'object'){
            	CouponSearchPcJs.getCartInfoByCouponId();
            }
            //侧边栏用户购物车商品数量

        },
        error: function () {
        }
    });
}