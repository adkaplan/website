<!DOCTYPE html public "-//W3C//DTD HTML 5.0 Transitional//en">
<HTML>

<head>

	<title>ADKaplan</title>


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
		global $goAhead, $agent;
		$agent = $_SERVER['HTTP_USER_AGENT'];

		$browser_version = 0;
	    $browser= 'ss';
	    if (preg_match('|Mobile|',$agent,$matched)) {
	    	$agent = "YAY";
	    	$browser = "mobile";

	    } elseif (preg_match('|MSIE ([0-9]{1,2}.[0-9]{1,2})|',$agent,$matched)) {
		     $browser_version=$matched[1];
		     $browser = 'IE';
		} elseif (preg_match('|Opera ([0-9]\.[0-9]{1,2})|',$agent,$matched)) {
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
        } elseif(preg_match('|Android ([0-9]\.[0-9{1-2}])|',$agent,$matched)) {
	         	$browser_version=$matched[1];
	         	$browser = 'Android';
		} elseif(preg_match('|iPad|iPhone.*Version/([0-9]\.[0-9])|',$agent,$matched)) {
				$browser_version=$matched[1];
				$browser = 'iMobile';
		} else {
			$browser = "other";
			$browser_version = 0;
		}
		if ($browser == "mobile") {
			$goAhead = False;
		} elseif ($browser == "IE" && $browser_version<9) {
			$goAhead = False;
			$message = "Your version of internet explorer needs to be updated to 9 to be supported.";
		} elseif($browser == "Android" && $browser_version<3) {
			$goAhead = False;
			$message = "This site does not support older android browsers";
		} elseif ($browser == 'other') {
			$goAhead = False;
			$messge = "";
		} elseif ($browser == "Safari" && $browser_version<5.1) {
			$goAhead = False;
			$message = "Please update Safari.";
		} elseif ($browser == "iPhone" && $browser_version<5.0) {
			$goAhead = False;
			$message = "";
		} elseif ($browser == "iMobile" && $browser_version<5.0) {
			$goAhead = False;
			$message = "";
		} else {
			//print("console.log('" . $browser_version . "');");
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
		echo "</script>";
		if($browser == "IE" && $goAhead) {
			echo "<link rel='stylesheet' type='text/css' href='styleIE.css' />";
		} else if ($goAhead) {
			echo "<link rel='stylesheet' type='text/css' href='style.css' />";
		} else {
			echo "<link rel='stylesheet' type='text/css' href='stylemob.css' />";
		}
		?>
</head>

<body onload="initialize()">
	<DIV id="main" style="width: 100%; height:100%">
			<?php
				if($goAhead) {
						include "imgstatic/leftside.svg";
						include "imgstatic/rightside.svg";
						include "imgstatic/main.svg";
				} else {
					// echo "Your browser is not supported. " . $message . " Instead, check out adkaplan.wordpress.com (WIP) and vimeo.com/adkaplan";
						include "mobileindex.html";
				}
			?>
	</DIV>
</body>