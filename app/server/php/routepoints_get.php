<?php
	// json data
    $con = (include '../../database/connect.php');
	$result = mysql_query("SELECT * FROM routepoint WHERE tripID=" . $_GET["tripId"] . " ORDER BY routepointID");
	
	$returnData = array();
	while ($row = mysql_fetch_array($result)) {
		$returnData[] = array(
		'routepointId' => $row['routepointID'],
		'name' => $row['name'],
		'notes' => $row['notes'],
		'tripId' => $row['tripID'],
		'position' => $row['position']
		);
	}
	echo json_encode($returnData);
	
	mysql_close($con);
?>