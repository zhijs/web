/*
   原理，滑动的时候定时检测
*/

var lazyModule={

    init:function($imgs,handler){
         this.$controller=$(window);
         this.$target=$imgs;
         this.handler=handler;
         this.bind();
    },

    bind:function(){
         var self=this;
         var timer=null;  
         var interval=100;  //设置定时检测滑动距离的时长
         $(window).on('scroll',function(){
         	//屏幕滚动，检测距离以及图片是否加载
         	timer && clearTimeout(timer);
         	timer=setTimeout(function(){
         		self.checkShow();
         	},interval);
         });
    },

    checkShow:function(){
         var self=this;
         this.$target.each(function(){
         	var $img=$(this);
         	if(self.isShouldShow($img) && !self.hasLoaded($img))
         	{
               self.handler && self.handler.call(this,this);
               $img.data('loaded',true);
         	}
         });
       
    },

    isShouldShow:function($ele){  //检测元素是否应该应该被加载
      var scrollHeight=this.$controller.scrollTop();// 获取屏幕滑动的距离
      var windowHeight=this.$controller.height();
      var top=$ele.offset().top;
      if(top<scrollHeight+windowHeight){
      	return true;
      }
      else
      	return false;
     
    },

    hasLoaded:function($ele){
       if($ele.data('loaded')){
       	return true;
       }
       else
       	return false;
    },
};