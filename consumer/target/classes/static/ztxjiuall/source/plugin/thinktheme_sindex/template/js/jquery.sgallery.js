/*
 *	sGallery 1.0 - simple gallery with jQuery
 *	made by bujichong 2009-11-25
 *	���ߣ����  2009-11-25
 * http://hi.baidu.com/bujichong/
 *	��ӭ����ת�أ��������������Ͷ��ɹ������������Դ������
 */

(function (jQuery) {
jQuery.fn.sGallery = function (o) {
    return  new jQuerysG(this, o);
			//alert('do');
    };

	var settings = {
		thumbObj:null,//Ԥ������
		titleObj:null,//����
		botLast:null,//��ť��һ��
		botNext:null,//��ť��һ��
		thumbNowClass:'now',//Ԥ������ǰ��class,Ĭ��Ϊnow
		slideTime:800,//ƽ������ʱ��
		autoChange:true,//�Ƿ��Զ��л�
		changeTime:5000,//�Զ��л�ʱ��
		delayTime:100//��꾭��ʱ��Ӧ���ӳ�ʱ��
	};

 jQuery.sGalleryLong = function(e, o) {
    this.options = jQuery.extend({}, settings, o || {});
	var _self = jQuery(e);
	var set = this.options;
	var thumb;
	var size = _self.size();
	var nowIndex = 0; //����ȫ��ָ��
	var index;//����ȫ��ָ��
	var startRun;//Ԥ�����Զ����в���
	var delayRun;//Ԥ�����ӳ����в���

//��ʼ��
	_self.eq(0).show();

//���л�����
function fadeAB () {
	if (nowIndex != index) {
		if (set.thumbObj!=null) {
		jQuery(set.thumbObj).removeClass().eq(index).addClass(set.thumbNowClass);}
		_self.eq(nowIndex).hide();
		_self.eq(index).stop(true,true).fadeIn(set.slideTime);
		jQuery(set.titleObj).eq(nowIndex).hide();//������title
		jQuery(set.titleObj).eq(index).show();//������title
		nowIndex = index;
		if (set.autoChange==true) {
		clearInterval(startRun);//�����Զ��л�����
		startRun = setInterval(runNext,set.changeTime);}
		}
}

//�л�����һ��
function runNext() {
	index =  (nowIndex+1)%size;
	fadeAB();
}

//�����һͼƬ
	if (set.thumbObj!=null) {
	thumb = jQuery(set.thumbObj);
//��ʼ��
	thumb.eq(0).addClass(set.thumbNowClass);
		thumb.bind("mousemove",function(event){
			index = thumb.index(jQuery(this));
			fadeAB();
			delayRun = setTimeout(fadeAB,set.delayTime);
			clearTimeout(delayRun);
			event.stopPropagation();
		})
	}

//�����һ��
	if (set.botNext!=null) {
		var botNext = jQuery(set.botNext);
		botNext.mousemove(function () {
			runNext();
			return false;
		});
	}

//�����һ��
	if (set.botLast!=null) {
		var botLast = jQuery(set.botLast);
		botLast.mousemove(function () {
			index = (nowIndex+size-1)%size;
			fadeAB();
			return false;
	});
	}

//�Զ�����
	if (set.autoChange==true) {
	startRun = setInterval(runNext,set.changeTime);
	}

}

var jQuerysG = jQuery.sGalleryLong;

})(jQuery);

function slide(Name,Class,Width,Height,fun){
	jQuery(Name).width(Width);
	jQuery(Name).height(Height);
	
	if(fun == true){
		jQuery(Name).append('<div class="title-bg"></div><div class="title"></div><div class="change"></div>')
		var atr = jQuery(Name+' div.changeDiv a');
		var sum = atr.length;
		for(i=1;i<=sum;i++){
			var title = atr.eq(i-1).attr("title");
			var href = atr.eq(i-1).attr("href");
			jQuery(Name+' .change').append('<i>'+i+'</i>');
			jQuery(Name+' .title').append('<a href="'+href+'">'+title+'</a>');
		}
		jQuery(Name+' .change i').eq(0).addClass('cur');
	}
	jQuery(Name+' div.changeDiv a').sGallery({//����ָ��㣬���ڰ���ͼƬ������
		titleObj:Name+' div.title a',
		thumbObj:Name+' .change i',
		thumbNowClass:Class
	});
	jQuery(Name+" .title-bg").width(Width);
}

//����ͼ
jQuery.fn.LoadImage=function(scaling,width,height,loadpic){
    if(loadpic==null)loadpic="../images/msg_img/loading.gif";
return this.each(function(){
   var t=jQuery(this);
   var src=jQuery(this).attr("src")
   var img=new Image();
   img.src=src;
   //�Զ�����ͼƬ
   var autoScaling=function(){
    if(scaling){
     if(img.width>0 && img.height>0){ 
           if(img.width/img.height>=width/height){ 
               if(img.width>width){ 
                   t.width(width); 
                   t.height((img.height*width)/img.width); 
               }else{ 
                   t.width(img.width); 
                   t.height(img.height); 
               } 
           } 
           else{ 
               if(img.height>height){ 
                   t.height(height); 
                   t.width((img.width*height)/img.height); 
               }else{ 
                   t.width(img.width); 
                   t.height(img.height); 
               } 
           } 
       } 
    } 
   }
   //����ff�»��Զ���ȡ����ͼƬ
   if(img.complete){
    //autoScaling();
      return;
   }
   jQuery(this).attr("src","");
   var loading=jQuery("<img alt=\"������...\" title=\"ͼƬ������...\" src=\""+loadpic+"\" />");
  
   t.hide();
   t.after(loading);
   jQuery(img).load(function(){
    //autoScaling();
    loading.remove();
    t.attr("src",this.src);
    t.show();
	//jQuery('.photo_prev a,.photo_next a').height(jQuery('#big-pic img').height());
   });
  });
}

//���Ϲ�������
function startmarquee(elementID,h,n,speed,delay){
 var t = null;
 var box = '#' + elementID;
 jQuery(box).hover(function(){
  clearInterval(t);
  }, function(){
  t = setInterval(start,delay);
 }).trigger('mouseout');
 function start(){
  jQuery(box).children('ul:first').animate({marginTop: '-='+h},speed,function(){
   jQuery(this).css({marginTop:'0'}).find('li').slice(0,n).appendTo(this);
  })
 }
}

//TAB�л�
function SwapTab(name,title,content,Sub,cur){
  jQuery(name+' '+title).mouseover(function(){
	  jQuery(this).addClass(cur).siblings().removeClass(cur);
	  jQuery(content+" > "+Sub).eq(jQuery(name+' '+title).index(this)).show().siblings().hide();
  });
}