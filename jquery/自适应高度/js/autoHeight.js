$.fn.extend({
	autoHeight:function(obj){
		var parentH=obj.height();
		var objarr=this.siblings();
		var h=$(this).outerHeight()-$(this).height()+parseInt(this.css('margin-top'))+parseInt(this.css('margin-bottom'));
		if(this.siblings().length){
			this.siblings().each(function(index, val) {
				if(this.nodeName.toLowerCase() !== 'script' && $(this).css('position') !== 'fixed'  && $(this).css('position') !== 'absolute'){
				 	h+=$(this).outerHeight()+parseInt($(this).css('margin-top'))+parseInt($(this).css('margin-bottom'));
				}
			});
		}
		this.css({height:parentH-h});
	}
	
});