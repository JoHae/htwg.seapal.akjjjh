<?php
$con = (include '../../database/connect.php');

# If logbookID already exists just update the entry
if ($_POST['routepointId']!='NULL') {
	$sql = "UPDATE `seapal`.`routepoint`
	SET
	tripID='$_POST[tripId]',
	name='$_POST[name]',
	notes='$_POST[notes]',
	position='$_POST[position]'
	WHERE
	routepointID='$_POST[routepointId]' 
	";
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
	echo "";
} else {
	$sql = "INSERT INTO `seapal`.`routepoint`
	(
	`routepointID`, `tripID`, `name`, `notes`, `position`
	)
	VALUES
	(
	NULL, '$_POST[tripId]', '$_POST[name]','$_POST[notes]','$_POST[position]')";
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}

	$result = mysql_query("SELECT MAX(routepointID) FROM `seapal`.`routepoint`");
	$row = mysql_fetch_array($result);
	$returnData = array('routepointId' => $row['MAX(routepointID)']);

	echo json_encode($returnData);
}
mysql_close($con);

?>