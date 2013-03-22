//
//TIMELINE HANDLING
//

function next(String) {
	//if(debug && project) {console.log("PROJECT")}
	//if(debug && gallery) {console.log("GALLERY")}
	if(!arguments.length) { //Global animation
		if(debug)if(jq.length != 0) {
			console.log("GLOBAL:" + state + ":" + jq.length);
		} else if(state == "rest") {
			console.log("REST")
		} else {
			console.log("GLOBAL:" + state + ":" + "FINISH")
		}
		if(jq.length == 0) {
			if(state == "galleryIn") state = "rest";
			// if(mTime.state == "wait") {
			// 	mTime.state = "rest"
			// 	$(".mdh").mouseenter();
			// } else if (dTime.state == "wait") {
			// 	dTime.state = "rest"
			// 	$(".ddh").mouseenter();
			// } else if (sTime.state == "wait") {
			// 	sTime.state = "rest"
			// 	$(".sdh").mouseenter();
			// }
		}
		switch(state) {
			case "enterSite":
				enterSite();
			break;
			case "menuOut":
				menuOut();
			break;
			case "menuIn":
				menuIn();
			break;
			case "galleryIn":
				galleryIn();
			break;
			case "galleryOut":
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
		if(debug) if(tLine.jq.length!=0) {
			console.log(tLine.group.toUpperCase() +":" + tLine.state + ":" + tLine.jq.length);
		} else {
			console.log(tLine.group.toUpperCase() + ":" + tLine.state + ":" + "FINISH")
		}
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
						gallerySelect(tLine);
					break;
					case "deselect":
						galleryDeselect(tLine);
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