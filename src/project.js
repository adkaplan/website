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
    state="enterGallery";
    cStack = filterBy(content,cProject,0);

    //Build jq stack
    jq = [];
    $(".galleryItem").each(
        function() {
            jq.push($(this));
        });
    setTimeout(next,300);
}

function exitProject() {
    project = false;
    $("#project").attr("display","none");
    $("#projectTop").attr("clip-path","url(#galleryClip");
}

function changeImage() {
    //Update Text
    $("#projectTitle").animate({opacity:'0'},{duration:150});
    $("#projectCaption").animate({opacity:'0'},{duration:150});
    setTimeout((function() {
        $("#projectTitle").html(cTitle);
        $("#projectCaption").html("&nbsp;&nbsp;" + cProject + " | " + cDate + " | " + cCaption);
        $("#projectTitle").animate({opacity:'1'},{duration:100});
        $("#projectCaption").animate({opacity:'1'},{duration:100});
    }),100);

    //Load the current Image
    var tempImage = new Image();
    $("#projectImage").stop();
    tempImage.onLoad = (new function() {
                            $("#projectImage").attr("opacity","0");
                            $("#projectImage").attr('xlink:href',"img/" + cImage);
                            $("#projectImage").animate(
                                        {svgOpacity:'1'},
                                        {
                                            duration:800,
                                            easing:'easeOutCirc'
                                        }
                                    );
                        });
    tempImage.src = "img/" + cImage;

    //Clip the Gallery
    $("#galleryTop").attr("clip-path","url(#projectClip)");

    //Enter the Gallery
}

