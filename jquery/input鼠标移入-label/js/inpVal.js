/*_default参数说明
mode:{value:点击之后立刻消失，placeholder：输入文字时候才消失}
*/
$.fn.extend({
	inpVal:function(options){
		var _default={mode:'value'};
		_default=$.extend({},_default,options);

		var inp=this.find('.inp')
		var inp_val=this.find('.inp-val');
		var val=inp_val.html();

		if(_default.mode=="placeholder"){
			inp.on('input  propertychange',function(){ //propertychange为了兼容低版本ie
				if( $(this).val() == ''){
					inp_val.show();
				}else{
					inp_val.hide();
				}
			})
		}else{
			inp.on('focus',function(){
				if( $(this).val() == ''){
					inp_val.hide();
				}
				
			})
			
		}

		inp.on('blur',function(){
			if( $(this).val() == '' ||$(this).val()==val){
				$(this).val('');
				inp_val.show();
			}
			
		})	
	}
});

