<?php
$con = (include '../database/connect.php');

// notes and photos are missing -> also position entries
# If waypointID already exists just update the entry
if ($_POST['waypointID']!='NULL') {
	$sql = "UPDATE `seapal`.`waypoint`
	SET
	waypoint_name='$_POST[waypoint_name]',
	btm='$_POST[btm]',
	dtm='$_POST[dtm]',
	cog='$_POST[cog]',
	sog='$_POST[sog]'
	WHERE
	waypointID='$_POST[waypointID]' 
	";
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
	echo "1 record edited";

} else {
	$sql = "INSERT INTO `seapal`.`waypoint`
	(
	`waypointID`, `tripID`, `waypoint_name`,
	`btm`, `dtm`,
	`cog`, `sog`
	)
	VALUES
	(
	NULL,'$_POST[tripID]', '$_POST[waypoint_name]',
	'$_POST[btm]','$_POST[dtm]',
	'$_POST[cog]','$_POST[sog]')";
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
	echo "1 record added";
}
mysql_close($con);
?>