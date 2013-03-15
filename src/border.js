function border1() {
    var rTotal = 0
    var rCount = 0
    var rMax = 0
    $("#leftside .circles").children().each(
        function() {
            var r = parseFloat($(this).attr("r"));
            rTotal += r
            rCount ++;
            if(r>rMax) rMax = r;
        }
    );
    $("#leftside .circles").children().each(
        function() {
            var n = parseFloat($(this).attr("r"))/rMax;
            var hex = Number(parseInt(n*60) + 170).toString(16).toUpperCase();
            hex = hex.length == 1 ? "0" + hex : hex;
            $(this).attr('fill','#' + hex + hex + hex);
        }
    );
    $("#rightside .circles").children().each(
        function() {
            var r = parseFloat($(this).attr("r"));
            rTotal += r
            rCount ++;
            if(r>rMax) rMax = r;
        }
    );

    $("#rightside .circles").children().each(
        function() {
            var n = parseFloat($(this).attr("r"))/rMax;
            var hex = Number(parseInt(n*60) + 170).toString(16).toUpperCase();
            hex = hex.length == 1 ? "0" + hex : hex;
            $(this).attr('fill','#' + hex + hex + hex);
        }
    );
    $("#rightside .paths").children().each(
        function() {
            $(this).attr('stroke',shade1);
        }
    );
    $("#leftside .paths").children().each(
        function() {
            $(this).attr('stroke',shade1);
        }
    );
}
function border2() {
    var rTotal = 0
    var rCount = 0
    var rMax = 0
    $("#leftside2 .circles").children().each(
        function() {
            var r = parseFloat($(this).attr("r"));
            rTotal += r
            rCount ++;
            if(r>rMax) rMax = r;
        }
    );
    $("#rightside2 .circles").children().each(
        function() {
            var r = parseFloat($(this).attr("r"));
            rTotal += r
            rCount ++;
            if(r>rMax) rMax = r;
        }
    );
    $("#leftside2 .circles circle").each(
        function() {
            var n = parseFloat($(this).attr("r"))/rMax;
            var hex = Number(parseInt(n*60) + 170).toString(16).toUpperCase();
            hex = hex.length == 1 ? "0" + hex : hex;
            $(this).attr('fill','#' + hex + hex + hex);
            $(this).attr('stroke',"none")
        }
    )
    $("#rightside2 .circles circle").each(
        function() {
           var n = parseFloat($(this).attr("r"))/rMax;
           var hex = Number(parseInt(n*60) + 170).toString(16).toUpperCase();
           hex = hex.length == 1 ? "0" + hex : hex;
           $(this).attr('fill','#' + hex + hex + hex);
           $(this).attr('stroke',"none")

        }
    )
    $("#leftside2 .circles rect").each(
        function() {
            $(this).attr('fill',shade2)
            $(this).attr('stroke',"none")
        }
    )
    $("#rightside2 .circles rect").each(
        function() {
            $(this).attr('fill',shade2)
            $(this).attr('stroke',"none")
        }
    )
}
function border3() {
    //Do Nothing
}