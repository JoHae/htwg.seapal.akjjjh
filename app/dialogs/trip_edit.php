<div id="wrapper">
	<div id="main">
		<div id="trip_form">
			<form action="" method="get">
				<fieldset class="title fs80">
					<label for="triptitle">Trip-Titel</label>
					<input type="text" name="triptitle" size="50px" />
				</fieldset>
				<fieldset class="fs80">
					<label for="from">Von</label>
					<input type="text" name="startpoint" />
					<br />
					<label for="to">Nach</label>
					<input type="text" name="destination" />
					<br />
					<label for="skipper">Skipper</label>
					<input type="text" name="skipper" />
				</fieldset>
				<fieldset class="fs80">
					<label for="crew">Crew</label>
					<textarea name="crew" cols="20" rows="5"></textarea>
				</fieldset>
				<fieldset class="fs80">
					<label for="start">Start</label>
					<input type="text" name="start" />
					<br />
					<label for="end">Ende</label>
					<input type="text" name="end" />
					<br />
					<label for="duration">Dauer</label>
					<input type="text" name="duration" />
				</fieldset>
				<fieldset class="fs95">
					<label for="motor">Motor (min)</label>
					<input type="text" name="motor" />
					<br />
					<label for="tank filled">Tank gef�llt</label>
					<input type="range" min="0" max="1" name="tank filled" />
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