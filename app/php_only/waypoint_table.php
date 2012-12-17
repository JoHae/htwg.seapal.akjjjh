<script language="javascript">
	function elementHideShow(elementToHideOrShow) {
		var el = document.getElementById(elementToHideOrShow);
		if (el.style.display == "table-row") {
			el.style.display = "none";
		} else {
			el.style.display = "table-row";
		}
	}
</script>

<?php
$con = (include '../database/connect.php');

$result = mysql_query("SELECT * FROM waypoint WHERE tripID=" . $_GET["tripID"]);

echo "<table border=\"1\">
		<thead>
		<tr>
         <th>Name</th>
         <th>Position</th>
         <th>Datum</th>
         <th>?????</th>
         <th>Editieren</th>
        </tr>
        </thead>";

while ($row = mysql_fetch_array($result)) {
	echo "<tr>
         <td><a href=\"javascript:elementHideShow('" . $row['waypointID'] . "');\" id=\"waypoint\">" . $row['waypoint_name'] . "</a></td>
         <td>" . $row['degree_north'] . $row['degree_north'] . $row['minutes_north'] . $row['seconds_north'] ."</td>
         <td>Hier steht das Datum</td>
         <td></td>
         <td><input type=\"button\" name=\"edit_" . $row['waypointID'] . "\" value=\"Editieren\" onclick=\"Popup=window.open('dialogs/waypoint_edit.php?waypointID=" . $row['waypointID'] . "',
         	'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=1030,height=350,left=430,top=23'); return false;\"></td>
        </tr>
        <tr id=\"" . $row['waypointID'] . "\" style=\"display:none\"><td colspan=\"5\">
        	Hier eine Beschreibung bzw weitere parameter.......................
        </tr>";
}
echo "</table>";
mysql_close($con);
echo "<input type=\"button\" name=\"new_waypoint\" value=\"Neuer Wegpunkt\" onclick=\"Popup=window.open('dialogs/waypoint_edit.php?tripID=" . $_GET['tripID'] . "&waypointID=NULL',
'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=1030,height=350,left=430,top=23'); return false;\">"
?>