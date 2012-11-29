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
	var length = routeMarkerArray.length;
	routeMarkerArray[length] = addNewRouteMarker(position);
	updateRoutePolylines();
	deleteCrosshairMarker();
}

function sendPosition(position) {
	Server.send('message', position);
}

