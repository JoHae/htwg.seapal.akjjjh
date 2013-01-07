
var seapalTechnologyURL = null;

function getServiceURL(service) {
	if (seapalTechnologyURL == null) {
		seapalTechnologyURL = "server/" + getTechnology() + "/" + service;
	}
	return seapalTechnologyURL;
}

function setTechnology(technology) {
	$.cookie('seapal_technology', technology, { path: '/' });
}

function getTechnology() {
	var tTechnology = $.cookie('seapal_technology');
	if (tTechnology == null) {
		alert("No technology choosen! (technology cookie)");
	}
	return tTechnology;
}
