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

function galleryMouseIn(tLine) {
	//tline from gallery.data
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