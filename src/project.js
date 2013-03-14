function changeImage() {
    //Update Text
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
    var tmp = new Image();
    $("#projectImage").stop();
    var d = new Date();
    var start = d.getTime();
    tmp.src = "img/" + cImage;
    tmp.onload = function() {
                            d = new Date();
                            if(debug) console.log("CIMAGE:ELAPSED: "+ String(d.getTime() - start));
                            $("#projectImage").attr("opacity","0");
                            $("#projectImage").attr('xlink:href',"img/" + cImage);
                            var opac = 1;
                            if(cMore != "") {
                                svgFadeIn($("#click"),500)
                                opac = linkOpacity;
                            }
                            $("#projectImage").animate(
                                        {svgOpacity:opac},
                                        {
                                            duration:800,
                                            easing:'easeOutCirc'
                                        }
                            );
                        };

    //Clip the Gallery
    $("#galleryTop").attr("clip-path","url(#projectClip)");

    //Enter the Gallery
}

