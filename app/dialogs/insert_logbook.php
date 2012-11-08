<?php
$con = mysql_connect("localhost", "root");
if (!$con) {
	die('Could not connect: ' . mysql_error());
}

mysql_select_db("my_db", $con);

# If boatId already exists just update the entry
if ($_POST['logbookID']!='NULL') {
	$sql = "UPDATE `seapal`.`logbook`
	SET
	shipname='$_POST[shipname]',
	registnumber='$_POST[registnumber]',
	sailsign='$_POST[sailsign]',
	homeport='$_POST[homeport]',
	yachtclub='$_POST[yachtclub]',
	owner='$_POST[owner]',
	insurance='$_POST[insurance]',
	callsign='$_POST[callsign]',
	type='$_POST[type]',
	constructer='$_POST[constructer]',
	length='$_POST[length]',
	width='$_POST[width]',
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
	logbookID='$_POST[logbookID]'
	";
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
	echo "1 record edited: ID: $_POST[logbookID]";

} else {
	$sql = "INSERT INTO `seapal`.`logbook`
	(
	`logbookID`, `shipname`, `registnumber`, `sailsign`, `homeport`, `yachtclub`, `owner`, `insurance`, `callsign`, `type`,
	`constructer`, `length`, `width`, `gauge`, `mastheight`, `expulsion`, `rigtype`, `constructionyear`, `engine`, `size_fueltank`,
	`size_watertank`, `size_sewagetank`, `size_mainsail`, `size_genua`, `size_spi`
	)
	VALUES
	(
	NULL,'$_POST[shipname]','$_POST[registnumber]','$_POST[sailsign]','$_POST[homeport]','$_POST[yachtclub]','$_POST[owner]','$_POST[insurance]','$_POST[callsign]','$_POST[type]',
	'$_POST[constructer]','$_POST[length]','$_POST[width]','$_POST[gauge]','$_POST[mastheight]','$_POST[expulsion]','$_POST[rigtype]','$_POST[constructionyear]','$_POST[engine]','$_POST[size_fueltank]',
	'$_POST[size_watertank]','$_POST[size_sewagetank]','$_POST[size_mainsail]','$_POST[size_genua]','$_POST[size_spi]')";
	if (!mysql_query($sql, $con)) {
		die('Error: ' . mysql_error());
	}
	echo "1 record added";
}
mysql_close($con);
?>