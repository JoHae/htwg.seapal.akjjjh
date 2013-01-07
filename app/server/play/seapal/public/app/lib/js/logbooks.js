/**
 * javascript file with the functions for the logbooks page
 * 
 * 
 */

$(function() {
	seapalListInit(getServiceURL('logbooks_get'), getServiceURL('logbook_delete'), getServiceURL('logbook_edit'));
});

