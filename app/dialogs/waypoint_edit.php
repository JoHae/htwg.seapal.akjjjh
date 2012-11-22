<!DOCTYPE html>
<!-- saved from url=(0030)http://www.seapal.de/index.php -->
<html xmlns="http://www.w3.org/1999/xhtml">
	<head profile="http://www.w3.org/2005/10/profile">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="keywords" content="sailing, app, navigation, sea map, boat, skipper">
		<meta name="description" content="SeaPal is a mobile app for sailors to do navigation, tracking and more.">

		<title>SeaPal</title>
		<link rel="icon" type="image/png" href="http://www.seapal.de/images/Icon-32.png" />
		<link href="lib/css/styles.css" rel="stylesheet" type="text/css" media="screen" />
	</head>

	<body>
		<?php
		if ($_GET["waypointID"] != 'NULL') {
			$con = (
			include '../database/connect.php');
			$result = mysql_query("SELECT * FROM waypoint WHERE waypointID=" . $_GET["waypointID"]);
			$row = mysql_fetch_array($result);
			mysql_close($con);
		} else {
			$row = "";
		}
		?>
		<div id="wrapper">
			<div id="main">
				<div id="trip_form">
					<form action="insert_waypoint.php" method="post">
						<fieldset class="title">
							<label for="waypoint_name">Name</label>
							<input type="text" name="waypoint_name" size="50px" value="<?php if($row != "") echo $row["waypoint_name"] ?>" />
						</fieldset>
						<fieldset>
							<label for="degree_north">Position</label>
							<input id="position" type="text" name="position" />
							<br />
							<br />
							<label for="btm">BTM</label>
							<input type="text" name="btm" size="5px" value="<?php if($row != "") echo $row["btm"] ?>" />
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="dtm">DTM</label>
							<input type="text" name="dtm" size="5px" value="<?php if($row != "") echo $row["dtm"] ?>" />
						</fieldset>
						<fieldset>
							<label for="cog">COG</label>
							<input id="cog" type="text" name="cog" size="5px" value="<?php if($row != "") echo $row["cog"] ?>" />
							°&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<label for="sog">SOG</label>
							<input id="sog" type="text" name="sog" size="5px" value="<?php if($row != "") echo $row["sog"] ?>" />
							kn	at <span id="timestamp">(timestamp)</timestamp></span>
							<br />
							<br />
							<label for="destination">Fahrt nach</label>
							<select name="destination">
								<option>Fahrt nach ? Was ist das ?</option>
							</select>
						</fieldset>
				</div>
				<div id="middle">
					<div id="notes">
						<h2>Notes</h2>
						<textarea name="notes" rows="20" cols="45"></textarea>
					</div>
					<div id="pics">
						<h2>Photos</h2>
						<img src="lib/img/nophoto.jpg" />
					</div>
				</div>
				<input type="submit" />
				<input type="hidden" name="waypointID" value="<?php echo $_GET["waypointID"]; ?>">
				<input type="hidden" name="tripID" value="<?php echo $_GET["tripID"]; ?>">
			</div>
		</div>
		</form>
	</body>
</html>