<?php

$con = (include '../../database/connect.php');


# If logbookID is not NULL delete entry
if ($_POST['removeId']!='NULL') {
	$sql = "
	DELETE FROM `seapal`.`trip`
	WHERE
	tripID='$_POST[removeId]'
	";
	
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
}

mysql_close($con);

include 'trips_get.php';

?>