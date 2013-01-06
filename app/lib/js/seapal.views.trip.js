var map;
var actualCrosshairPosition;
var standardMarkerArray = new Array();
var routeMarkerArray = new Array();
var route;
var distanceMarkerArray = new Array();
var distanceRoute;
var infowindow;

var shipPositionArray = new Array();
var shipMarker;
var shipRoute;

var actualCrosshairMarker;
var selectedMarker;
var selectedWaypointData;
var selectedWaypointDataBinded;

var realRouteMarkerArray = new Array();
var realRoute;

var tripID;

$(function() {
	tripID = $.urlParam('tripId');
	
	$.views.allowCode = true;
				
	// Compile templates
	$.templates({
		waypointDetailsEditTemplate : "#seapal-waypoint-details-edit-template",
		waypointDetailsTemplate : "#seapal-waypoint-details-template"
	});
	
	var mapTypeIds = ["roadmap", "satellite", "OSM"];
	var mapOptions = {
		center : new google.maps.LatLng(47.66, 9.16),
		zoom : 14,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		mapTypeControlOptions : {
			mapTypeIds : mapTypeIds
		}
	};
	map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
	
	// Load and Draw Waypoints
	ajaxGet('server/php/waypoints_get.php?tripId=' + tripID, function(data) {
		var length = data.length;
		for (var i = 0; i < length; i++) {
			var new_position = convertPositionToObject(data[i].position);
			data[i].position = new_position;
			addNewShipPositionMarker(data[i]);
		}
	});	

	// -------- Open Sea Map --------
	addSeamap();

	// -------- Center Coordinates shown on the Left Top Overlay --------
	var myControl = document.getElementById('coordsDiv');
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(myControl);
	updateCoords();

	// -------- MAP EVENT HANDLING --------
	google.maps.event.addListener(map, 'click', function(event) {
		actualCrosshairPosition = event.latLng;
		if (distanceMarkerArray.length == 1) {
			deleteCrosshairMarker();
			distanceMarkerArray[1] = addNewDistanceMarker();
			updateDistancePolylines();
			map.setOptions({
				draggableCursor : ''
			});
			showDistanceLabel();
		} else {
			if (actualCrosshairMarker == null) {
				addNewCrosshairMarker(map, actualCrosshairPosition);
			} else {
				actualCrosshairMarker.setPosition(actualCrosshairPosition);
				actualCrosshairMarker.set("labelContent", getPostionString(actualCrosshairPosition));
			}
			setNewCrosshairMarkerMenu();
		}
	});

	google.maps.event.addListener(map, 'zoom_changed', function() {
		jQuery("#standardContext").hide();
		jQuery("#routeContext").hide();
		jQuery("#realRouteContext").hide();
		updateCoords();
		zoomChangeBoundsListener = google.maps.event.addListener(map, 'bounds_changed', function(event) {
			//here I have the correct zoom level
			setNewCrosshairMarkerMenu();
			google.maps.event.removeListener(zoomChangeBoundsListener);
		});

	});
	google.maps.event.addListener(map, 'center_changed', function() {
		jQuery("#standardContext").hide();
		jQuery("#routeContext").hide();
		jQuery("#realRouteContext").hide();
		updateCoords();
		zoomChangeBoundsListener = google.maps.event.addListener(map, 'bounds_changed', function(event) {
			//here I have the correct zoom level
			setNewCrosshairMarkerMenu();
			google.maps.event.removeListener(zoomChangeBoundsListener);
		});
	});

	// --------------------------------------------------------
	// -------- MENU EVENT HANDLING OF CROSSHAIRMARKER --------
	// --------------------------------------------------------
	// Set new standard marker
	$("#addStandardMarker").click(function() {
		var length = standardMarkerArray.length;
		standardMarkerArray[length] = addNewStandardMarker();
		deleteCrosshairMarker();
	});

	// Set new route marker
	$("#addRouteMarker").click(function() {
		var length = routeMarkerArray.length;
		routeMarkerArray[length] = addNewRouteMarker();
		updateRoutePolylines();
		deleteCrosshairMarker();
	});

	// Set new distance marker and start distance Mode
	$("#startDistanceModeCross").click(function() {
		if (distanceMarkerArray.length >= 2) {
			deleteDistanceMarker();
			updateDistancePolylines();
			map.setOptions({
				draggableCursor : ''
			});
		}
		deleteCrosshairMarker();
		map.setOptions({
			draggableCursor : 'crosshair'
		});
		distanceMarkerArray[0] = addNewDistanceMarker();
		updateDistancePolylines();
	});

	var interval;
	$("#startPositionTest").click(function() {
		deleteCrosshairMarker();
		var i = 0;
		interval = window.setInterval((function() {
			if (i == routeMarkerArray.length) {
				return;
			}
			var position = routeMarkerArray[i].getPosition();
			var lat = position.lat();
			var lng = position.lng();
			var randomnumber = Math.floor(Math.random() * 11);
			if (randomnumber >= 5) {
				lat += Math.random() * 0.005;
				lng += Math.random() * 0.005;
			} else {
				lat -= Math.random() * 0.005;
				lng -= Math.random() * 0.005;
			}
			sendPosition(tripID, new google.maps.LatLng(lat, lng));
			i++;
		}), 1000);
	});

	$("#endPositionTest").click(function() {
		deleteCrosshairMarker();
		window.clearInterval(interval);
		shipMarker.setMap(null);
		shipRoute.setMap(null);
		shipMarker = null;
		shipRoute = null;
		shipPositionArray = new Array();
	});

	// --------------------------------------------------------
	// -------- MENU EVENT HANDLING OF STANDARD MARKER --------
	// --------------------------------------------------------
	// Delete selected Standard marker
	$("#deleteStandardMarker").click(function() {
		standardMarkerArray.splice(standardMarkerArray.indexOf(selectedMarker), 1);
		if (distanceMarkerArray.indexOf(selectedMarker) != -1) {
			deleteDistanceMarker();
			updateDistancePolylines();
			endDistanceMode();
		}
		jQuery("#standardContext").hide();
		selectedMarker.setMap(null);
		selectedMarker = null;
	});

	// --------------------------------------------------------
	// -------- MENU EVENT HANDLING OF ROUTE MARKER -----------
	// --------------------------------------------------------
	// delete selected Route Marker
	$("#deleteRouteMarker").click(function() {
		routeMarkerArray.splice(routeMarkerArray.indexOf(selectedMarker), 1);
		if (distanceMarkerArray.indexOf(selectedMarker) != -1) {
			deleteDistanceMarker();
			updateDistancePolylines();
			endDistanceMode();
		}
		updateRoutePolylines();
		jQuery("#routeContext").hide();
		selectedMarker.setMap(null);
		selectedMarker = null;
	});

	// delete Route completly
	$("#deleteRoute").click(function() {
		var length = routeMarkerArray.length;
		for (var i = 0; i < length; i++) {
			if (distanceMarkerArray.indexOf(routeMarkerArray[i]) != -1) {
				deleteDistanceMarker();
				updateDistancePolylines();
				endDistanceMode();
			}
			routeMarkerArray[i].setMap(null);
		}
		routeMarkerArray = new Array();
		route.setMap(null);
		route = null;
		updateRoutePolylines();
		jQuery("#routeContext").hide();
		selectedMarker.setMap(null);
		selectedMarker = null;
	});

	// --------------------------------------------------------
	// -------- MENU EVENT HANDLING OF REAL ROUTE MARKER-------
	// --------------------------------------------------------
	$("#editDetails").click(function() {
		showEditDialog();
	});

	// --------------------------------------------------------
	// -------- MENU EVENT HANDLING OF DISTANCE MARKER --------
	// --------------------------------------------------------
	// delete selected Route Marker
	$(".endDistanceMode").click(function() {
		jQuery("#standardContext").hide();
		jQuery("#routeContext").hide();
		jQuery("#distanceContext").hide();
		jQuery("#realRouteContext").hide();
		deleteDistanceMarker();
		updateDistancePolylines();
		endDistanceMode();
		jQuery("#distanceContext").hide();
		infowindow.close();
	});

	$(".startDistanceMode").click(function() {
		jQuery("#standardContext").hide();
		jQuery("#routeContext").hide();
		jQuery("#distanceContext").hide();
		jQuery("#realRouteContext").hide();
		if (distanceMarkerArray.length >= 2) {
			deleteDistanceMarker();
			updateDistancePolylines();
			map.setOptions({
				draggableCursor : ''
			});
		}
		map.setOptions({
			draggableCursor : 'crosshair'
		});
		distanceMarkerArray[0] = selectedMarker;
		updateDistancePolylines();
	});
	// computeDistanceBetween(from:LatLng, to:LatLng, radius?:number) <<<<<< FOR DISTANCE
});