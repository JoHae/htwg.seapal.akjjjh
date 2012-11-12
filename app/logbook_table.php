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

mysql_select_db("seapal", $con);

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
         <td><a href=\"javascript:elementHideShow('" . $row['logbookID'] . "');\">" . $row['shipname'] . "</a></td>
         <td>" . $row['type'] . "</td>
         <td>" . $row['owner'] . "</td>
         <td>" . $row['sailsign'] . "</td>
         <td><input type=\"button\" name=\"edit_" . $row['logbookID'] . "\" value=\"Editieren\" onclick=\"Popup=window.open('dialogs/logbook_edit.php?logbookID=" . $row['logbookID'] . "',
         	'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=500,height=800,left=430,top=23'); return false;\"></td>
        </tr>
        <tr id=\"" . $row['logbookID'] . "\" style=\"display:none\"><td colspan=\"5\">
        	Hier eine Beschreibung bzw weitere parameter.......................
        </tr>";
}
echo "</table>";
mysql_close($con);
?>

