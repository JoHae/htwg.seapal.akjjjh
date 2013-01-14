
var seapalTechnologyCache = null;
var seapalServiceURLsDataCache = null;

//var seapalPlayServer = "localhost:9000/";
var seapalPlayServer = "../../";

function getServiceURL(service, parameterName, parameterValue) {
	return prepareServiceURL(service, getTechnology(), parameterName, parameterValue);
}

/*function getServiceURL(service) {
	return prepareServiceURL(service, getTechnology(), null, null);
}*/


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
				"jsp" : "../LogbooksGet.jsp"
			},
		"logbook_edit" : 
			{ 
				"php" : "server/php/logbook_edit.php",
				"play" : "logbooks/edit",
				"jsp" : "../LogbooksEdit.jsp"
			},
		"logbook_delete" : 
			{ 
				"php" : "server/php/logbook_delete.php",
				"play" : "logbooks/delete",
				"jsp" : "../LogbooksDelete.jsp"
			},
			
			
		"trips_get" : 
			{ 
				"php" : "server/php/trips_get.php",
				"play" : "trips/get",
				"jsp" : ""
			},
		"trip_edit" : 
			{ 
				"php" : "server/php/trip_edit.php",
				"play" : "trips/edit",
				"jsp" : ""
			},
		"trip_delete" : 
			{ 
				"php" : "server/php/trip_delete.php",
				"play" : "trips/delete",
				"jsp" : ""
			},
		"trips_navigationinfo_get" : 
			{ 
				"php" : "server/php/trips_navigationinfo_get.php",
				"play" : "trips/getNavInfo",
				"jsp" : ""
			},
		
			
		"routepoints_get" : 
			{ 
				"php" : "server/php/routepoints_get.php",
				"play" : "routepoints/get",
				"jsp" : ""
			},
		"routepoint_edit" : 
			{ 
				"php" : "server/php/routepoint_edit.php",
				"play" : "routepoints/edit",
				"jsp" : ""
			},
		"routepoint_delete" : 
			{ 
				"php" : "server/php/routepoint_delete.php",
				"play" : "routepoints/delete",
				"jsp" : ""
			},
		"routepoint_delete_all" : 
			{ 
				"php" : "server/php/routepoint_delete_all.php",
				"play" : "routepoints/deleteForTrip",
				"jsp" : ""
			},
			
			
		"waypoints_get" : 
			{ 
				"php" : "server/php/waypoints_get.php",
				"play" : "waypoints/get",
				"jsp" : ""
			},
		"waypoint_edit" : 
			{ 
				"php" : "server/php/waypoint_edit.php",
				"play" : "waypoints/edit",
				"jsp" : ""
			},
		"waypoint_details_get" : 
			{ 
				"php" : "server/php/waypoint_details_get.php",
				"play" : "waypoints/getDetails",
				"jsp" : ""
			},
			
			
		"trip_navigationinfo_get" : 
			{ 
				"php" : "server/php/trip_navigationinfo_get.php",
				"play" : "trip/getNavInfo",
				"jsp" : ""
			}
	};
}

function prepareServiceURL(serviceName, technology, parameterName, parameterValue) {
	if (seapalServiceURLsDataCache == null) {
		seapalServiceURLsDataCache = getServiceURLsData();
	}
	
	// compatibility with old urls
	if (seapalServiceURLsDataCache[serviceName] == null) {
		alert("Aufruf nicht mehr unterstützt!!!")
		return "";
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
