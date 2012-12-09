/**
 * javascript file with the functions for the logbooks page
 */

var seapalListItemEditing = false;
var seapalListItemEditingRequestId = -1;
var seapalListData = null;

$(function() {
	$(document).ajaxStart($("#seapal-list").blockUI).ajaxStop($("#seapal-list").unblockUI);
	loadLogbooks();
});

function loadLogbooks() {
	$.getJSON('server/php/logbooks_get.php', function(data) {
		seapalListData = data;
		logbooksLoaded();
	});
}

function logbooksLoaded() {
	// clear list
	$("#seapal-list").html("");

	// add items to list
	$("#seapal-list").append(createLogbookHtmlElementNew());
	addFunctionsToListItemAdd();

	for (var i = 0; i < seapalListData.length; i++) {
		$("#seapal-list").append(createLogbookHtmlElement(seapalListData[i], seapalListData[i].logbookId));
		addFunctionsToListitem(seapalListData[i].logbookId);
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

function itemEdit(itemId) {
	if (seapalListItemEditing) {
		return;
	}
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
	setLogbookHtmlElementEditData(getLogbookHtmlElementReadonlyData(itemId), itemId);
}

function addFunctionsToListitem(itemId) {
	$("#seapal-list-item-" + itemId + "-edit").click(function(e) {
		seapalListItemEditingRequestId = itemId;
		return true;
	});

	$("#seapal-list-item-" + itemId + "-remove").click(function(e) {
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
		setLogbookHtmlElementEditData(getEmpyData(), "new");
		return false;
		// prevent toggling collapsion
	});
}

function processUserDataManipulation(itemId) {
	var tNewData = getLogbookHtmlElementEditData(itemId);
	if (itemId == "new") {
		tNewData['logbookId'] = "NULL";
	}
	
	$.ajax({
		url : "server/php/logbook_edit.php",
		type : "POST",
		dataType : "json",
		contentType : "application/json",
		data : tNewData,
		success : function() {
			alert("success :-)");
		},
		error : function() {
			alert("fail :-(");
		}
	});
}

/*
 var jsonVar = {

 };*/

function getTestData() {
	return {
		"shipname" : "Vergin",
		"shiptype" : "X44",
		"shipowner" : "HTWG Konstanz",
		"shipregisternumber" : "12GEFD",
		"sailsign" : "12GEFD",
		"homeport" : "12GEFD",
		"yachtclub" : "12GEFD",
		"insurance" : "12GEFD",
		"callsign" : "12GEFD",
		"constructer" : "12GEFD",
		"length" : "12GEFD",
		"engine" : "asdasd",
		"width" : "12GEFD",
		"gauge" : "12GEFD",
		"mastheight" : "12GEFD",
		"expulsion" : "12GEFD",
		"rigtype" : "12GEFD",
		"constructionyear" : "12GEFD",
		"size_fueltank" : "12GEFD",
		"size_watertank" : "12GEFD",
		"size_sewagetank" : "12GEFD",
		"size_mainsail" : "12GEFD",
		"size_genua" : "12GEFD",
		"size_spi" : "12GEFD",
		"logbookId" : 0
	};
}

function getEmpyData() {
	return {
		"shipname" : "",
		"shiptype" : "",
		"shipowner" : "",
		"shipregisternumber" : "",
		"sailsign" : "",
		"homeport" : "",
		"engine" : "",
		"yachtclub" : "",
		"insurance" : "",
		"callsign" : "",
		"constructer" : "",
		"length" : "",
		"width" : "",
		"gauge" : "",
		"mastheight" : "",
		"expulsion" : "",
		"rigtype" : "",
		"constructionyear" : "",
		"size_fueltank" : "",
		"size_watertank" : "",
		"size_sewagetank" : "",
		"size_mainsail" : "",
		"size_genua" : "",
		"size_spi" : "",
		"logbookId" : "null"
	};
}

function getInfoData() {
	return {
		"shipname" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Name"
		},
		"shiptype" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Typ"
		},
		"shipowner" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Eigner"
		},
		"shipregisternumber" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Registernr."
		},
		"sailsign" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Segelzeichen"
		},
		"homeport" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Heimathafen"
		},
		"engine" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Motor"
		},
		"yachtclub" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Yachtclub"
		},
		"insurance" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Versicherung"
		},
		"callsign" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Rufzeichen"
		},
		"constructer" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Kunstrukteur"
		},
		"length" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Länge"
		},
		"width" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Breite"
		},
		"gauge" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Tiefgang"
		},
		"mastheight" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Masthöhe"
		},
		"expulsion" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Verdrängung"
		},
		"rigtype" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Rigart"
		},
		"constructionyear" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Konstruktionsjahr"
		},
		"size_fueltank" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Tankgröße"
		},
		"size_watertank" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Wassertankgröße"
		},
		"size_sewagetank" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Abwassertankgröße"
		},
		"size_mainsail" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Großsegelgröße"
		},
		"size_genua" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Genuagröße"
		},
		"size_spi" : {
			"checkfunction" : null,
			"infotext" : "",
			"labeltext" : "Spigröße"
		}
	};
}

/* data format:
*
*
*/

// operation functions

function setLogbookHtmlElementEditData(data, itemId) {
	for (var key in data) {
		var tEl = $("#seapal-list-item-" + itemId + "-input-" + key);
		tEl.val(data[key]);
	}
}

function setLogbookHtmlElementReadonlyData(data, itemId) {
	for (var key in data) {
		var tEl = $("#seapal-list-item-" + itemId + "-readonly-" + key);
		tEl.text(data[key]);
	}
}

function getLogbookHtmlElementEditData(itemId) {
	var data = getEmpyData();
	for (var key in data) {
		var tEl = $("#seapal-list-item-" + itemId + "-input-" + key);
		data[key] = tEl.val();
	}
	return data;
}

function getLogbookHtmlElementReadonlyData(itemId) {
	var data = getEmpyData();
	for (var key in data) {
		var tEl = $("#seapal-list-item-" + itemId + "-readonly-" + key);
		data[key] = tEl.text();
	}
	return data;
}

// creation functions

function createLogbookHtmlElementNew() {
	var data = getEmpyData();
	var infoData = getInfoData();
	data["logbookId"] = "new";
	var tNewHtmlString = '';
	// heaer
	tNewHtmlString += '<div class="seapal-header">';
	tNewHtmlString += '<div class="seapal-nr-' + data["logbookId"] + '">';
	tNewHtmlString += '<span class="seapal-ship-icon" > </span>';

	// readonly header
	tNewHtmlString += '<div class="seapal-readonly">';
	tNewHtmlString += '<div class="seapal-' + data["logbookId"] + '-item">'
	tNewHtmlString += '<span class="ui-icon ui-icon-plus"> </span>Neues Logbuch';
	tNewHtmlString += '</div>';
	tNewHtmlString += '</div>';

	tNewHtmlString += createLogbookHtmlElementHeaderEdit(data, infoData);

	tNewHtmlString += '</div>';
	tNewHtmlString += '</div>';

	// content
	tNewHtmlString += '<div class="seapal-content">';
	tNewHtmlString += '<div class="seapal-nr-' + data["logbookId"] + '">';

	// readonly
	tNewHtmlString += '<div class="seapal-readonly">';
	tNewHtmlString += '</div>';

	tNewHtmlString += createLogbookHtmlElementContentEdit(data, infoData);

	tNewHtmlString += '</div>';
	tNewHtmlString += '</div>';

	return tNewHtmlString;
}

function createLogbookHtmlElement(data) {
	var infoData = getInfoData();
	var tNewHtmlString = '';
	// heaer
	tNewHtmlString += '<div class="seapal-header">';
	tNewHtmlString += '<div class="seapal-nr-' + data["logbookId"] + '">';
	tNewHtmlString += '<span class="seapal-ship-icon" > </span>';

	tNewHtmlString += createLogbookHtmlElementHeaderReadonly(data, infoData);
	tNewHtmlString += createLogbookHtmlElementHeaderEdit(data, infoData);

	tNewHtmlString += '</div>';
	tNewHtmlString += '</div>';

	// content
	tNewHtmlString += '<div class="seapal-content">';
	tNewHtmlString += '<div class="seapal-nr-' + data["logbookId"] + '">';

	tNewHtmlString += createLogbookHtmlElementContentReadonly(data, infoData);
	tNewHtmlString += createLogbookHtmlElementContentEdit(data, infoData);

	tNewHtmlString += '</div>';
	tNewHtmlString += '</div>';

	return tNewHtmlString;
}

// common generations functions

function createInputFieldName(data, fieldname) {
	return 'seapal-list-item-' + data["logbookId"] + '-input-' + fieldname;
}

function createReadonlyFieldName(data, fieldname) {
	return 'seapal-list-item-' + data["logbookId"] + '-readonly-' + fieldname;
}

// header generation functions

function createLogbookHtmlElementHeaderReadonlyField(data, fieldname) {
	var tNewHtmlString = '';
	var tValueName = createReadonlyFieldName(data, fieldname);
	tNewHtmlString += '<div class="seapal-' + fieldname + '" id="' + tValueName + '">' + data[fieldname] + '</div>';
	return tNewHtmlString;
}

function createLogbookHtmlElementHeaderEditField(data, fieldname) {
	var tNewHtmlString = '';
	var inputName = createInputFieldName(data, fieldname);
	tNewHtmlString += '<div class="seapal-' + fieldname + '">';
	tNewHtmlString += '<input type="text" id="' + inputName + '" value="' + data[fieldname] + '"/>';
	tNewHtmlString += '<span class="seapal-info"> </span>';
	tNewHtmlString += '</div>';
	return tNewHtmlString;
}

function createLogbookHtmlElementHeaderReadonly(data, infoData) {
	var tNewHtmlString = '';
	// readonly
	tNewHtmlString += '<div class="seapal-readonly">';
	tNewHtmlString += createLogbookHtmlElementHeaderReadonlyField(data, "shipname");
	tNewHtmlString += createLogbookHtmlElementHeaderReadonlyField(data, "shiptype");
	tNewHtmlString += createLogbookHtmlElementHeaderReadonlyField(data, "shipowner");
	tNewHtmlString += createLogbookHtmlElementHeaderReadonlyField(data, "shipregisternumber");
	tNewHtmlString += '<div class="seapal-actions">';
	tNewHtmlString += '<div id="seapal-list-item-' + data["logbookId"] + '-edit" class="ui-state-default ui-corner-all" title="Bearbeiten">';
	tNewHtmlString += '<span class="ui-icon ui-icon-pencil"> </span>';
	tNewHtmlString += '</div>';
	tNewHtmlString += '<div id="seapal-list-item-' + data["logbookId"] + '-remove" class="ui-state-default ui-corner-all" title="Löschen">';
	tNewHtmlString += '<span class="ui-icon ui-icon-trash"> </span>';
	tNewHtmlString += '</div>';
	tNewHtmlString += '</div>';
	tNewHtmlString += '</div>';

	return tNewHtmlString;
}

function createLogbookHtmlElementHeaderEdit(data, infoData) {
	var tNewHtmlString = '';
	// readonly
	tNewHtmlString += '<div class="seapal-edit">';
	tNewHtmlString += createLogbookHtmlElementHeaderEditField(data, "shipname");
	tNewHtmlString += createLogbookHtmlElementHeaderEditField(data, "shiptype");
	tNewHtmlString += createLogbookHtmlElementHeaderEditField(data, "shipowner");
	tNewHtmlString += createLogbookHtmlElementHeaderEditField(data, "shipregisternumber");
	tNewHtmlString += '<div class="seapal-actions">';
	tNewHtmlString += '<div id="seapal-list-item-' + data["logbookId"] + '-save" class="ui-state-default ui-corner-all" title="Speichern">';
	tNewHtmlString += '<span class="ui-icon ui-icon-check"> </span>';
	tNewHtmlString += '</div>';
	tNewHtmlString += '<div id="seapal-list-item-' + data["logbookId"] + '-cancel" class="ui-state-default ui-corner-all" title="Bearbeiten abbrechen">';
	tNewHtmlString += '<span class="ui-icon ui-icon-closethick"> </span>';
	tNewHtmlString += '</div>';
	tNewHtmlString += '</div>';
	tNewHtmlString += '</div>';

	return tNewHtmlString;
}

// content generation functions

function createLogbookHtmlElementContentReadonlyField(data, infoData, fieldname) {
	var tNewHtmlString = '';
	var tSpanValueName = createReadonlyFieldName(data, fieldname);
	tNewHtmlString += '<span class="seapal-label">' + infoData[fieldname].labeltext + '</span>';
	tNewHtmlString += '<span class="seapal-field" id="' + tSpanValueName + '">' + data[fieldname] + '</span>';
	return tNewHtmlString;
}

function createLogbookHtmlElementContentEditField(data, infoData, fieldname) {
	var tNewHtmlString = '';
	var inputName = createInputFieldName(data, fieldname);
	tNewHtmlString += '<label for="' + inputName + '">' + infoData[fieldname].labeltext + '</label>';
	tNewHtmlString += '<input type="text" id="' + inputName + '" name="' + inputName + '" value="' + data[fieldname] + '"/>';
	return tNewHtmlString;
}

function createLogbookHtmlElementContentFields(data, infoData, contentFieldFunction) {
	var tNewHtmlString = '';
	// general
	tNewHtmlString += '<div class="seapal-general">';
	tNewHtmlString += contentFieldFunction(data, infoData, "sailsign") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "homeport") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "yachtclub") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "insurance") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "callsign") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "constructer");
	tNewHtmlString += '</div>';
	// size
	tNewHtmlString += '<div class="seapal-sizes">';
	tNewHtmlString += contentFieldFunction(data, infoData, "length") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "width") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "gauge") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "mastheight") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "expulsion") + '<br />';
	tNewHtmlString += '</div>';
	// equipment
	tNewHtmlString += '<div class="seapal-equipment">';
	tNewHtmlString += contentFieldFunction(data, infoData, "rigtype") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "constructionyear") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "engine") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "size_fueltank") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "size_watertank") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "size_sewagetank") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "size_mainsail") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "size_genua") + '<br />';
	tNewHtmlString += contentFieldFunction(data, infoData, "size_spi");
	tNewHtmlString += '</div>';

	return tNewHtmlString;
}

function createLogbookHtmlElementContentReadonly(data, infoData) {
	var tNewHtmlString = '';
	// readonly
	tNewHtmlString += '<div class="seapal-readonly">';
	tNewHtmlString += createLogbookHtmlElementContentFields(data, infoData, createLogbookHtmlElementContentReadonlyField);
	tNewHtmlString += '</div>';

	return tNewHtmlString;
}

function createLogbookHtmlElementContentEdit(data, infoData) {
	var tNewHtmlString = '';
	// edit
	tNewHtmlString += '<div class="seapal-edit">';
	tNewHtmlString += createLogbookHtmlElementContentFields(data, infoData, createLogbookHtmlElementContentEditField);
	tNewHtmlString += '<input type="hidden" id="' + createInputFieldName(data, "logbookId") + '" value="' + data["logbookId"] + '">';
	tNewHtmlString += '</div>';

	return tNewHtmlString;
}

