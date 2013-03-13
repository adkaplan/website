function changeImage() {
    //Update Text
    console.log("hello")
    $("#projectTitle").fadeOut()
    $("#projectCaption").fadeOut()
    if(cMore != "") {
        $("#click").removeAttr("display")
        $("#click").attr("opacity","0")
        $("#click").text(cMore)
        $("#projectImage").toggleClass("clickable",true)
    } else {
        $("#click").attr("display","none");
        $("#projectImage").toggleClass("clickable",false)
    }
    setTimeout((function() {
        $("#projectTitle").text(cTitle);
        $("#projectCaption").text(cProject + " | " + cDate + " | " + cCaption);
        $("#projectTitle").fadeIn()
        $("#projectCaption").fadeIn()
    }),500);

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
                            if(cMore != "") {
                                svgFadeIn($("#click"),500)
                            }
                        });
    tempImage.src = "img/" + cImage;

    //Clip the Gallery
    $("#galleryTop").attr("clip-path","url(#projectClip)");

    //Enter the Gallery
}

