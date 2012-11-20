<?php
$con = mysql_connect("localhost", "root");
if (!$con) {
	die('Could not connect: ' . mysql_error());
}
$db_selected = mysql_select_db("seapal", $con);
if (!$db_selected) {
	echo "<div>Cannot access to database seapal.</div>";
	echo "<div>Please execute 'app/install/install.php' to create seapal database</div>";
	die('Cannot use seapal database : ' . mysql_error());
}
return $con
?>