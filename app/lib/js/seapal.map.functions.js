function extround(x, n) {
	var a = Math.pow(10, n);
	return (Math.round(x * a) / a);
}

function meterToNauticalMile(meter) {
	var oneMeterInNM = 0.000539956803;
	return (meter * oneMeterInNM);
}

function convertPositionToObject(positionString) {
	var latlngStr = positionString.substring(1, positionString.length - 1);
	latlngStr = latlngStr.split(",", 2);
	var lat = parseFloat(latlngStr[0]);
	var lng = parseFloat(latlngStr[1]);
	var new_position = new google.maps.LatLng(lat, lng);
	return new_position;
}

function addSeamap() {
	map.mapTypes.set("OSM", new google.maps.ImageMapType({
		getTileUrl : function(coord, zoom) {
			return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
		},
		tileSize : new google.maps.Size(256, 256),
		name : "OpenStreetMap",
		maxZoom : 18
	}));
	map.overlayMapTypes.push(new google.maps.ImageMapType({
		getTileUrl : function(coord, zoom) {
			return "http://tiles.openseamap.org/seamark/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
		},
		tileSize : new google.maps.Size(256, 256),
		name : "OpenSeaMap",
		maxZoom : 18
	}));
}

function updateCoords() {
	document.getElementById("lat").firstChild.nodeValue = extround(map.getCenter().lat(), 5);
	document.getElementById("long").firstChild.nodeValue = extround(map.getCenter().lng(), 5);
	document.getElementById("coordinations").firstChild.nodeValue = getPostionString(map.getCenter());
}

function getPostionString(position) {
	var ddLat = position.lat();
	var ddLatS = ddLat.toString();
	var ddLong = position.lng();
	var ddLongS = ddLong.toString();

	var signLat = 1;
	var signLong = 1;
	if (ddLat < 0)
		signLat = -1;
	if (ddLong < 0)
		signLong = -1;

	var ddLatVals = ddLatS.split(".");
	var LatVorkomma = ddLatVals[0];
	var LatMinutes = (Math.round(((ddLat - ddLatVals[0]) * 60 * 100)) / 100) * signLat;

	var ddLongVals = ddLongS.split(".");
	var LongVorkomma = ddLongVals[0];
	var LongMinutes = (Math.round(((ddLong - ddLongVals[0]) * 60 * 100)) / 100) * signLong;

	return LatVorkomma + "°" + LatMinutes + "'N " + LongVorkomma + "°" + LongMinutes + "'E";
}

function getDistanceRoute(marker_end) {
	if (marker_end === routeMarkerArray[0]) {
		return 0;
	}
	var distance = 0;

	for (var i = 1; i < routeMarkerArray.length; i++) {
		distance = distance + google.maps.geometry.spherical.computeDistanceBetween(routeMarkerArray[i - 1].getPosition(), routeMarkerArray[i].getPosition());
		if (marker_end === routeMarkerArray[i]) {
			return extround(meterToNauticalMile(distance), 3);
		}
	}
}

function getDistanceRealRoute(marker_end) {
	if (marker_end === realRouteMarkerArray[0]) {
		return 0;
	}
	var distance = 0;

	for (var i = 1; i < realRouteMarkerArray.length; i++) {
		distance = distance + google.maps.geometry.spherical.computeDistanceBetween(realRouteMarkerArray[i - 1].getPosition(), realRouteMarkerArray[i].getPosition());
		if (marker_end === realRouteMarkerArray[i]) {
			return extround(meterToNauticalMile(distance), 3);
		}
	}
}

function getDistanceDistance(marker_end) {
	if (marker_end === distanceMarkerArray[0]) {
		return 0;
	}
	var distance = google.maps.geometry.spherical.computeDistanceBetween(distanceMarkerArray[0].getPosition(), distanceMarkerArray[1].getPosition());
	return extround(meterToNauticalMile(distance), 3);
}

function getMenuPoint(map, marker) {
	if (marker == null) {
		return null;
	}
	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
	var scale = Math.pow(2, map.getZoom());

	var worldPoint = map.getProjection().fromLatLngToPoint(marker.getPosition());
	return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}

function addNewCrosshairMarker() {
	var image = new google.maps.MarkerImage('./lib/img/crosshair50.png',
	// This marker is 20 pixels wide by 32 pixels tall.
	new google.maps.Size(50, 50),
	// The origin for this image is 0,0.
	new google.maps.Point(0, 0),
	// The anchor for this image is the base of the flagpole at 0,32.
	new google.maps.Point(24, 25));

	var markerOptions = {
		position : actualCrosshairPosition,
		map : map,
		draggable : true,
		icon : image,
		raiseOnDrag : false
	}
	actualCrosshairMarker = new google.maps.Marker(markerOptions);
	jQuery("#standardContext").hide();
	jQuery("#routeContext").hide();
	jQuery("#realRouteContext").hide();
	google.maps.event.addListener(actualCrosshairMarker, 'drag', function() {
		setNewCrosshairMarkerMenu(map);
		actualCrosshairPosition = actualCrosshairMarker.getPosition();
	});

	google.maps.event.addListener(actualCrosshairMarker, 'dragend', function() {
		setNewCrosshairMarkerMenu(map);
		actualCrosshairPosition = actualCrosshairMarker.getPosition();
	});
}

function setNewCrosshairMarkerMenu() {
	var point = getMenuPoint(map, actualCrosshairMarker);

	setPositionTestMenu();
	document.getElementById("crosshairPosition").firstChild.nodeValue = getPostionString(actualCrosshairPosition);
	document.getElementById("crosshairContext").style.cursor = "default";

	jQuery("#crosshairContext").css({
		left : (jQuery("#mapCanvas").position().left + point.x),
		top : (jQuery("#mapCanvas").position().top + (point.y + 25))
	});
	jQuery("#crosshairContext").show();

	jQuery('#closecrosshairContext').click(function(e) {
		e.preventDefault();
		jQuery("#crosshairContext").hide();
		actualCrosshairMarker.setVisible(false);
		actualCrosshairMarker = null;
	});
}

function deleteCrosshairMarker() {
	if (actualCrosshairMarker != null) {
		jQuery("#crosshairContext").hide();
		actualCrosshairMarker.setMap(null);
		actualCrosshairMarker = null;
	}
}

function addNewStandardMarker() {
	var markerOptions = {
		position : actualCrosshairPosition,
		map : map,
		draggable : true,
		icon : "",
		labelContent : "",
		labelAnchor : new google.maps.Point(0, -10),
		labelClass : "", // the CSS class for the label
		labelStyle : {
			opacity : 0.9
		}
	}
	var marker = new MarkerWithLabel(markerOptions);
	var mouseOver = false;

	google.maps.event.addListener(marker, "mouseover", function(e) {
		marker.set("labelClass", "markerLabel");
		marker.set("labelContent", getPostionString(marker.getPosition()));
		mouseOver = true;
	});

	google.maps.event.addListener(marker, "mouseout", function(e) {
		marker.set("labelClass", "");
		marker.set("labelContent", "");
		mouseOver = false;
	});

	google.maps.event.addListener(marker, 'drag', function() {
		marker.set("labelClass", "markerLabel");
		marker.set("labelContent", getPostionString(marker.getPosition()));
		jQuery("#standardContext").hide();
		updateDistancePolylines();
	});

	google.maps.event.addListener(marker, 'dragend', function() {
		jQuery("#standardContext").hide();
		if (mouseOver) {
			marker.set("labelClass", "markerLabel");
			marker.set("labelContent", getPostionString(marker.getPosition()));
		} else {
			marker.set("labelClass", "");
			marker.set("labelContent", "");
		}
	});

	google.maps.event.addListener(marker, 'click', function(event) {
		deleteCrosshairMarker();
		jQuery("#routeContext").hide();
		jQuery("#realRouteContext").hide();
		selectedMarker = marker;
		if (distanceMarkerArray.length == 1) {
			distanceMarkerArray[1] = marker;
			updateDistancePolylines();
			map.setOptions({
				draggableCursor : ''
			});
			showDistanceLabel();
		} else {
			setNewStandardMarkerMenu(marker);
		}
	})

	return marker;
}

function setNewStandardMarkerMenu(marker) {
	var point = getMenuPoint(map, marker);

	document.getElementById("standardPosition").firstChild.nodeValue = getPostionString(marker.getPosition());
	document.getElementById("standardContext").style.cursor = "default";
	showEndDistanceMode(marker);

	jQuery("#standardContext").css({
		left : (jQuery("#mapCanvas").position().left + point.x),
		top : (jQuery("#mapCanvas").position().top + point.y)
	});
	jQuery("#standardContext").show();

	jQuery('#closestandardContext').click(function(e) {
		e.preventDefault();
		jQuery("#standardContext").hide();
	});
}

function addNewRouteMarker(position) {
	var image = new google.maps.MarkerImage('./lib/img/flag50.png',
	// This marker is 20 pixels wide by 32 pixels tall.
	new google.maps.Size(45, 50),
	// The origin for this image is 0,0.
	new google.maps.Point(0, 0),
	// The anchor for this image is the base of the flagpole at 0,32.
	new google.maps.Point(1, 50));

	anchorPoint = new google.maps.Point(0, 0);

	if (position == null) {
		position = actualCrosshairPosition;
	}

	var markerOptions = {
		position : position,
		map : map,
		draggable : true,
		icon : image,
		labelContent : "",
		labelAnchor : new google.maps.Point(0, -10),
		labelClass : "", // the CSS class for the label
		labelStyle : {
			opacity : 0.9
		}
	}
	var marker = new MarkerWithLabel(markerOptions);
	var mouseOver = false;

	google.maps.event.addListener(marker, "mouseover", function(e) {
		marker.set("labelClass", "markerLabel");
		marker.set("labelContent", getPostionString(marker.getPosition()));
		mouseOver = true;
	});

	google.maps.event.addListener(marker, "mouseout", function(e) {
		marker.set("labelClass", "");
		marker.set("labelContent", "");
		mouseOver = false;
	});

	google.maps.event.addListener(marker, 'drag', function() {
		marker.set("labelClass", "markerLabel");
		marker.set("labelContent", getPostionString(marker.getPosition()));
		jQuery("#routeContext").hide();
		updateRoutePolylines();
		updateDistancePolylines();
	});

	google.maps.event.addListener(marker, 'dragend', function() {
		if (mouseOver) {
			marker.set("labelClass", "markerLabel");
			marker.set("labelContent", getPostionString(marker.getPosition()));
		} else {
			marker.set("labelClass", "");
			marker.set("labelContent", "");
		}
		jQuery("#routeContext").hide();
		updateRoutePolylines();
	});

	google.maps.event.addListener(marker, 'click', function(event) {
		deleteCrosshairMarker();
		jQuery("#standardContext").hide();
		jQuery("#realRouteContext").hide();
		selectedMarker = marker;
		if (distanceMarkerArray.length == 1) {
			distanceMarkerArray[1] = marker;
			updateDistancePolylines();
			map.setOptions({
				draggableCursor : ''
			});
			showDistanceLabel();
		} else {
			setNewRouteMarkerMenu(marker);
		}
	})

	return marker;
}

function setNewRouteMarkerMenu(marker) {
	var point = getMenuPoint(map, marker);

	document.getElementById("routePosition").firstChild.nodeValue = getPostionString(marker.getPosition());
	document.getElementById("routeDistance").firstChild.nodeValue = getDistanceRoute(marker) + " sm";
	document.getElementById("routeContext").style.cursor = "default";

	showEndDistanceMode(marker);

	jQuery("#routeContext").css({
		left : (jQuery("#mapCanvas").position().left + point.x),
		top : (jQuery("#mapCanvas").position().top + point.y)
	});
	jQuery("#routeContext").show();

	jQuery('#closeRouteContext').click(function(e) {
		e.preventDefault();
		jQuery("#routeContext").hide();
	});
}

function updateRoutePolylines() {
	var routePoints = new Array();
	for (var i = 0; i < routeMarkerArray.length; i++) {
		routePoints[i] = routeMarkerArray[i].getPosition();
	}

	if (route != null) {
		route.setPath(routePoints);
	} else {
		route = new google.maps.Polyline({
			path : routePoints,
			strokeColor : "#FF0000",
			strokeOpacity : 1.0,
			strokeWeight : 2
		});
		route.setMap(map);
	}
}

function addNewDistanceMarker() {
	var image = new google.maps.MarkerImage('./lib/img/flag_yellow_50.png',
	// This marker is 20 pixels wide by 32 pixels tall.
	new google.maps.Size(45, 50),
	// The origin for this image is 0,0.
	new google.maps.Point(0, 0),
	// The anchor for this image is the base of the flagpole at 0,32.
	new google.maps.Point(1, 50));

	anchorPoint = new google.maps.Point(0, 0);

	var markerOptions = {
		position : actualCrosshairPosition,
		map : map,
		draggable : true,
		icon : image,
		labelContent : "",
		labelAnchor : new google.maps.Point(0, -10),
		labelClass : "", // the CSS class for the label
		labelStyle : {
			opacity : 0.9
		}
	}
	var marker = new MarkerWithLabel(markerOptions);
	var mouseOver = false;

	google.maps.event.addListener(marker, "mouseover", function(e) {
		marker.set("labelClass", "markerLabel");
		marker.set("labelContent", getPostionString(marker.getPosition()));
		mouseOver = true;
	});

	google.maps.event.addListener(marker, "mouseout", function(e) {
		marker.set("labelClass", "");
		marker.set("labelContent", "");
		mouseOver = false;
	});

	google.maps.event.addListener(marker, 'drag', function() {
		jQuery("#distanceContext").hide();
		marker.set("labelClass", "markerLabel");
		marker.set("labelContent", getPostionString(marker.getPosition()));
		updateDistancePolylines();
	});

	google.maps.event.addListener(marker, 'dragend', function() {
		if (mouseOver) {
			marker.set("labelClass", "markerLabel");
			marker.set("labelContent", getPostionString(marker.getPosition()));
		} else {
			marker.set("labelClass", "");
			marker.set("labelContent", "");
		}
		showDistanceLabel();
		// close infowindow
		updateDistancePolylines();
	});

	google.maps.event.addListener(marker, 'click', function(event) {
		deleteCrosshairMarker();
		jQuery("#standardContext").hide();
		jQuery("#routeContext").hide();
		jQuery("#realRouteContext").hide();
		selectedMarker = marker;
		setNewDistanceMarkerMenu(marker);
	})

	return marker;
}

function setNewDistanceMarkerMenu(marker) {
	var point = getMenuPoint(map, marker);

	document.getElementById("distancePosition").firstChild.nodeValue = getPostionString(marker.getPosition());
	document.getElementById("distanceDistance").firstChild.nodeValue = getDistanceDistance(marker) + " sm";
	jQuery(".endDistanceMode").parent().show();

	document.getElementById("distanceContext").style.cursor = "default";
	jQuery("#distanceContext").css({
		left : (jQuery("#mapCanvas").position().left + point.x),
		top : (jQuery("#mapCanvas").position().top + point.y)
	});
	jQuery("#distanceContext").show();

	jQuery('#closeDistanceContext').click(function(e) {
		e.preventDefault();
		jQuery("#distanceContext").hide();
	});
}

function showEndDistanceMode(marker) {
	if (distanceMarkerArray.length == 0) {
		jQuery(".endDistanceMode").parent().hide();
		return;
	}
	for (var i = 0; i < distanceMarkerArray.length; i++) {
		if (distanceMarkerArray[i] == marker) {
			jQuery(".endDistanceMode").parent().show();
			return;
		}
	}
	jQuery(".endDistanceMode").parent().hide();
}

function updateDistancePolylines() {
	var routePoints = new Array();
	for (var i = 0; i < distanceMarkerArray.length; i++) {
		routePoints[i] = distanceMarkerArray[i].getPosition();
	}

	if (distanceRoute != null) {
		distanceRoute.setPath(routePoints);
	} else {
		distanceRoute = new google.maps.Polyline({
			path : routePoints,
			strokeColor : "#FFFF00",
			strokeOpacity : 1.0,
			strokeWeight : 5
		});
		distanceRoute.setMap(map);
	}
}

function deleteDistanceMarker() {
	for (var i = 0; i < distanceMarkerArray.length; i++) {
		if (routeMarkerArray.indexOf(distanceMarkerArray[i]) != -1 || standardMarkerArray.indexOf(distanceMarkerArray[i]) != -1 || realRouteMarkerArray.indexOf(distanceMarkerArray[i]) != -1) {
			continue;
		}
		distanceMarkerArray[i].setMap(null);
	}
	distanceMarkerArray = new Array();
	updateDistancePolylines();
}

function endDistanceMode() {
	map.setOptions({
		draggableCursor : ''
	});
	jQuery(".endDistanceMode").parent().hide();
}

function showDistanceLabel() {
	if (infowindow != null) {
		infowindow.close();
	}
	var projection = map.getProjection();
	var startLatLng = distanceMarkerArray[0].getPosition();
	var endLatLng = distanceMarkerArray[1].getPosition();
	var startPoint = projection.fromLatLngToPoint(startLatLng);
	var endPoint = projection.fromLatLngToPoint(endLatLng);
	// Average
	var midPoint = new google.maps.Point((startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2);
	// Unproject
	var midLatLng = projection.fromPointToLatLng(midPoint);	infowindow = new google.maps.InfoWindow();
	infowindow.setContent("Distanz beträgt: " + getDistanceDistance(distanceMarkerArray[1]) + "sm");
	infowindow.setPosition(midLatLng);
	infowindow.open(map);

	google.maps.event.addListener(infowindow, 'closeclick', function() {
		deleteDistanceMarker();
		updateDistancePolylines();
		endDistanceMode();
	});
}

function addNewShipPositionMarker(dataObject) {
	// dataObject contains position tripId and waypointId
	var position = dataObject.position;

	if (position == null) {
		alert("No position while trying to add new Ship Marker.");
	}

	var markerOptions = {
		position : position,
		map : map,
		draggable : false,
		icon : "./lib/img/Sailing_Ship_48.png",
		labelContent : "",
		labelAnchor : new google.maps.Point(0, -10),
		labelClass : "", // the CSS class for the label
		labelStyle : {
			opacity : 0.9
		}
	}
	var shipMarker = new MarkerWithLabel(markerOptions);
	realRouteMarkerArray[realRouteMarkerArray.length] = shipMarker;

	google.maps.event.addListener(shipMarker, "mouseover", function(e) {
		shipMarker.set("labelClass", "markerLabel");
		shipMarker.set("labelContent", getPostionString(shipMarker.getPosition()));
	});

	google.maps.event.addListener(shipMarker, "mouseout", function(e) {
		shipMarker.set("labelClass", "");
		shipMarker.set("labelContent", "");
	});

	google.maps.event.addListener(shipMarker, 'click', function(event) {
		deleteCrosshairMarker();
		jQuery("#standardContext").hide();
		jQuery("#routeContext").hide();
		selectedMarker = shipMarker;
		if (distanceMarkerArray.length == 1) {
			distanceMarkerArray[1] = shipMarker;
			updateDistancePolylines();
			map.setOptions({
				draggableCursor : ''
			});
			showDistanceLabel();
		} else {
			setNewRealRouteMarkerMenu(shipMarker, dataObject.waypointId);
		}
	})
	shipPositionArray[shipPositionArray.length] = position;
	updateShipPositionPolylines();
}

function setNewRealRouteMarkerMenu(marker, waypointID) {
	jQuery("#editDetails").block({
		message : null
	});

	ajaxGet('server/php/waypoints_details_get.php?waypointId=' + waypointID, function(data) {
		// Set Details of specified waypoint
		data.info = getWaypointFullInfoData();
		selectedWaypointData = data;
		jQuery("#editDetails").unblock();
		$.link.waypointDetailsTemplate("#seapal-realroutemenu-details", selectedWaypointData);
	});
	var point = getMenuPoint(map, marker);

	document.getElementById("realRoutePosition").firstChild.nodeValue = getPostionString(marker.getPosition());
	document.getElementById("realRouteDistance").firstChild.nodeValue = getDistanceRealRoute(marker) + " sm";

	document.getElementById("realRouteContext").style.cursor = "default";

	showEndDistanceMode(marker);

	jQuery("#realRouteContext").css({
		left : (jQuery("#mapCanvas").position().left + point.x),
		top : (jQuery("#mapCanvas").position().top + point.y)
	});
	jQuery("#realRouteContext").show();

	jQuery('#closeRealRouteContext').click(function(e) {
		e.preventDefault();
		jQuery("#realRouteContext").hide();
	});
}

function updateShipPositionPolylines() {
	if (shipRoute != null) {
		shipRoute.setPath(shipPositionArray);
	} else {
		shipRoute = new google.maps.Polyline({
			path : shipPositionArray,
			strokeColor : "#008000",
			strokeOpacity : 1.0,
			strokeWeight : 2
		});
	}
	shipRoute.setMap(map);
}

function setPositionTestMenu() {
	jQuery(".startPositionTestEntry").hide();
	jQuery(".endPositionTestEntry").hide();

	if (shipMarker == null) {
		jQuery(".startPositionTestEntry").show();
	} else {
		jQuery(".endPositionTestEntry").show();
	}
}

function showEditDialog() {
	jQuery("#realRouteContext").hide();
	$.link.waypointDetailsEditTemplate("#seapal-waypoint-details-dialog", selectedWaypointData);
	$("#seapal-waypoint-details-dialog").dialog({
		bgiframe : true,
		autoOpen : false,
		height : 500,
		width : 800,
		modal : true,
		resizable : false,
		show : "slide",
		position : ['left', 'top'],
		buttons : {
			OK : function() {
				// TODO: Validate Data and add to database
				//$("#dialog > form").submit();
				ajaxUpdateCreate('server/php/waypoints_edit.php', selectedWaypointData, function() {
					$(this).dialog('close');
				});
			},
			Abbrechen : function() {
				$(this).dialog('close');
			}
		}
	});
	$('#seapal-waypoint-details-dialog').dialog('open');
	jQuery("#routeContext").hide();
}