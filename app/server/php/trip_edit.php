<?php
$con = (include '../../database/connect.php');


# If logbookID already exists just update the entry
if ($_POST['dataId']!='NULL') {
	$sql = "UPDATE `seapal`.`trip`
	SET
	triptitle='$_POST[triptitle]',
	destination='$_POST[destination]',
	startpoint='$_POST[startpoint]',
	skipper='$_POST[skipper]',
	crew='$_POST[crew]',
	notes='$_POST[notes]',
	motor='$_POST[motorminutes]',
	tank_filled='$_POST[fueltankfilled]'
	WHERE
	tripID='$_POST[dataId]' 
	";
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
	
} else {
	$sql = "INSERT INTO `seapal`.`trip`
	(
	`tripID`, `logbookID`, `triptitle`, `destination`, `startpoint`, `skipper`, `crew`, `notes`, `motor`, `tank_filled`
	)
	VALUES
	(
	NULL,'$_GET[logbookId]', '$_POST[triptitle]','$_POST[destination]','$_POST[startpoint]','$_POST[skipper]','$_POST[crew]','$_POST[notes]','$_POST[motorminutes]','$_POST[fueltankfilled]')";
	
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
	
}
mysql_close($con);

include 'trips_get.php';

?>