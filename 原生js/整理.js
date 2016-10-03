/*
by yuli
*/
var yudom={
    //获取子节点  兄弟节点
    first:function(obj){
		return obj.firstElementChild || obj.firstChild;
	},
	last:function(obj){
		return obj.lastElementChild || obj.lastChild;
	}
	next:function(obj){
		return obj.nextElementSibling || obj.nextSibling;
	},
	prev:function(obj){
		return obj.previousElementSibling || obj.previousSibling;
	},
	//元素距离文档的距离
	offset:function(obj){

		var result ={left:0,top:0};
		while(obj){
			result.left += obj.offsetLeft;
			result.top += obj.offsetLeft;
			obj = obj.offsetParent;
		}

		return result;
	},
	viewW:function(){
		return 	document.documentElement.clientWidth;
	},
	viewH:function(){
		return 	document.documentElement.clientHeight;
	},
	scrollY:function(){
		return document.body.scrollTop||document.documentElement.scrollTop;	
	},
	offsetH:function(){
		return document.body.offsetHeight;	
	},
	scrollH:function(){
		return document.body.scrollHeight;	
	},
	scrollX:function(){
		return document.body.scrollLeft||document.documentElement.scrollLeft;	
	}
	
}



倒计时

获取一组数字
function fn1(n){
	var arr = [];
	
	for(var i=n; i>0; i-=2){
		//alert(i + ':' + (-i));
		arr.push(i, -i);
	}
	
	arr.push(0);
	
	return arr;
	
}

数组去重
for(var i=0; i<arr.length; i++){
	
	for(var j=i+1; j<arr.length; j++){
		
		if(arr[j] == arr[i]){
		
			arr.splice(j,1);
			j--;
			
		}
		
	}
	
}

数组排序
var arr = [121,4,21,71,94,3,542,66,71,5];

arr.sort( cmp );

alert(arr);

function cmp(num1,num2){

	//return num1 - num2; //从小到大
	return num2 - num1; //从大到小
	
}
    随机排序
var arr = [0,1,2,3,4,5,6,7,8,9];

arr.sort( cmp );

alert(arr);

function cmp(){

	return Math.random() - 0.5; // 50% 正   50%  负
	
}

随机数
从 x ~ y 之间的随机数：

	Math.round(Math.random()*(y-x))+x

/*

	需要 100 个从 0 ~ 1000 之间的随机不重复数字。

*/

/*var arr = [];

for(var i=0; i<=1000; i++){

	arr.push(i);	
	
}

//alert(arr.length);

arr.sort( function(){ return Math.random()-0.5; });

arr.length = 100;

arr.sort( function(a,b){ return a-b; });

alert(arr);*/

var arr = [];
var json = {};

while(arr.length < 100){

	var iNum = Math.round(Math.random()*1000);
	
	if(!json[iNum]){
		json[iNum] = 1;
		arr.push(iNum);
	}
	
}


字符串反序
var str = 'yuiop'; // 'poiuy'

/*var s = '';

for(var i=str.length-1; i>=0; i--){
	s += str.charAt(i);	
}

//alert(s);*/

alert(str.split('').reverse().join(''));

出现次数
var str = "fu3jflsaladjfkdjsalfjoioqurofalfsd";
var s = '';
var num=0;
var pos=str.length-1;

while(str.lastIndexOf('f',pos)!==-1&&pos>=0){
	s+=str.lastIndexOf('f',pos)+' ';
	pos=str.lastIndexOf('f',pos)-1;
	num++;
}

alert(s+',一共出现'+num+'次');


高亮关键字
<body>

<input type="text" />
<input type="button" value="查找" />

<p>目前主要针对的是javascript培训，同时还提供了css教程、javascript视频、js特效等，最新推出了外地学员们喜欢的javascript网络课程服务，同时还为处于javascript入门阶段的朋友录制了大量javascript视频，其中涉及了大量javascript基础知识，希望妙味课堂推出的javascript网络培训课程能带给大家更多惊喜。</p>

</body>
</html>

<script>

var aInput = document.getElementsByTagName('input');
var oP = document.getElementsByTagName('p')[0];

aInput[1].onclick = function(){

	var s = aInput[0].value;
	
	if(!s)return;
	oP.innerHTML = oP.innerHTML.split("<span>").join('');
	oP.innerHTML = oP.innerHTML.split("</span>").join('');
	oP.innerHTML = oP.innerHTML.split(s).join("<span>"+s+"</span>");
	
};

</script>


	互动百科

	58同城筛选效果

	评分2

	拖拽
	function drag(obj) {
		obj.onmousedown = function(ev) {
			var ev = ev || event;
			
			var disX = ev.clientX - this.offsetLeft;
			var disY = ev.clientY - this.offsetTop;
			
			if (this.setCapture) {
				this.setCapture();
			}
			
			document.onmousemove = function(ev) {
				var ev = ev || event;
				
				obj.style.left = ev.clientX - disX + 'px';
				obj.style.top = ev.clientY - disY + 'px';
				
			}
			
			document.onmouseup = function() {
				document.onmousemove = null;
				//releaseCapture :　释放全局捕获
				if (obj.releaseCapture) {
					obj.releaseCapture();
				}
			}
			
			return false;
			
		}
	}
		//限制拖拽范围
		function drag(obj) {
			obj.onmousedown = function(ev) {
				var ev = ev || event;
				
				var disX = ev.clientX - this.offsetLeft;
				var disY = ev.clientY - this.offsetTop;
				
				if (this.setCapture) {
					this.setCapture();
				}
				
				document.onmousemove = function(ev) {
					var ev = ev || event;
					
					var L = ev.clientX - disX;
					var T = ev.clientY - disY;
					
					if (L < 0) {
						L = 0;
					} else if (L > document.documentElement.clientWidth - obj.offsetWidth) {
						L = document.documentElement.clientWidth - obj.offsetWidth;
					}
					if (T < 0) {
						T = 0;
					} else if (T > document.documentElement.clientHeight - obj.offsetHeight) {
						T = document.documentElement.clientHeight - obj.offsetHeight;
					}
					
					obj.style.left = L + 'px';
					obj.style.top = T + 'px';
					
				}
				
				document.onmouseup = function() {
					document.onmousemove = null;
					//releaseCapture :　释放全局捕获
					if (obj.releaseCapture) {
						obj.releaseCapture();
					}
				}
				
				return false;
				
			}
		}
		
	}
	磁性吸附  碰撞检测 拖拽改变层的大小 自定义滚动条

	模拟下拉菜单

	title提示

	after pretend toggle hover

	ajax
	function ajax(method, url, data, success) {
		var xhr = null;
		try {
			xhr = new XMLHttpRequest();
		} catch (e) {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		
		if (method == 'get' && data) {
			url += '?' + data;
		}
		
		xhr.open(method,url,true);
		if (method == 'get') {
			xhr.send();
		} else {
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			xhr.send(data);
		}
		
		xhr.onreadystatechange = function() {
			
			if ( xhr.readyState == 4 ) {
				if ( xhr.status == 200 ) {
					success && success(xhr.responseText);
				} else {
					alert('出错了,Err：' + xhr.status);
				}
			}
			
		}
	}

	浮动瀑布流 1.pbl.html

	照片墙   延迟加载

	布局转换

	function bjzh(obj){
		obj.style.left = obj.offsetLeft + 'px';
		obj.style.top = obj.offsetTop + 'px';
		obj.style.position = 'absolute';
		obj.style.margin = '0px';
	}

	面向对象的选项卡

	继承的拖拽   拖拽的组件开发 选项卡组件