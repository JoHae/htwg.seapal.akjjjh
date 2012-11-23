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
	var markerOptions = {
		position : actualCrosshairPosition,
		map : map,
		draggable : true,
		icon : "images/cross_hair.png",
		labelContent : getPostionString(actualCrosshairPosition),
		labelAnchor : new google.maps.Point(3, 30),
		labelClass : "labels", // the CSS class for the label
		labelStyle : {
			opacity : 0.75
		}
	}
	actualCrosshairMarker = new MarkerWithLabel(markerOptions);
	google.maps.event.addListener(actualCrosshairMarker, 'drag', function() {
		setNewCrosshairMarkerMenu(map);
		actualCrosshairMarker.set("labelContent", getPostionString(actualCrosshairMarker.getPosition()));
		actualCrosshairPosition = actualCrosshairMarker.getPosition();
	});

	google.maps.event.addListener(actualCrosshairMarker, 'dragend', function() {
		setNewCrosshairMarkerMenu(map);
		actualCrosshairMarker.set("labelContent", getPostionString(actualCrosshairMarker.getPosition()));
		actualCrosshairPosition = actualCrosshairMarker.getPosition();
	});
}

function setNewCrosshairMarkerMenu() {
	var point = getMenuPoint(map, actualCrosshairMarker);

	jQuery("#crosshairMenu").css({
		left : (jQuery("#mapCanvas").position().left + point.x),
		top : (jQuery("#mapCanvas").position().top + point.y)
	});
	jQuery("#crosshairMenu").show();

	jQuery('#closeCrosshairMenu').click(function(e) {
		e.preventDefault();
		jQuery("#crosshairMenu").hide();
		actualCrosshairMarker.setVisible(false);
		actualCrosshairMarker = null;
	});
}

function addNewStandardMarker() {
	var markerOptions = {
		position : actualCrosshairPosition,
		map : map,
		draggable : true,
		icon : "",
		labelContent : getPostionString(actualCrosshairPosition),
		labelAnchor : new google.maps.Point(0, 0),
		labelClass : "labels", // the CSS class for the label
		labelStyle : {
			opacity : 0.75
		}
	}
	var marker = new MarkerWithLabel(markerOptions);

	google.maps.event.addListener(marker, 'drag', function() {
		marker.set("labelContent", getPostionString(marker.getPosition()));
	});

	google.maps.event.addListener(marker, 'dragend', function() {
		marker.set("labelContent", getPostionString(marker.getPosition()));
	});

	google.maps.event.addListener(marker, 'click', function(event) {
		selectedMarker = marker;
		setNewStandardMarkerMenu(marker);
	})

	return marker;
}

function setNewStandardMarkerMenu(marker) {
	var point = getMenuPoint(map, marker);

	jQuery("#standardMenu").css({
		left : (jQuery("#mapCanvas").position().left + point.x),
		top : (jQuery("#mapCanvas").position().top + point.y)
	});
	jQuery("#standardMenu").show();

	jQuery('#closeStandardMenu').click(function(e) {
		e.preventDefault();
		jQuery("#standardMenu").hide();
	});
}

function addNewRouteMarker() {
	var markerOptions = {
		position : actualCrosshairPosition,
		map : map,
		draggable : true,
		icon : "",
	}
	var marker = new google.maps.Marker(markerOptions);

	google.maps.event.addListener(marker, 'drag', function() {
		updateRoutePolylines();
	});

	google.maps.event.addListener(marker, 'dragend', function() {
		updateRoutePolylines();
	});

	google.maps.event.addListener(marker, 'click', function(event) {
		selectedMarker = marker;
		setNewRouteMarkerMenu(marker);
	})

	return marker;
}

function setNewRouteMarkerMenu(marker) {
	var point = getMenuPoint(map, marker);

	jQuery("#routeMenu").css({
		left : (jQuery("#mapCanvas").position().left + point.x),
		top : (jQuery("#mapCanvas").position().top + point.y)
	});
	jQuery("#routeMenu").show();

	jQuery('#closeRouteMenu').click(function(e) {
		e.preventDefault();
		jQuery("#routeMenu").hide();
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
