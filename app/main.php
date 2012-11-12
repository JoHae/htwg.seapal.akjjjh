<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="css/styles.css" type="text/css" />
	</head>
	<body>
		<?php
			include ("logbook_table.php");
		?>
		<input type="button" name="new_logbook" value="Neues Logbuch" onclick="Popup=window.open('dialogs/logbook_edit.php?logbookID=NULL',
			'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=420,height=400,left=430,top=23'); return false;">
	</body>
</html>