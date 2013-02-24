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
    obj.removeAttr("display");
   obj.animate({svgOpacity:'1'},{duration:dur});
}
function svgFadeOut(obj,dur) {
     obj.animate({svgOpacity:'0'},{
        duration:dur,
        complete:(function() {$(this).attr("display","none");})
        });
}
