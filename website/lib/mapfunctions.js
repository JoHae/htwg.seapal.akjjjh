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
	document.getElementById("lat").firstChild.nodeValue = map.getCenter().lat();
	document.getElementById("long").firstChild.nodeValue = map.getCenter().lng();
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

function getMenuPoint(map, marker) {
	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
	var scale = Math.pow(2, map.getZoom());

	var worldPoint = map.getProjection().fromLatLngToPoint(marker.getPosition());
	return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}

function addNewCrosshairMarker() {
	var image = new google.maps.MarkerImage('./images/crosshair50.png',
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
		raiseOnDrag: false
	}
	actualCrosshairMarker = new google.maps.Marker(markerOptions);
	jQuery("#standardContext").hide();
	jQuery("#routeContext").hide();
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

	document.getElementById("crosshairPosition").firstChild.nodeValue = getPostionString(actualCrosshairPosition);
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
		icon : ""
	}
	var marker = new google.maps.Marker(markerOptions);

	google.maps.event.addListener(marker, 'drag', function() {
		jQuery("#standardContext").hide();
	});

	google.maps.event.addListener(marker, 'dragend', function() {
		jQuery("#standardContext").hide();
	});

	google.maps.event.addListener(marker, 'click', function(event) {
		deleteCrosshairMarker();
		jQuery("#routeContext").hide();
		selectedMarker = marker;
		setNewStandardMarkerMenu(marker);
	})

	return marker;
}

function setNewStandardMarkerMenu(marker) {
	var point = getMenuPoint(map, marker);

	document.getElementById("standardPosition").firstChild.nodeValue = getPostionString(marker.getPosition());
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

function addNewRouteMarker() {
	var image = new google.maps.MarkerImage('./images/flag50.png',
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
		icon : image
	}
	var marker = new google.maps.Marker(markerOptions);
	marker.set("labelContent", "");
	marker.set("labelClass", "");

	google.maps.event.addListener(marker, 'drag', function() {
		jQuery("#routeContext").hide();
		updateRoutePolylines();
	});

	google.maps.event.addListener(marker, 'dragend', function() {
		jQuery("#routeContext").hide();
		updateRoutePolylines();
	});

	google.maps.event.addListener(marker, 'click', function(event) {
		deleteCrosshairMarker();
		jQuery("#standardContext").hide();
		selectedMarker = marker;
		setNewRouteMarkerMenu(marker);
	})

	return marker;
}

function setNewRouteMarkerMenu(marker) {
	var point = getMenuPoint(map, marker);

	document.getElementById("routePosition").firstChild.nodeValue = getPostionString(marker.getPosition());
	jQuery("#routeContext").css({
		left : (jQuery("#mapCanvas").position().left + point.x),
		top : (jQuery("#mapCanvas").position().top + point.y)
	});
	jQuery("#routeContext").show();

	jQuery('#closerouteContext').click(function(e) {
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
