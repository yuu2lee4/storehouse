/*_default参数说明
direction:代表运动的方向，支持top、left
autoplay:是否自动播放
arrow:是否支持左右箭头
pagination:是否支持分页
paginationEvent:分页鼠标事件，默认为mouseover
interval:运动间隔
*/
$.fn.extend({
	slider:function(options){
		var _default={direction:'left',autoplay:true,arrow:false,pagination:false,interval:2000,paginationEvent:'mouseover'};
		_default=$.extend({},_default,options);

		var sw=this.find('.slider-wrapper').eq(0);
		var ss=sw.find('.slider-slide');
		var ss_w=ss.outerWidth(true);
		var sps=null;
		var _index=0;
		var timer=null;
		var timer_opt={};

		if(ss.length<2){   //内容小于2 返回
			return;
		}

		if(_default.direction=="left"){
			sw.css('width',ss_w*ss.length);
		}

		if(_default.pagination){
			sps=this.find('.slider-pagination-switch');
			sps.each(function(index, el) {
				$(this).on(_default.paginationEvent, function() {
					sps.eq(_index).removeClass('active');
					_index=index;
					$(this).addClass('active');

					timer_opt[_default.direction]=-ss_w*_index;
					sw.stop().animate(timer_opt,500);
				});
			});
		}
		if(_default.arrow){
			var sa=this.find('.slider-arrow');


			sa.eq(0).on('click',function() {
				if(sps){
					sps.eq(_index).removeClass('active');
				}
				_index--;
				if(_index<0){
					_index=ss.length-1;
				}
				sps.eq(_index).addClass('active');
				timer_opt[_default.direction]=-ss_w*_index;
				sw.stop().animate(timer_opt,500);
			});
			sa.eq(1).on('click',function() {
				if(sps){
					sps.eq(_index).removeClass('active');
				}
				_index++;
				if(_index>ss.length-1){
					_index=0;
				}
				sps.eq(_index).addClass('active');
				timer_opt[_default.direction]=-ss_w*_index;
				sw.stop().animate(timer_opt,500);
			});
		}

		if(_default.autoplay){
			timer = setInterval(autoplay,_default.interval);
			this.hover(function() {
				clearInterval(timer);
			}, function() {
				timer = setInterval(autoplay,_default.interval);
			});
		}


		function autoplay(){
			if(++_index>ss.length-1){
				_index=0;
			}
			if(sps){
				sps.removeClass('active');
				sps.eq(_index).addClass('active');
			}
			timer_opt[_default.direction]=-ss_w*_index;
			sw.stop().animate(timer_opt,500);	
			
		}
	}
});