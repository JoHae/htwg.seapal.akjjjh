<?php
	// json data
    $con = (include '../../database/connect.php');
	$result = mysql_query("SELECT * FROM waypoint WHERE tripID=" . $_GET["tripId"] . " ORDER BY waypointID");
	
	$returnData = array();
	while ($row = mysql_fetch_array($result)) {
	
		$returnData[] = array(
		'waypointId' => $row['waypointID'],
		'tripId' => $row['tripID'],
		'position' => $row['position']
		);
	}
	echo json_encode($returnData);
	
	mysql_close($con);
?>