<?php
	// json data
    $con = (include '../../database/connect.php');
	$result = mysql_query("SELECT * FROM waypoint WHERE waypointID=" . $_GET["waypointId"]);
	
	$row = mysql_fetch_array($result);
	
		$returnData = array(
		'dataId' => $row['waypointID'],
		'tripId' => $row['tripID'],
		'waypointtitle' => $row['waypoint_name'],
		'position' => $row['position'],
		'btm' => $row['btm'],
		'dtm' => $row['dtm'],
		'cog' => $row['cog'],
		'sog' => $row['sog'],
		'maneuverId' => $row['maneuverID'],
		'headsailId' => $row['headsailID'],
		'mainsailId' => $row['mainsailID']
		);
	
	echo json_encode($returnData);
	
	mysql_close($con);
?>