/**
 * 
 */

var seapalLogbookId = null;

$(function() {
	
	seapalLogbookId = $.urlParam('logbookId');
	
	seapalListInit(getServiceURL('trips_get', 'logbookId', seapalLogbookId), getServiceURL('trip_delete', 'logbookId', seapalLogbookId), getServiceURL('trip_edit', 'logbookId', seapalLogbookId));
	
	// insert the navigation information
	ajaxGet(getServiceURL('trips_navigationinfo_get', 'logbookId', seapalLogbookId), function(data) {
		$(".seapal-logbookname").html(data.shipname);
	});
});