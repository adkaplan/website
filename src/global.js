function goHome() {
	if(jq.length == 0) {
		jq = [
			$("#mDark"),
			$("#sDark"),
			$("#dDark")
		]
		$(".paths").animate( {svgOpacity:'0'}, {duration:500,callback:function() {this.attr('display','none');}});
		$(".circles").animate( {svgOpacity:'0'}, {duration:500,callback:function() {this.attr('display','none');}});
		state = "menuIn";
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

function enterProject() {
    //Update Text
    $("#projectTitle").html(cTitle);
    $("#projectCaption").html("&nbsp;&nbsp;" + cProject + " | " + cDate + " | " + cCaption);
    //cCaption
    //cDate
    //cTitle
    //cProject

    //Fade in Project
    $("#project").removeAttr("display");
    $("#project").animate({svgOpacity:'1'},{duration:300});

    //Reset Scrollbar
    window.scrollTo(0,0);
    scroll();

    //Load the current Image
    var tempImage = new Image();
    tempImage.onLoad = (new function() {
                            $("#projectImage").removeAttr("display");
                            $("#projectImage").attr('xlink:href',"img/" + cImage);
                            $("#projectImage").animate(
                                        {svgOpacity:'1'},
                                        {
                                            duration:250,

                                           easing:'easeInCirc'
                                        }
                                    );
                        });
    tempImage.src = "img/" + cImage;

    //Clip the Gallery
    $("#galleryTop").attr("clip-path","url(#projectClip)");

    //Enter the Gallery
    state="galleryIn";
    cStack = filterBy(content,cProject,0);

    //Build jq stack from cStack
    buildGalleryJQ();
    setTimeout(next,300);
}

function exitProject() {
	//Nothing calls this?...
    project = false;
    $("#project").attr("display","none");
    $("#projectTop").attr("clip-path","url(#galleryClip");
}

function menuOut() {
	if(jq.length == 0) {
	if(!gallery) {
		jq.push($(".paths"));
		jq.push($(".circles"));
	}
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
			svgFadeOut($("#gallery"),300);
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

function galleryIn() {
	//Could be called galleryLoad
	gallery = true;
	scroll();
	$("#aBox #box #fill").toggleClass("clickable",true);
	//handles distributing content from cStack into gallery objects
	if(cStack.length == 0) {
		while(jq.length>0) {
			obj = $(jq[0]);
			jq.shift();
			obj.find("#scale").attr("transform","scale(1)");
		}
		jq = [];
		state = "rest"
		return;
	}
	if(jq.length == 0) {
		state = "rest"
		return;
	}

	var obj = $(jq[0])

	if(!project) { //Should be in some type of PREP function (runs multiple times)
		    $("#galleryTop").attr("clip-path","url(#galleryclip)");
	}
	if(obj.id = "blogBack") {
		svgFadeOut(obj,250);
	}

	if(obj.attr("class") == "paths") { //Stupid way of sorting incoming jq objects
		obj.removeAttr("display");
		obj.animate(
					{svgOpacity:'1'},
					{
						duration:400,
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
		obj.attr("contentid",content[1]);
		obj.find('#scale').attr("transform",'scale(.8)');
		var tempImage = new Image();
		tempImage.onLoad = (new function() {
							obj.find('image').removeAttr("display");
							obj.find('image').attr('xlink:href',"img/tooltip/" + content[0][3]);
							if(project) {
								if(content[1] != cID) {
									obj.find("#scale").attr("opacity",'.3');
									obj.closest(".galleryItem").toggleClass("clickable",true);
								} else {
									cGalleryItem = $(obj);
									obj.closest(".galleryItem").toggleClass("clickable",false);
								}
							} else {
								obj.closest(".galleryItem").toggleClass("clickable",true);
								obj.find("#scale").attr("opacity",'1');
							}
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
