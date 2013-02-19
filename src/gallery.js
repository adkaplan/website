function galleryIn() {
	//Git Test
	//Should could be called galleryLoad
	gallery = true;
	//Also handles distributing content from cStack into gallery objects
	if(cStack.length == 0) {
		jq = [];
		state = "rest"
		return;
	}
	if(jq.length == 0) {
		state = "rest"
		return;
	}
	var obj = $(jq[0])
	if(obj.id = "blogBack") {
		obj.animate( {svgOpacity:'0'}, {duration:500,callback:function() {this.attr('display','none');}});
	}
	if(obj.attr("class") == "paths") {
		obj.removeAttr("display");
		obj.animate(
					{svgOpacity:'1'},
					{
						duration:500,
						easing:'easeInOutSine'
					}
				);
		jq.shift();
		setTimeout(next,500);
	} else if(obj.attr("class")=="circles") {
		obj.removeAttr("display");
		obj.animate(
					{svgOpacity:'1'},
					{
						duration:1500,
						easing:'easeOutSine'
					}
				);
		jq.shift();
		next();
	} else {
		var content = cStack[0];
		obj.removeAttr("display");
		obj.attr("opacity",0);
		obj.data("content", content[0]);
		obj.attr("contentID",content[1]);
		obj.find('#scale').attr("transform",'scale(.8)');
		var tempImage = new Image();
		tempImage.onLoad = (new function() {
								obj.find('image').removeAttr("display");
							obj.find('image').attr('xlink:href',"img/tooltip/" + content[0][3]);
								obj.animate(
											{svgOpacity:'1'},
											{
												duration:150,
												easing:'easeInCirc'
											}
										);
								obj.find('#scale').animate(
										{svgTransform:'scale(1)'},
										{
											duration:300,
											easing:'easeInSine'
										}
									);
							});
		tempImage.src = "img/tooltip/" + content[0][3];
		setTimeout(next,50);
		cStack.shift();
		jq.shift();
	}
}

function galleryOut() {
	//Gallery Unload
	$(".galleryItem").each(function() {
			$(this).stop(true);
			$(this).animate({svgOpacity:0},{duration:200, complete:(function() {$(this).attr("display","none");})});
	})
	if(project) {
		state = "enterProject";
		setTimeout((function() {next();}),200);
	} else {
		setTimeout((function() {state = "rest";}),200);
	}
}

function galleryMouseIn(tLine) {
	if(tLine.state != "mouseShow" || tLine.jq.length == 0) {
		if(tLine.jq.length == 0) tLine.state = "rest";
		return;
	}
	var obj = tLine.jq[0];
	switch(tLine.jq.length) {
		case 1:
			obj.stop(true);
			obj.animate(
							{svgOpacity:.3},
							{
								duration:150,
								complete: (function() {
									next(tLine);
								})
							}
						);
		break;
	}
	tLine.jq.shift();
}

function fadeColumnOut(column) {
	$(".column" + column).each( function() {
		$(this).clearQueue()
		$(this).stop(true);
		$(this).animate({svgOpacity:.1},{duration:300});
	});
}
function fadeColumnIn(column) {
	$(".column" + column).each( function() {
		$(this).stop(true);
		$(this).animate({svgOpacity:1},{duration:200});
	});
}
function galleryMouseOut(tLine) {
	if(tLine.state != "mouseHide" || tLine.jq.length == 0) {
		if(tLine.jq.length == 0) tLine.state = "rest";
		return;
	}
	var obj = tLine.jq[0];
	switch(tLine.jq.length) {
		case 1:
			obj.stop(true);
			obj.animate(
							{svgOpacity:1},
							{
								duration: 250,
								easing: 'easeOutCirc',
								complete: (function() {next(tLine);})
							}
						);
		break;
	}
	tLine.jq.shift();
}
function projectIn() {

}