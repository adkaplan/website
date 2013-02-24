//
//TIMELINE HANDLING
//

function next(String) {
	if(!arguments.length) { //Global animation
		if(debug)console.log("GLOBAL:" + state + ":" + jq.length)
		switch(state) {
			case "exitMenu":
				menuOut();
			break;
			case "enterMenu":
				menuIn();
			break;
			case "enterGallery":
				galleryIn();
			break;
			case "exitGallery":
				galleryOut();
			break;
			case "goHome":
				goHome();
			break;
			case "enterProject":
				enterProject();
			break;
			case "exitProject":
				exitProject();
			break;
		}
	} else { //Local animation
		var tLine = arguments[0];
		if(debug)console.log(tLine.group.toUpperCase() +":" + tLine.state + ":" + tLine.jq.length)
		switch(tLine.group) {
			case "menu":
				switch(tLine.state) {
					case "mouseShow":
						menuMouseIn(tLine);
					break;
					case "mouseHide":
						menuMouseOut(tLine);
					break;
					case "select":
						colorOn(tLine);
					break;
					case "deselect":
						colorOff(tLine);
					break;
				}
			break;
			case "gallery":
				switch(tLine.state) {
					case "mouseShow":
						galleryMouseIn(tLine);
					break;
					case "mouseHide":
						galleryMouseOut(tLine);
					break;
					case "select":
						galleryClick(tLine);
					break;
				}
			break;
			case "blog":
				switch(tLine.state) {
					case "show":
						blogShow();
					break;
					case "hide":
						blogHide();
					break;
				}
		}
	}
}