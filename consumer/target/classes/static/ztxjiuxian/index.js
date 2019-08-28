
var  picLists=new Array();

//JavaScript Document
$(document).ready(function(e) {
	// var goodId0 = getHomeGoodId($(".indexTabBox"))
	// getProductActPrice(goodId0.join(','),'handleHomePagePrice');
	
	/*宽窄屏切换start*/
	var winWidht1 = $(window).width();
	var newLink = document.getElementById("newLink");
	var fale = true;
	if(winWidht1>1200 && fale){
		newLink.href = "http://misc.jiuxian.com/css/index_1200.css";
		resizeWidthOne(650);
		if(typeof(header1200) == 'undefined'){
			$(".midHeader").css('background','#fff');
		}else{
			topBg(header1200);
		}
		
		fale = false;
	}else{
		newLink.href = "";
		resizeWidthOne(550);
		if(typeof(header1000) == 'undefined'){
			$(".midHeader").css('background','#fff');
		}else{
			topBg(header1000);
		}
		fale = true;
	}
	
	function topBg(picUrl){
		if(typeof(picUrl)!='undefined' && picUrl !='' && picUrl.indexOf("LeftBgImg") == -1 && picUrl.indexOf("RightBgImg") == -1){
			$(".midHeader").css('background','url('+ picUrl +') no-repeat center top');
		}else{
			$(".midHeader").css('background','#fff');
		}
	}
	
	$(window).bind("resize",function(e) {
		currentPage = 0;
		$(".raceListWrap .receBoxs").css({"margin-left":0});
		currentPage1 = 0;
		$(".logoFirstbd").css({"margin-left":0});
        var winWidht2 = $(window).width();
		$(".focusMask").css("height",winWidht2+'px');
		var iTop=$(window).height()/2-150;
		$(".fixDiv").css("top",iTop);
		//resizeWidth();
		if(winWidht2>1200){
			newLink.href = "http://misc.jiuxian.com/css/index_1200.css";
			resizeWidthOne(650);
			if(header1200 == undefined){
				$(".midHeader").css('background','#fff');
			}else{
				topBg(header1200);
			}
		}else{
			newLink.href = "";
			resizeWidthOne(550);
			if(header1000 == undefined){
				$(".midHeader").css('background','#fff');
			}else{
				topBg(header1000);
			}
		}
    });
	/*宽窄屏切换end
	for(var s=0;s<picLists.length;s++){
		if(i==picLists[s][0]){
			curLi.attr("_src","url("+picLists[s][2]+")");
			curLi.find(".focusArea").attr("href",picLists[s][1]);
		}
	}*/

	/*轮播start*/
	$(".mainBanner").slide({
		titCell: ".smallBtn ul",
		mainCell: ".bigImg ul",
		effect: "fold",
		autoPlay: true,
		autoPage: true,
		trigger: "mouseenter",		
		startFun: function(i) {
			var curLi = jQuery(".mainBanner .bigImg li").eq(i);
			if ( !! curLi.attr("_src")) {
				if(picLists!='' && picLists.length>0){
					for(var s=0;s<picLists.length;s++){
						if(i==picLists[s][0]){
							curLi.attr("_src","url("+picLists[s][2]+")");
							curLi.find(".focusArea").attr("href",picLists[s][1]);
						}
					}					
				}
				curLi.css("background-image", curLi.attr("_src")).removeAttr("_src");
			}
		 }
    });
	
	$(".indexTabRight .sliderBox").slider_2();
	
	$(".mav a").mouseenter(function(){		
		var $this=$(this);
		$this.next().show();	
	});
	$(".mav a").mouseleave(function(){
		var $this=$(this);
		$this.next().hide();	
	});	
	/*轮播end*/
	
    
	
	/*疯狂抢购tab切换*/
	$(".indexTabNav li").mouseenter(function(e) {
		var index = $(".indexTabBox li").index($(this));
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".indexTabConWrap .indexTabCon").hide().eq(index).show();		
		$(".indexTabConWrap .indexTabCon").eq(index).find("img").lazyload_index({
			effect : "show"
		});
    });	
	
	
	$(".indexTabNewNav li").mouseenter(function(e) {
        var index = $(".indexTabNewNav li").index($(this));
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".indexTabNewCon .indexTabNewList").hide().eq(index).show();
    });
	

	
	/*限时抢购滚动start*/
	var currentPage = 0;
	$(".loadFirst").delegate(".raceListWrap .raceRight",'click',function(e){
		var countPage = $(".receBoxs .raceList").length;
		currentPage++;
		if(currentPage>=countPage){
			currentPage = countPage-1;
			return false;			
		}
        var sliderWidth = $(".raceListWrap").width();
		$(".raceListWrap .receBoxs").animate({"margin-left":-sliderWidth*currentPage},500);	
		$(".raceBox .rightNavBox span").removeClass("on").eq(currentPage).addClass("on");
	});
	
	$(".loadFirst").delegate(".raceListWrap .raceLeft",'click',function(e){
		var countPage = $(".receBoxs .raceList").length;
        currentPage--;
		if(currentPage<0){
			currentPage = 0;
			return false;			
		}
        var sliderWidth = $(".raceListWrap").width();
		$(".raceListWrap .receBoxs").animate({"margin-left":-sliderWidth*currentPage},500);	
		$(".raceBox .rightNavBox span").removeClass("on").eq(currentPage).addClass("on");
    });	
	
	$(".loadFirst").delegate(".rightNavBox span",'click',function(e){
        currentPage = $(".raceBox .rightNavBox span").index($(this));
		var sliderWidth = $(".raceListWrap").width();
		$(".raceListWrap .receBoxs").animate({"margin-left":-sliderWidth*currentPage},500);	
		$(this).addClass("on").siblings().removeClass("on");
    });
	/*限时抢购滚动end*/

	

	/*logo墙tab切换*/
	$(".loadFourth").delegate(".titieBox li","mouseenter",function(e) {
		var width=$(this).width(),
			$parents=$(this).parents(".contentThree"),
			$titieBox = $(this).parents(".titieBox"),
			index =$titieBox.find("li").index($(this)),
			opt = $('.optionsID'),
			$cont = $('.logoAll');
		if(index == 0){
			opt.show()	
		}else{opt.hide()}
		$titieBox.find("li").removeClass("on").eq(index).addClass("on");;
		$parents.find(".titleSlider").stop().animate({"left":(width+15)*index},300);
		$cont.hide().eq(index).show();
		$(".loadFourth .logoAll").eq(index).find("img").lazyload_index({
			effect : "show"
		});
		
    });	

	/*logo墙品牌切换*/
	$(".loadFourth").delegate(".logoAll a","mouseenter",function(e) {
        $(this).find("img").stop().animate({"margin-left":"-100px"},500);
    });
	
	$(".loadFourth").delegate(".logoAll a","mouseleave",function(e) {
        $(this).find("img").stop().animate({"margin-left":"0"},500);
    });

	
	
	/*logo墙滚动start*/
	var currentPage1 = 0;
	var countPage1;
	$(".loadFourth").delegate(".optionsID .nextPage","click",function(e) {
		countPage1 = $(".loadFourth .logoFirstbd ul").length;	
        currentPage1++;
		if(currentPage1>=countPage1){
			currentPage1 = countPage1-1;
			return false;			
		}
        var sliderWidth = $(".logoFirst ul").width();
		$(".logoFirstbd").stop(true,true).animate({"margin-left":-sliderWidth*currentPage1},500);	
    });
	
	$(".loadFourth").delegate(".optionsID .prevPage","click",function(e) {
		countPage1 = $(".loadFourth .logoFirstbd ul").length;	
        currentPage1--;
		if(currentPage1<0){
			currentPage1 = 0;
			return false;			
		}
        var sliderWidth = $(".logoFirst ul").width();
		$(".logoFirstbd").stop(true,true).animate({"margin-left":-sliderWidth*currentPage1},500);	
    });
	/*logo墙滚动end*/
	
	
	
	/*本周热销排行榜*/
	
	$(".loadFirst").delegate(".topTenNav a","mouseenter",function(){
		var index = $(".loadFirst .topTenNav a").index($(this));
		$(".loadFirst .topTenNav a").removeClass("on").eq(index).addClass("on");
		$(this).parents(".topTenBox").find(".topTenCon ul").hide().eq(index).show();
	});
	
	$(".loadSecond").delegate(".topTenNav a","mouseenter",function(){
		var index = $(".loadSecond .topTenNav a").index($(this));
		$(".loadSecond .topTenNav a").removeClass("on").eq(index).addClass("on");
		$(this).parents(".topTenBox").find(".topTenCon ul").hide().eq(index).show();
	});

    $('body').delegate('.newGuestsBox .newClose','click',function(){
        $('.newGuests').remove();
    })
	
	
	
	
	/*品牌精品店滚动JS start*/
	function  autoSidleHover(tabs,conts,onclass,delay,tabBox,times) {
		var len = tabs.length,
			index = 1,
			time;		
		tabs.mouseover(function(){
			index = tabs.index(this);
			return window.setTimeout(function(){
				showimg(index)	
			},times);			
		}).eq(0).mouseover();
		tabBox.hover(function(){
			clearInterval(time)	
		},function(){
			time = setInterval(function(){
				showimg(index);
				index++;
				if(index == len){
					index = 0;	
				}
			},delay)	
		}).trigger("mouseleave")
		function showimg(index){
			var i = 0;
			tabs.not(tabs.eq(index).addClass(onclass)).removeClass(onclass);
			if(i < index){
				conts.animate({marginTop:-(50*index)});
			}
			if(i >= index){
				i = 0;
				conts.animate({marginTop:0});
			}
		}
	}
	/*品牌精品店滚动JS end*/
	
	/*弹层*/
	showPopMask();
	function showPopMask(){
		var pop  = $(".popFocus").length;
		if(pop>0){
			popMask();		
		}	
	}
	
	
	function popMask(){	
		var usergent = getUserAgent();
		if(usergent["browser"]=="Internet Explorer" && usergent["version"]=="6.0"){
			return false;     //ie6不出现弹窗
		}
		else{//飘酒瓶			
			$(".focusMask,.popFocus").show();
			$(".popFocusCon").addClass("animate_1");
			var widthP=($(window).width()-1200)/2;
			var height=$(window).height();
			var winHei=$(window).height();
			$(".focusMask").css("height",winHei+'px');
			function getPositionRandom(){
				var position={"left":null,"top":null}
				position.top=parseInt(Math.random()*(-100))+"px";
				position.left=parseInt(Math.random()*1000+widthP)+"px";
				return position;
			}
				
			function getTimeRandom(){
				var moveTime=(parseInt(Math.random()*6)+5)*1000;
				return moveTime
			}	
			
			function hide(){
				$(".popFocusCon").addClass("animate_2");
				if(false)
				{
					$(".popFocus").hide();
					
				}else{
					setTimeout(function(){
					$(".popFocus").hide();
					},1000);
				}
				
				$(".focusMask").hide();
				$(".bottle").remove();
				creatDIV=function(){};
				moveRandom=function(){};
			}
				
			var  creatDIV=function(index){
				var div='<div class="bottle bottle_'+index+'">';
				$("body").append(div);
				var p=getPositionRandom();
				$(".bottle_"+index).css({"left":p.left,"top":p.top}).show();
			}
				
			var  moveRandom=function(index){
				$(".bottle_"+index).stop().animate({"top":height+"px","opacity":"0.4"},getTimeRandom(),function(){
					$(this).remove();
					creatDIV(index);
					moveRandom(index);
				});
			}
				
			for(var i=1;i<9;i++)
			{
				creatDIV(i);
				moveRandom(i);
			}
			var cc=setTimeout(function(){
				hide();			
			},8000);
				
			$(".popFocusClose").bind('click',function(){
				hide();			
			});
		}
	
	}
	/*弹层end*/
	
	/*分屏加载start*/
	var winHeight = $(window).height();
	var loadLocation1 = $(".loadFirst").offset().top-winHeight
	var loadLocation2 = $(".loadSecond").offset().top-winHeight;
	var loadLocation3 = $(".loadThird").offset().top-winHeight;
	var loadLocation4 = $(".loadFourth").offset().top-winHeight;	
	var loadLocation5 = $(".loadFifth").offset().top-winHeight;
	var flag1 = true;
	var flag2 = true;
	var flag3 = true;
	var flag4 = true;
	var flag5 = true;
	
	
	//加上广告标识begain
	try{
		$(".topFocusBox a").attr("href",$(".topFocusBox a").attr("href")+"?source=1");
	
		$(".headerLogo a").eq(1).attr("href",$(".headerLogo a").eq(1).attr("href")+"?source=2");
	
		var mainBannerSource=["3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"];
		$(".mainBanner .focusArea").each(function(index){
			var i= index;
			$(this).attr("href",$(this).attr("href")+"?source="+mainBannerSource[i*4]);
		});
		$(".mainBanner .mav").each(function(index){
			var i= index;
			$(this).find("a").each(function(index2){
				var j=index2;
				$(this).attr("href",$(this).attr("href")+"?source="+mainBannerSource[i*4+1+j]);
			});
		});
	
		var indexTabSource=["51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100"];
		$(".indexTabBox .indexTabCon").each(function(index){
			var i= index;
			$(this).find(".indexTabPic a").each(function(index2){
				var j=index2;
				var href=$(this).attr("href");
				if(href.indexOf("?")>-1){
					$(this).attr("href",$(this).attr("href")+"&source="+indexTabSource[i*10+j]);
				}else{
					$(this).attr("href",$(this).attr("href")+"?source="+indexTabSource[i*10+j]);
				}
			});
			$(this).find(".indexTabTit a").each(function(index2){
				var j=index2;
				var href=$(this).attr("href");
				if(href.indexOf("?")>-1){
					$(this).attr("href",$(this).attr("href")+"&source="+indexTabSource[i*10+j]);
				}else{
					$(this).attr("href",$(this).attr("href")+"?source="+indexTabSource[i*10+j]);
				}
			});
		});
	
		var indexTuanSource=["101","102","103","104"];
		$(".indexTuanList a").each(function(index){
			var i= index;
			$(this).attr("href",$(this).attr("href")+"?source="+indexTuanSource[i]);
		});
		var indexAdSource=["105","106","107","108","109","110"];
		$(".indexAdFocusList a").each(function(index){
			var i= index;
			$(this).attr("href",$(this).attr("href")+"?source="+indexAdSource[i]);
		});
	}catch(e){}
	//加上广告标识 end
	
	
	function loadFloor(){
		var scrollTopHeight = $(window).scrollTop();
		if(scrollTopHeight>loadLocation1&&scrollTopHeight<loadLocation2&&flag1){
			flag1=false;
			try{
				$(".loadFirst").load(window.jxdomain.home + "/layer1.htm",function(){  
					// var goodId1 = getHomeGoodId($(".loadFirst"));
					MallPcPrice.getPrices('indexLayer1');
					//取消pc首页优惠推荐的倒计时
                    //MallPcPrice.loadPromoEnding('countDownPanel');
					// getProductActPrice(goodId1.join(','),'handleHomePagePrice');
					$(".loadFirst .sliderBox").slider_2();				
					$(this).addClass("on");
					// timeChange();
					
					//加上广告标识begain
					try{
					$(".indexAdLeft a").attr("href",$(".indexAdLeft a").attr("href")+"?source=111");
					$(".indexAdRight a").attr("href",$(".indexAdRight a").attr("href")+"?source=112");
					var raceSource=["113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130"];
					$(".receBoxs .raceList").each(function(index){
						var i= index;
						$(this).find(".raceListPic a").each(function(index2){
							var j=index2;
							$(this).attr("href",$(this).attr("href")+"&source="+raceSource[i*6+j]);
						});
						$(this).find(".raceListTit a").each(function(index2){
							var j=index2;
							$(this).attr("href",$(this).attr("href")+"&source="+raceSource[i*6+j]);
						});
					});
					}catch(e){}
					//加上广告标识end
				});
			}catch(e){
				flag1=true;
				console.log(e);
			}
		}
		if(scrollTopHeight>loadLocation2&&scrollTopHeight<loadLocation3&&flag2){ 
			flag2=false;
			try{
				$(".loadSecond").load(window.jxdomain.home + "/layer2.htm",function(){	
					// var goodId2 = getHomeGoodId($(".loadSecond"));
					// getProductActPrice(goodId2.join(','),'handleHomePagePrice');
                    MallPcPrice.getPrices('indexLayer2');
					$(".loadSecond .sliderBox").slider_2();
					$(this).addClass("on");
					if(flag1){
						flag1=false;
						$(".loadFirst").load(window.jxdomain.home + "/layer1.htm",function(){  				
							// var goodId1 = getHomeGoodId($(".loadFirst"));
							// getProductActPrice(goodId1.join(','),'handleHomePagePrice');
                            MallPcPrice.getPrices('indexLayer1');
                            MallPcPrice.loadPromoEnding('countDownPanel');
							$(".loadFirst .sliderBox").slider_2();				
							$(this).addClass("on");
							// timeChange();
						});					
					}
			
				});
			}catch(e){
				flag2=true;
				console.log(e);
			}
			
		}
		if(scrollTopHeight>loadLocation3&&scrollTopHeight<loadLocation4&&flag3){  
			flag3=false;
			try{
				$(".loadThird").load(window.jxdomain.home + "/layer3.htm",function(){
					// var goodId3 = getHomeGoodId($(".loadThird"))
					// getProductActPrice(goodId3.join(','),'handleHomePagePrice');
                    MallPcPrice.getPrices('indexLayer3');
					$(".loadThird .sliderBox").slider_2();
					$(this).addClass("on");
					if(flag2){
						flag2=false;
						$(".loadSecond").load(window.jxdomain.home + "/layer2.htm",function(){				
							// var goodId2 = getHomeGoodId($(".loadSecond"));
							// getProductActPrice(goodId2.join(','),'handleHomePagePrice');
                            MallPcPrice.getPrices('indexLayer2');
							$(".loadSecond .sliderBox").slider_2();
							$(this).addClass("on");				
						});					
					}	
				});
			}catch(e){
				flag3=true;
				console.log(e);
			}
		}
		if(scrollTopHeight>loadLocation4&&scrollTopHeight<loadLocation5&&flag4){
			flag4=false;
			try{
				$(".loadFourth").load(window.jxdomain.home + "/layer4.htm?20160518",function(){	
					autoSidleHover($('#rightNavID li'),$('.goodLinkbd'),'on',3000,$('.Lay_3'),200);
					// var goodId4 = getHomeGoodId($(".loadFourth"));
					// getProductActPrice(goodId4.join(','),'handleHomePagePrice');
                    MallPcPrice.getPrices('indexLayer4');
					$(".loadFourth .sliderBox").slider_2();
					$(this).addClass("on");
					if(flag3){
						flag3=false;
						$(".loadThird").load(window.jxdomain.home + "/layer3.htm",function(){  						
							// var goodId3 = getHomeGoodId($(".loadThird"));
							// getProductActPrice(goodId3.join(','),'handleHomePagePrice');
                            MallPcPrice.getPrices('indexLayer3');
							$(".loadThird .sliderBox").slider_2();
							$(this).addClass("on");			
						});					
					}
				});	
			}catch(e){
				flag4=true;
				console.log(e);
			}
		}
		if(scrollTopHeight>loadLocation5&&flag5){
			//跨域请求
			flag5 = false;
            $.post(window.jxdomain.pub+ "/indexfooter.htm",function(data) {
                    $(".loadFifth").html(data);
                    if(flag4){
                        flag4=false;
                        $(".loadFourth").load(window.jxdomain.home + "/layer4.htm",function(){
                            autoSidleHover($('#rightNavID li'),$('.goodLinkbd'),'on',3000,$('.Lay_3'),200);
                            // var goodId4 = getHomeGoodId($(".loadFourth"));
                            // getProductActPrice(goodId4.join(','),'handleHomePagePrice');
                            MallPcPrice.getPrices('indexLayer4');
                            $(".loadFourth .sliderBox").slider_2();
                            $(this).addClass("on");
                        });
                    }
                }
        	);


			/*
			var proxy_url = "/httpProxyAccess.htm";
		    var sub_request_url = window.jxdomain.pub+ "/indexfooter.htm";
		    $.post(proxy_url,
					{
						target : sub_request_url
					},
					function(data) {
							$(".loadFifth").html(data);
							if(flag4){
								flag4=false;
								$(".loadFourth").load(window.jxdomain.home + "/layer4.htm",function(){			
									autoSidleHover($('#rightNavID li'),$('.goodLinkbd'),'on',3000,$('.Lay_3'),200);
									// var goodId4 = getHomeGoodId($(".loadFourth"));
									// getProductActPrice(goodId4.join(','),'handleHomePagePrice');
                                    MallPcPrice.getPrices('indexLayer4');
									$(".loadFourth .sliderBox").slider_2();
									$(this).addClass("on");
								});								
							}
			})
			*/
		
		}
	}
	
	loadFloor();
	/*分屏加载end*/
	
	/*跟随层start*/
	var iTop=$(window).height()/2-150;	
	var contentFirstTop =1460-iTop;
	var whiteWineTop=1529-iTop;
	var redWineTop=2229-iTop;
	var foreignWineTop=2929-iTop;
	var healthWineTop=3467-iTop;
	var contentThreeTop=4553-iTop;
	var foodAndWineTop =4015-iTop;
	var arrPosition=[whiteWineTop+iTop,redWineTop+iTop,foreignWineTop+iTop,healthWineTop+iTop,foodAndWineTop+iTop];
	var bStop=1;
	var bStopScroll=1;
	var timeShow=null;	
	$('.fixDiv').css("top",iTop);
	
	scrollTop();
	
	$(window).bind("scroll",function(){
		loadFloor();
		scrollTop();
	});
	
	
	/*function resizeWidth(){		
		var iL=parseInt(($(window).width()-$('.mainBox').width())/2);
		var fixL=parseInt(iL-$('.fixDiv').width()-10);
		$('.fixDiv').css('left',fixL+'px');
	};*/
	function resizeWidthOne(leftpx){		
		$('.fixDiv').css({'marginLeft':-leftpx,'left':'50%'});
	}
	
	function changeEffect(x){		
		if(bStop)
		{
			$('.fixDiv').css({
								'zIndex':'300',
								'-webkit-transform':'scaleY(1)',
								'-moz-transform':'scaleY(1)',
								'transform':'scaleY(1)',
								'-ms-transform':'scaleY(1)',
								'-o-transform':'scaleY(1)',
								'opacity':1
							})
		
			$('.fixDiv div').each(function(i, element) {
                $(this).find('a:eq(1)').css('opacity',1);
				$(this).find('a:eq(0)').text('').attr('on',0).hide();
            });
			$('.fixDiv div:eq('+x+')').find('a:eq(1)').css('opacity',0);
			$('.fixDiv div:eq('+x+')').find('a:eq(0)').text($('.fixDiv div:eq('+x+')').find('a:eq(0)').attr('name')).attr('on',1).show();
		}
	}
	
	function scrollTop(){
		var scrollTopHeight =  $(window).scrollTop()
		if(bStopScroll)
		{
            if(scrollTopHeight>=500){
                $('.newGuests').fadeIn();
            }else{
                $('.newGuests').fadeOut();
            };
			if(scrollTopHeight<=contentFirstTop)
			{
				$('.fixDiv').css({
									
									'-webkit-transform':'scaleY(1.5)',
									'-moz-transform':'scaleY(1.5)',
									'transform':'scaleY(1.5)',
									'-ms-transform':'scaleY(1.5)',
									'-o-transform':'scaleY(1.5)',
									'opacity':0
								})
				timeShow=setTimeout(function(){
					$('.fixDiv').css('zIndex','10');
				},500)
			}
			else if(scrollTopHeight>contentFirstTop&&scrollTopHeight<=whiteWineTop){
					$('.fixDiv').css({
									'zIndex':'300',
									'-webkit-transform':'scaleY(1)',
									'-moz-transform':'scaleY(1)',
									'transform':'scaleY(1)',
									'-ms-transform':'scaleY(1)',
									'-o-transform':'scaleY(1)',
									'opacity':1
					})
			}
			else if(scrollTopHeight>=whiteWineTop&&scrollTopHeight<redWineTop)
			{
				
				changeEffect(0)
			}
			else if(scrollTopHeight>=redWineTop&&scrollTopHeight<foreignWineTop)
			{
				
				changeEffect(1)
			}
			else if(scrollTopHeight>=foreignWineTop&&scrollTopHeight<healthWineTop)
			{
			
				changeEffect(2)
			}
			else if(scrollTopHeight>=healthWineTop&&scrollTopHeight<foodAndWineTop)
			{
				
				changeEffect(3)
			}else if(scrollTopHeight>=foodAndWineTop&&scrollTopHeight<contentThreeTop)
			{
				
				changeEffect(4)
			}
			else
			{
				if(bStop)
				{
					$('.fixDiv div').each(function(i, element) {
						$(this).find('a:eq(1)').css('opacity',1);
						$(this).find('a:eq(0)').text('').hide();
						$(this).attr('on',0);
					});
				}
			}
		}
	}

	$('.fixDiv div').each(function(i, element) {
		
        $(this).bind('click',function(){
			
			bStopScroll=0;
			changeEffect(i);
			$('.fixDiv div:eq('+i+')').find('a:eq(0)').text($('.fixDiv div:eq('+i+')').find('a:eq(0)').attr('hname'))
			$(this).find('a:eq(0)').attr('on',1)
			$('html,body').stop().animate({'scrollTop':arrPosition[i]},500);
		})
    });
	
	$('.fixDiv div').bind('mouseenter',function(){
			$(this).find('a:eq(1)').stop().css('opacity',0);
			$(this).find('a:eq(0)').stop().text($(this).find('a:eq(0)').attr('hname')).show();;
			if(!$(this).find('a:eq(0)').is(':animated'))
			{
				$(this).find('a:eq(0)').stop().animate({width:$(this).find('a:eq(0)').attr('w')},400)
			}
		})
	$('.fixDiv div').bind('mouseleave',function(){		
			var _this=$(this)
			_this.find('a:eq(0)').stop().animate({width:'30px'},400,function(){
			
				if(_this.find('a:eq(0)').attr('on')==1)
				{					
						_this.find('a:eq(0)').text(_this.find('a:eq(0)').attr('name'))
				}
				else
				{
						_this.find('a:eq(1)').stop().animate({'opacity':0.8},100,function(){
						_this.find('a:eq(0)').hide();
						_this.find('a:eq(1)').css('opacity','1');
						})
				}
			})
			bStop=1;
			bStopScroll=1;
	});	
	$('.fixDiv span').bind('click',function(){		
		$('html,body').stop().animate({'scrollTop':0},800)
	});
	$('.fixDiv span').bind('mouseenter',function(){		
		$(this).find('i').css('background-position','-95px -190px')
	});
	$('.fixDiv span').bind('mouseleave',function(){		
		$(this).find('i').css('background-position','-74px -190px')
	});
	/*跟随层end*/
	
	
	
	//首页页脚（delegate方法）
	$(".loadFifth").delegate(".ftRight-form input","focus",function(e) {
        var value=$.trim($(this).val());
		$(this).next().hide();
		if(value=="请输入您的邮箱地址")
		{
			$(this).val("");			
		}
    });
	
	$(".loadFifth").delegate(".ftRight-form input","blur",function(e) {
        var value=$.trim($(this).val()); 
		if(value=="")
		{
			$(this).next().show();
		}
    });
	
	$(".loadFifth").delegate(".ftRight-form span","click",function(e) {
		$(this).hide();
		$(this).prev().focus();		
    });
	
	
	$(".loadFifth").delegate(".weixinCon","mouseenter",function(e) {
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
	//邮件订阅
	$(".loadFifth").delegate("#subscribe_but","click",function(e) {
		var subscribeEmail = jQuery("#subscribe_email").val();
		if (subscribeEmail == "" || subscribeEmail == "请输入您的邮箱") {
			alert("请输入您的邮箱！")
		} else {
			var regemail = /^[\w\-\.]+?@[\w\-]+?(\.\w+?)+?$/;
			if (subscribeEmail.length > 30) {
				alert("请输入正确的邮箱")
			} else {
				if (!subscribeEmail.match(regemail)) {
					alert("请输入正确的邮箱")
				} else {
					var proxy_url = "/httpProxyAccess.htm?t=" + new Date().getTime();
					var sub_request_url = window.jxdomain.pub + "/saveUserSubscribeInfos.htm";
					$.post(proxy_url, {
						target: sub_request_url,
						emailAddress: subscribeEmail
					}, function(data) {
						if (data != null) {
							if (data.code == 1) {
								alert("订阅促销信息成功。")
							} else {
								if (data.code == 0) {
									alert("请输入正确的邮箱")
								} else {
									if (data.code == 2) {
										alert("该Email地址已经订阅过促销信息！")
									} else {
										if (data.code == 3) {
											alert("对不起，订阅失败！")
										}
									}
								}
							}
						}
					}, "JSON")
				}
			}
		}
	});
	
	function searchback(data){		
		if(data.defaultSearchKey==undefined || data.defaultSearchKey == null){return ;}			
		var key = $("#wd").val();
		if(key == ''){
    		if(data && data.defaultSearchKey != null && data.defaultSearchKey != ''){
        		$("#wd").val(data.defaultSearchKey);
        		//搜索页底部搜索框
        		$("#bottomKeys").val(data.defaultSearchKey);
        		defaultKey = data.defaultSearchKey;
    		}else{
    			//$("#wd").val("三人炫");
    			//$("#bottomKeys").val("三人炫");
    			//defaultKey = "三人炫";
    		}
		}
	}
	function profileback(data){	
			//用户登录信息
            var str = window.location + "";
            if (str.indexOf(window.jxdomain.cart + "/") != -1 || str.indexOf("pay.jiuxian.com/") != -1) {
            	var _login_status_panel = $("li[name='_login_status_panel']");//购物车与订单头部保持老页头
            }else{
				var _login_status_panel = $(".topHeaderLeft[name='_new_login_status_panel']");//其他页面头部使用新页头
			}			
            if (data.jx_user_name) {
                var old_jx_user_name = stripscript(data.jx_user_name);
                var jx_user_name;
                if (old_jx_user_name != cut_str(old_jx_user_name, 10)) {
                    jx_user_name = cut_str(old_jx_user_name, 10)
                } else {
                    jx_user_name = data.jx_user_name
                }
                
                if (str.indexOf(window.jxdomain.cart + "/") != -1 || str.indexOf("pay.jiuxian.com/") != -1) {
                	_login_status_panel.html("<span> hi，<span class='userName' title='" + old_jx_user_name + "'>" + jx_user_name + "</span><span><a href='"+window.jxdomain.login+"/logout.htm' class='cartlogout'>退出</a><a class='newsNum' href='"+window.jxdomain.member+"/jxcircle/info_center-0.htm' target='_blank'><em>消息</em><i class='mesNum'></i></a><a class='newsNum' href='"+window.jxdomain.member+"/purse/my_gold_coin-1.htm' target='_blank'><em>金币</em><i class='mesNum'></i></a></span></span><i></i>")				
                }else{				
                	_login_status_panel.html("<div class='clearfix'><p class='greeting'><em>hi，</em><span>" + jx_user_name + "</span></p><a class='headerExit' href='"+window.jxdomain.login+"/logout.htm'>退出</a><a class='newsNum' href='"+window.jxdomain.member+"/jxcircle/info_center-0.htm' target='_blank'><em>消息</em><i class='mesNum'></i></a><a class='newsNum' href='"+window.jxdomain.member+"/purse/my_gold_coin-1.htm' target='_blank'><em>金币</em><i class='mesNum'></i></a></div>");
                }
			    showMesNum();
			}
            if (data.jx_user_id) {
                _ozuid = data.jx_user_id
            }
			//购物车数量
            if (data.jxcart_nums) {
                if (data.jxcart_nums > 999) {
                    $(".jx_car_num").text("999+")
					//侧边栏用户购物车商品数量
					if($("#side_goods_count") != null){
						$("#side_goods_count").text("999+");
					}
                } else {
                    $(".jx_car_num").text(data.jxcart_nums);
					//侧边栏用户购物车商品数量
					if($("#side_goods_count") != null){
    					$("#side_goods_count").text(data.jxcart_nums);
					}
                }
            }
			
	}

	setTimeout(function(){
		var searchUrl = window.jxdomain.pub + "/selectSearchDefaultKey.htm?t="+new Date().getTime();
		jQuery.post("/addJXCenterCookie.htm",
					{ 
						"target":searchUrl,
						"name":"searchBoxDefaultKey"
					},
					function(d){
						
						if(d==undefined)
							return;

						var data=eval("("+ d.defaultSearchKey+")");

						//search callback
						searchback(data);
						//profile callback
						profileback(d);

					},		
					"json");

	},1000);
	/*消息数量start*/
	function showMesNum(){
		var proxy_url = "/httpProxyAccess.htm?date="+new Date().getTime();
		jQuery.ajax({
			type:'post',
			url:proxy_url,
			data:{target:domain_member+"/getUserMessageNums.htm"},
			dataType:'json',
			success:function(data){
				if(data!=null){
					if(data.returnCode == "1"){
						if(data.messageNums > 0){
							$('.mesNum').eq(0).text(data.messageNums);						
						}else{
							$('.mesNum').eq(0).text("0");
						}
						if(data.usableGold > 0){
							$('.mesNum').eq(1).text(data.usableGold);						
						}else{
							$('.mesNum').eq(1).text("0");
						}
					}else{
						$('.mesNum').eq(0).text("0");
						$('.mesNum').eq(1).text("0");
					}
					
				}
				
			}
		});		
	}
	/*消息数量end*/

});
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
/*获取uuid*/  
function generateUuid(){		
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