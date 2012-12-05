/**
 * javascript file with the functions for the logbooks page
 */

$(function() {
	$("#seapal-list").accordion({
		collapsible : true,
		active : false,
		header : ".seapal-header"
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
	$(".seapal-header .seapal-nr-new").click(function(e) {
		$("#seapal-list .seapal-header .seapal-nr-new .seapal-readonly").hide();
		$("#seapal-list .seapal-header .seapal-nr-new .seapal-edit").show();
		$("#seapal-list .seapal-content .seapal-nr-new .seapal-readonly").hide();
		$("#seapal-list .seapal-content .seapal-nr-new .seapal-edit").show();
		//$("#seapal-list").accordion("disable");
		return false;
		// prevent toggling collapsion
	});

	$("#seapal-list-item-new-save").click(function(e) {
		$("#seapal-list .seapal-header .seapal-nr-new .seapal-readonly").show();
		$("#seapal-list .seapal-header .seapal-nr-new .seapal-edit").hide();
		$("#seapal-list .seapal-content .seapal-nr-new .seapal-readonly").show();
		$("#seapal-list .seapal-content .seapal-nr-new .seapal-edit").hide();
		$("#seapal-list").accordion("enable");
		return false;
		// prevent toggling collapsion
	});

	$("#seapal-list-item-new-cancel").click(function(e) {
		$("#seapal-list .seapal-header .seapal-nr-new .seapal-readonly").show();
		$("#seapal-list .seapal-header .seapal-nr-new .seapal-edit").hide();
		$("#seapal-list .seapal-content .seapal-nr-new .seapal-readonly").show();
		$("#seapal-list .seapal-content .seapal-nr-new .seapal-edit").hide();
		$("#seapal-list").accordion("enable");
		return false;
		// prevent toggling collapsion
	});

	// first element
	addFunctionsToListitem(1);

	// prevents collapsing the accorion when entering a space into a text fiel in the header
	

	// hides each edit element in the list (the header and content)
	$("#seapal-list .seapal-edit").each(function() {
		$(this).hide();
	});

	// for each input field in the header of the list
	$("#seapal-list .seapal-header .seapal-edit input").each(function() {
		$(this).click(function(e) {
			return false;
			// prevent toggling collapsion
		});
	});

});

function addFunctionsToListitem(index) {
	$("#seapal-list-item-" + index + "-edit").click(function(e) {
		$("#seapal-list .seapal-header .seapal-nr-" + index + " .seapal-readonly").hide();
		$("#seapal-list .seapal-header .seapal-nr-" + index + " .seapal-edit").show();
		$("#seapal-list .seapal-content .seapal-nr-" + index + " .seapal-readonly").hide();
		$("#seapal-list .seapal-content .seapal-nr-" + index + " .seapal-edit").show();
		//$("#seapal-list").accordion("disable");
		return false;
		// prevent toggling collapsion
	});

	$("#seapal-list-item-" + index + "-remove").click(function(e) {
		return false;
		// prevent toggling collapsion
	});

	$("#seapal-list-item-" + index + "-save").click(function(e) {
		$("#seapal-list .seapal-header .seapal-nr-" + index + " .seapal-readonly").show();
		$("#seapal-list .seapal-header .seapal-nr-" + index + " .seapal-edit").hide();
		$("#seapal-list .seapal-content .seapal-nr-" + index + " .seapal-readonly").show();
		$("#seapal-list .seapal-content .seapal-nr-" + index + " .seapal-edit").hide();
		$("#seapal-list").accordion("enable");
		return false;
		// prevent toggling collapsion
	});

	$("#seapal-list-item-" + index + "-cancel").click(function(e) {
		$("#seapal-list .seapal-header .seapal-nr-" + index + " .seapal-readonly").show();
		$("#seapal-list .seapal-header .seapal-nr-" + index + " .seapal-edit").hide();
		$("#seapal-list .seapal-content .seapal-nr-" + index + " .seapal-readonly").show();
		$("#seapal-list .seapal-content .seapal-nr-" + index + " .seapal-edit").hide();
		$("#seapal-list").accordion("enable");
		return false;
		// prevent toggling collapsion
	});

}

/*
 var jsonVar = {

 };

 function createLogbookElement
 */

