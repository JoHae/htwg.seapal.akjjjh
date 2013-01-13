<?php
$con = (
include '../../database/connect.php');

# If logbookID already exists just update the entry
if ($_POST['dataId'] != 'NULL') {
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

	$result = mysql_query("SELECT * FROM `seapal`.`waypoint` WHERE waypointID='$_POST[dataId]'");
	$row = mysql_fetch_array($result);
	if ($row['btm'] != NULL || $row['dtm'] != NULL || $row['cog'] != NULL || $row['sog'] != NULL || $row['waypoint_name'] != NULL || $row['maneuverID'] != 1 || $row['headsailID'] != 1 || $row['mainsailID'] != 1) {
		$hast_data = 1;
	} else {
		$hast_data = 0;
	}

	$returnData = array('has_data' => $hast_data);

	echo json_encode($returnData);

} else {
	die('Invalid dataId');
}

mysql_close($con);

echo "";
?>