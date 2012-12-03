/**
 * javascript file with the functions for the logbooks page
 */

var seapal_list_item_editing = false;

$(function() {
	$("#seapal-list").accordion({
		collapsible : true,
		active : false,
		header : ".seapal-header",
		beforeActivate: onBeforePanelActivate
	});

	// List layout
	// Hover states on the icons
	$("#seapal-list .seapal-actions div").hover(function() {
		$(this).addClass("ui-state-hover");
	}, function() {
		$(this).removeClass("ui-state-hover");
	});

	// list element actions
	// the new item element
	

	$("#seapal-list-item-new-save").click(function(e) {
		/*$("#seapal-list .seapal-header .seapal-nr-new .seapal-readonly").show();
		$("#seapal-list .seapal-header .seapal-nr-new .seapal-edit").hide();
		$("#seapal-list .seapal-content .seapal-nr-new .seapal-edit").hide();*/
		//$("#seapal-list").accordion("disable");
		return false;
		// prevent toggling collapsion
	});

	$("#seapal-list-item-new-cancel").click(function(e) {
		itemEditCancel("new");
		$("#seapal-list").accordion("activate", -1)
		return false;
		// prevent toggling collapsion
	});

	// first element
	addFunctionsToListitem(1);

	// hides each edit element in the list (the header and content)
	$("#seapal-list .seapal-edit").each(function() {
		$(this).hide();
	});

	// for each input field in the header of the list
	$("#seapal-list .seapal-header .seapal-edit input").each(function() {
		$(this).click(function(event) {
			event.stopPropagation();
			// prevent toggling collapsion
		});
		
		// for espacially space key
		$(this).keydown(function(event) {
			// on whitspace prevent collapsing			
			if(event.which === 32) {
				event.stopPropagation();
				// prevent toggling collapsion, but insert the whitspace
			}
		});
	});
});

function onBeforePanelActivate(event, ui) {
	var closing = $(this).find('.ui-state-active').length;
	var elementNr = $(this).find(".seapal-header").index(ui.newHeader[0]);
	
	
	if (seapal_list_item_editing && closing) {
		return false;
	}
	if (elementNr == 0) {
		itemEdit("new");
	}
	return true;
}

function itemEdit(index) {
	if (seapal_list_item_editing) {
		return;
	}
	$("#seapal-list .seapal-header .seapal-nr-" + index + " .seapal-readonly").hide();
	$("#seapal-list .seapal-header .seapal-nr-" + index + " .seapal-edit").show();
	$("#seapal-list .seapal-content .seapal-nr-" + index + " .seapal-readonly").hide();
	$("#seapal-list .seapal-content .seapal-nr-" + index + " .seapal-edit").show();
	seapal_list_item_editing = true;
}

function itemEditCancel(index) {
	seapal_list_item_editing = false;
	$("#seapal-list .seapal-header .seapal-nr-" + index + " .seapal-readonly").show();
	$("#seapal-list .seapal-header .seapal-nr-" + index + " .seapal-edit").hide();
	$("#seapal-list .seapal-content .seapal-nr-" + index + " .seapal-readonly").show();
	$("#seapal-list .seapal-content .seapal-nr-" + index + " .seapal-edit").hide();
}

function addFunctionsToListitem(index) {
	$("#seapal-list-item-" + index + "-edit").click(function(e) {
		itemEdit(index);
		return true;
	});

	$("#seapal-list-item-" + index + "-remove").click(function(e) {
		return false;
		// prevent toggling collapsion
	});

	$("#seapal-list-item-" + index + "-save").click(function(e) {

		return false;
		// prevent toggling collapsion
	});

	$("#seapal-list-item-" + index + "-cancel").click(function(e) {
		itemEditCancel(index);
		return false;
		// prevent toggling collapsion
	});

}

/*
 var jsonVar = {

 };

 function createLogbookElement
 */

