/*
  封装datePicker插件
*/
function DatePicker($target)
{   
	//初始化日历
	this.init($target);
	//渲染日历
	this.render();
    
    //设置数据
    this.setData();

    //事件绑定
    this.bind();
};

DatePicker.prototype={
    //$target为输入框input
    init:function($target){
    	this.$target=$target;
    	if(this.isValidDate($target.attr('data-init')))
    	{
            this.initDate=new Date(dateStr);
            this.watchDate=new Date(dateStr);//初始化时间
    	}
    	else
    	{
    		this.initDate=new Date();
    		this.watchDate=new Date();
    	}
    },

    render:function(){
         var picker=' <div class="date-picker-contain">'
                   +' <div class="header"> <span class="pre"></span>' 
                   +'<span class="select-date"></span><span class="next"></span></div>'
                   +'<table class="picker"><thead><tr><th>Sun</th><th>Mon</th><th>Tue</th> <th>Wed</th><th>Thu</th><th>Fri</th> <th>Sat</th> </tr></thead>'
                   +'<tbody></tbody>'
                   +'</div>';
         this.$datePicker=$(picker);
         this.$datePicker.insertAfter(this.$target) //在输入框后面插入日历
                          .css({
                          	'position':'absolute',
                          	'left':this.$target.offset().left,
                            'top':this.$target.offset().bottom 
                          }); 
         
    },

    setData:function(){
          this.$datePicker.find('tbody').html('');
          var firstDay=this.getFirstDay(this.watchDate);
          var lastDay=this.getLastDay(this.watchDate);
          var dateArr=[];
          //获取当前日历的上一个月的号数
          for(var i=firstDay.getDay();i>0;i--)
          {
          	 var date=new Date(firstDay.getTime()-i*24*60*60*1000);
             dateArr.push({'type':'pre','date':date});
          }
          //获取当前日历月的当前的日期数
          for(var j=0;j<lastDay.getDate()-firstDay.getDate()+1;j++)
          {
          	 var date=new Date(firstDay.getTime()+j*60*60*24*1000);
          	 dateArr.push({'type':'cur','date':date});
          }

          //获取当前日历月的下个月的日期
          for(var k=1;k<7-lastDay.getDay();k++)
          {
               var date=new Date(lastDay.getTime()+k*24*60*60*1000);
               dateArr.push({'type':'next','date':date});
          }
    
          //设置当前默认年月份
          this.$datePicker.find('.select-date').text(this.watchDate.getFullYear()+'年'+(this.watchDate.getMonth()+1)+'月');
          //设置日期
          var bodyStr='';
          for(var i=0; i<dateArr.length;i++)
          {
          	 if(i%7==0)
          	 {
          	 	bodyStr+='<tr>';
          	 }
          	 bodyStr+='<td class="';
          	 if(dateArr[i].type==='pre')
          	 {
          	 	bodyStr+='pre-month';
          	 }
          	 else if(dateArr[i].type==='cur')
          	 {
          	 	bodyStr+='cur-month';
          	 }
          	 else 
          	 {
          	 	bodyStr+='next-month';
          	 }
          	 if(this.getYYMMDD(dateArr[i].date)===this.getYYMMDD(this.initDate))
          	 {
       
          	 	bodyStr+=' cur-date';
          	 }
          	 bodyStr+='"';
          	 bodyStr+=' data-date="'+this.getYYMMDD(dateArr[i].date)+'" >';
          	 bodyStr+=this.toFixed(dateArr[i].date.getDate())+'</td>';
             if(i%7==6)
             {
             	 bodyStr+='</tr>';
             }
          }
          this.$datePicker.find('tbody').html(bodyStr);
    },

    //绑定事件的处理函数
    bind:function(){
         var self=this;
         this.$datePicker.find('.pre').on('click',function(){
         	//跳至上一个月份
         	self.watchDate=self.getPreMonth(self.watchDate);
         	self.setData();
         });

         this.$datePicker.find('.next').on('click',function(){
         	self.watchDate=self.getNextDate(self.watchDate);
         	self.setData();
         });
         //选中当前日期
         this.$datePicker.find('.cur-month').on('click',function(){
         	self.$target.val($(this).attr('data-date'));
         	self.$datePicker.hide();
         });
         //点击非本月的日期
         this.$datePicker.on('click',function(e){
         	e.stopPropagation();
         });
         //点击输入框，弹出日历选择
         this.$target.on('click',function(e){
             e.stopPropagation(); //阻止事件冒泡，防止其父组件点击触发
             self.$datePicker.show();
         });
         $(window).on('click',function(){
         	self.$datePicker.hide();
         });
    },
    //根据给定的年月获取第一天
    getFirstDay:function(date){
          var year=date.getFullYear();
          var month=date.getMonth();
          return newDate=new Date(year,month,1);

    },

    //根据给定的年月获取该月份的最后一天
    //下一个月的第一天减去一天即可
    getLastDay:function(date){
         var year=date.getFullYear();
         var month=date.getMonth();
         month++;
         if(month>11){
         	month=0;
         	year++;
         }
         var nextDate=new Date(year,month,1);
         return new Date(nextDate.getTime()-1000*60*60*24);
    },

    //跳至上以月份的函数
    getPreMonth:function(date){
    	var year=date.getFullYear();
    	var month=date.getMonth();
    	month--;
    	if(month<0)
    	{
    		month=11; //注意，此处是11不是12，因为Date的月份是从0开始的
    		year--;
    	}
    	return new Date(year,month,1);
    },

    //跳至下一月份
    getNextDate:function(date){
    	var year=date.getFullYear();
    	var month=date.getMonth();
    	month++;
    	if(month>11)
    	{
    		month=0; //注意，此处是11不是12，因为Date的月份是从0开始的
    		year++;
    	}
    	return new Date(year,month,1);
    },
    
    //Date => 2017/08/02
    getYYMMDD:function(date){
    	var year=date.getFullYear();
    	var month=date.getMonth()+1;
    	var day=date.getDate();
    	return year+'/'+this.toFixed(month)+'/'+this.toFixed(day);

    },

    toFixed:function(number){
      return (number+'').length==2?(number+''):'0'+number+'';
    },

    isValidDate:function(dateStr){
    	 return new Date(dateStr).toString()!=='Invalid Date'
    }
}

//构建jquer插件
$.fn.datePicker=function(){
    this.each(function(){
    	new DatePicker($(this));
    });
};