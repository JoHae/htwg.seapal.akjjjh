<script language="javascript">
    function elementHideShow(elementToHideOrShow) 
    {
        var el = document.getElementById(elementToHideOrShow);
        if (el.style.display == "table-row") {
            el.style.display = "none";
        }
        else 
        {
            el.style.display = "table-row";
        }
    }         
</script>

<?php
$con = mysql_connect("localhost", "root");
if (!$con) {
	die('Could not connect: ' . mysql_error());
}

$db_selected = mysql_select_db("seapal", $con);
if (!$db_selected) {
	echo "<div>Cannot access to database seapal.</div>";
	echo "<div>Please execute 'app/install/install.php' to create seapal database</div>";
	die('Cannot use seapal database : ' . mysql_error());
}

$result = mysql_query("SELECT * FROM logbook");

echo "<table border=\"1\">
		<thead>
		<tr>
         <th>Bootsname</th>
         <th>Typ</th>
         <th>Eigner</th>
         <th>Segelzeichen</th>
         <th>Editieren</th>
        </tr>
        </thead>";

while ($row = mysql_fetch_array($result)) {
	echo "<tr>
         <td><a href=\"javascript:elementHideShow('" . $row['logbookID'] . "');\" id=\"logbook\">" . $row['shipname'] . "</a></td>
         <td>" . $row['type'] . "</td>
         <td>" . $row['owner'] . "</td>
         <td>" . $row['sailsign'] . "</td>
         <td><input type=\"button\" name=\"edit_" . $row['logbookID'] . "\" value=\"Editieren\" onclick=\"Popup=window.open('../app/dialogs/logbook_edit.php?logbookID=" . $row['logbookID'] . "',
         	'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=1030,height=350,left=430,top=23'); return false;\"></td>
        </tr>
        <tr id=\"" . $row['logbookID'] . "\" style=\"display:none\"><td colspan=\"5\">
        	Hier eine Beschreibung bzw weitere parameter.......................
        </tr>";
}
echo "</table>";
mysql_close($con);
?>
<input type="button" name="new_logbook" value="Neues Logbuch" onclick="Popup=window.open('../app/dialogs/logbook_edit.php?logbookID=NULL',
'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=1030,height=350,left=430,top=23'); return false;">

