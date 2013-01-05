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
logbookID    int NOT NULL AUTO_INCREMENT,
PRIMARY KEY (logbookID),
shipname     varchar(30),
registnumber varchar(20),
sailsign     varchar(20),
homeport     varchar(15),
yachtclub    varchar(30),
owner        varchar(30),
insurance    varchar(15),
callsign     varchar(20),

type        varchar(15),
constructer varchar(30),
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
$create_trip_table = "CREATE TABLE trip
(
tripID    int NOT NULL AUTO_INCREMENT,
PRIMARY KEY (tripID),
logbookID int,
FOREIGN KEY (logbookID) REFERENCES logbook(logbookID),

triptitle   varchar(30),
destination varchar(20),
startpoint  varchar(20),
skipper     varchar(15),

crew     blob,
start    datetime,
end      datetime,

motor       varchar(15),
tank_filled bool,
notes       text
)";

# Table for Waypoints
$create_waypoint_table = "CREATE TABLE waypoint
(
waypointID int NOT NULL AUTO_INCREMENT,
PRIMARY KEY (waypointID),
tripID  int,
FOREIGN KEY (tripID) REFERENCES trip(tripID),

waypoint_name varchar(15),
position  varchar(50),

btm varchar(15),
dtm varchar(15),

cog varchar(15),
sog varchar(15),
maneuverID int,
headsailID int,
mainsailID int,
FOREIGN KEY (maneuverID) REFERENCES maneuvertype(maneuverID),
FOREIGN KEY (headsailID) REFERENCES headsailtype(headsailID),
FOREIGN KEY (mainsailID) REFERENCES mainsailtype(mainsailID)
)";

# Table for maneuver
$create_maneuver_table = "CREATE TABLE maneuvertype
(
maneuverID int NOT NULL AUTO_INCREMENT,
PRIMARY KEY (maneuverID),
name varchar(20)
)";

# Table for headsail
$create_headsail_table = "CREATE TABLE headsailtype
(
headsailID int NOT NULL AUTO_INCREMENT,
PRIMARY KEY (headsailID),
name varchar(20)
)";

# Table for mainsail
$create_mainsail_table = "CREATE TABLE mainsailtype
(
mainsailID int NOT NULL AUTO_INCREMENT,
PRIMARY KEY (mainsailID),
name varchar(20)
)";

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

# Execute query
mysql_select_db("seapal", $con);

echo "Creating Table for headsail...</br>";
if (!mysql_query($create_headsail_table,$con))
{
	die('Error: ' . mysql_error());
}

echo "Creating Table for mainsail...</br>";
if (!mysql_query($create_mainsail_table,$con))
{
	die('Error: ' . mysql_error());
}

echo "Creating Table for maneuver...</br>";
if (!mysql_query($create_maneuver_table,$con))
{
	die('Error: ' . mysql_error());
}

echo "Creating Table for logbooks...</br>";
if (!mysql_query($create_logbook_table,$con))
{
	die('Error: ' . mysql_error());
}

echo "Creating Table for trip...</br>";
if (!mysql_query($create_trip_table,$con))
{
	die('Error: ' . mysql_error());
}

echo "Creating Table for waypoints...</br>";
if (!mysql_query($create_waypoint_table,$con))
{
	die('Error: ' . mysql_error());
}

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
mysql_close($con);
?>
