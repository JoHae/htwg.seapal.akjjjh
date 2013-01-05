/**
 * 
 */

function getWaypointTestData() {
	return {
		"tripId" : "1",
		"waypointId" : "NULL",
		"position" : "(47.66, 9.00)"
	};
}

function getWaypointMinimalData() {
	return {
		"tripId" : "0",
		"waypointId" : "NULL",
		"position" : "(47.66, 9.00)"
	};
}

function getWaypointNewData(tripID, position) {
	return {
		"tripId" : tripID,
		"waypointId" : "NULL",
		"position" : position
	};
}

function getHeadsailTypesTestData() {
	return [
		{ 
			"headsailId" : "1",
			"headsailName" : "Genua1"
		},
		{ 
			"headsailId" : "2",
			"headsailName" : "Genua2"
		},
		{ 
			"headsailId" : "3",
			"headsailName" : "Genua3"
		},
		{ 
			"headsailId" : "4",
			"headsailName" : "Fock"
		},
		{ 
			"headsailId" : "5",
			"headsailName" : "Storm Fock"
		},
		{ 
			"headsailId" : "6",
			"headsailName" : "Blister"
		},
		{ 
			"headsailId" : "7",
			"headsailName" : "Spinaker"
		}		
	];
}

function getMainsailTypesTestData() {
	return [
		{ 
			"headsailId" : "1",
			"headsailName" : "Full"
		},
		{ 
			"headsailId" : "2",
			"headsailName" : "Ref1"
		},
		{ 
			"headsailId" : "3",
			"headsailName" : "Ref2"
		}
	];
}

function getManeuverTypesTestData() {
	return [
		{ 
			"headsailId" : "1",
			"headsailName" : "Tack"
		},
		{ 
			"headsailId" : "2",
			"headsailName" : "Jibe"
		},
		{ 
			"headsailId" : "3",
			"headsailName" : "Lay to"
		},
		{ 
			"headsailId" : "4",
			"headsailName" : "Set Sails"
		},
		{ 
			"headsailId" : "5",
			"headsailName" : "Change Sails"
		},
		{ 
			"headsailId" : "6",
			"headsailName" : "Sails Down"
		},
		{ 
			"headsailId" : "7",
			"headsailName" : "Ref"
		},
		{ 
			"headsailId" : "8",
			"headsailName" : "Anker Up"
		},
		{ 
			"headsailId" : "9",
			"headsailName" : "Anker Down"
		}	
	];
}

function getWaypointFullTestData() {
	return {
		"tripId" : "HTWG Konstanz",
		"waypointtitle" : "Vergin",
		"position" : "(47.66, 9.00)",
		"btm" : "asd",
		"dtm" : "asd",
		"cog" : "asd",
		"sog" : "asd",
		"maneuverId" : "0",
		"headsailId" : "0",
		"mainsailId" : "0",
		"dataId" : "1"
	};
}

function getWaypointFillInfoData() {
	return {
		"waypointtitle" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Wegpunkt"
		},
		"position" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Position"
		},
		"btm" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "BTM"
		},
		"dtm" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "DTM"
		},
		"cog" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "COG"
		},
		"sog" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "SOG"
		},
		"headsailtypes" : getHeadsailTypesTestData(),
		"mainsailtypes" : getMainsailTypesTestData(),
		"maneuvertypes" : getManeuverTypesTestData(),
		
	};
}