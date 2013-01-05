/**
 * 
 */

function getWaypointTestData() {
	return {
		"tripID" : "1",
		"waypointID" : "NULL",
		"position" : "(47.66, 9.00)"
	};
}

function getWaypointMinimalData() {
	return {
		"tripID" : "0",
		"waypointID" : "NULL",
		"position" : "(47.66, 9.00)"
	};
}

function getWaypointNewData(tripID, position) {
	return {
		"tripID" : tripID,
		"waypointID" : "NULL",
		"position" : position
	};
}