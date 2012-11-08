<div id="main">
	<div id="form">
		<form action="insert_logbook.php" method="post">
			<fieldset class="fs95">
				<label for="shipname">Bootsname</label>
				<input type="text" name="shipname" />
				<br />
				<label for="registnumber">Registernr.</label>
				<input type="text" name="registnumber" />
				<br />
				<label for="sailsign">Segelzeichen</label>
				<input type="text" name="sailsign" />
				<br />
				<label for="homeport">Heimathafen</label>
				<input type="text" name="homeport" />
				<br />
				<label for="yachtclub">Yachtclub</label>
				<input type="text" name="yachtclub" />
				<br />
				<label for="owner">Eigner</label>
				<input type="text" name="owner" />
				<br />
				<label for="insurance">Versicherung</label>
				<input type="text" name="insurance" />
				<br />
				<label for="callsign">Rufzeichen</label>
				<input type="text" name="callsign" />
			</fieldset>
			<fieldset class="fs95">
				<label for="type">Typ</label>
				<input type="text" name="type" />
				<br />
				<label for="constructer">Konstrukteur</label>
				<input type="text" name="constructer" />
				<br />
				<label for="length">L�nge</label>
				<input type="text" name="length" />
				<br />
				<label for="width">Breite</label>
				<input type="text" name="width" />
				<br />
				<label for="gauge">Tiefgang</label>
				<input type="text" name="gauge" />
				<br />
				<label for="mastheight">Masth�he</label>
				<input type="text" name="mastheight" />
				<br />
				<label for="expulsion">Verdr�ngung</label>
				<input type="text" name="expulsion" />
				<br />
				<label for="rigtype">Rig-Art</label>
				<input type="text" name="rigtype" />
			</fieldset>
			<fieldset class="fs140">
				<label for="constructionyear">Baujahr</label>
				<input type="text" name="constructionyear" />
				<br />
				<label for="engine">Motor</label>
				<input type="text" name="engine" />
				<br />
				<label for="size_fueltank">Tankgr��e</label>
				<input type="text" name="size_fueltank" />
				<br />
				<label for="size_watertank">Wassertankgr��e</label>
				<input type="text" name="size_watertank" />
				<br />
				<label for="size_sewagetank">Abwassertankgr��e</label>
				<input type="text" name="size_sewagetank" />
				<br />
				<label for="size_mainsail">Gro�segelgr��e</label>
				<input type="text" name="size_mainsail" />
				<br />
				<label for="size_genua">Genuagr��e</label>
				<input type="text" name="size_genua" />
				<br />
				<label for="size_spi">Spi size Spigr��e</label>
				<input type="text" name="size_spi" />
			</fieldset>
			<input type="submit" />
			<input type="hidden" name="logbookID" value="<?php echo $_GET["logbookID"]; ?>">
		</form>
	</div>
</div>
