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
$con = (include './database/connect.php');
$result = mysql_query("SELECT * FROM trip WHERE logbookID=" . $_GET["logbookID"]);

echo "<table border=\"1\">
		<thead>
		<tr>
         <th>triptitel</th>
         <th>Zielort</th>
         <th>Startort</th>
         <th>Start</th>
         <th>Editieren</th>
        </tr>
        </thead>";

while ($row = mysql_fetch_array($result)) {
	echo "<tr>
         <td><a href=\"javascript:elementHideShow('" . $row['tripID'] . "');\" id=\"trip\">" . $row['triptitle'] . "</a></td>
         <td>" . $row['destination'] . "</td>
         <td>" . $row['startpoint'] . "</td>
         <td>" . $row['start'] . "</td>
         <td><input type=\"button\" name=\"edit_" . $row['tripID'] . "\" value=\"Editieren\" onclick=\"Popup=window.open('../app/dialogs/trip_edit.php?tripID=" . $row['tripID'] . "&logbookID="
         	.$_GET["logbookID"] . "',
         	'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=1030,height=350,left=430,top=23'); return false;\"></td>
        </tr>
        <tr id=\"" . $row['tripID'] . "\" style=\"display:none\"><td colspan=\"5\">
        	<a href=\"waypoint_table.php?tripID=" . $row['tripID'] . "\">Show Wegpunkt?!</a>
        	Hier eine Beschreibung bzw weitere parameter.......................
        </tr>";
}
echo "</table>";
mysql_close($con);
echo "<input type=\"button\" name=\"new_trip\" value=\"Neuer Trip\" onclick=\"Popup=window.open('../app/dialogs/trip_edit.php?logbookID=" . $_GET['logbookID'] . "&tripID=NULL',
'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=1030,height=350,left=430,top=23'); return false;\">"
?>