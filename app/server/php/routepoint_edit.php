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
	
}
mysql_close($con);

echo "";

?>