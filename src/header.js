function initialize() {
	window.onscroll = scroll;
	debug = true;
	//Hello from my machine!
}

function scroll() {
	offset = project ? 385 : 0;
	$("#gallery").attr("transform","translate(0," + (-window.pageYOffset/3 + offset) + ")");
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
var jq;
var state = "rest";

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
	$('#aFullText').attr('opacity','1');

	//
	//EVENTS
	//

	$(".startButton").mouseenter(function() {
		if (state == "rest") {
			switch($(this).closest('.dark').attr('id')) { //Get the right Timeline
				case "mDark":
					var tLine = mTime;
				break;
				case "dDark":
					var tLine = dTime;
				break;
				case "sDark":
					var tLine = sTime;
				break;
				case "aBox":
					return;
				break;
			}
			if(tLine.state == "rest" || tLine.state == "mouseHide") {
				var current = tLine.jq.length;
				var root = $(this).closest(".dark");
				tLine.jq = [
								$(this),
								$(this).find("#whiteText"),
								root.find("#popoutText"),
								root.find("#fullText")
							]
				if(tLine.state == "mouseHide") {
					for(var i=0;i<current;i++) tLine.jq.shift(); //delete unnecessary steps of the animation
					tLine.state = "mouseShow";
				}
				if(tLine.state == "rest") {
					tLine.state = "mouseShow";
					next(tLine); //start the animation
				}
			}
		}
	});

	$(".startButton").mouseleave(function() {
		if (state == "rest") {
			switch($(this).closest('.dark').attr('id')) { //Get the right Timeline
				case "mDark":
					var tLine = mTime;
				break;
				case "dDark":
					var tLine = dTime;
				break;
				case "sDark":
					var tLine = sTime;
				break;
				case "aBox":
					return;
				break;
			}
			if(tLine.state == "rest" || tLine.state == "mouseShow") {
				var current = tLine.jq.length;
				tLine.jq = [
								$(this.parentNode).find("#fullText"),
								$(this.parentNode).find("#popoutText"),
								$(this).find("#whiteText"),
								$(this)
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



function menuClick(evt) {
		// document.body.style.height = "2000px";
		var clicked = $(evt.target).closest(".dark");
		clicked.find("#box").toggleClass("clickable",true);
		if(gallery) {
			cMenu.jq = [
				$("#" + cCategory + "Dark").find("#box"),
				$("#" + cCategory + "Dark").find("#box")
			]
			//
			if(!clicked.attr('id')=="aBox") {
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
			case "aBox": //Build goHome
				if(gallery) {
					jq = [];
					$(".galleryItem").each(function() {
						jq.push(this);
					});
					cMenu = null;
					state = "goHome";
					return;
				}
		}
		if(project) {
			svgFadeOut($("#project"),300);
			project = false;
		}
		cMenu = tLine;
		var current = tLine.jq.length;
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

	//cContent should only be set from here

	//Before cUpdates
	if(project) {
		cGalleryItem.find("#scale").animate({svgOpacity:'.3'},{duration:200});
		cGalleryItem.toggleClass("clickable",true);
		 //update cGalleryItem
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
	}

	//after cUpdates
	if (project) {
		cGalleryItem = obj;
		obj.toggleClass("clickable",false);
		obj.find("#scale").animate({svgOpacity:'1'},{duration:200});
		obj.animate({svgOpacity:'1'},{duration:200});
		changeImage();
	} else {
		cProject = cContent[0];
		state = "galleryOut";
		project = true;
		next();
	}
}