function startMove(obj, json, fn) {
	clearInterval(obj.iTimer);
	var iSpeed = iCur = 0;
	obj.iTimer = setInterval(function() {
		
		var iBtn = true;
		
		for (var attr in json) {
			if (attr == 'opacity') {
				iCur = Math.round(css(obj, 'opacity') * 100);
			} else {
				iCur = parseInt(css(obj, attr));
			}
			iSpeed = (json[attr] - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			if (iCur != json[attr]) {
				//clearInterval(obj.iTimer);
				iBtn = false;
				if (attr == 'opacity') {
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity='+(iCur + iSpeed)+')';
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
		}
		
		//当前的forin走完了,如果iBtn为true,说明
		//iBtn=true : 所有的都到了目标了
		//iBtn=false : 其中有一个没有到达
		if (iBtn) {
			clearInterval(obj.iTimer);
			//fn && (obj.fn = fn) && obj.fn();
			fn && typeof fn == 'function' && fn.call(obj);
		}
		
	}, 30);
}

function css(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}