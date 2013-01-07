
var seapalTechnology = null;

function getServiceURL(service) {
	return "server/" + getTechnology() + "/" + service;
}

function setTechnology(technology) {
	$.cookie('seapal_technology', technology, { path: '/' });
}

function getTechnology() {
	if (seapalTechnology == null) {
		seapalTechnology = $.cookie('seapal_technology');	
		if (seapalTechnology == null) {
			alert("No technology choosen! (technology cookie)");
		}
	}
	return seapalTechnology;
}
