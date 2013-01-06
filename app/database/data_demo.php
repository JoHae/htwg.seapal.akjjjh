<?php
$con = (include 'connect.php');

# PERSONAL DATA OF JH
$tscho_insert_logbook="INSERT INTO `seapal`.`logbook`
(
`logbookID`, `shipname`, `registnumber`, `sailsign`, `homeport`, `yachtclub`, `owner`, `insurance`, `callsign`, `type`,
`constructer`, `length`, `width`, `gauge`, `mastheight`, `expulsion`, `rigtype`, `constructionyear`, `engine`, `size_fueltank`,
`size_watertank`, `size_sewagetank`, `size_mainsail`, `size_genua`, `size_spi`
)
VALUES
(
NULL, 'Victoria', '14525447', 'mein_zeichen',
'Konstanzer_Hafen', 'Yachtclub_Konstanz', 'Icke',
'Brauchichnet', 'jung', 'segelboot', 'icke_auch',
'100000', '500', '2', '60', '2.4', 'rigtype_kp', '2015',
'5000kwExport', '100000', '1', '5', '123', '43', '123'
)";

$tscho_insert_trip1="INSERT INTO `seapal`.`trip`
(
`tripID`, `logbookID`, `triptitle`, `destination`, `startpoint`, `skipper`, `crew`, `start`, `end`, `motor`, `tank_filled`, `notes`
)
VALUES
(
NULL, '1', 'sommereventsail', 'karibik', 'konstanz', 'tscho', NULL, '2012-11-01 00:00:00', '2012-11-22 00:00:00', '0', '1', NULL)";


mysql_select_db("seapal", $con);
echo "Insert Tschos Logbuch...</br>";
if (!mysql_query($tscho_insert_logbook,$con))
{
	die('Error: ' . mysql_error());
}
if (!mysql_query($tscho_insert_trip1,$con))
{
	die('Error: ' . mysql_error());
}
mysql_close($con);
?>