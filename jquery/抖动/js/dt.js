/*
dz：动作事件
fd：抖动幅度
cs：抖动次数
jg：抖动间隔事件
*/
$.fn.extend({
	dt:function(opt){
		var def={dz:'click',fd:2,cs:16,jg:32};
		$.extend(def, opt);
		

		var a=['top','left'],b=0,u=null; 
		_this=this;

		_this.on(def.dz,function() {
			clearInterval(u);b=0;

			u=setInterval(function(){
		        _this.css(a[b%2],(b++)%4<2?def.fd:-def.fd);
		        if(b>def.cs){
		        	clearInterval(u);b=0;
		        	_this.css({
		        		top: 0,
		        		left: 0
		        	});
		        } 
	        },def.jg) 
			
		});
        
	}
	
});