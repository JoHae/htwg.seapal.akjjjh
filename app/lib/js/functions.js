function checkNorth() {
	north = document.getElementById("position_north").value;
	if (north.match(/([0-8]?[0-9]|90)[°]?([0-5]?[0-9])?[.]?([0-9]?[0-9])?[']?/)) {
		north = north.search(/([0-8][0-9]|90)[°]([0-5][0-9])[.]([0-9]?[0-9])[']/);
	}
	
	else {
		alert("Bitte gültige North-Position eingeben");
	}
}

function checkEast() {
	
}
