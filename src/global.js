function goHome() {
	if(jq.length == 0) {
		jq = [
			$("#mDark"),
			$("#sDark"),
			$("#dDark")
		]
		$(".paths").animate( {svgOpacity:'0'}, {duration:500,callback:function() {this.attr('display','none');}});
		$(".circles").animate( {svgOpacity:'0'}, {duration:500,callback:function() {this.attr('display','none');}});
		state = "enterMenu";
		next();
		return;
	}
	var obj = jq[0];
	$(obj).animate({svgOpacity:0},{duration:150, complete:(function() {$(this).attr("display","none");})});
	jq.shift();
	setTimeout(next,25)
	if(project) {
		svgFadeOut($("#project"),300);
	}
}