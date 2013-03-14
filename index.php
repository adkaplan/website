<!DOCTYPE html>
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
			<?php include "img/borders/leftside.svg";?>
			<?php include "img/borders/rightside.svg";?>
			<?php include "img/main.svg";?>
	</DIV>
</body>
</HTML>