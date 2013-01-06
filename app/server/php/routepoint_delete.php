<?php

$con = (
include '../../database/connect.php');

# If logbookID is not NULL delete entry
if ($_POST['removeId'] != 'NULL') {
	$sql = "
	DELETE FROM `seapal`.`routepoint`
	WHERE
	routepointID='$_POST[removeId]'
	";
} else {
	# remove all records
	$sql = "TRUNCATE TABLE routepoint";
}

if (!mysql_query($sql, $con)) {
	die('Error: ' . mysql_error());
}

mysql_close($con);

echo "";
?>