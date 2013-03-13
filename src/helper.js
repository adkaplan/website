function filterBy(data,identifier,column) {
	var returnArray = [];
	for (var i = data.length - 1; i >= 0; i--) {
		if(data[i][column] == identifier) {
            returnArray.push(new Array(data[i],i));
		}
	};
	return returnArray;
}
function svgFadeIn(obj,dur) {
    if(obj.hasClass("fading")) {
        obj.stop();
    }
   obj.removeAttr("display");
   obj.addClass("fading")
   obj.animate({
       svgOpacity: '1'},
       {duration:dur}, function() {
        obj.removeClass("fading")
   });
   obj.animate({svgOpacity:'1'},{duration:dur});
    // obj.attr("opacity",1)
}
function svgFadeOut(obj,dur) {
    if(obj.hasClass("fading")) {
        obj.stop();
    }
    obj.addClass("fading");
     obj.animate({svgOpacity:'0'},{
        duration:dur,
        complete:(function() {
            $(this).attr("display","none");
            obj.removeClass("fading");
         })
        });
}
function buildGalleryJQ() {
    tmp = cStack.length;

    $(".galleryItem").each(
    function() {
        $(this).attr("opacity",0);
        if(!tmp) return;
        jq.push($(this));
        tmp --;
    });
    $("#gallery").removeAttr("display");
    $("#gallery").attr("opacity",1)
}