function checkNorth() {
	north = document.getElementById("position_north").value;
	/*
	 * Tests:
	 * 0°12.23 -> ok
	 * 90° 59.59 -> ok
	 * 91° 34.56 -> ungültig
	 * 103° -> ungültig
	 *
	 */
	
	/*
	 * erste Zahl kann noch nicht aus einer einzigen Ziffer bestehen... Warum nicht??
	 */
	if (north.match(/^(([\d]|[0-8]?[\d]|90)([°]?|[\s]?|[°][\s])([0-5]?[\d])?([.]?|[\s]?)([0-5]?[\d])[']?)$/)) {
		north_regex = $[/^(([\d]|[0-8]?[\d]|90)([°]?|[\s]?|[°][\s])([0-5]?[\d])?([.]?|[\s]?)([0-5]?[\d])[']?)$/];
		alert("ok " + north_regex);
		document.getElementById("position_north").value = "ok";
		
	} else {
		alert("Bitte gültige North-Position eingeben");
	}
}

function checkEast() {
	east = document.getElementById("position_east").value;
	/*
	 * erste Zahl kann noch nicht aus einer einzigen Ziffer bestehen... Warum nicht??
	 */
	if (east.match(/^(([\d]|[01]?[0-8]?[\d]|180)([°]?|[\s]?|[°][\s])([0-5]?[\d])?([.]?|[\s]?)([0-5]?[\d])[']?)$/)) {
		alert("ok");
	} else {
		alert("Bitte gültige East-Position eingeben");
	}
}

function checkCOG() {
	cog = document.getElementById("cog").value;
	if (!cog.match(/^([0-2]?[\d]{1,2}.[\d]|[3][0-5][\d].[\d])$/)) {
		alert("Bitte gültigen COG-Wert eingeben! Format: ZZZ.Z von 0.0 bis 359.9");
	}
}

function checkSOG() {
	sog = document.getElementById("sog").value;
	if (!sog.match(/^([01]?[0-7]?[\d]{1,2}.[\d]|[1][8][0-5][1].[0-8])$/)) {
		alert("Bitte gültigen SOG-Wert eingeben! Format: ZZZZ.Z von 0.0 bis 1851.8");
	}
}