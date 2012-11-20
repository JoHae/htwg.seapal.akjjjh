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
		if ($_GET["logbookID"] != 'NULL') {
			$con = (include '../database/connect.php');
			$result = mysql_query("SELECT * FROM logbook WHERE logbookID=" . $_GET["logbookID"]);
			$row = mysql_fetch_array($result);
			mysql_close($con);
		} else {
			$row = "";
		}
		?>
		<div id="main">
			<div id="form">
				<form action="insert_logbook.php" method="post">
					<fieldset class="fs95">
						<label for="shipname">Bootsname</label>
						<input type="text" name="shipname" value="<?php if($row != "") echo $row["shipname"] ?>"/>
						<br />
						<label for="registnumber">Registernr.</label>
						<input type="text" name="registnumber" value="<?php if($row != "") echo $row["registnumber"] ?>"/>
						<br />
						<label for="sailsign">Segelzeichen</label>
						<input type="text" name="sailsign" value="<?php if($row != "") echo $row["sailsign"] ?>"/>
						<br />
						<label for="homeport">Heimathafen</label>
						<input type="text" name="homeport" value="<?php if($row != "") echo $row["homeport"] ?>"/>
						<br />
						<label for="yachtclub">Yachtclub</label>
						<input type="text" name="yachtclub" value="<?php if($row != "") echo $row["yachtclub"] ?>"/>
						<br />
						<label for="owner">Eigner</label>
						<input type="text" name="owner" value="<?php if($row != "") echo $row["owner"] ?>"/>
						<br />
						<label for="insurance">Versicherung</label>
						<input type="text" name="insurance" value="<?php if($row != "") echo $row["insurance"] ?>"/>
						<br />
						<label for="callsign">Rufzeichen</label>
						<input type="text" name="callsign" value="<?php if($row != "") echo $row["callsign"] ?>"/>
					</fieldset>
					<fieldset class="fs95">
						<label for="type">Typ</label>
						<input type="text" name="type" value="<?php if($row != "") echo $row["type"] ?>"/>
						<br />
						<label for="constructer">Konstrukteur</label>
						<input type="text" name="constructer" value="<?php if($row != "") echo $row["constructer"] ?>"/>
						<br />
						<label for="length">L�nge</label>
						<input type="text" name="length" value="<?php if($row != "") echo $row["length"] ?>"/>
						<br />
						<label for="width">Breite</label>
						<input type="text" name="width" value="<?php if($row != "") echo $row["width"] ?>"/>
						<br />
						<label for="gauge">Tiefgang</label>
						<input type="text" name="gauge" value="<?php if($row != "") echo $row["gauge"] ?>"/>
						<br />
						<label for="mastheight">Masth�he</label>
						<input type="text" name="mastheight" value="<?php if($row != "") echo $row["mastheight"] ?>"/>
						<br />
						<label for="expulsion">Verdr�ngung</label>
						<input type="text" name="expulsion" value="<?php if($row != "") echo $row["expulsion"] ?>"/>
						<br />
						<label for="rigtype">Rig-Art</label>
						<input type="text" name="rigtype" value="<?php if($row != "") echo $row["rigtype"] ?>"/>
					</fieldset>
					<fieldset class="fs140">
						<label for="constructionyear">Baujahr</label>
						<input type="text" name="constructionyear" value="<?php if($row != "") echo $row["constructionyear"] ?>"/>
						<br />
						<label for="engine">Motor</label>
						<input type="text" name="engine" value="<?php if($row != "") echo $row["engine"] ?>"/>
						<br />
						<label for="size_fueltank">Tankgr��e</label>
						<input type="text" name="size_fueltank" value="<?php if($row != "") echo $row["size_fueltank"] ?>"/>
						<br />
						<label for="size_watertank">Wassertankgr��e</label>
						<input type="text" name="size_watertank" value="<?php if($row != "") echo $row["size_watertank"] ?>"/>
						<br />
						<label for="size_sewagetank">Abwassertankgr��e</label>
						<input type="text" name="size_sewagetank" value="<?php if($row != "") echo $row["size_sewagetank"] ?>"/>
						<br />
						<label for="size_mainsail">Gro�segelgr��e</label>
						<input type="text" name="size_mainsail" value="<?php if($row != "") echo $row["size_mainsail"] ?>"/>
						<br />
						<label for="size_genua">Genuagr��e</label>
						<input type="text" name="size_genua" value="<?php if($row != "") echo $row["size_genua"] ?>"/>
						<br />
						<label for="size_spi">Spi size Spigr��e</label>
						<input type="text" name="size_spi" value="<?php if($row != "") echo $row["size_spi"] ?>"/>
					</fieldset>
					<input type="submit" />
					<input type="hidden" name="logbookID" value="<?php echo $_GET["logbookID"]; ?>">
				</form>
			</div>
		</div>
	</body>
</html>