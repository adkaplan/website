function filterBy(data,identifier,column) {
	var returnArray = [];
	for (var i = data.length - 1; i >= 0; i--) {
		for(var j = data.length-1;j>=0;j--) {
      if(data[i][column][j] == identifier) {
              returnArray.push(new Array(data[i],i));
		  }
    }
	};
  returnArray.reverse();
	setExcess(returnArray.length);
  return returnArray;
}
function shuffle(list) {
  var i, j, t;
  for (i = 1; i < list.length; i++) {
    j = Math.floor(Math.random()*(1+i));  // choose j in [0..i]
    if (j != i) {
      t = list[i];                        // swap list[i] and list[j]
      list[i] = list[j];
      list[j] = t;
    }
  }
}
function svgFadeIn(obj,dur) {
   obj.stop();
   obj.removeAttr("display");
   obj.animate({
       svgOpacity: '1'},
       {duration:dur}
   );
   obj.animate({svgOpacity:'1'},{easing: 'easeOutCirc',duration:dur});
}
function svgFadeOut(obj,dur) {
    obj.stop();
    obj.attr("display","none")
    obj.animate({svgOpacity:'0'},{
        duration:dur,
        complete:(function() {
            $(this).attr("display","none");
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