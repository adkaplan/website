function enterProject() {
    //Test
    $("#project").removeAttr("display");
    $("#project").animate({svgOpacity:'1'},{duration:300});
    $("#galleryTop").attr("clip-path","url(#projectClip)");
    state="enterGallery";
    scroll();
    window.scrollTo(0,0);
    setTimeout(next,300);
    cStack = filterBy(content,cProject,0);
    console.log(cStack);
    //Build jq stack
    jq = [];
    $(".galleryItem").each(
        function() {
            jq.push($(this));
        });
}
function exitProject() {
    project = false;
    $("#project").attr("display","none");
    $("#projectTop").attr("clip-path","url(#galleryClip");
}