

function ajaxGet(serviceUrl, successFunction) {
	$.ajax({
		url : serviceUrl,
		type : "GET",
		dataType : "json",
		cache : false,
		data : null,
		success : function(data, textStatus, jqXHR) {
			successFunction(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("fail :-(\n" + textStatus + " " + errorThrown);
		}
	});
}


// serviceUrl = "server/php/logbook_edit.php"
function ajaxUpdateCreate(serviceUrl, newData, successFunction) {
	$.ajax({
		url : serviceUrl,
		type : "POST",
		dataType : "json",
		cache : false,
		data : newData,
		success : function(data, textStatus, jqXHR) {
			successFunction(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("fail :-(\n" + textStatus + " " + errorThrown);
		}
	});
}

/**
 * 
 * 
 */
function ajaxDelete(serviceUrl, removeId, successFunction) {
	$.ajax({
		url : serviceUrl,
		type : "POST",
		dataType : "json",
		cache : false,
		data : {
			"removeId" : removeId
		},
		success : function(data, textStatus, jqXHR) {
			successFunction(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("fail :-(\n" + textStatus + " " + errorThrown);
		}
	});
}