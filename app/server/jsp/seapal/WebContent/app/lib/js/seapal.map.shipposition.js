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
	
	var new_position = convertPositionToObject(dataObject.position);
	dataObject.position = new_position;
	dataObject.has_data = 0;
	addNewShipPositionMarker(dataObject);
	map.setCenter(new_position);
}

function sendPosition(tripID, position) {
	var position = position.toString();
	var data = getWaypointNewData(tripID, position);
	var jdata = $.toJSON(data);
	
	Server.send('message', jdata);
}
