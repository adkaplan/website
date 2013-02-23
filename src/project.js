function enterProject() {
    $("#project").removeAttr("display");
    $("#project").animate({svgOpacity:'1'},{duration:300});
    $("#galleryTop").attr("clip-path","url(#projectClip)");
    //Reset Scrollbar
    window.scrollTo(0,0);
    scroll();
    console.log(cStack);
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