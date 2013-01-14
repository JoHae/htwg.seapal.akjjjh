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
		"position" : "(47.66, 9.00)",
		"has_data": 1
	};
}

function getWaypointNewData(tripID, position) {
	return {
		"tripId" : tripID,
		"waypointId" : "NULL",
		"position" : position,
		"has_data": 1
	};
}

function getHeadsailTypesTestData() {
	return [
		{ 
			"typeId" : "1",
			"typename" : "-"
		},
		{ 
			"typeId" : "2",
			"typename" : "Genua1"
		},
		{ 
			"typeId" : "3",
			"typename" : "Genua2"
		},
		{ 
			"typeId" : "4",
			"typename" : "Genua3"
		},
		{ 
			"typeId" : "5",
			"typename" : "Fock"
		},
		{ 
			"typeId" : "6",
			"typename" : "Storm Fock"
		},
		{ 
			"typeId" : "7",
			"typename" : "Blister"
		},
		{ 
			"typeId" : "8",
			"typename" : "Spinaker"
		}		
	];
}

function getMainsailTypesTestData() {
	return [
		{ 
			"typeId" : "1",
			"typename" : "-"
		},
		{ 
			"typeId" : "2",
			"typename" : "Full"
		},
		{ 
			"typeId" : "3",
			"typename" : "Ref1"
		},
		{ 
			"typeId" : "4",
			"typename" : "Ref2"
		}
	];
}

function getManeuverTypesTestData() {
	return [
		{ 
			"typeId" : "1",
			"typename" : "-"
		},
		{ 
			"typeId" : "2",
			"typename" : "Tack"
		},
		{ 
			"typeId" : "3",
			"typename" : "Jibe"
		},
		{ 
			"typeId" : "4",
			"typename" : "Lay to"
		},
		{ 
			"typeId" : "5",
			"typename" : "Set Sails"
		},
		{ 
			"typeId" : "6",
			"typename" : "Change Sails"
		},
		{ 
			"typeId" : "7",
			"typename" : "Sails Down"
		},
		{ 
			"typeId" : "8",
			"typename" : "Ref"
		},
		{ 
			"typeId" : "9",
			"typename" : "Anker Up"
		},
		{ 
			"typeId" : "10",
			"typename" : "Anker Down"
		}	
	];
}

function getWaypointFullTestData() {
	return {
		"tripId" : "HTWG Konstanz",
		"waypointtitle" : "Vergin",
		"position" : "(47.66, 9.00)",
		"has_data": 1,
		"btm" : "asd",
		"dtm" : "asd",
		"cog" : "asd",
		"sog" : "asd",
		"maneuverId" : "0",
		"headsailId" : "0",
		"mainsailId" : "0",
		"dataId" : "1",
		"info" : getWaypointFullInfoData()
	};
}

function getWaypointFullInfoData() {
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
		"headsail" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Vorsegel"
		},
		"mainsail" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Großsegel"
		},
		"maneuver" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Mannöver"
		},
		"headsailtypes" : getHeadsailTypesTestData(),
		"mainsailtypes" : getMainsailTypesTestData(),
		"maneuvertypes" : getManeuverTypesTestData(),
		
	};
}

/**
 * 
 */
function getRoutepointTestData() {
	return {
		"tripId" : "1",
		"routepointId" : "NULL",
		"position" : "(47.66, 9.00)",
		"name" : "Routenpunkt1",
		"notes" : "Eine Notiz"
	};
}

function getRoutepointMinimalData() {
	return {
		"tripId" : "1",
		"routepointId" : "NULL",
		"position" : "(47.66, 9.00)",
		"name" : "",
		"notes" : ""
	};
}

function getRoutepointNewData(tripID, position) {
	return {
		"tripId" : tripID,
		"routepointId" : "NULL",
		"position" : position,
		"name" : "",
		"notes" : ""
	};
}


function getNavigationInfoTestData() {
	return {
		"shipname" : "Vergin",
		"logbookId" : "eeeeeeee",
		"triptitle" : "Vergin",
		"tripId" : "eeeeeeee",
	};
}