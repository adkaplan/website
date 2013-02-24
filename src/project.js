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

