	var width=0;
	var height=0;
	var img_contain=document.querySelectorAll('.img-contain');
	console.log(img_contain);
	var contain_width=0;
	var contain_height=0;
	var i=0;//记录显示到第几个图片组
	var flag=0;//记录上一个显示组
	if(document.documentElement.clientWidth && document.documentElement.clientHeight)
	{
	    width=document.documentElement.clientWidth;
	    height=document.documentElement.clientHeight;
	}
	else
	{
		width=window.innerWidth;
		height=window.innerHeight;
	}
	if(window.getComputedStyle)
	{
		style=window.getComputedStyle(img_contain[0],null);
		contain_width=parseInt(style.width);
		contain_height=parseInt(style.height);
	}
	else
	{
		contain_width=parseInt(img_contain[0].currentStyle().width);
		contain_height=parseInt(img_contain[0].currentStyle().height);
	}
	window.onscroll=(function(){
		console.log('scroll>>>');
	    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//屏幕滑动距离
	    var k=Math.ceil(scrollTop/contain_height);
	    if(k>flag)
	    {
	    	showImg(i,img_contain);
	    	i++;
	    	flag=k;
	    }

	    console.log(scrollTop);
	});
   
   function showImg(num,imgList)
   {
       img=imgList[num+1].getElementsByTagName('img');
       console.log(img);
       for(let i=0;i<img.length;++i)
       {
       	 img[i].src=img[i].getAttribute('data-src');
       }
     
   }