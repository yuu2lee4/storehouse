/*_default参数说明
num:代表可以最多选择的数量，只能为正整数，非正数代表无限制
*/
$.fn.extend({
	checkbox:function(options){
		var _default={num:0}
		_default=$.extend({},_default,options);
		var _this=this;
		var num=0;

		this.on('click',  function() {

			if (_default.num>0) {

				if ($(this).hasClass('on')) {
					num--;
					$(this).removeClass('on');
				}else{
					if(num<_default.num){
						num++;
						$(this).addClass('on');
					}
				}

			}else{
				$(this).toggleClass('on');
			}
		});
	}
});