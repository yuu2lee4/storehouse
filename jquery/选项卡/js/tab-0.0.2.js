/*_default参数说明
tabEvent:tab鼠标事件，默认为click
method:切换方式{默认默认show:显示隐藏，slide：向上收缩，fade:淡入淡出;}
*/
$.fn.extend({
	tab:function(options){
		var _default={tabEvent:'click',method:'show',fadeInterval:300,slideInterval:500};
		_default=$.extend({},_default,options);

		var tabs=this.find('.tab');
		var tab_conts=this.find('.tab_cont');
		var _index=tabs.filter('.on').index();

		tabs.each(function(index, el) {
			$(this).on(_default.tabEvent, function() {

				if(_index==index){
					return;
				}

				tabs.eq(_index).removeClass('on');
				$(this).addClass('on');

				if (_default.method=="fade") {
					tab_conts.eq(_index).stop().fadeOut(_default.fadeInterval,function(){
						tab_conts.eq(index).stop().fadeIn(_default.fadeInterval);
						_index=index;	
					});
				}else if (_default.method=="slide"){
					tab_conts.eq(_index).stop().slideUp(_default.slideInterval,function(){
						tab_conts.eq(index).stop().slideDown(_default.slideInterval);
						_index=index;	
					});
				}else{
					tab_conts.eq(_index).hide();
					tab_conts.eq(index).show();	
					_index=index;	
				}	
			});
		});
	}
});