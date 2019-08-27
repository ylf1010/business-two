// JavaScript Document
var defaultKey = '';
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
		}
	}
	return format
};

function addToFavorite() {
	var a = domain_home + "/",
		b = "酒仙网";
	document.all ? window.external.AddFavorite(a, b) : window.sidebar && window.sidebar.addPanel ? window.sidebar.addPanel(b, a, "") : alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。")
}


function get_length(s) {
	var char_length = 0;
	for (var i = 0; i < s.length; i++) {
		var son_char = s.charAt(i);
		encodeURI(son_char).length > 2 ? char_length += 1 : char_length += 0.5
	}
	return char_length
}
function cut_str(str, len) {
	var char_length = 0;
	var sub_len = 0;
	for (var i = 0; i < str.length; i++) {
		var son_str = str.charAt(i);
		encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
		if (char_length >= len) {
			sub_len = char_length == len ? i + 1 : i;
			break
		}
	}
	var rstr = str;
	if (sub_len > 0) {
		rstr = str.substr(0, sub_len)
	}
	return rstr
}
function shopingCartPlug() {
	var real_url = domain_cart + "/loadMyCartJson.htm?t=" + new Date().getTime();
	$.support.cors = true;
	$.ajax({
		type: "GET",
		url: "/httpProxyAccess.htm?t=" + new Date().getTime(),
		data: {
			target: real_url
		},
		dataType: "json",
		success: function(data) {
			if (data == null) {
				return null
			}
			if (data.result != "") {
				var cartPlugNum = 0;
				var cartListHtml = "";
				if (data.result.list != "") {
					var cartProList = data.result.list;
					for (var i = 0; i < cartProList.length; i++) {
						var cartProItem = cartProList[i];
						if (cartProItem.type = 1) {
							if (cartPlugNum < 5) {
								var cartProInfo = cartProItem.items[0];
								cartListHtml += "<li>";
								cartListHtml += "<div class='proListDb'>";
								cartListHtml += "<div class='proPic'><a href='" + window.jxdomain.home + "/goods-" + cartProInfo.goods_id + ".html' target='_blank'><img src='" + cartProInfo.goods_thumb + "' width='40' height='40' /></a></div>";
								cartListHtml += "<div class='proTit'><a href='"+window.jxdomain.home+"/goods-" + cartProInfo.goods_id + ".html' target='_blank'>" + cartProInfo.goods_name + "</a></div>";
								cartListHtml += "<div class='proPrice''>";
								cartListHtml += "<p class='proPriceD'>￥" + cartProInfo.goods_price + "</p>";
								cartListHtml += "<p class='proD'>删除</p></div></div></li>";
								cartPlugNum += 1
							}
						} else {
							if (cartProItem.type = 2) {
								if (cartProItem.items.length > 0 && cartPlugNum < 5) {
									cartListHtml += "<li>";
									for (var j = 0; j < cartProItem.items.length; j++) {
										var cartProInfo = cartProItem.items[0];
										if (cartPlugNum < 5) {
											cartListHtml += "<div class='proListDb'>";
											cartListHtml += "<div class='proPic'><a href='" + window.jxdomain.home + "/goods-" + cartProInfo.goods_id + ".html' target='_blank'><img src='" + cartProInfo.goods_thumb + "' width='40' height='40' /></a></div>";
											cartListHtml += "<div class='proTit'><a href='"+window.jxdomain.home+"/goods-" + cartProInfo.goods_id + ".html' target='_blank'>" + cartProInfo.goods_name + "</a></div>";
											cartListHtml += "<div class='proPrice''>";
											cartPlugNum += 1
										}
									}
									cartListHtml += "<p class='proPriceD'>￥" + cartProInfo.total_price + "</p>";
									cartListHtml += "<p class='proD'>删除</p></div></div></li>"
								}
							} else {
								if (cartProItem.type = 3) {
									if (cartProItem.items.length > 0 && cartPlugNum < 5) {
										cartListHtml += "<li>";
										for (var j = 0; j < cartProItem.items.length; j++) {
											var cartProInfo = cartProItem.items[0];
											if (cartPlugNum < 5) {
												cartListHtml += "<div class='proListDb'>";
												cartListHtml += "<div class='proPic'><a href='"+window.jxdomain.home+"/goods-" + cartProInfo.goods_id + ".html' target='_blank'><img src='" + cartProInfo.goods_thumb + "' width='40' height='40' /></a></div>";
												cartListHtml += "<div class='proTit'><a href='"+window.jxdomain.home+"/goods-" + cartProInfo.goods_id + ".html' target='_blank'>" + cartProInfo.goods_name + "</a></div>";
												cartListHtml += "<div class='proPrice''>";
												cartPlugNum += 1
											}
										}
										cartListHtml += "<p class='proPriceD'>￥" + cartProInfo.total_price + "</p>";
										cartListHtml += "<p class='proD'>删除</p></div></div></li>"
									}
								}
							}
						}
					}
					cartListHtml += "<div class='clear'></div>";
					if (cartPlugNum > 0) {
						$(".cart_plug_pro_list").html(cartListHtml)
					} else {
						$(".cart_plug_pro_list").html("您的购物车中还没有商品!")
					}
				}
				jQuery(".carList").show()
			} else {
				$(".carList").hide()
			}
		}
	})
}

$(document).ready(function(e) {			
	/*页头start*/
	$(".topHeaderRight .dropTitle").hover(function(){
		$(this).addClass("on");		
		},function(){
			$(this).removeClass("on");	
	});

	/*搜索框*/
	
	$(".headerSearch .search-form").keyup(getSearchResult);
	$(".headerSearch .search-form").keydown(navList);
	$(".searchHome").delegate(".searchCon li","mouseenter mouseleave click",listHover);
	
	$(".headerSearch .search-form").bind("focus",function(e) {		
		 var value=$.trim($(this).val()); 
			if(value==defaultKey)
			{
				$(this).val("");
			}
    });
	$(".headerSearch .search-form").blur(function(e) {
        var value=$.trim($(this).val()); 
		if(value=="")
		{
			$(this).val(defaultKey);
		}
    });
	
	
	
	function getSearchResult(e){
		e=e||window.event;			
		var keywords=$.trim($("#wd").val());
		if(keywords==""){
			return false;
		}
		var areaNow = userArray[0]; //获取区域地址
		var randomTest = getCookie("RandomTest");
		var searchUserKey = getCookie("SearchUserKey");
		
		if((e.which>=48&&e.which<=57)||(e.which>=96&&e.which<=105)||(e.which>=65&&e.which<=90)||e.which==8||e.which==46||e.which==32)
		{
		 	if(keywords.length>0){	
				var domain_list= window.jxdomain.list;					
				$.support.cors = true;
				$.ajax({
					type: "POST",
					url: domain_list + "/assKeyWords.htm?t=" + new Date().getTime(),
					data: {
						wd: keywords,
						area:areaNow,
						searchUserKey:searchUserKey,
						randomTest:randomTest
					},
					dataType: "jsonp",
					success: function(data) {
						if (data == null) {
							return null;
						}
						if (data.resultList != null && data.resultList != "") {
							$("#searchCon").show();
							var keyslistHtml = "<ul>";
							var jsonList = data.resultList;
							for (var i = 0; i < jsonList.length; i++) {
								keyslistHtml += '<li class="clearfix"><a href="'+jsonList[i].url+'"><span>'+jsonList[i].word;
								if(jsonList[i].suggestWordType == "SEARCH_HISTORY"){
									keyslistHtml += '</span><em><b>'+"搜索历史"+'</b></em></a><b class="removehis" >'+"删除"+'</b></li>'
								}else{
									keyslistHtml += '</span><em>约<b>'+jsonList[i].count+'</b>件商品</em></a></li>'
								}
							}	
							keyslistHtml += "</ul>";
							keyslistHtml += '<div class="bot clearfix"><span class="search-close"><i></i></span></div>';	
							$("#searchCon").empty().html(keyslistHtml);
							$("#assKey").attr("value",data.assKey);
						} else {
							$("#searchCon").hide();
						}
					}
				});
		 	 }
		}
	}
	
	
//	$(".removehis").click(function(){
//
//		var name= $(this).parent().sublings().text();
//		removeHistoryKey(SearchUserCookie,name);
//		
//	});
		
	$("#searchCon").delegate(".removehis","click",function(){
		
		var name= $(this).parents("li").find("span").text();
		removeHistoryKey(SearchUserCookie,name);
		
	});
	
	
	
	/**
	 * 移除搜索历史
	 */
	function removeHistoryKey(searchUserKey,name){
			var domain_list=window.jxdomain.list;					
			$.ajax({
				type: "POST",
				url: domain_list + "/remHisKey.htm?t=" + new Date().getTime(),
				data: {
					keyword: name,
					searchUserKey:searchUserKey
				},
				dataType: "jsonp",
				success: function(data) {
					//alert(1);
					
				}
			});
	}

	function navList(e){
			 switch (e.which)
			 {
				 case 38://上一个
				  
				 if($("#searchCon li").hasClass("on"))  
				 	{
					  $("#searchCon li.on").removeClass("on").prev().addClass("on");
					 } 
				  else
					{
			       	  $("#searchCon li:last").addClass("on");
				     }
				 //$("#wd").val($("#searchCon li.on span").text());
				 break;					
				 case 40:    //下一个
				 
				 if($("#searchCon li").hasClass("on"))  
				 	{
					  $("#searchCon li.on").removeClass("on").next().addClass("on");
					 } 
				else
				 	{
					  $("#searchCon li:first").addClass("on");
					}
				// $("#wd").val($("#searchCon li.on span").text());					
				 break;
				 case 13:   //回车
					 var url;
					 if($("#searchCon li.on").length==0){
						 var keyword = $.trim($("#wd").val());
						 url = window.jxdomain.list + "/search.htm?key="+keyword;
					 }else{
						 $("#wd").val($("#searchCon li.on span").text());
						 url= $("#searchCon li.on").find("a").attr("href");			
					 }
					 $("#searchCon").empty().hide();
					 $("#wd").focus();		
					 //alert("lll")
					 window.location.href = url;
					 break;
			 }
			
		}
		
function listHover(e){
			if(e.type=="mouseenter")
			{
				$("#searchCon li").removeClass("on");
				$(this).addClass("on");
				$(this).find('.removehis').css('display','block').siblings().find('b').css('display','none');
			}
			if(e.type=="mouseleave")
			{
				$("#searchCon li").removeClass("on");
				$(this).find('.removehis').css('display','none').siblings().find('b').css('display','inline');
			}
		    if(e.type=="click")
			{
				
				$("#searchCon").empty().hide();
				$("#wd").focus();
			}
			//$("#wd").val($("#searchCon li.on span").text());
			e.stopPropagation();
		}
	
	$(".headerSearch .searchCon").bind('mouseleave',function(e){
		setTimeout(function(){
			$(".searchCon").hide();	
	    },1000);
	});
	
	$(".searchCon").delegate(".search-close","click",function(e){
		$(this).parents(".searchCon").hide();
		e.stopropagation();
	});
	
	$("body").bind("click",function(e){
		$(".searchCon").hide();		
	});

	
	/*页头end*/
	
	
	/*菜单start*/
	
	$(".navCategoryMenu").mouseenter(function(){
		if($(".homeMainbody").length < 1){
			$(".categoryBox").show();
		}
	});
	
	$(".navCategoryMenu").mouseleave(function(){
		if($(".homeMainbody").length < 1){
			$(".categoryBox").hide();
		}
	});
	
	$(".categoryBox li").mouseenter(function(){
		$(".categoryBox").show();
		var $parents=$(this).parents(".navCategoryMenu");
		var index=$(".categoryBox li").index($(this));
		$(this).addClass("on");
		$parents.find(".menuBox").hide();
		$parents.find(".menuBox").eq(index).show();		
		var menuItemsHei=0;
		$parents.find(".menuBox").eq(index).find(".menuItem").each(function(){
			menuItemsHei+=$(this).height();
		})
		if((470-menuItemsHei)>=0){
			$parents.find(".menuBox").eq(index).find(".menuHeight .menuCon-list").css('height',(470-menuItemsHei)+'px');
		}else
		{
			$parents.find(".menuBox").eq(index).find(".menuHeight .menuCon-list").css('height','0px');
		}
	});
	$(".categoryBox li").mouseleave(function(e) {
		if($(".homeMainbody").length<1){
			$(".categoryBox").hide();
		}
        $(this).removeClass("on");
		$(".menuBox").hide();
    });
	
	$(".menuBox").mouseenter(function(e) {
        var index=$(".menuBox").index($(this));
		$(this).show();
		$(".categoryBox").show();
		$(".categoryBox li").eq(index).addClass("on");
    });
	$(".menuBox").mouseleave(function(e) {
		if($(".homeMainbody").length<1){
			$(".categoryBox").hide();
		}
        $(".categoryBox li").removeClass("on");
		$(this).hide();
    });
	
	$(".menuCon-filter .filter").bind('click',function(){
		$(this).addClass("on");
		$(this).siblings(".filter").removeClass("on");
	});
	
	//var braLength = Math.ceil($(".menuCon-brand a").length/6)*22;
	//$(".menuCon-brand").css('height',braLength);	
	
	/*菜单end*/
	
	
	/*页脚start*/

	$(".ftRight-form input").focus(function(e) {
        var value=$.trim($(this).val());
		$(this).next().hide();
		if(value=="请输入您的邮箱地址")
		{
			$(this).val("");			
		}
    });
	
	$(".ftRight-form input").blur(function(e) {
        var value=$.trim($(this).val()); 
		if(value=="")
		{
			$(this).next().show();
		}
    });
	
	$(".ftRight-form span").click(function(e) {
		$(this).hide();
		$(this).prev().focus();		
    });
	
	$(".weixinCon").mouseenter(function(){
		var codeState = $(this).attr('flag');
		if(codeState=='hide')
		{
			$(this).attr('flag','show');
			$(".weixinCode").show();
		}else{
			$(this).attr('flag','hide');
			$(".weixinCode").hide();
		}	
		
	})
	/*页脚end*/

    newPeopleRecruitLayer();
});

function    changeHeaderUrl(){ //页头搜索 增加area
	document.getElementById("area").value=userArray[0];
}
function    changeNavUrl(){	//导航搜索 增加area
	  var area = userArray[0];
		$(".navCategoryMenu  a").each(function(){
			changeStr($(this),true,area);
			});
		$(".navCategoryMenu  h3").each(function(){
			changeStr($(this),false,area);
			});
}
function changeDetailUrl(){
	var area = userArray[0];
	$(".detail-guide a").each(function(){
		changeStr($(this),true,area);
		});
}
function changeDetailLittle(){
	var area = $(".h5_dptctdrp a").eq(0).attr("pid");
	    $(".detail-guide a").each(function(){  //面包屑
				changeStr($(this),true,area);
	});
}
function changeUrlForDetail(){
	  var area = $(".h5_dptctdrp a").eq(0).attr("pid");
		$(".detail-guide a").each(function(){  //面包屑
			changeStr($(this),true,area);
		});
 	  document.getElementById("area").value=area; //页头搜索
		  $(".navCategoryMenu  a").each(function(){
			changeStr($(this),true,area);
		});
	  $(".navCategoryMenu  h3").each(function(){   //导航
			changeStr($(this),false,area);
		});
}

//获取标签URL，并重新设置area参数
function changeStr(This,flag,area){
	var str1;
	if(flag){
	   str1=This.attr('href');
	}else{
	   str1=This.attr('url');
	}
	
	var areaStr;
	
	var href = str1;
	if(str1.indexOf("area=")>0){
		var str2=str1.substring(str1.indexOf("area="),str1.length);
		if(str2.indexOf("&")>0){
		    areaStr = str1.substring(str1.indexOf("area="),str2.indexOf("&")+str1.indexOf("area="));
			var href = str1.replace(areaStr,"area="+area);
			if(flag){
				This.attr('href',href);
			}else{
				This.attr('url',href);
			}
			return true;
		}else if(str2.indexOf("#")>0){
			areaStr = str1.substring(str1.indexOf("area="),str2.indexOf("#")+str1.indexOf("area="));
				var href = str1.replace(areaStr,"area="+area);
			if(flag){
				This.attr('href',href);
			}else{
				This.attr('url',href);
			}
			return true;
		}else{
			areaStr = str1.substring(str1.indexOf("area="),str1.length);
			var href = str1.replace(areaStr,"area="+area);
			if(flag){
				This.attr('href',href);
			}else{
				This.attr('url',href);
			}
			return true;
		}
	}else if(str1.indexOf("htm")>0){
		var preStr;
		var afterStr;
		var str2=str1.substring(str1.indexOf("htm")+3,str1.length);
		if(str2.indexOf("?")>=0){
		    preStr = str1.substring(0,str1.indexOf("?")+1);
		    afterStr = str1.substring(str1.indexOf("?")+1,str1.length);
			href=preStr+"area="+area+"&"+afterStr;
			if(flag){
				This.attr('href',href);
			}else{
				This.attr('url',href);
			}
			return true;
		}else if(str2.indexOf("#")>=0){
			 preStr = str1.substring(0,str1.indexOf("#"));
			 afterStr = str1.substring(str1.indexOf("#"),str1.length);
			 href=preStr+"?area="+area+afterStr;
			 if(flag){
				This.attr('href',href);
			 }else{
				This.attr('url',href);
			 }
			 return true;
		}else{
			 href=href+"?area="+area;
			 if(flag){
				This.attr('href',href);
			 }else{
				This.attr('url',href);
			 }
			 return true;
		}
	}
}

/* 设置Cookie的值 */  
function setCookie(c_name, value, expiredays) {  
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays); 
    document.cookie = c_name + "=" + escape(value) +  
((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())  +";path=/;domain=jiuxian.com";
} 
/*根据名字获得Cookie值*/  
function getCookie(c_name) {  
    if (document.cookie.length > 0) {  
        c_start = document.cookie.indexOf(c_name + "=");  
        if (c_start != -1) {  
            c_start = c_start + c_name.length + 1;  
            c_end = document.cookie.indexOf(";", c_start);  
            if (c_end == -1) c_end = document.cookie.length; 
            return unescape(document.cookie.substring(c_start, c_end));  
        }  
    }  
    return ""; 
} 

function getGenerateUuid(){		// 获取uuid
	var chars = '0123456789abcdef'.split('');
    var uuid = [], rnd = Math.random, r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '1';
    for (var i = 0; i < 36; i++){
	    if (!uuid[i]){
		    r = 0 | rnd()*16;
		    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
	    }
    }
    return uuid.join('');
}

//初始化，为搜索用户分配SearchUserKey RandomTest
var SearchUserCookie = getCookie("SearchUserKey");
var RandomTestCookie = getCookie("RandomTest");
if(SearchUserCookie == ''){
	var _USER_EXPIRE = 1000 * 60*60*24*730;
	setCookie("SearchUserKey",getGenerateUuid(),_USER_EXPIRE);
}
if(RandomTestCookie == ''){
	// 获取0～1的随机数 
	var randomNum = Math.random() ;
	setCookie("RandomTest",randomNum,1000);
}

/* 设置Cookie的值 */  
function setHourCookie(c_name, value, expirehours) {  
    var exdate = new Date();
    exdate.setTime(exdate.getTime()+expirehours*60*60*1000); 
    document.cookie = c_name + "=" + escape(value) +  
((expirehours == null) ? "" : ";expires=" + exdate.toGMTString())  +";path=/;domain=jiuxian.com";
}

//新人招募弹窗是否展示
function newPeopleRecruitLayer() {
    var cookieLayerInfo = getCookie("newPeopleRecruitLayer");
    var html = '';
    // alert(cookieLayerInfo);
    if (cookieLayerInfo == "") {
        //调用ajax判断是否新用户，是展示否则不展示
        $.ajax({
            type: 'POST',
            url: '/newPeopleRecruitLayerType.htm',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                var adImgUrl = data.adPositionInfo.adImg;
                var adLink = data.adPositionInfo.adLink;

            	if(data.data =='1'){
                    html ='<div class="newGuests" style="background:url('+adImgUrl+') no-repeat top center scroll; display:none;">' +
                        '<div class="newGuestsBox">' +
                        '<a href="'+adLink+'" target="_blank" class="newGuestsLink"></a>' +
                        '<i class="newClose"></i>' +
                        '</div>' +
                        '</div>';
				}
                $('body').append(html);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(errorThrown + "获取价格异常");
                //alert("价格异常");
            }
        });
    }
}