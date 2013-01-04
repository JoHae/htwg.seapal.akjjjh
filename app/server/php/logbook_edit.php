<?php
$con = (include '../../database/connect.php');


# If logbookID already exists just update the entry
if ($_POST['dataId']!='NULL') {
	$sql = "UPDATE `seapal`.`logbook`
	SET
	shipname='$_POST[shipname]',
	registnumber='$_POST[shipregisternumber]',
	sailsign='$_POST[sailsign]',
	homeport='$_POST[homeport]',
	yachtclub='$_POST[yachtclub]',
	owner='$_POST[shipowner]',
	insurance='$_POST[insurance]',
	callsign='$_POST[callsign]',
	type='$_POST[shiptype]',
	constructer='$_POST[constructer]',
	length='$_POST[shiplength]',
	width='$_POST[shipwidth]',
	gauge='$_POST[gauge]',
	mastheight='$_POST[mastheight]',
	expulsion='$_POST[expulsion]',
	rigtype='$_POST[rigtype]',
	constructionyear='$_POST[constructionyear]',
	engine='$_POST[engine]',
	size_fueltank='$_POST[size_fueltank]',
	size_watertank='$_POST[size_watertank]',
	size_sewagetank='$_POST[size_sewagetank]',
	size_mainsail='$_POST[size_mainsail]',
	size_genua='$_POST[size_genua]',
	size_spi='$_POST[size_spi]'
	WHERE
	logbookID='$_POST[dataId]'
	";
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
	
} else {
	$sql = "INSERT INTO `seapal`.`logbook`
	(
	`logbookID`, `shipname`, `registnumber`, `sailsign`, `homeport`, `yachtclub`, `owner`, `insurance`, `callsign`, `type`,
	`constructer`, `length`, `width`, `gauge`, `mastheight`, `expulsion`, `rigtype`, `constructionyear`, `engine`, `size_fueltank`,
	`size_watertank`, `size_sewagetank`, `size_mainsail`, `size_genua`, `size_spi`
	)
	VALUES
	(
	NULL,'$_POST[shipname]','$_POST[shipregisternumber]','$_POST[sailsign]','$_POST[homeport]','$_POST[yachtclub]','$_POST[shipowner]','$_POST[insurance]','$_POST[callsign]','$_POST[shiptype]',
	'$_POST[constructer]','$_POST[shiplength]','$_POST[shipwidth]','$_POST[gauge]','$_POST[mastheight]','$_POST[expulsion]','$_POST[rigtype]','$_POST[constructionyear]','$_POST[engine]','$_POST[size_fueltank]',
	'$_POST[size_watertank]','$_POST[size_sewagetank]','$_POST[size_mainsail]','$_POST[size_genua]','$_POST[size_spi]')";
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
	
}
mysql_close($con);

include 'logbooks_get.php';

?>