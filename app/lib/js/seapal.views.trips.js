/**
 * 
 */

var seapalLogbookId = null;

$(function() {
	
	seapalLogbookId = $.urlParam('logbookId');
	seapalListInit('server/php/trips_get.php?logbookId=' + seapalLogbookId, 'server/php/trip_delete.php?logbookId=' + seapalLogbookId, 'server/php/trip_edit.php?logbookId=' + seapalLogbookId);
});

