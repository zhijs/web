#### 自定义对话框插件
<br/>
使用方法：
<br/>  

#### 1.引入样式文件  
<br/>
<link rel="stylesheet" type="text/css" href="style/dialog.css"/>
<br/>
#### 2.引入js插件文件:

```
 <script type="text/javascript" src='javascript/lib/jquery-3.1.0.min.js'></script>  
 <script type="text/javascript" src='javascript/customDialog.js'></script>
```
<br/>
 
#### 3.创建对话框  
```
var dialog3=new Dialog();
    	dialog3.open({
    		title:'自定义对话框', //对话框标题
    		message:'This is an custom dialog', //对话框内容，可以解析html字符串
    		isShowCloseBtn:true,  //是否显示取消按钮(默认为true)
    		isShowComfirmBtn:true, //是否显示确定按钮(默认为false)
    		onClose:function(){   //设定点击关闭按钮的处理函数
               console.log('取消');
    		},
    		onConfirm:function(){  //设定点击确认按钮的处理函数
              console.log('确定');
    		},
    	});
```
