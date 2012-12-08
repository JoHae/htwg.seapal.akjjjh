<!DOCTYPE html>
<!-- saved from url=(0030)http://www.seapal.de/index.php -->
<html xmlns="http://www.w3.org/1999/xhtml">
	<head profile="http://www.w3.org/2005/10/profile">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="keywords" content="sailing, app, navigation, sea map, boat, skipper">
		<meta name="description" content="SeaPal is a mobile app for sailors to do navigation, tracking and more.">

		<title>SeaPal</title>
		<link rel="icon" type="image/png" href="http://www.seapal.de/images/Icon-32.png" />
		<link href="../lib/css/styles.css" rel="stylesheet" type="text/css" media="screen" />
	</head>

	<body>
		<?php
		if ($_GET["tripID"] != 'NULL') {
			$con = (include '../../database/connect.php');
			$result = mysql_query("SELECT * FROM trip WHERE tripID=" . $_GET["tripID"]);
			$row = mysql_fetch_array($result);
			mysql_close($con);
		} else {
			$row = "";
		}
		?>
		<div id="main">
			<div id="form">
				<form action="insert_trip.php" method="post">
				<fieldset class="title fs80">
					<label for="triptitle">Trip-Titel</label>
					<input type="text" name="triptitle" size="50px" value="<?php if($row != "") echo $row["triptitle"] ?>" />
				</fieldset>
				<fieldset class="fs80">
					<label for="startpoint">Von</label>
					<input type="text" name="startpoint" value="<?php if($row != "") echo $row["startpoint"] ?>" />
					<br />
					<label for="destination">Nach</label>
					<input type="text" name="destination" value="<?php if($row != "") echo $row["destination"] ?>" />
					<br />
					<label for="skipper">Skipper</label>
					<input type="text" name="skipper" value="<?php if($row != "") echo $row["skipper"] ?>" />
				</fieldset>
				<fieldset class="fs80">
					<label for="crew">Crew</label>
					<textarea name="crew" cols="20" rows="5" value="<?php if($row != "") echo $row["crew"] ?>"></textarea>
				</fieldset>
				<fieldset class="fs80">
					<label for="start">Start</label>
					<input type="text" name="start" value="<?php if($row != "") echo $row["start"] ?>" />
					<br />
					<label for="end">Ende</label>
					<input type="text" name="end" value="<?php if($row != "") echo $row["end"] ?>" />
					<br />
					<label for="duration">Dauer</label>
<!-- 					add duration function -->
					<input type="text" name="duration" value="0000" />
				</fieldset>
				<fieldset class="fs95">
					<label for="motor">Motor (min)</label>
					<input type="text" name="motor" value="<?php if($row != "") echo $row["motor"] ?>" />
					<br />
					<label for="tank filled">Tank gef�llt</label>
					<input type="range" min="0" max="1" name="tank filled" value="<?php if($row != "") echo $row["tank filled"] ?>" />
				</fieldset>
					<input type="submit" />
					<input type="hidden" name="tripID" value="<?php echo $_GET["tripID"]; ?>">
					<input type="hidden" name="logbookID" value="<?php echo $_GET["logbookID"]; ?>">
				</form>
			</div>
		</div>
	</body>
</html>