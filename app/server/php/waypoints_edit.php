<?php
$con = (include '../../database/connect.php');

# If logbookID already exists just update the entry
if ($_POST['dataId']!='NULL') {
	$sql = "UPDATE `seapal`.`waypoint`
	SET
	waypoint_name='$_POST[waypointtitle]',
	maneuverID='$_POST[maneuverId]',
	headsailID='$_POST[headsailId]',
	mainsailID='$_POST[mainsailId]'
	WHERE
	waypointID='$_POST[dataId]' 
	";
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
	
} else {
	die('Invalid dataId');
}

mysql_close($con);

?>