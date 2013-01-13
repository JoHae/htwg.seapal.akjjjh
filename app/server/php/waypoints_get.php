<?php
	// json data
    $con = (include '../../database/connect.php');
	$result = mysql_query("SELECT * FROM waypoint WHERE tripID=" . $_GET["tripId"] . " ORDER BY waypointID");
	
	$returnData = array();
	while ($row = mysql_fetch_array($result)) {		
		if ($row['btm'] != NULL || $row['dtm'] != NULL || $row['cog'] != NULL || $row['sog'] != NULL || $row['waypoint_name'] != NULL
			|| $row['maneuverID'] != 1 || $row['headsailID'] != 1 || $row['mainsailID'] != 1) {
			$hast_data = 1;
		} else {
			$hast_data = 0;
		}
	
		$returnData[] = array(
		'waypointId' => $row['waypointID'],
		'tripId' => $row['tripID'],
		'position' => $row['position'],
		'has_data' => $hast_data
		);
	}
	echo json_encode($returnData);
	
	mysql_close($con);
?>