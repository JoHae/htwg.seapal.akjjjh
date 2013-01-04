/**
 * javascript file with the functions for the logbooks page
 */

var seapalListItemEditing = false;
var seapalListItemEditingRequestId = -1;
var seapalListData = null;
var seapalListDataBinded = null;

$(function() {
	// add the blocking of the list during an ajax request
	$(document).ajaxStart(function() {
		$("#seapal-list").block({
			message : $('#seapal-busy-overlay')
		});
	});
	$(document).ajaxStop(function() {
		$("#seapal-list").unblock();
	});

	$.views.allowCode = true;
	
	// Compile templates
	$.templates({
		seapalLogbookTemplate : "#seapal-logbook-template"
	});

	// load logbooks
	$.getJSON('server/php/logbooks_get.php', function(data) {
	 	logbooksLoaded(data);
	});
});

function logbooksLoaded(logbooksData) {
	seapalListData	= logbooksData;
	
	// for updating destro accordion first
	if ($('#seapal-list').data('accordion')) {
		$("#seapal-list").accordion('destroy');
	}

	// reset variables
	seapalListItemEditing = false;
	seapalListItemEditingRequestId = -1;

	// clear list
	$("#seapal-list").html("");

	// create the binded data (clone of received date)
	seapalListDataBinded = createBindingListData(seapalListData, getEmpyData(), getInfoData());

	$.link.seapalLogbookTemplate("#seapal-list", seapalListDataBinded);

	for (var item in seapalListDataBinded) {
		addFunctionsToListitem(seapalListDataBinded[item].logbookId);
	};

	// reset layout
	$("#seapal-list").accordion({
		collapsible : true,
		active : false,
		header : ".seapal-header",
		beforeActivate : onBeforePanelActivate
	});

	// List layout
	// Hover states on the icons
	$("#seapal-list .seapal-actions div").hover(function() {
		$(this).addClass("ui-state-hover");
	}, function() {
		$(this).removeClass("ui-state-hover");
	});

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
			if (event.which === 32) {
				event.stopPropagation();
				// prevent toggling collapsion, but insert the whitspace
			}
		});
	});

	// enable tooltips
	$(document).tooltip();
}

function onBeforePanelActivate(event, ui) {
	var closing = $(this).find('.ui-state-active').length;
	var elementNr = $(this).find(".seapal-header").index(ui.newHeader[0]);

	if (seapalListItemEditing && closing) {
		return false;
	}
	if (elementNr === 0) {
		itemEdit("new");
	}
	if (seapalListItemEditingRequestId != -1) {
		itemEdit(seapalListItemEditingRequestId);
		seapalListItemEditingRequestId = -1;
	}
	return true;
}

function blockAllOtherListItems(itemId) {
	for (var i = 0; i < seapalListData.length; i++) {
		var tCurrLogbookId = seapalListData[i].logbookId;
		if (tCurrLogbookId === itemId) {

		} else {
			$("#seapal-list .seapal-header .seapal-nr-" + tCurrLogbookId + " .seapal-readonly").block();
		}
	}
}

function itemEdit(itemId) {
	if (seapalListItemEditing) {
		return;
	}
	//blockAllOtherListItems(itemId);
	$("#seapal-list .seapal-header .seapal-nr-" + itemId + " .seapal-readonly").hide();
	$("#seapal-list .seapal-header .seapal-nr-" + itemId + " .seapal-edit").show();
	$("#seapal-list .seapal-content .seapal-nr-" + itemId + " .seapal-readonly").hide();
	$("#seapal-list .seapal-content .seapal-nr-" + itemId + " .seapal-edit").show();
	seapalListItemEditing = true;
}

function itemEditCancel(itemId) {
	seapalListItemEditing = false;
	$("#seapal-list .seapal-header .seapal-nr-" + itemId + " .seapal-readonly").show();
	$("#seapal-list .seapal-header .seapal-nr-" + itemId + " .seapal-edit").hide();
	$("#seapal-list .seapal-content .seapal-nr-" + itemId + " .seapal-readonly").show();
	$("#seapal-list .seapal-content .seapal-nr-" + itemId + " .seapal-edit").hide();
}

function itemEditReset(itemId) {
	var tData = getEmpyData();
	getDataFromDataList(seapalListData, tData, itemId);
	setBindingData(seapalListDataBinded, tData, itemId);
}

function removeListItem(itemId) {
	$("#seapal-remove-dialog-confirm").dialog({
		resizable : false,
		height : 140,
		modal : true,
		buttons : {
			"Löschen" : function() {
				$(this).dialog("close");
				ajaxDelete("server/php/logbook_delete.php", itemId, logbooksLoaded);
			},
			"Abbrechen" : function() {
				$(this).dialog("close");
			}
		}
	});
}

function addFunctionsToListitem(itemId) {
	if (itemId == "new") {
		addFunctionsToListItemAdd();
		return;
	}

	$("#seapal-list-item-" + itemId + "-edit").click(function(e) {
		seapalListItemEditingRequestId = itemId;
		return true;
	});

	$("#seapal-list-item-" + itemId + "-remove").click(function(e) {
		removeListItem(itemId);
		return false;
		// prevent toggling collapsion
	});

	$("#seapal-list-item-" + itemId + "-save").click(function(e) {
		processUserDataManipulation(itemId);
		return false;
		// prevent toggling collapsion
	});

	$("#seapal-list-item-" + itemId + "-cancel").click(function(e) {
		itemEditCancel(itemId);
		itemEditReset(itemId);
		return false;
		// prevent toggling collapsion
	});

}

function addFunctionsToListItemAdd() {
	$("#seapal-list-item-new-save").click(function(e) {
		processUserDataManipulation("new");
		return false;
		// prevent toggling collapsion
	});

	$("#seapal-list-item-new-cancel").click(function(e) {
		itemEditCancel("new");
		$("#seapal-list").accordion("activate", -1)
		setBindingData(seapalListDataBinded, getEmpyData(), "new");
		return false;
		// prevent toggling collapsion
	});
}

function processUserDataManipulation(itemId) {
	var tNewData = getEmpyData();
	getDataFromDataList(seapalListDataBinded, tNewData, itemId);
	if (itemId == "new") {
		tNewData['logbookId'] = "NULL";
	}
	ajaxUpdateCreate("server/php/logbook_edit.php", tNewData, logbooksLoaded);
}



