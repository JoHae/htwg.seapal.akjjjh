<!DOCTYPE html>
<!-- saved from url=(0030)http://www.seapal.de/index.php -->
<html xmlns="http://www.w3.org/1999/xhtml">
	<head profile="http://www.w3.org/2005/10/profile">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="keywords" content="sailing, app, navigation, sea map, boat, skipper">
		<meta name="description" content="SeaPal is a mobile app for sailors to do navigation, tracking and more.">

		<title>SeaPal</title>
		<link href="./css/styles.css" rel="stylesheet" type="text/css" media="screen" />
	</head>

	<body>
		<?php
			include ("logbook_table.php");
		?>
		<input type="button" name="new_logbook" value="Neues Logbuch" onclick="Popup=window.open('dialogs/logbook_edit.php?logbookID=NULL',
			'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=420,height=400,left=430,top=23'); return false;">
			
	</body>
</html>