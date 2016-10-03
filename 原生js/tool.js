/*
by yuli
*/
var yutool={
	function trim(str){
	
		var re = /^\s+|\s+$/g;
		
		return str.replace(re,'');
		
	}
	function each(data, fn) {
		for (var i=0; i<data.length; i++) {
			fn.call(data[i], i, data[i]);
		}
	}
	function setCookie(key, value, t) {
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + t);
		document.cookie = key + '=' + value + ';expires=' + oDate.toUTCString();
	}

	function getCookie(key) {
		var arr1 = document.cookie.split('; ');
		for (var i=0; i<arr1.length; i++) {
			var arr2 = arr1[i].split('=');
			if (key == arr2[0]) {
				return arr2[1];
			}
		}
	}

	function delCookie(key) {
		setCookie(key, '', -1);
	}
	//获取时间
	gettime:function(){
		var myTime = new Date();
		
		// 数字
		var iYear = myTime.getFullYear();		//年
		var iMonth = myTime.getMonth()+1;		//月
		var iDate = myTime.getDate();			//日
		var iWeek = myTime.getDay();			//星期
		var iHours = myTime.getHours();			//时
		var iMin = myTime.getMinutes();			//分
		var iSec = myTime.getSeconds();			//秒
		
		if(iWeek === 0)iWeek = '星期日';
		if(iWeek === 1)iWeek = '星期一';
		if(iWeek === 2)iWeek = '星期二';
		if(iWeek === 3)iWeek = '星期三';
		if(iWeek === 4)iWeek = '星期四';
		if(iWeek === 5)iWeek = '星期五';
		if(iWeek === 6)iWeek = '星期六';
		
		/*
		if(iSec < 10){
			iSec = '0'+iSec;
		}
		*/
		
		var str = iYear+'年'+iMonth+'月'+iDate+'日 '+iWeek+' '+fnSet(iHours)+':'+fnSet(iMin)+':'+fnSet(iSec);

		var oInp = document.getElementById('text1');
		
		oInp.value = str;

	}
}
