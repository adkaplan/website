//TODO
//
//
//add loading bar, text, something
//add "back"
//add Welcome Text
//maybe a few blog posts
//
function initialize() {
	window.onscroll = scroll;
	window.onresize = function() {
		document.body.style.height = String(window.innerHeight+cExcess*scrollFactor) + "px";
		if(debug) console.log("RESIZE!")
	}
	//
	//GLOBAL CONSTANTS
	//
	debug = true
	scrollFactor = 5;
	linkOpacity = .45;
	//
	//
	//
	//Initial Sorting, shuffling of list
	for (var i=0;i<content.length;i++) { //Delimit
		for(var j=0;j<content[i].length;j++) {
			if(content[i][j].indexOf(";") != -1) content[i][j] = content[i][j].split(";")
			else content[i][j] = [content[i][j]]
		}
	}
	//shuffle(content);
	state = "enterSite"
	next();

}
function scroll() {
	//document.body.style.height = "2000px";
	//if(String(window.innerHeight + cExcess) + "px" != document.body.style.height) {
	//	console.log("RESIZE!")
	//	setExcess();
	//}
	offset = project ? 385 : 0;
	$("#gallery").attr("transform","translate(0," + (-window.pageYOffset/scrollFactor + offset) + ")");
}

function setExcess(filterCount) {
	rows = Math.ceil(filterCount/4.0);
	cExcess = project ? (rows-1.0)*100 : (rows-4.0)*100;
	document.body.style.height = String(window.innerHeight+cExcess*scrollFactor) + "px";
	if(debug) console.log("SETEXCESS:"+cExcess)
}
//
//OBJECT DEFINITIONS
//

function Timeline(group, state) {
	this.group = group;
	this.state = state;
	this.jq = [];
}

//
//DECLARATIONS
//

//jq is a global timeline used for transitions. Global animations prevent local animations (local objects can't change state)

//Global States: galleryIn, galleryOut

//m,d,sTime are individual timelines for each object

//States: rest, mouseShow, mouseHide, select, deselect
//c - Current
//content is pushed from header.php

var jq = [];
var state = "rest";
var count = 0;
var gallery = false;
var project = false;

var cMenu;
var cStack = [];
var cCategory;

var cProject;
var cImage;
var cID;
var cWidth;
var cHeight;
var cCaption;
var cDate;
var cTitle;
var cMore;
var cLink;
var cGalleryItem;
var cExcess = 0;
var cWaiting;


var mTime = new Timeline("menu", "rest");
mTime.colNum = 2;
var dTime = new Timeline("menu", "rest");
dTime.colNum = 3;
var sTime = new Timeline("menu", "rest");
sTime.colNum = 4;


$(function() {

	//
	//INITIALIZATION
	//

	$(".startButton").each(
		function() {
			var rect = $(this).children('rect');
			var xCenter = parseInt(rect.attr('x'))+49;
			var yCenter = parseInt(rect.attr('y'))+49;
			$(this).attr('transform','rotate(0,'+xCenter+','+yCenter+')')
		}
	);

	$(".galleryItem").each(
		function() {
			$(this).attr("opacity","0");
			$(this).attr("display","none");
			$(this).data("tline",new Timeline("gallery","rest"));
		}
	);
	var rTotal = 0;
	var rCount = 0;
	var rMax = 0;
	$(".circles").each(
		function() {
			$(this).attr("opacity","0")
			$(this).attr("display","none")
		}
	);
	$(".paths").each(
		function() {
			$(this).attr("opacity","0")
			$(this).attr("display","none")
		}
	);
	$(".circles").children().each(
		function() {
			var r = parseFloat($(this).attr("r"));
			rTotal += r
			rCount ++;
			if(r>rMax) rMax = r;
		}
	);

	$(".circles").children().each(
		function() {
			var n = parseFloat($(this).attr("r"))/rMax;
			var hex = Number(parseInt(n*60) + 170).toString(16).toUpperCase();
  			hex = hex.length == 1 ? "0" + hex : hex;
			$(this).attr('fill','#' + hex + hex + hex);
		}
	);
	$(".paths").children().each(
		function() {
			$(this).attr('stroke','#ADADAD');
		}
	);
	//$('#aFullText').attr('opacity','1');

	//
	//EVENTS
	//
	$(".darkHit").mouseenter(function() {
		switch($(this).attr('id')) { //Get the right Timeline SHITTY
			case "mDark":
				var tLine = mTime;
				rect = $(".dark#mDark .startButton");
			break;
			case "dDark":
				var tLine = dTime;
				rect = $(".dark#dDark .startButton");
			break;
			case "sDark":
				var tLine = sTime;
				rect = $(".dark#sDark .startButton");
			break;
			default:
				return;
			break;
		}

		if(state != "rest") {
			console.log(state)
			cWaiting = $(this)
				tLine.jq = [];
				tLine.state = "wait";
			return;
		}
		if(tLine.state == "wait" || tLine.state == "rest" || tLine.state == "mouseHide") {
			var current = tLine.jq.length;
			var root = rect.closest(".dark");
			tLine.jq = [
							rect,
							rect.find("#whiteText"),
							root.find("#popoutText"),
							root.find("#fullText")
						]
			if(tLine.state == "mouseHide") {
				for(var i=0;i<current;i++) tLine.jq.shift(); //delete unnecessary steps of the animation
				tLine.state = "mouseShow";
			}
			if(tLine.state == "rest" || tLine.state == "wait") {
				tLine.state = "mouseShow";
				next(tLine); //start the animation
			}
		}
	});

	$(".darkHit").mouseleave(function() {
		cWaiting = null;
		if(state != "rest") return;
		switch($(this).attr('id')) { //Get the right Timeline (SHITTY)
			case "mDark":
				var tLine = mTime;
				rect = $(".dark#mDark .startButton");
			break;
			case "dDark":
				var tLine = dTime;
				rect = $(".dark#dDark .startButton");
			break;
			case "sDark":
				var tLine = sTime;
				rect = $(".dark#sDark .startButton");
			break;
			default:
				return;
			break;
		}
		if(tLine.state == "rest" || tLine.state == "mouseShow") {
			var current = tLine.jq.length;
			tLine.jq = [
							rect.parent().find("#fullText"),
							rect.parent().find("#popoutText"),
							rect.find("#whiteText"),
							rect
						]
			if(tLine.state == "mouseShow") {
				for(var i=0;i<current;i++) tLine.jq.shift(); //delete unnecessary steps of the animation
				tLine.state = "mouseHide";
			}
			if(tLine.state == "rest") {
				tLine.state = "mouseHide";
				next(tLine); //start the animation
			}
		}
	});

	$(".galleryItem").mouseenter(function() {
		if(!$(this).hasClass("clickable")) return;
		$(this).stop(true);
		if($(this).hasClass("clickable")) {
			$(this).animate(
						{svgOpacity:.3},
						{duration:150}
						);
		}
	});

	$(".galleryItem").mouseleave(function() {
		if(!$(this).hasClass("clickable")) return;
		$(this).stop(true);
		$(this).animate(
					{svgOpacity:1},
					{duration:150}
					);
	});
});


function projectClick(evt) {
	if(!$("#projectClick").hasClass("clickable")) return;
	window.open(cLink,"_new")
	// window.open(cLink,'popUpWindow','height=600,width=600,left=0,top=0,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');

}
function menuClick(evt) {
		if(state != "rest") return;
		if($(evt.target).attr('id') == 'fill' && !gallery) return;
		state = "transition"
		if ($(evt.target.parentNode).hasClass("darkHit")) {
			var clicked = $(".dark#" + $(evt.target.parentNode).attr("id"));
		}
		else clicked = $(evt.target);
		if(gallery) {
			cMenu.jq = [
				$("#" + cCategory + "Dark").find("#box"),
				$("#" + cCategory + "Dark").find("#box")
			]
			//
			if(clicked.get(0).id!="aBox") {
				//SHIT IF STATEMENT
				$(".galleryItem").each(function() {
					$(this).stop(true);
					svgFadeOut($(this),200);
				})
			}
			//Animate the next color coming in
			cMenu.state = "deselect";
			next(cMenu);
		}
		if(project) {
			svgFadeOut($(".texts"),500);
			svgFadeOut($("#project"),300);
			project = false;
		}
		switch(clicked.attr('id')) { //Get the right Timeline
			case "mDark":
				var tLine = mTime;
				cStack = filterBy(content,"M",1);
				cCategory = "m"
			break;
			case "dDark":
				var tLine = dTime;
				cStack = filterBy(content,"D",1);
				cCategory = "d"
			break;
			case "sDark":
				var tLine = sTime;
				cStack = filterBy(content,"S",1);
				cCategory = "s"
			break;
			default: //Build goHome
				if(gallery) {
					svgFadeOut($(".dark #back"),100)

					jq = [];
					$(".galleryItem").each(function() {
						jq.push(this);
					});
					cMenu = null;
					state = "goHome";
					return;
				} else {
					return;
				}
		}
		cMenu = tLine;
		var current = tLine.jq.length;
		svgFadeOut($(".dark #back"),100)
		tLine.jq = [
						clicked.find("#fullText"),
						clicked.find("#popoutText"),
						clicked.find("#whiteText"),
						clicked.find("#box")
					]
		if(tLine.state == "mouseShow") for(var i=0;i<current;i++) tLine.jq.shift(); //delete unnecessary steps of the animation
		tLine.state = "select";
		next(tLine);
		jq = [
				$("#mDark"),
				$("#sDark"),
				$("#dDark")
			 ]
}

function galleryClick(evt) {
	obj = $(evt.target).closest(".galleryItem");
	if(!obj.hasClass("clickable")) return;
	if(state != "rest") return;

	//cContent should only be set from here
	//Before cUpdates
	if(project) {
		//update cGalleryItem
		cGalleryItem.find("#scale").animate({svgOpacity:'.3'},{duration:200});
		cGalleryItem.toggleClass("clickable",true);
	}
	//cUpdates
	cContent = $(obj).data("content");
	cID = $(evt.target).closest(".galleryItem").attr("contentID");
	cImage = cContent[4]
	cTitle = cContent[5]
	cCaption = cContent[6]
	cDate = cContent[7]
	cWidth = cContent[8]
	cHeight = cContent[9]
	if(cContent[2] != "") {
		cMore = cContent[2];
		cLink = cContent[10];
        $("#projectClick").toggleClass("clickable",true)
	} else {
		cMore = ""
		cLink = ""
	}

	//after cUpdates
	if (project) {
		cGalleryItem = obj;
		obj.toggleClass("clickable",false);
		obj.find("#scale").stop();
		obj.stop();
		svgFadeIn(obj.find("#scale"),200)
		svgFadeIn(obj,200);
		changeImage();
	} else {
		cProject = cContent[0];
		back = $("#" + cCategory + "Dark #back");
		back.stop();
		console.log(back);
		back.removeAttr("display");
		back.animate({svgOpacity: '.8'}, {duration:250});
		back.animate({svgOpacity: '.5'}, {duration:300});
		state = "galleryOut";
		project = true;
		next();
	}
}