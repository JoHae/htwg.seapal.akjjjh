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
		alert("ok");
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