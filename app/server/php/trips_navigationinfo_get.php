<?php
	// json data
    $con = (include '../../database/connect.php');
	$result = mysql_query("SELECT * FROM logbook WHERE logbookID=" . $_GET["logbookId"]);
	
	$returnData = array();
	
	while ($row = mysql_fetch_array($result)) {
		$returnData = array(
		'shipname' => $row['shipname'],
		'logbookId' => $row['logbookID']
		);
	}
	echo json_encode($returnData);
	
	mysql_close($con);
?>