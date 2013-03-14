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