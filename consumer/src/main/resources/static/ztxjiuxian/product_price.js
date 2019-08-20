MallPcPrice = {
    /**
     * 获取促销倒计时
     * @param containerId
     */
    loadPromoEnding: function (containerId) {
        var productContainer = $('#' + containerId);
        var productBoxes = productContainer.find('li[product-box]');
        if (productBoxes.length > 0) {
            var idsArr = [];
            $(productBoxes).each(function (index, element) {
                var productId = element.getAttribute('product-box');
                idsArr.push(productId);
            });
            var ids = idsArr.join(',');
            $.ajax({
                type: 'POST',
                url: '/act/selectPromoEnding.htm',
                data: {
                    ids: ids
                },
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType: 'json',
                success: function (result) {
                    if (result['suc']) {
                        var promoEndings = result['data'];

                        if (promoEndings) {
                            for (var pid in promoEndings) {
                                $('#jxIndex_timeAct_' + pid).attr('time', promoEndings[pid]/1000);
                            }
                        }
                        MallPcPrice.timeChange();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                	//alert(errorThrown + "获取价格异常");
                	//alert("价格异常");
                	
                }
            });
        }
    },
    /**
     * 为首页干活
     */
    getPrices: function (productContainerId) {
        MallPcPrice.doGetPrices(productContainerId, function (productContainer, productId) {
            return productContainer.find('strong[goodId=' + productId + ']');
        });
    },
    /**
     * 为葡萄酒馆干活
     */
    getPrices4Wine: function (productContainerId) {
        MallPcPrice.doGetPrices(productContainerId, function (productContainer, productId) {
            return productContainer.find('span[goodId=' + productId + ']');
        });
    },
    /**
     * 为洋酒馆干活
     */
    getPrices4Spirits: function (productContainerId) {
        MallPcPrice.getPrices4Wine(productContainerId);
    },
    doGetPrices: function (productContainerId, priceElementSelector) {
        var productContainer = $('#' + productContainerId);
        var productBoxes = productContainer.find('li[product-box]');
        if (productBoxes.length > 0) {
            var idsArr = [];
            $(productBoxes).each(function (index, element) {
                var productId = element.getAttribute('product-box');
                idsArr.push(productId);
            });
            var ids = idsArr.join(',');
            $.ajax({
                type: 'POST',
                url: '/act/selectPricebypids.htm',
                data: {
                    ids: ids
                },
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType: 'json',
                success: function (result) {
                    if (result['suc']) {
                        var priceList = result['data'];
                        if(priceList){
                        	for(var pid in priceList){
                        		var priceVo = priceList[pid];
                        		priceElementSelector(productContainer, pid).text('￥' + priceVo.promoPrice);
                        		
                        		//页面增加club会员价：1、判断页面是否有club会员价展示域。2、判断club会员价是否为空。3、club会员价赋值
                        		// if(productContainer.find('em[clubGoodId=' + pid + ']').length > 0){
                        		// 	if(priceVo.clubPrice != null && priceVo.clubPrice > 0){
                        		// 		productContainer.find('em[clubGoodId=' + pid + ']').text('￥' + priceVo.clubPrice);
                        		// 		productContainer.find('em[clubGoodId=' + pid + ']').next('.clubIcon').css("display","inline-block");
                        		// 	}
                        		// }
                        	}
                        }     
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                	//alert(errorThrown + "价格异常");
                	//alert("价格异常");
                }
            });
        }
    },
    timeChange: function () {
        setInterval(function () {
            $(".raceListTime[time]").each(function () {
                var time = parseInt($(this).attr("time"));
                time--;
                if (time < 0 || isNaN(time)) {
                    $(this).hide();
                    $(this).find("i").text("00");

                }
                else {

                    $(this).attr("time", time);
                    var handerResult = MallPcPrice.handerTime(time);
                    $(this).find(".hours").text(handerResult["h"]);
                    $(this).find(".minutes").text(handerResult["m"]);
                    $(this).find(".seconds").text(handerResult["s"]);
                }
            });
        }, 1000);
    },
    handerTime: function (time) {
        var h = parseInt(time / 3600);
        h = h < 10 ? '0' + h : h;
        var m = parseInt((time % 3600) / 60);
        m = m < 10 ? '0' + m : m;
        var s = parseInt(time % 60);
        s = s < 10 ? '0' + s : s;
        return {
            'h': h,
            'm': m,
            's': s
        }
    }
}