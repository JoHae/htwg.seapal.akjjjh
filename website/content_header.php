<?php
function curPageName() {
return substr($_SERVER["SCRIPT_NAME"],strrpos($_SERVER["SCRIPT_NAME"],"/")+1);
}
?>
<div id="header-wrapper">
	<div id="header" class="container">
		<div id="logo">
			<h1><a name="top"><img src="./SeaPal_files/Icon-Small-50.png" alt="Icon-Small-50" width="50" height="50">SeaPal</a></h1>
		</div>
		<div id="menu">
			<ul>
				<?php
				if(curPageName()=="SeaPal.php") {
				echo "<li class=\"current_page_item\"><a href=\"SeaPal.php\">Homepage</a></li>";
				} else {
				echo "<li><a href=\"SeaPal.php\">Homepage</a></li>";
				}
				if(curPageName()=="userguide.php") {
				echo "<li class=\"current_page_item\"><a href=\"userguide.php\">User Guide</a></li>";
				} else {
				echo "<li><a href=\"userguide.php\">User Guide</a></li>";
				}
				if(curPageName()=="screenshots.php") {
				echo "<li class=\"current_page_item\"><a href=\"screenshots.php\">Screenshots</a></li>";
				} else {
				echo "<li><a href=\"screenshots.php\">Screenshots</a></li>";
				}
				if(curPageName()=="about.php") {
				echo "<li class=\"current_page_item\"><a href=\"http://www.seapal.de/about.php\">About</a></li>";
				} else {
				echo "<li><a href=\"about.php\">About</a></li>";
				}
				if(curPageName()=="contact.php") {
				echo "<li class=\"current_page_item\"><a href=\"contact.php\">Contact</a></li>";
				} else {
				echo "<li><a href=\"contact.php\">Contact</a></li>";
				}
				if(curPageName()=="logbook_table.php") {
				echo "<li class=\"current_page_item\"><a href=\"../app/logbook_table.php\">Logbuch</a></li>";
				} else {
				echo "<li><a href=\"../app/logbook_table.php\">Logbuch</a></li>";
				}
				if(curPageName()=="map.html") {
				echo "<li class=\"current_page_item\"><a href=\"map.html\">TestMap</a></li>";
				} else {
				echo "<li><a href=\"map.html\">TestMap</a></li>";
				}
				?>
			</ul>
		</div>
	</div>
</div>