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
   console.log("display off")
   obj.removeAttr("display");
   obj.animate({svgOpacity:'1'},{duration:dur});
}
function svgFadeOut(obj,dur) {
     obj.animate({svgOpacity:'0'},{
        duration:dur,
        complete:(function() {$(this).attr("display","none");})
        });
}
function buildGalleryJQ() {
    tmp = cStack.length;
    $(".galleryItem").each(
    function() {
        if(!tmp) return;
        jq.push($(this));
        tmp --;
    });
}