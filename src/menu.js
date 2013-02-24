function menuOut() {
	if(jq.length == 0) {
		jq.push($(".paths"));
		jq.push($(".circles"));

		buildGalleryJQ();
		state = "galleryIn";
		next();
		return;
	}
	var obj = jq[0];
	switch(jq.length) {
		case 3:
			//Misc Instant Transitions
			$('#aFullText').animate({svgOpacity:'0'},{duration:300, complete:(function() {$(this).attr("display","none");})});
			$('#aBox #whiteText path').animate({svgFill:'#84AC4B'},{duration:200});
			$('#aBox #fill').animate({svgFill:'#000000'},{duration:200});
			$('#aBox #border').animate({svgFill:'#B4B4B4'},{duration:200});
			svgFadeOut($('#blogBack'),300);
			obj.animate(
							{svgTransform:'translate(0,-185)'},
							{
								duration:600,
								easing:'easeOutQuad'
							}
						);
			setTimeout(next,200);
		break;
		case 2:
			obj.animate(
							{svgTransform:'translate(0,-185)'},
							{
								duration:600,
								easing:'easeOutQuad'
							}
						);
			setTimeout(next,200);
		break;
		case 1:
			obj.animate(
					{svgTransform:'translate(0,-185)'},
					{
						duration:600,
						easing:'easeOutQuad',
						complete: next
					}
				);
		break;
	}
	jq.shift();
}

function menuIn() {
	if(jq.length == 0) {
		//jq.push($(".paths"));
		//jq.push($(".circles"));

		//Misc Transitions
		svgFadeIn($("#aFullText"),300)
		$('#aBox #whiteText path').animate({svgFill:'#FFFFFF'},{duration:400});
		$('#aBox #fill').animate({svgFill:'#84AC4B'},{duration:400});
		$('#aBox #border').animate({svgOpacity:'0'},{duration:200});
		$('#blogBack').removeAttr("display");
		$('#blogBack').animate({svgOpacity:'1'},{duration:300});
		gallery = false;
		state = "rest";
		return;
	}
	var obj = jq[0];
	switch(jq.length) {
		case 3:
			if(project) {
				svgFadeOut($("#project"),300);
			}

			obj.animate(
					{svgTransform:'translate(0,0)'},
					{
						duration:600,
						easing:'easeOutQuad',
						complete: next
					}
				);
			setTimeout(next,200);
		break;
		case 2:
			obj.animate(
							{svgTransform:'translate(0,0)'},
							{
								duration:600,
								easing:'easeOutQuad'
							}
						);
			setTimeout(next,200);
		break;
		case 1:
			obj.animate(
							{svgTransform:'translate(0,0)'},
							{
								duration:600,
								easing:'easeOutQuad'
							}
						);

		break;

	}
	jq.shift();
}

// function blog
function menuMouseIn(tLine) {
	if(tLine.state != "mouseShow" || tLine.jq.length == 0) {
		if(tLine.jq.length == 0) tLine.state = "rest";
		return;
	}
	var obj = tLine.jq[0];
	switch(tLine.jq.length) {
		case 4: //Rotate rect
			var rect = $(obj).children('rect')
			var xCenter = parseInt(rect.attr('x'))+49;
			var yCenter = parseInt(rect.attr('y'))+49;
			obj.animate(
							{svgTransform:'rotate(90,' + xCenter + ',' + yCenter + ')'},
							{
								duration: 450,
								easing: 'easeOutCirc',
								complete: (function() {next(tLine);})
							}
						);
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
			obj.animate(
							{svgOpacity:1},
							{
								duration:300,
								complete: (function() {next(tLine);})
							}
						);
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
			obj.animate(
							{svgOpacity:0},
							{
								duration:150,
								complete: (function() {next(tLine);})
							}
						);
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

function colorOn(tLine) { //Transition between mouseIn and menuOut(global)
	if(tLine.jq.length == 0) {
		tLine.state = "select";
		state = "menuOut"
		next(); //Start the global animation
		return;
	}
	var obj = tLine.jq[0];
	switch(tLine.jq.length) {
		case 4: //Fade Fulltext
			obj.animate(
							{svgOpacity:0},
							{
								duration:300,
								complete: (function() {next(tLine);})
							}
						);
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

function colorOff(tLine) {
	if(tLine.jq.length == 0) {
		tLine.state = "rest";
		next(tLine);
		next(); //Start the global animation
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