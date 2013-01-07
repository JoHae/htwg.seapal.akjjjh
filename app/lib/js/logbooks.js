/**
 * javascript file with the functions for the logbooks page
 * 
 * 
 */

$(function() {
	seapalListInit(getServiceURL('logbooks_get.php'), getServiceURL('logbook_delete.php'), getServiceURL('logbook_edit.php'));
});

