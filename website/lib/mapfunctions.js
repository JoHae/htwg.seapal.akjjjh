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

function setNewMarkerMenu(map) {
	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
	var scale = Math.pow(2, map.getZoom());

	var worldPoint = map.getProjection().fromLatLngToPoint(actualCrosshairMarker.getPosition());
	var point = new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);

	jQuery("#overlay").hide();
	jQuery("#overlay").css({
		left : (jQuery("#map_canvas").position().left + point.x),
		top : (jQuery("#map_canvas").position().top + point.y)
	});
	jQuery("#overlay").show();

	jQuery('#close').click(function(e) {
		e.preventDefault();
		jQuery("#overlay").hide();
		actualCrosshairMarker.setVisible(false);
		actualCrosshairMarker = null;
	});
}

function addNewStandardMarker(map, position) {
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
	standardMarkers[0] = new MarkerWithLabel(markerOptions);

	google.maps.event.addListener(standardMarkers[0], 'drag', function() {
		standardMarkers[0].set("labelContent", getPostionString(standardMarkers[0].getPosition()));
	});

	google.maps.event.addListener(standardMarkers[0], 'dragend', function() {
		standardMarkers[0].set("labelContent", getPostionString(standardMarkers[0].getPosition()));
	});
}