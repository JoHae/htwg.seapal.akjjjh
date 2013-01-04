<?php
	// json data
    $con = (include '../../database/connect.php');
	$result = mysql_query("SELECT * FROM logbook");
	
	$returnData = array();
	
	while ($row = mysql_fetch_array($result)) {
		$returnData[] = array(
		'shipname' => $row['shipname'],
		'shiptype' => $row['type'],
		'shipowner' => $row['owner'],
		'shipregisternumber' => $row['registnumber'],
		'sailsign' => $row['sailsign'],
		'homeport' => $row['homeport'],
		'yachtclub' => $row['yachtclub'],
		'insurance' => $row['insurance'],
		'callsign' => $row['callsign'],
		'constructer' => $row['constructer'],
		'shiplength' => $row['length'],
		'engine' => $row['engine'],
		'shipwidth' => $row['width'],
		'gauge' => $row['gauge'],
		'mastheight' => $row['mastheight'],
		'expulsion' => $row['expulsion'],
		'rigtype' => $row['rigtype'],
		'constructionyear' => $row['constructionyear'],
		'size_fueltank' => $row['size_fueltank'],
		'size_watertank' => $row['size_watertank'],
		'size_sewagetank' => $row['size_sewagetank'],
		'size_mainsail' => $row['size_mainsail'],
		'size_genua' => $row['size_genua'],
		'size_spi' => $row['size_spi'],
		'logbookId' => $row['logbookID']
		);
	}
	echo json_encode($returnData);
	
	mysql_close($con);
?>