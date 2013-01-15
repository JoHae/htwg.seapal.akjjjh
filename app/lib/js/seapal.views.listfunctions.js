/**
 * generic seapal list functions
 * 
 * * required data:
 * html id #seapal-list-template : template for the accordion list
 * html id #seapal-list : accordion list
 * 
 */


var seapalListItemEditing = false;
var seapalListItemEditingRequestId = null;
var seapalListData = null;
var seapalListDataBinded = null;
var seapalAjaxGetUrl = null;
var seapalAjaxDeleteUrl = null;
var seapalAjaxEditUrl = null;


function seapalListInit(ajaxGetUrl, ajaxDeleteUrl, ajaxEditUrl) {
	seapalAjaxGetUrl = ajaxGetUrl;
	seapalAjaxDeleteUrl = ajaxDeleteUrl;
	seapalAjaxEditUrl = ajaxEditUrl;
	
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
		seapalListTemplate : "#seapal-list-template"
	});

	// load data
	ajaxGet(seapalAjaxGetUrl, seapalDataLoaded);
}

function seapalDataLoaded(listData) {
	seapalListData	= listData;
	
	// for updating destro accordion first
	if ($('#seapal-list').data('accordion')) {
		$("#seapal-list").accordion('destroy');
	}

	// reset variables
	seapalListItemEditing = false;
	seapalListItemEditingRequestId = null;

	// clear list
	$("#seapal-list").html("");

	// create the binded data (clone of received date)
	seapalListDataBinded = createBindingListData(seapalListData, getEmpyData(), getInfoData());

	$.link.seapalListTemplate("#seapal-list", seapalListDataBinded);
	
	// add the form validations
	jQuery(".seapal-edit").validationEngine();


	for (var item in seapalListDataBinded) {
		addFunctionsToListitem(seapalListDataBinded[item].dataId);
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
	
	// Hover states on the navigation (first header item)
	$("#seapal-list .seapal-header .seapal-navigation a").hover(function() {
		$(this).addClass("seapal-navigation-hover");
	}, function() {
		$(this).removeClass("seapal-navigation-hover");
	});
	
	// allow following link instead of toggeling
	$("#seapal-list .seapal-header .seapal-navigation a").click(function(event) {
		event.stopPropagation();
		// prevent toggling collapsion
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
	var oneTabIsOpen = $(this).find('.ui-state-active').length;
	var otherTabWillBeOpened = ui.newHeader.length;
	
	if (seapalListItemEditing) {
		return false;
	}
	if (otherTabWillBeOpened) {
		var newTabElementNr = $(this).find(".seapal-header").index(ui.newHeader[0]);
		if (newTabElementNr === 0) {
			seapalListItemEditingRequestId = "new";
		}
	}
	
	if (seapalListItemEditingRequestId == null) {
		return true;
	}
	itemEdit(seapalListItemEditingRequestId);
	seapalListItemEditingRequestId = null;
	
	// if the requested edit panel is already open, do not close it
	if (otherTabWillBeOpened == false) {
		return false;
	}
	return true;
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
		modal : true,
		buttons : {
			"Löschen" : function() {
				$(this).dialog("close");
				ajaxDelete(seapalAjaxDeleteUrl, itemId, seapalDataLoaded);
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
		//$("#seapal-list").accordion("activate", -1)
		setBindingData(seapalListDataBinded, getEmpyData(), "new");
		return true;
	});
}

function processUserDataManipulation(itemId) {
	var tNewData = getEmpyData();
	getDataFromDataList(seapalListDataBinded, tNewData, itemId);
	if (itemId == "new") {
		tNewData['dataId'] = "NULL";
	}
	ajaxUpdateCreate(seapalAjaxEditUrl, tNewData, seapalDataLoaded);
}