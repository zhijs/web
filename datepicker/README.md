### javascript日历插件

### 使用方式：
1.在页面中引入js文件  
<ol>
<li> a.jquery-3.1.0.min.js</li>
<li>b.datePicker.js</li>
</ol>

2.css文件：  
datePicker.css

3.在页面中打开插件的容器使用相应类名  
例如要在点击下列input要弹出日历插件      
```
  
<input class="date-input" placeholder='日期选择' date-init=''/>  
 <script type="text/javascript">    
   $('.date-input').datePicker();
 </script>  
```

### other
####   父元素设置text-aligin:center，子元素div无法居中的问题
#### 解决方案：子元素div设置 margin：0 auto,实现水平居中