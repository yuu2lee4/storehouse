$.fn.extend({
	placeholder:function(){
		var val=this.attr('placeholder');
		this.val(val);
		this.attr('placeholder','')

		this.on('focus',function(){
			if( $(this).val() == val){
				$(this).val('');
			}
			
		})
		
		this.on('blur',function(){
			
			if( $(this).val() == '' ){
				$(this).val(val);
			}
			
		})
	}
});

