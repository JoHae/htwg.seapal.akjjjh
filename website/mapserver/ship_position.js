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
	Server.bind('message', function(position) {
		updatePosition(position);
	});

	Server.connect();
});

var Server;

function updatePosition(position) {
	// position is "(lat, lng)"
	var latlngStr = position.substring(1, position.length-1);
	latlngStr = latlngStr.split(",", 2);
	var lat = parseFloat(latlngStr[0]);
	var lng = parseFloat(latlngStr[1]);
	var new_position = new google.maps.LatLng(lat, lng);
	var length = routeMarkerArray.length;
	routeMarkerArray[length] = addNewRouteMarker(new_position);
	updateRoutePolylines();
}

function sendPosition(position) {
	Server.send('message', position);
}
