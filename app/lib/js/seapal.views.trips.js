/**
 * 
 */

var seapalLogbookId = null;

$(function() {
	
	seapalLogbookId = $.urlParam('logbookId');
	
	seapalListInit(getServiceURL('trips_get.php?logbookId=' + seapalLogbookId), getServiceURL('trip_delete.php?logbookId=' + seapalLogbookId), getServiceURL('trip_edit.php?logbookId=' + seapalLogbookId));
	
	// insert the navigation information
	ajaxGet(getServiceURL('trips_navigationinfo_get.php?logbookId=' + seapalLogbookId), function(data) {
		$(".seapal-logbookname").html(data.shipname);
	});
});

