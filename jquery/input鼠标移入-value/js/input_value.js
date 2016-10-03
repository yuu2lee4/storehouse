$.fn.extend({
	inputValue:function(){
		var val=this.val();

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

