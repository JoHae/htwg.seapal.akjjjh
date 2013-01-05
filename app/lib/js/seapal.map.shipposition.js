$(function() {
	Server = new FancyWebSocket('ws://127.0.0.1:9300');

	//Let the user know we're connected
	Server.bind('open', function() {
		//updateChat( "Connected." );
	});

	//OH NO! Disconnection occurred.
	Server.bind('close', function(data) {
		//updateChat( "Disconnected." );
	});

	//Log any messages sent from server
	Server.bind('message', function(data) {
		updatePosition($.evalJSON(data));
	});

	Server.connect();
});

var Server;

function updatePosition(dataObject) {
	// position is "(lat, lng)"
	
	var position = dataObject.position;
	var latlngStr = position.substring(1, position.length-1);
	latlngStr = latlngStr.split(",", 2);
	var lat = parseFloat(latlngStr[0]);
	var lng = parseFloat(latlngStr[1]);
	var new_position = new google.maps.LatLng(lat, lng);
	var length = shipPositionArray.length;	dataObject.position = new_position;
	addNewShipPositionMarker(dataObject);
	map.setCenter(new_position);
}

function sendPosition(tripID, position) {
	var position = position.toString();
	var data = getWaypointNewData(tripID, position);
	var jdata = $.toJSON(data);
	
	Server.send('message', jdata);
}
