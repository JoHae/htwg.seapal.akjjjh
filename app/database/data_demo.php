<?php
$con = (include 'connect.php');

# Logbook OF JH
$tscho_insert_logbook="INSERT INTO `seapal`.`logbook`
(
`logbookID`, `shipname`, `registnumber`, `sailsign`, `homeport`, `yachtclub`, `owner`, `insurance`, `callsign`, `type`,
`constructer`, `length`, `width`, `gauge`, `mastheight`, `expulsion`, `rigtype`, `constructionyear`, `engine`, `size_fueltank`,
`size_watertank`, `size_sewagetank`, `size_mainsail`, `size_genua`, `size_spi`
)
VALUES
(
NULL, 'Victoria', 'KN-14525447', 'ALPHANUM',
'Konstanzer Hafen', 'Yachtclub Konstanz', 'Johannes H',
'Nicht vers.', 'Rufzeichen', 'Dampfer', 'Johannes H',
'100000', '500', '2', '60', '2.4', '12345', '2015',
'5000kw Export', '100000', '1', '5', '123', '43', '123'
)";

$tscho_insert_trip1="INSERT INTO `seapal`.`trip`
(
`tripID`, `logbookID`, `triptitle`, `destination`, `startpoint`, `skipper`, `crew`, `start`, `end`, `motor`, `tank_filled`, `notes`
)
VALUES
(
NULL, '1', 'Sommereventsail', 'Bregenz', 'Konstanz', 'Johannes H', 'Johannes H', '2012-11-01 00:00:00', '2012-11-22 00:00:00', '0', '1', NULL)";

$tscho_insert_routpoints_trip1="INSERT INTO `routepoint` (`routepointID`, `tripID`, `name`, `notes`, `position`) VALUES
(NULL, 1, '', '', '(47.66446249265731, 9.217529296875)'),
(NULL, 1, '', '', '(47.65012501030461, 9.271087646484375)'),
(NULL, 1, '', '', '(47.64734955897392, 9.411163330078125)'),
(NULL, 1, '', '', '(47.632081940263305, 9.479827880859375)'),
(NULL, 1, '', '', '(47.56355410390808, 9.514846801757812)'),
(NULL, 1, '', '', '(47.53899190311993, 9.644622802734375)'),
(NULL, 1, '', '', '(47.51024415204361, 9.727706909179688)')";

$tscho_insert_trip2="INSERT INTO `seapal`.`trip`
(
`tripID`, `logbookID`, `triptitle`, `destination`, `startpoint`, `skipper`, `crew`, `start`, `end`, `motor`, `tank_filled`, `notes`
)
VALUES
(
NULL, '1', 'Wintereventsail', 'Friedrichshafen', 'Konstanz', 'Johannes H', 'Johannes H', '2013-11-01 00:00:00', '2013-11-22 00:00:00', '0', '1', NULL)";

$tscho_insert_routpoints_trip2="INSERT INTO `routepoint` (`routepointID`, `tripID`, `name`, `notes`, `position`) VALUES
(NULL, 2, '', '', '(47.646886969413, 9.463691711425781)'),
(NULL, 2, '', '', '(47.62930553023397, 9.42352294921875)'),
(NULL, 2, '', '', '(47.62467785241324, 9.3603515625)'),
(NULL, 2, '', '', '(47.640410285382224, 9.284820556640625)'),
(NULL, 2, '', '', '(47.666312203609145, 9.228515625)')";

$tscho_insert_trip3="INSERT INTO `seapal`.`trip`
(
`tripID`, `logbookID`, `triptitle`, `destination`, `startpoint`, `skipper`, `crew`, `start`, `end`, `motor`, `tank_filled`, `notes`
)
VALUES
(
NULL, '1', 'Partynachtsegeln', 'Meersburg', 'Konstanz', 'Johannes H', 'Johannes H', '2013-01-17 22:00:00', '2013-01-18 06:00:00', '0', '1', NULL)";

$tscho_insert_routpoints_trip3="INSERT INTO `routepoint` (`routepointID`, `tripID`, `name`, `notes`, `position`) VALUES
(NULL, 3, '', '', '(47.692894555348765, 9.267396926879883)'),
(NULL, 3, '', '', '(47.67960507247383, 9.259071350097656)'),
(NULL, 3, '', '', '(47.65521295468833, 9.297266006469727)'),
(NULL, 3, '', '', '(47.63283385926336, 9.362926483154297)'),
(NULL, 3, '', '', '(47.62774373477453, 9.320354461669922)'),
(NULL, 3, '', '', '(47.65457698874981, 9.25546646118164)'),
(NULL, 3, '', '', '(47.6525534092334, 9.225425720214844)'),
(NULL, 3, '', '', '(47.65660048985082, 9.185771942138672)')";

# Logbook OF JH 2
$tscho_insert_logbook2="INSERT INTO `seapal`.`logbook`
(
`logbookID`, `shipname`, `registnumber`, `sailsign`, `homeport`, `yachtclub`, `owner`, `insurance`, `callsign`, `type`,
`constructer`, `length`, `width`, `gauge`, `mastheight`, `expulsion`, `rigtype`, `constructionyear`, `engine`, `size_fueltank`,
`size_watertank`, `size_sewagetank`, `size_mainsail`, `size_genua`, `size_spi`
)
VALUES
(
NULL, 'MSS Pearl', 'KN-14525447', 'ALPHANUM',
'Pearl Habour', 'US Marine', 'Johannes H',
'N.A.', 'Rufzeichen', 'Kampfschiff', 'Johannes H',
'100000', '500', '2', '60', '2.4', '12345', '2015',
'5000kw Export', '100000', '1', '5', '123', '43', '123'
)";

# Logbook OF JH 3
$tscho_insert_logbook3="INSERT INTO `seapal`.`logbook`
(
`logbookID`, `shipname`, `registnumber`, `sailsign`, `homeport`, `yachtclub`, `owner`, `insurance`, `callsign`, `type`,
`constructer`, `length`, `width`, `gauge`, `mastheight`, `expulsion`, `rigtype`, `constructionyear`, `engine`, `size_fueltank`,
`size_watertank`, `size_sewagetank`, `size_mainsail`, `size_genua`, `size_spi`
)
VALUES
(
NULL, 'Todesstern', 'MTFBWU', 'ALPHANUM',
'Naboo', 'Dark Side', 'Johannes H',
'N.A.', 'M', 'Zerstoerer', 'Johannes H',
'100000', '500', '2', '60', '2.4', '12345', '2015',
'5000kw Export', '100000', '1', '5', '123', '43', '123'
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
if (!mysql_query($tscho_insert_trip2,$con))
{
	die('Error: ' . mysql_error());
}
if (!mysql_query($tscho_insert_trip3,$con))
{
	die('Error: ' . mysql_error());
}
if (!mysql_query($tscho_insert_routpoints_trip1,$con))
{
	die('Error: ' . mysql_error());
}
if (!mysql_query($tscho_insert_routpoints_trip2,$con))
{
	die('Error: ' . mysql_error());
}
if (!mysql_query($tscho_insert_routpoints_trip3,$con))
{
	die('Error: ' . mysql_error());
}
echo "Insert Tschos Logbuch2...</br>";
if (!mysql_query($tscho_insert_logbook2,$con))
{
	die('Error: ' . mysql_error());
}

echo "Insert Tschos Logbuch3...</br>";
if (!mysql_query($tscho_insert_logbook3,$con))
{
	die('Error: ' . mysql_error());
}

mysql_close($con);
?>