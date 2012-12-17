<?php

$con = (include '../../database/connect.php');


# If logbookID is not NULL delete entry
if ($_POST['logbookId']!='NULL') {
	$sql = "
	DELETE FROM `seapal`.`logbook`
	WHERE
	logbookID='$_POST[logbookId]'
	";
	
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
}

mysql_close($con);

include 'logbooks_get.php';

?>