function getBrowserInfo()
{
	var agent = navigator.userAgent.toLowerCase() ;
	var browser='';
	console.log(agent);
	var reg;
	
	if(agent.indexOf("msie") > 0)
	{
		browser='msie';
	}else if (agent.indexOf("trident") > 0&&agent.indexOf('rv:11')>0) {
		return {browser:'msie',version:'11'};
	}else if (agent.indexOf("firefox") > 0) {
		browser='firefox';
	}else if (agent.indexOf("edge") > 0) {
		browser='edge';
	}else if (agent.indexOf("chrome") > 0) {
		browser='chrome';
	}else if (agent.indexOf("safari") > 0) {
		browser='safari';
	}else{
		return {browser:'unkown',version:'unkown'}
	}
	if(browser=='msie'){
		reg=new RegExp(browser+' [\\d.]+','ig');
	}else{
		reg=new RegExp(browser+'/[\\d.]+','ig');
	}

	return {browser:browser,version:(agent.match(reg)+'').replace(/[^0-9.]/ig,"")};
}