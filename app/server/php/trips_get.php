<?php
	// json data
    $con = (include '../../database/connect.php');
	$result = mysql_query("SELECT * FROM trip WHERE logbookID=" . $_GET["logbookId"]);
	
	$returnData = array();
	
	while ($row = mysql_fetch_array($result)) {
		$starttime = new DateTime($row['start']);
		$endtime = new DateTime($row['end']);
		$duration = $starttime->diff($endtime);
		$durationString = $duration->days . " Tag(e), " . $duration->h . " Stunde(n)";
		$fueltankfilled = ($row['tank_filled'] === "0") ? false : true;
		
		$returnData[] = array(
		'triptitle' => $row['triptitle'],
		'startpoint' => $row['startpoint'],
		'destination' => $row['destination'],
		'skipper' => $row['skipper'],
		'starttime' => $starttime->format('Y-m-d H:i:s'),
		'endtime' => $endtime->format('Y-m-d H:i:s'),
		'duration' =>  $durationString,
		'motorminutes' => $row['motor'],
		'fueltankfilled' => $fueltankfilled ? "ja" : "nein",
		'crew' => $row['crew'],
		'notes' => $row['notes'],
		'dataId' => $row['tripID'],
		'logbookId' => $row['logbookID']
		);
	}
	echo json_encode($returnData);
	
	mysql_close($con);
?>