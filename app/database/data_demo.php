<?php
$con = (include 'connect.php');

# GENERAL DATA
$insert_mainsail="INSERT INTO `seapal`.`maneuvertype`
(
`maneuverID`, `name`
)
VALUES
(NULL, 'Tack'), (NULL, 'Jibe'), (NULL, 'Lay to'), (NULL, 'Set Sails'), (NULL, 'Change Sails'), (NULL, 'Sails Down'), (NULL, 'Ref'), (NULL, 'Anker Up'), (NULL, 'Anker Down')";

$insert_headsail="INSERT INTO `seapal`.`headsailtype`
(
`headsailID`, `name`
)
VALUES
(NULL, 'Genua1'), (NULL, 'Genua2'), (NULL, 'Genua3'), (NULL, 'Fock'), (NULL, 'Storm Fock'), (NULL, 'Blister'), (NULL, 'Spinaker')";

$insert_maneuver="INSERT INTO `seapal`.`mainsailtype` (`mainsailID`, `name`) VALUES (NULL, 'Full'), (NULL, 'Ref1'), (NULL, 'Ref2')";

// mysql_query("DELETE FROM `seapal`.`maneuvertype`",$con);
// mysql_query("DELETE FROM `seapal`.`headsailtype`",$con);
// mysql_query("DELETE FROM `seapal`.`mainsailtype`",$con);
echo "Insert Mainsail...</br>";
if (!mysql_query($insert_mainsail,$con))
{
	die('Error: ' . mysql_error());
}
echo "Insert Headsail...</br>";
if (!mysql_query($insert_headsail,$con))
{
	die('Error: ' . mysql_error());
}
echo "Insert Maneuver...</br>";
if (!mysql_query($insert_maneuver,$con))
{
	die('Error: ' . mysql_error());
}

# PERSONAL DATA OF TSCHO
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

$tscho_insert_waypoint1="INSERT INTO `seapal`.`waypoint`
(
`waypointID`, `tripID`, `waypoint_name`, `degree_north`, `minutes_north`, `seconds_north`, `degree_east`, `minutes_east`, `seconds_east`, `btm`, `dtm`, `cog`, `sog`, `maneuverID`, `headsailID`, `mainsailID`
)
VALUES
(
NULL, '1', 'hoernle', '12', '34', '45', '45', '85', '55', '123', '456', '789', '1203', '1', '1', '1'
)";


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
if (!mysql_query($tscho_insert_waypoint1,$con))
{
	die('Error: ' . mysql_error());
}
mysql_close($con);
?>