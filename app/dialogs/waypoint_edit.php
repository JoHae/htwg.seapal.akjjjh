<div id="wrapper">
	<div id="main">
		<div id="trip_form">
			<form action="" method="get">
				<fieldset class="title">
					<label for="waypoint_name">Name</label>
					<input type="text" name="waypoint_name" size="50px" />
				</fieldset>
				<fieldset>
					<label for="degree_north">Position</label>
					<input type="number" name="degree_north" />
					�
					<input type="number" name="minutes_north" />
					'
					<input type="number" name="seconds_north" />
					" N &nbsp;&nbsp;&nbsp;
					<input type="number" name="degree_east" />
					�
					<input type="number" name="minutes_east" />
					'
					<input type="number" name="seconds_east" />
					" E
					<br />
					<br />
					<label for="btm">BTM</label>
					<input type="text" name="btm" size="5px" />
					� &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="dtm">DTM</label>
					<input type="text" name="dtm" size="5px" />
					nm
				</fieldset>
				<fieldset>
					<label for="cog">COG</label>
					<input type="text" name="cog" size="5px" />
					� &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="sog">SOG</label>
					<input type="text" name="sog" size="5px" />
					kn	at ...
					<br />
					<br />
					<label for="destination">Fahrt nach</label>
					<select name="destination">
						<option>Fahrt nach ? Was ist das ?</option>
					</select>
				</fieldset>
				<fieldset>
					<label for="manoever">Man�ver</label>
					<select name="maneuver">
						<option>-</option>
						<option>Tack</option>
						<option>Jibe</option>
						<option>Lay to</option>
						<option>Set Sails</option>
						<option>Change Sails</option>
						<option>Sails Down</option>
						<option>Ref</option>
						<option>Anker Up</option>
						<option>Anker Down</option>
					</select>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label for="vorsegel">Vorsegel</label>
					<select name="vorsegel">
						<option>-</option>
						<option>Genua1</option>
						<option>Genua2</option>
						<option>Genua3</option>
						<option>Fock</option>
						<option>Storm Fock</option>
						<option>Blister</option>
						<option>Spinaker</option>
					</select>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label for="grosssegel">Gro�segel</label>
					<select name="grosssegel">
						<option>-</option>
						<option>Full</option>
						<option>Ref1</option>
						<option>Ref2</option>
					</select>
				</fieldset>
			</form>
		</div>
		<div id="middle">
			<div id="notes">
				<h2>Notes</h2>
				<textarea name="notes" rows="20" cols="45"></textarea>
			</div>
			<div id="pics">
				<h2>Photos</h2>
				<img src="../img/nophoto.jpg" />
			</div>
		</div>
	</div>
</div>