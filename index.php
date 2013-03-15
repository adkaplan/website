<!DOCTYPE html public "-//W3C//DTD HTML 5.0 Transitional//en">
<HTML>

<head>

	<title>ADKaplan</title>
	<link rel="stylesheet" type="text/css" href="style.css" />

	<!-- external js -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
	<script type="text/javascript" src='./src/external/jquery.svg.js'></script>
	<script type="text/javascript" src='./src/external/jquery.svganim.js'></script>
	<script type="text/javascript" src='./src/external/jquery.svgdom.js'></script>
	<script type="text/javascript" src='./src/external/jquery.easing.1.3.js'></script>

	<!-- src js -->
	<script type="text/javascript" src='./src/helper.js'></script>
	<script type="text/javascript" src='./src/gallery.js'></script>
	<script type="text/javascript" src='./src/next.js'></script>
	<script type="text/javascript" src='./src/menu.js'></script>
	<script type="text/javascript" src='./src/header.js'></script>
	<script type="text/javascript" src='./src/global.js'></script>
	<script type="text/javascript" src='./src/project.js'></script>

	<!-- import content.csv -->
	<script type="text/javascript">
	var content = [];
	<?php
		global $goAhead;
		$agent = $_SERVER['HTTP_USER_AGENT'];
		//$agent = "MSIE";
		//
		$browser_version = 0;
		     $browser= 'ss';
		if (preg_match('|MSIE ([0-9]{1,2}.[0-9]{1,2})|',$agent,$matched)) {
		     $browser_version=$matched[1];
		     $browser = 'IE';
		} elseif (preg_match('|Opera ([0-9].[0-9]{1,2})|',$agent,$matched)) {
		     $browser_version=$matched[1];
		     $browser = 'Opera';
		} elseif(preg_match('|Firefox/([0-9{1,2}\.]+)|',$agent,$matched)) {
		         $browser_version=$matched[1];
		         $browser = 'Firefox';
		} elseif(preg_match('|Safari/([0-9\.]+)|',$agent,$matched)) {
		         $browser_version=$matched[1];
		         $browser = 'Safari';
		} elseif(preg_match('|Chrome/([0-9{1,2}\.]+)|',$agent,$matched)) {
		         $browser_version=$matched[1];
		         $browser = 'Safari';
        }  else {
	         // browser not recognized!

		}
		if ($browser == "IE" && $browser_version<9) {
			$goAhead = False;
			$message = "Your version of internet explorer needs to be updated to 9 to be supported."
		} elseif ($browser == 'other') {
			$goAhead = False;
			print("console.log('" . $agent . "');");
			$messge = "";
		} else {
			print("console.log('" . $browser_version . "');");
			$message = "";
			$goAhead = True;
		}
		$row = 0;
		if (($handle = fopen("content.csv", "r")) !== FALSE) {
			while (($data =	 fgetcsv($handle, 2000, ",")) !== FALSE) {
			               	echo "content[".$row."] = new Array();\n";
			               	echo "content[".$row."] = ([\"" . implode("\",\"", $data) . "\"]);\n";
			               	$row ++;
			}
			fclose($handle);
		} else $error = "Cannot find content";
		?>
	</script>
</head>

<body onload="initialize()">
	<DIV id="main" style="width: 100%; height:100%">
			<?php if($goAhead) {
					include "img/borders/leftside.svg";
					include "img/borders/rightside.svg";
					include "img/main.svg";
				} else {
					print("Your browser is not supported. " . $message . " Instead, check out adkaplan.wordpress.com and vimeo.com/adkaplan");
				}
			?>
	</DIV>
</body>
</HTML>