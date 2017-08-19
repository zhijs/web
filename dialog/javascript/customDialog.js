function Dialog(){
	this.createDialog(); //创建对话框
}

//原型实现
Dialog.prototype={
	//默认的对话框信息
    defaultOpts:{
	     title:'',
	     nessage:'',
	     isShowCloseBtn:true,//默认显示关闭按钮
	     isShowComfirmBtn:false,
	     onClose:function(){}, //对话框关闭函数
	     onConfirm:function(){} //对话框确认后执行函数
    },
    open:function(opts){
    	 this.setOption(opts); //设置对话框的信息等
    	 this.setDialog();//设置对话框
    	 this.showDialog();
    	 this.bindEvent();
    },

    setOption:function(opts){
    	//传入的字符串为对话框内容信息
         if(Object.prototype.toString.call(opts)=='[object String]')
         {
         	this.opts=$.extend({},this.defaultOpts,{message:opts});
         }
         else if(Object.prototype.toString.call(opts)=="[object Object]") //传入的为对象
         {
         	this.opts=$.extend({},this.defaultOpts,opts);
         }
    },

    createDialog:function(){
        var tpl='<div class="dialog-contain">'
                      +'<div class="dialog-header">'
                         +'<h3 class="dialog-tip"></h3>'
                         +'<span class="close-btn">X</span>'
                      +'</div>'
                      +'<div class="dialog-content">'
                      +'</div>'
                      +'<div class="dialog-footer">'
                      +'<a href="#" class="confirm-btn">确定</a>'
                      +'<a href="#" class="close-btn">取消</a>'
                      +'</div>'
                  +'</div>';
        this.$dialog=$(tpl);
        $('body').append(this.$dialog);
    },
    
    setDialog:function(){
         var $dialog=this.$dialog;
         if(!this.opts.title){
         	$dialog.find('.dialog-header').hide();
         }
         else
         {
         	$dialog.find('.dialog-header').show();
         }
         if(!this.opts.isShowCloseBtn){
         	$dialog.find('.dialog-footer .close-btn').hide();
         }
         else
         {
         	$dialog.find('.dialog-footer .close-btn').show();
         }
         if(!this.opts.isShowComfirmBtn)
         {
         	$dialog.find('.dialog-footer .confirm-btn').hide();
         }
         else
         {
         	$dialog.find('.dialog-footer .confirm-btn').show();
         }
         $dialog.find('.dialog-header h3').text(this.opts.title);
         $dialog.find('.dialog-content').html(this.opts.message);
    },

    //设置事件函数
    bindEvent:function(){
         var self=this;
         self.$dialog.find('.close-btn').on('click',function(e){
          e.preventDefault();
          self.opts.onClose();//点击关闭后调用关闭后的函数
          self.hideDialog();
         });
         self.$dialog.find('.confirm-btn').on('click',function(e){
           e.preventDefault();//阻止浏览器的默认动作
           self.opts.onConfirm();
           self.hideDialog();

         });
         //拖动相关
         self.$dialog.on('mousedown',function(e){
         	var $dialog=$(this);
         	var eventx=e.pageX-$dialog.offset().left;//获取鼠标按下点与对话框左边界的距离
         	var eventy=e.pageY-$dialog.offset().top;
         	$dialog.addClass('draggable').data('eventPos',{x:eventx,y:eventy});//保存数据
         });

         $('body').on('mouseup',function(e){
            $('.draggable').removeClass("draggable").removeData("pos");
         });

         $('body').on('mousemove',function(e){
         	$('.draggable').length && $('.draggable').offset({
         		top:e.pageY-$('.draggable').data('eventPos').y,
         		left:e.pageX-$('.draggable').data('eventPos').x
         	});
         });
        
         
    },
    //对话框关闭函数
    hideDialog:function(){
         this.$dialog.hide();
    },
     
     showDialog:function(){
         this.$dialog.show();
     },
};