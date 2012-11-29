$(function() {
	updateChat('Connecting...');
	Server = new FancyWebSocket('ws://127.0.0.1:9300');

	// watch textarea for release of key press
	 $('#send-message-box').keyup(function(e) {	
	 					 
		  if (e.keyCode == 13) { //Enter is pressed
            var text = $(this).val();
			sendPosition(position);

			$(this).val('');
		}
	});

	//Let the user know we're connected
	Server.bind('open', function() {
		//updateChat( "Connected." );
	});

	//OH NO! Disconnection occurred.
	Server.bind('close', function( data ) {
		//updateChat( "Disconnected." );
	});

	//Log any messages sent from server
	Server.bind('position', function(position) {
		updatePosition(position);
	});

	Server.connect();
});


var Server;

function updatePosition(position) {
	addNewRouteMarker(position)
}

function sendPosition(position) {
	Server.send('position', position);
}

