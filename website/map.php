<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map_canvas { height: 100% }
    </style>
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCi3bjBYQwpwC0v2cjxR4Me5AKu4l_p-98&sensor=false">
    </script>
    <script type="text/javascript">
      var map
      var marker
      function initialize() {
        var mapTypeIds = ["roadmap", "satellite", "OSM"];
        var mapOptions = {
          center: new google.maps.LatLng(47.66, 9.16),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControlOptions: {
                    mapTypeIds: mapTypeIds
              },
          draggableCursor:'crosshair'
        };
         map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
                        
         map.mapTypes.set("OSM", new google.maps.ImageMapType({
                getTileUrl: function(coord, zoom) {
                    return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                },
                tileSize: new google.maps.Size(256, 256),
                name: "OpenStreetMap",
                maxZoom: 18
            }));
         map.overlayMapTypes.push(new google.maps.ImageMapType({getTileUrl: function(coord, zoom) {
                    return "http://tiles.openseamap.org/seamark/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                },
                tileSize: new google.maps.Size(256, 256),
                name: "OpenSeaMap",
                maxZoom: 18 }));
            
        google.maps.event.addListener(map, 'center_changed', function() {
        	document.getElementById("lat").firstChild.nodeValue=map.getCenter().lat();
        	document.getElementById("long").firstChild.nodeValue=map.getCenter().lng();
        })
        
        google.maps.event.addListener(map, 'center_changed', function() {
        	var ddLat = map.getCenter().lat();
        	var ddLatS = ddLat.toString();
        	var ddLong = map.getCenter().lng();
        	var ddLongS = ddLong.toString();
        	
        	var signLat = 1;
        	var signLong = 1;
        	if(ddLat < 0) signLat = -1;
        	if(ddLong < 0) signLong = -1;
        	var ddLatVals = ddLatS.split(".");
			var LatVorkomma = ddLatVals[0];
			var LatMinutes = (Math.round(((ddLat - ddLatVals[0]) * 60 * 100))/100) * signLat;
			
			var ddLongVals = ddLongS.split(".");
			var LongVorkomma = ddLongVals[0];
			var LongMinutes = (Math.round(((ddLong - ddLongVals[0]) * 60 * 100))/100) * signLong;
			document.getElementById("latdeg").firstChild.nodeValue=LatVorkomma + "°" + LatMinutes + "'N";
        	document.getElementById("longdeg").firstChild.nodeValue=LongVorkomma + "°" + LongMinutes + "'E"
        })
        
        google.maps.event.addListener(map, 'click', function(event) {
             var markerOptions= {
	             position: event.latLng,
                 map: map,
                 draggable:true
             }
        	 marker = new google.maps.Marker(markerOptions);
        	 
        	 google.maps.event.addListener(marker, 'click', function() {alert("Marker was clicked")})
        })
        
          var routePoints = [
            new google.maps.LatLng(47.66, 9.16),
            new google.maps.LatLng(47.67, 9.17),
            new google.maps.LatLng(47.69, 9.14),
          ];
          var route = new google.maps.Polyline({
            path: routePoints,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
          });

        route.setMap(map);
        
        var crosshairShape = {coords:[0,0,0,0],type:'rect'};
		var myOptions = {zoom:12,center:latlng,mapTypeId:google.maps.MapTypeId.SATELLITE,draggableCursor:'crosshair',mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DROPDOWN_MENU}};
		var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
		var marker = new google.maps.Marker({
		map: map,
		icon: 'http://www.daftlogic.com/images/cross-hairs.gif',
		shape: crosshairShape
});
marker.bindTo('position', map, 'center'); 
        
        
      }
    </script>
  </head>
  <body onload="initialize()">
  	<h1><span id="latdeg">0° 00.00'N</span><span id="longdeg">0° 00.00'E</span></h1>
    <h1>Lat <span id="lat">42</span> Long <span id="long">9</span></h1>
    <div id="map_canvas" style="width:100%; height:100%"></div>
  </body>
</html>