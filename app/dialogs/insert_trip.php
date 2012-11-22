<?php
$con = (include '../database/connect.php');

	// notes and photos are missing
# If tripID already exists just update the entry
if ($_POST['tripID']!='NULL') {
	$sql = "UPDATE `seapal`.`trip`
	SET
	triptitle='$_POST[triptitle]',
	destination='$_POST[destination]',
	startpoint='$_POST[startpoint]',
	skipper='$_POST[skipper]',
	crew='$_POST[crew]',
	start='$_POST[start]',
	end='$_POST[end]',
	motor='$_POST[motor]',
	tank_filled='$_POST[tank_filled]'
	WHERE
	tripID='$_POST[tripID]' 
	";
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
	echo "1 record edited";

} else {
	$sql = "INSERT INTO `seapal`.`trip`
	(
	`tripID`, `logbookID`, `triptitle`, `destination`, `startpoint`, `skipper`, `crew`, `start`, `end`, `motor`, `tank_filled`
	)
	VALUES
	(
	NULL,'$_POST[logbookID]', '$_POST[triptitle]','$_POST[destination]','$_POST[startpoint]','$_POST[skipper]','$_POST[crew]','$_POST[start]','$_POST[end]','$_POST[motor]','$_POST[tank_filled]')";
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
	echo "1 record added";
}
mysql_close($con);
?>