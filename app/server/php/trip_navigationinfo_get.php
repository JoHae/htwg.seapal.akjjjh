<?php
	// json data
    $con = (include '../../database/connect.php');
	$result = mysql_query(
	"SELECT tbTrip.logbookID, tbLogbook.shipname, tbTrip.triptitle, tbTrip.tripID
	FROM seapal.trip AS tbTrip
	JOIN seapal.logbook AS tbLogbook ON tbTrip.logbookID = tbLogbook.logbookID
	WHERE tbTrip.tripID = " . $_GET["tripId"]
	);
	
	$returnData = array();
	
	while ($row = mysql_fetch_array($result)) {
		$returnData = array(
		'shipname' => $row['shipname'],
		'logbookId' => $row['logbookID'],
		'triptitle' => $row['triptitle'],
		'tripId' => $row['tripID']
		);
	}
	echo json_encode($returnData);
	
	mysql_close($con);
?>