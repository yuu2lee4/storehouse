// JavaScript Document

function bindEvent(obj,events,fn){
	obj.listeners = obj.listeners || {};
	obj.listeners[events] = obj.listeners[events] || {};
	if(obj.addEventListener){
		
		//preventDefault()
		obj.listeners[events][fn]=function(ev){
			
			//fn() -> false
			//fn() -> undefined
			
			if( fn.call(obj) == false ){
				ev.preventDefault();
				ev.cancelBubble = true;
			}
			
		};
		obj.addEventListener(events,obj.listeners[events][fn],false);
	}
	else{
		obj.listeners[events][fn]=function(){
			
			if( fn.call(obj) == false ){
				window.event.cancelBubble = true;
				return false;
			}
			
		}
		obj.attachEvent('on'+events,obj.listeners[events][fn]);
	}
}
function removeEvent(obj,events,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(events,fn,false); 
	}else{
		
		obj.detachEvent('on'+events,fn);
		
	}
}

function fireEvent(obj,events){   //主动触发 JQ中的主动触发trigger() 
	
	if(obj.listener && obj.listener[events]){
		for(var fn in obj.listener[events]){
			
			obj.listener[events][fn]();
			
		}
	}
	
}

function getByClass(sClass,parent){
	var aEles = (parent||document).getElementsByTagName('*');
	var arr = [];
	
	for(var i=0;i<aEles.length;i++){
		if(hasClass(aEles[i],sClass)){
			arr.push( aEles[i] );
		}
	}
	return arr;
}
function hasClass(obj,sClass){
		
	var re = new RegExp('(^|\\s)'+sClass+'(\\s|$)');
	if( re.test(obj.className)){
		return true;
	}

	return false;	
	
}
function toArray(elem){
	var arr = [];
	for(var i=0;i<elem.length;i++){
		arr.push( elem[i] );
	}
	return arr;
}

function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
}

function LightJQ(vArg){
	
	this.elements = [];   //存储选择到一组元素的集合
	
	switch(typeof vArg){
		case 'function':
		
			//window.onload = vArg;
			bindEvent(window,'load',vArg);
		
		break;
		case 'string':
			switch( vArg.charAt(0) ){
				case '#': //id
				
					this.elements.push( document.getElementById(vArg.substring(1)) );
				
				break;
				case '.': //class
				
					//vArg : .box
					
					this.elements = getByClass(vArg.substring(1));
				
				break;
				default: //tag
				
					this.elements = toArray(document.getElementsByTagName(vArg));
				
				break;
			}
		break;
		case 'object':
			
			if( vArg.constructor == Array ){
				this.elements = vArg;
			}
			else{
				this.elements.push(vArg);
			}
			
		break;
		
	}
	
}


LightJQ.prototype.html = function(str){
	
	if(str){  //设置
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].innerHTML = str; 
		}
	}
	else{  //获取
		return this.elements[0].innerHTML;
	}
	
	return this;
	
};

LightJQ.prototype.hasClass=function(sClass){
		
	var re = new RegExp('(^|\\s)'+sClass+'(\\s|$)');
	if( re.test(this.elements[0].className)){
		return true;
	}

	return false;	
	
}
LightJQ.prototype.addClass=function(sClass){
	
	for(var i=0;i<this.elements.length;i++){
		if(!hasClass(this.elements[i],sClass)){
			this.elements[i].className += ' ' + sClass;	
		}
	}
	return this;
}
LightJQ.prototype.removeClass=function(sClass){

	var re = new RegExp('(^|\\s)'+sClass+'(\\s|$)','g');	
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].className =this.elements[i].className.replace(re,'');
	}		
	return this;				
}
LightJQ.prototype.toggleclass=function(sClass){
	var re = new RegExp('(^|\\s)'+sClass+'(\\s|$)','g');

	for(var i=0;i<this.elements.length;i++){
		if(hasClass(this.elements[i],sClass)){
			this.elements[i].className =this.elements[i].className.replace(re,'');
		}else{
			this.elements[i].className += ' ' + sClass;	
		}
	}
	return this;
		
}
LightJQ.prototype.on = function(events,fn){
	var eventArr = events.split(' ');

	for(var i=0;i<this.elements.length;i++){
		for(var j=0;j<eventArr.length;j++){
			for(var m=2;m<arguments.length;m++){
				bindEvent(this.elements[i],eventArr[j],arguments[m]);
			}
		}
	}
	return this;
};

LightJQ.prototype.one=function(events){
	var eventArr = events.split(' ');

	for(var i=0;i<this.elements.length;i++){
		for(var j=0;j<eventArr.length;j++){
			for(var m=2;m<arguments.length;m++){
				
				arguments[m] = function(){
					var b=arguments[j].call(this.elements[i]);
					if(this.elements[i].removeEventListener){
						this.elements[i].removeEventListener(eventArr[j],this.elements[i].listeners[eventArr[j]][arguments[m]],false); 
					}else{
						
						this.elements[i].detachEvent('on'+eventArr[i],this.elements[i].listeners[eventArr[j]][arguments[m]]);
						
					}	
					if(!b)return false;			
				}
				bindEvent(this.elements[i],eventArr[j],arguments[m]);
			}
		}
	}
	return this;
	
}

	
LightJQ.prototype.trigger=function(obj,events){   //主动触发自定义事件

	for(var i=0;i<this.elements.length;i++){
		if(events){
	    	var eventArr = events.split(' ');
	    	for(var j=0;j<eventArr.length;j++){
	    		fireEvent(this.elements[i],eventArr[j]);
	    	}
		}{
			for( var evt in this.elements[i].listeners){
				fireEvent(this.elements[i],evt);
			}
		}
	}
	return this;

}

LightJQ.prototype.off=function(obj,events){
	for(var i=0;i<this.elements.length;i++){
		if(events){
	    	var eventArr = events.split(' ');

	    	if(arguments[2]){
				for(var j=0;j<eventArr.length;j++){
					for(var m=2;m<arguments.length;m++){
						removeEvent(this.elements[i],eventArr[j],this.elements[i][eventArr[j]][arguments[j]]);
					}
				}
	    	}else{
	    		for(var j=0;j<eventArr.length;j++){
					for( var fn in obj.listeners[eventArr[j]]){
						removeEvent(this.elements[i],eventArr[j],this.elements[i][eventArr[j]][fn]);
					}
	    		}
	    	}
		//evevnts不存在 则清空该对象的所有事件
		}else{
			for( var evt in this.elements[i].listeners){
				for( var fn in this.elements[i].listeners[evt]){
					removeEvent(this.elements[i],eventArr[j],this.elements[i][evt][fn]);
				}
			}
		}
	}
	return this;
}

LightJQ.prototype.hide = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'none';
	}
	return this;
};

LightJQ.prototype.hover = function(fnOver , fnOut){
	for(var i=0;i<this.elements.length;i++){
		bindEvent(this.elements[i],'mouseover',fnOver);
		bindEvent(this.elements[i],'mouseout',fnOut);
	}
	return this;
};

LightJQ.prototype.css = function(attr,value){
	if(arguments.length==2){ //设置
		
		for(var i=0;i<this.elements.length;i++){
			
			this.elements[i].style[attr] = value;
			
		}
		
	}
	else{ //获取
		if(typeof attr == 'string'){
			return getStyle(this.elements[0],attr);			
		}else{   //json设置
			for(var val in attr){
				for(var i=0;i<this.elements.length;i++){
			
					this.elements[i].style[val] = attr[val];
					
				}
			}
		}
	
	}
	return this;
};

LightJQ.prototype.attr = function(attr,value){
	
	var div = document.createElement("div");
	div.setAttribute( "className", "t" );
	
	if(div.className == "t" && attr == 'class'){
		attr = 'className';
	}
	
	
	if(arguments.length==2){ //设置
		
		for(var i=0;i<this.elements.length;i++){
			
			//this.elements[i][attr] = value;
			this.elements[i].setAttribute(attr,value);
			
		}
		
	}
	else{ //获取
	
		return this.elements[0].getAttribute(attr);
	
	}
	return this;
	
};

LightJQ.prototype.eq = function(index){
	return $(this.elements[index]);
};
LightJQ.prototype.get=function(index){
	return this.elements[index];
};
LightJQ.prototype.index = function(){
	
	var elems = this.elements[0].parentNode.children;
	for(var i=0;i<elems.length;i++){
		if( elems[i] == this.elements[0] ){
			return i;
		}
	}
	return this;
	
};

LightJQ.prototype.find = function(sel){
	
	var arr = [];
	
	if( sel.charAt(0) == '.' ){  //class
	
		for(var i=0;i<this.elements.length;i++){
			
			arr = arr.concat(getByClass( this.elements[i] ,sel.substring(1)));
		}
	
	}else if( sel.charAt(0) == '#' ){
		for(var i=0;i<this.elements.length;i++){
			
			arr = arr.concat(toArray(this.elements[i].getElementById(sel)));
		}
	}else{  //tag
		for(var i=0;i<this.elements.length;i++){
			
			arr = arr.concat( toArray(this.elements[i].getElementsByTagName(sel)) );
		}
	}
	
	return $(arr);
	
};

function $(vArg){
	
	return new LightJQ(vArg);
	
}

$.trim = function(str){  //静态方法
	return str.replace(/^\s+|\s+$/g,'');
};

$.proxy = function(){};
$.type = function(){};
$.makeArray = function(){};
$.inArray = function(){};

$.extend = function(json){
	
	for(var attr in json){
		$[attr] = json[attr];
	}
	
};

$.fn = {};

$.fn.extend = function(json){
	
	for(var attr in json){
		LightJQ.prototype[attr] = json[attr];
	}
	
};