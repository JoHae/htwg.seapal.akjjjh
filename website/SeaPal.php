<?php include("header.html");?>

<body data-twttr-rendered="true">
	
	<?php include("content_header.php");?>
	
	<div id="wrapper">
		<div id="page" class="container">
			<div id="content">
				<div class="post">
					<h2 class="title"><a name="welcome">Welcome to SeaPal </a></h2>
					<div class="entry">
						<p>
							<img src="./SeaPal_files/SeaPal-Horiz02-620x200.jpg" width="620" height="200" alt="">
						</p>
						<p>
							<b>SeaPal</b> is an App for sailors and other water sport fanatics that support the skipper in his tasks for navigation, route planing and logbook keeping. The central view shows a map with the current position and forward line. Waypoint and routes can easily be created, distances and courses can quickly be determined and documented in the logbook. The touch interface allows for fast and intuitive interaction.
						</p>
						<p>
							Online maps are available from Google and OpenSeaMap, allong with satellite view. With these a trip can easily be planed and documented. In navigation the offline operation and the precision and depth of detail is of special importance. Thats why digital sea maps for selected areas can be downloaded and used offline.
						</p>
						<p>
							For the area of the Lake Constance excellent sea maps and local information (harbours, shipyards, shops, restaurants) provided by the IBN publishing house are available as extensions. Further areas are in preparation.
						</p>
						<p>
							The application was developed particularly for the iPad in a cooperation between the IBN publishing house and the HTWG Constance University. The specific advantages of a mobile device and the touch interface were taken into account just as well as the special requirements of sailors and skippers. As a result of this cooperation, <b>SeaPal</b> is made available for free. Extensions and sea maps can be purchased and loaded according to your area and needs.
						</p>
						<p>
							This cooperation is open to further extension. Should you be interested to develop or provide further extensions, please contact us.
						</p>
						<p>
							The application runs on the iPad and with reduced functionality on the iPhone. An iPad with 3G or 4G and GPS is recommended. For longer use an external power source (like a USP port of a radio) is required.
						</p>
					</div>
				</div>
				<div class="post">
					<h2 class="title"><a name="overview">Function Overview</a></h2>
					<div class="entry">
						<p>
							<img src="./SeaPal_files/SeaPal-Horiz03-620x200.jpg" width="620" height="200" alt="">
						</p>
						<p>
							<b>SeaPal</b> offers the following functionality
						</p>
						<ul>
							<li>
								Google Maps
							</li>
							<li>
								OpenSeaMaps
							</li>
							<li>
								Satellite view
							</li>
							<li>
								Follow position
							</li>
							<li>
								Position from GPS always visible in the map view
							</li>
							<li>
								Course and speed always visible in the map view
							</li>
							<li>
								Free navigation on the map with swipe and pinch
							</li>
							<li>
								Fast return to the current position
							</li>
							<li>
								Route planing, waypoints are editable
							</li>
							<li>
								Automatic waypoint switching
							</li>
							<li>
								Bearing and distance to any particular point with long-touch
							</li>
							<li>
								Placing of permanent marks on the map
							</li>
							<li>
								Add marks using bearing or coordinates
							</li>
							<li>
								Select any mark as target
							</li>
							<li>
								Bearing and distance to current target always visible in the map view
							</li>
							<li>
								Distance measurement, even across several waypoints
							</li>
							<li>
								“Person over Board” functionality
							</li>
						</ul>
						<h2 class="title"><a name="extensions">Extensions</a></h2>
						<p>
							With extensions <b>SeaPal</b> offers the following functionality:
						</p>
						<ul>
							<li>
								Logbook function for one or several boats
							</li>
							<li>
								Automatic tracking
							</li>
							<li>
								Automatic or manual logbook entries
							</li>
							<li>
								Fotos for logbook entries
							</li>
							<li>
								Collection of regional Points of Interest
							</li>
						</ul>
						<h2 class="title"><a name="warning">Warning</a></h2>
						<p>
							<b>SeaPal</b> is a valuable addition to your navigational equipment, but no replacement. Always use official sea maps in conjunction. All positions are provided so that a transition to paper sea maps is simple. The responsibility for the proper use lies with the skipper. The manufacturer of <b>SeaPal</b> assume no liability.
						</p>
					</div>
				</div>
				<div style="clear: both;">
					&nbsp;
				</div>
			</div>
			<!-- end #content -->
			<div id="sidebar">
				<div id="box1">
					<h2>More Information</h2>
					<ul class="list-style1">
						<li class="first">
							Follow us on our <a href="https://plus.google.com/100825752167882077539/posts">Google Plus Page</a>
						</li>
						<li>
							See a <a href="https://plus.google.com/100825752167882077539/videos">video on SeaPal</a>
						</li>
						<li>
							SeaPal in <a href="http://itunes.apple.com/us/app/seapal/id561903907?mt=8&ign-mpt=uo%3D4">iTunes</a>
						</li>
						<li>
							<a href="http://www.seapal.de/userguide.php">User Guide</a>
						</li>
						<li>
							<a href="http://www.seapal.de/about.php">About the project</a>
						</li>
						<li>
							<a href="http://www.seapal.de/images/Legend-IBN-Map.pdf">Legend of IBN Maps</a>
						</li>
					</ul>
				</div>
				<?php include("side_bar.html");?>
			</div>
			<!-- end #sidebar -->
			<div style="clear: both;">
				&nbsp;
			</div>
		</div>
		<!-- end #page -->
	</div>
	<div id="fb-root" class=" fb_reset">
		<div style="position: absolute; top: -10000px; height: 0px; width: 0px; ">
			<div>
				<iframe id="fb_xdm_frame_http" name="fb_xdm_frame_http" src="./SeaPal_files/xd_arbiter.htm"></iframe><iframe id="fb_xdm_frame_https" name="fb_xdm_frame_https" src="./SeaPal_files/xd_arbiter(1).htm"></iframe>
			</div>
		</div>
	</div>
	<script>
		( function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id))
					return;
				js = d.createElement(s);
				js.id = id;
				js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
	</script>
	<p>Hit Counter: <?php include("hit_counter.php") ?></p>
	<?php include("footer.html"); ?>
</body>
</html>