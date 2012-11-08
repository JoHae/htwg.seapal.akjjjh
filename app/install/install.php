<?php
$con = mysql_connect("localhost", "root");
if (!$con) {
	die('Could not connect: ' . mysql_error());
}

# Delete database is it exists
if (mysql_query("DROP DATABASE IF EXISTS seapal", $con)) {
	echo "Database dropped</br>";
} else {
	echo "Error creating database: " . mysql_error();
}

# Create new database
if (mysql_query("CREATE DATABASE seapal", $con)) {
	echo "Database created</br>";
} else {
	echo "Error creating database: " . mysql_error();
}

# Table for log_book
$create_logbook_table = "CREATE TABLE logbook
(
shipID       int NOT NULL AUTO_INCREMENT,
PRIMARY KEY(shipID),
shipname     varchar(15),
registnumber varchar(20),
sailsign     varchar(20),
homeport     varchar(15),
yachtclub    varchar(15),
owner        varchar(30),
insurance    varchar(15),
callsign     varchar(20),

type        varchar(15),
constructer varchar(15),
length      varchar(15),
width       double,
gauge       double,
mastheight  double,
expulsion   double,
rigtype     varchar(15),

constructionyear int,
engine           varchar(15),
size_fueltank    int,
size_watertank   int,
size_sewagetank  int,
size_mainsail    int,
size_genua       int,
size_spi         int
)";

# Table for Trips
$create_tripinfo_table = "CREATE TABLE tripinfo
(
triptitle varchar(15),
from_     varchar(20),
to_       varchar(20),
skipper   varchar(15),

crew     blob,
start    varchar(30),
end      varchar(15),
duration varchar(20),

motor       varchar(15),
tank_filled bool,
notes       blob
)";

# Table for Waypoints
$create_waypoint_table = "CREATE TABLE waypoint
(
waypoint_name varchar(15),
degree_north  int,
minutes_north int,
seconds_north int,
degree_east   int,
minutes_east  int,
seconds_east  int,

btm varchar(15),
dtm varchar(15),

cog varchar(15),
sog varchar(15)
)";

# Execute query
mysql_select_db("seapal", $con);
echo "Creating Table for logbooks...</br>";
if (!mysql_query($create_logbook_table,$con))
{
	die('Error: ' . mysql_error());
}

echo "Creating Table for waypoints...</br>";
if (!mysql_query($create_waypoint_table,$con))
{
	die('Error: ' . mysql_error());
}

echo "Creating Table for tripinfo...</br>";
if (!mysql_query($create_tripinfo_table,$con))
{
	die('Error: ' . mysql_error());
}

mysql_close($con);
?>
