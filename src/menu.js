// function blog
function menuMouseIn(tLine) {
	if(tLine.state != "mouseShow"	 || tLine.jq.length == 0) {
		if(tLine.jq.length == 0) tLine.state = "rest";
		return;
	}
	var obj = tLine.jq[0];
	switch(tLine.jq.length) {
		case 4: //Rotate rect
			var rect = $(obj).children('rect')
			var xCenter = parseInt(rect.attr('x'))+49;
			var yCenter = parseInt(rect.attr('y'))+49;
			obj.attr("transform","rotate(1,"+xCenter+","+yCenter+")");
			obj.animate(
							{svgTransform:'rotate(90,' + xCenter + ',' + yCenter + ')'},
							{
								duration: 450,
								easing: 'easeOutCirc',
								complete: (function() {
								})
							}
						);
			setTimeout(function(){next(tLine)},450);
		break;
		case 3: //WhiteText Slide
			var travelDist = parseInt(obj.attr('traveldist'));
			obj.animate(
							{svgTransform:'translate(' + travelDist + ',0)'},
							{
								duration: 200,
								easing: 'easeOutQuad'
							}
						);

			tLine.jq.shift();
			next(tLine);
			return; //Proceeds without waiting
		break;
		case 2: //Popouttext Slide
			if(gallery) {
				if(project) {
					$("#projectImage").stop(true);
					$("#projectImage").animate({svgOpacity:.1})
				} else {
					fadeColumnOut(tLine.colNum)
				}
			} else {
				$("#blogBack").stop(true);
				$("#blogBack").animate({svgOpacity:.1});
			}
			var travelDist = parseInt(obj.attr('traveldist'));
			obj.attr("transform", 'translate(0,-' + travelDist + ')');
			obj.attr("opacity", 1);
			obj.animate(
							{svgTransform:'translate(0,0)'},
							{
								duration: 200,
								easing: 'easeOutQuad',
								complete: (function() {next(tLine);})
							}
						);
		break;
		case 1: //Fade Fulltext
			svgFadeIn(obj,300)
			setTimeout((function() {next(tLine)}),300)
		break;
	}
	tLine.jq.shift();
}

function menuMouseOut(tLine) {
	if(tLine.state != "mouseHide" || tLine.jq.length == 0) {
		if(tLine.jq.length == 0) tLine.state = "rest";
		return;
	}
	var obj = tLine.jq[0];
	switch(tLine.jq.length) {
		case 4: //Fade Fulltext
			svgFadeOut(obj,150)
			setTimeout((function() {next(tLine)}),150)
		break;
		case 3: //Popouttext Slide
			if(gallery) {
				if(project) {
					if(mTime.state != "mouseShow" && dTime.state != "mouseShow" && sTime.state !="mouseShow") {
						$("#projectImage").stop(true);
						$("#projectImage").animate({svgOpacity:1})
					}
				} else {
					fadeColumnIn(tLine.colNum);
				}
			} else {
				if(mTime.state != "mouseShow" && dTime.state != "mouseShow" && sTime.state !="mouseShow") {
					$("#blogBack").stop(true);
					$("#blogBack").animate({svgOpacity:1});
				}
			}
			var travelDist = parseInt(obj.attr('traveldist'));
			obj.animate(
							{svgTransform:'translate(0,-' + travelDist + ')'},
							{
								duration: 600,
								easing: 'easeOutCirc',
								complete: (function() {next(tLine);})
							}
						);
			tLine.jq.shift(); //Proceeds without waiting
			next(tLine);
			return;
		break;
		case 2: //WhiteText Slide
			obj.animate(
							{svgTransform:'translate(0,0)'},
							{
								duration: 600,
								easing: 'easeOutCirc'
							}
						);
		break;
		case 1: //Rotate rect
			var rect = $(obj).children('rect')
			var xCenter = parseInt(rect.attr('x'))+49;
			var yCenter = parseInt(rect.attr('y'))+49;
			obj.attr("transform","rotate(90,"+xCenter+","+yCenter+")");
			obj.animate(
							{svgTransform:'rotate(0,' + xCenter + ',' + yCenter + ')'},
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

function gallerySelect(tLine) { //Transition between mouseIn and menuOut(global)
	if(tLine.jq.length == 0) {
		tLine.state = "select";
		state = "menuOut"
		next(); //Start the global animation
		return;
	}
	var obj = tLine.jq[0];
	switch(tLine.jq.length) {
		case 4: //Fade Fulltext
			svgFadeOut(obj,100)
			setTimeout((function() {next(tLine)}), 1000);
		break;
		case 3: //Popouttext Slide
			var travelDist = parseInt(obj.attr('traveldist'));
			obj.animate(
							{svgTransform:'translate(0,-' + travelDist + ')'},
							{
								duration: 400,
								easing: 'easeOutCirc'
							}
						);
			tLine.jq.shift();
			next(tLine);
			return; //Proceeds without waiting
		break;
		case 2: //WhiteText Slide
			obj.animate(
							{svgTransform:'translate(0,0)'},
							{
								duration: 400,
								easing: 'easeOutCirc'
							}
						);

			tLine.jq.shift();
			next(tLine);
			return; //Proceeds without waiting
		break;
		case 1: //Colorize rectangle
			var rect = obj.children('#rect')
			var color = obj.closest(".dark").find('#popoutText').attr('fill');
			var xCenter = parseInt(rect.attr('x'))+49;
			var yCenter = parseInt(rect.attr('y'))+49;
			obj.animate(
							{svgFill: color},
							{
								duration: 450,
								easing: 'easeOutCirc',
								complete: (function() {next(tLine);})
							}
						);
		break;
	}
	tLine.jq.shift();
}

function galleryDeselect(tLine) {
	if(tLine.jq.length == 0) {
		if(tLine.state == "rest") return;
		tLine.state = "rest";
		if(state == "goHome") next(); //Start the global animation
		return;
	}
	var obj = tLine.jq[0];
	switch(tLine.jq.length) {
		case 2: //UnColorize Rectangle
			obj.animate(
							{svgFill: "#000000"},
							{
								duration: 200,
								easing: 'easeOutCirc',
								complete: (function() {next(tLine);})
							}
						);
		break;
		case 1: //Rotate rect
			$(obj).css('cursor', 'pointer');
			var rect = $(obj).children('rect')
			var xCenter = parseInt(rect.attr('x'))+49;
			var yCenter = parseInt(rect.attr('y'))+49;
			obj.attr("transform","rotate(90,"+xCenter+","+yCenter+")");
			obj.animate(
							{svgTransform:'rotate(0,' + xCenter + ',' + yCenter + ')'},
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