<?php
$con = mysql_connect("localhost", "root");
if (!$con) {
	die('Could not connect: ' . mysql_error());
}

mysql_select_db("seapal", $con);

$result = mysql_query("SELECT * FROM logbook");

while ($row = mysql_fetch_array($result)) {
	echo "<div>";
	echo $row['shipname'] . " " . $row['homeport'];
	echo "<div />";
}

mysql_close($con);
?>