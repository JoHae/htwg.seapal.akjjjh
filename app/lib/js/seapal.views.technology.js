
var seapalTechnologyCache = null;
var seapalServiceURLsDataCache = null;

var seapalPlayServer = "localhost:9000/";

function getServiceURL(service, parameterName, parameterValue) {
	return prepareServiceURL(service, getTechnology(), parameterName, parameterValue);
}

function getServiceURL(service) {
	return prepareServiceURL(service, getTechnology(), null, null);
}


function setTechnology(technology) {
	$.cookie('seapal_technology', technology, { path: '/' });
}

function getTechnology() {
	if (seapalTechnologyCache == null) {
		seapalTechnologyCache = $.cookie('seapal_technology');
		if (seapalTechnologyCache == null) {
			alert("No technology choosen! (technology cookie)");
		}
	}
	return seapalTechnologyCache;
}

function getServiceURLsData() {
	return {
		"logbooks_get" : 
			{ 
				"php" : "server/php/logbooks_get.php",
				"play" : "logbooks/get",
				"jsp" : ""
			},
		"logbook_edit" : 
			{ 
				"php" : "server/php/logbook_edit.php",
				"play" : "logbooks/edit",
				"jsp" : ""
			},
		"logbook_delete" : 
			{ 
				"php" : "server/php/logbook_delete.php",
				"play" : "logbooks/delete",
				"jsp" : ""
			}
	};
}

function prepareServiceURL(serviceName, technology, parameterName, parameterValue) {
	if (seapalServiceURLsDataCache == null) {
		seapalServiceURLsDataCache = getServiceURLsData();
	}
	
	// get the service url part
	var tServURL = seapalServiceURLsDataCache[serviceName][technology];
	
	// technology specific
	if (technology === "php") {
		if (parameterName != null) {
			tServURL += "?" + parameterName + "=" + parameterValue;
		}
	} else if (technology === "play") {
		tServURL = seapalPlayServer + tServURL;
		if (parameterName != null) {
			tServURL += "/" + parameterName + "/" + parameterValue;
		}
	}
	
	return tServURL;
}
