$.fn.extend({
	radio:function(){
		var _this=this;

		this.on('click',  function() {
			_this.removeClass('on');
			$(this).addClass('on');
		})
	}
});