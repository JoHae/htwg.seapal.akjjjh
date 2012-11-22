function isCoordinateOk(inputField, helpSpan) {
	var tRegEx = /^(\d|([0-8]\d)|90)([°.](([0-5]\d?(.\d\d?)?)|60(.00?)?)['`]?)?\s?[NnSs]\s?(0{0,2}\d\d?|1([0-7]\d)|180)([°.](([0-5]\d?(.\d\d?)?)|60(.00?)?)['`]?)?\s?[EeWw]$/;
	return editNodeText(tRegEx, inputField, helpSpan, "Enter valid Coordinates. For example: 47°49.89'N 009°00.50'E", formatCoordinates);
}

function checkCOG(cog) {
	var regex = /^([0-2]?[\d]{1,2}.[\d]|[3][0-5][\d].[\d])$/;
	var cogval = cog.value;
	if (cogval.match(regex)) {
		if (cogval.indexOf(".") == 2) {
			cogval = "0" + cogval;
		}
		if (cogval.indexOf(".") == 1) {
			cogval = "00" + cogval;
		}
		cog.value = cogval;
	} else {
		alert("Bitte gültigen Course over Ground-Wert zwischen 000.0 und 359.9 eingeben! Beispiel: 234.2");
	}
}

function checkSOG(sog) {
	alert("sog");
	var regex = /^([01]?[0-7]?[\d]{1,2}.[\d]|[1][8][0-5][1].[0-8])$/;
	var sogval = sog.value;
	var sognew = "";
	if (sogval.match(regex)) {
		// for(int i = 2; i >= 0; i--) {
		// alert(i);
		// if(sogval.indexOf(".") == i+1) {
		// sognew += "0";
		// }
		if (sogval.indexOf(".") == 3) {
			sogval = "0" + sogval;
		}
		if (sogval.indexOf(".") == 2) {
			sogval = "00" + sogval;
		}
		if (sogval.indexOf(".") == 1) {
			sogval = "000" + sogval;
		}		// }
		sogval = sognew + sogval;
		sog.value = sogval;
	} else {
		alert("Bitte gültigen Speed over Ground-Wert zwischen 0.0 und 1851.8 eingeben! Beispiel: 1234.2");
	}
}

function setTimestamp(str) {
	var time = document.getElementById(str);
	var date = new Date();
	var days = date.getDate();
	var months = date.getMonth()+1;
	var years = date.getFullYear();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	if(seconds <= 9) {
		var formattedTime = days + "." + months + "." + years + ", " + hours + ':' + minutes + ':0' + seconds;
	}
	else {
		var formattedTime = days + "." + months + "." + years + ", " + hours + ':' + minutes + ':' + seconds;		
	}

	time.innerHTML = formattedTime;
}

/**
 * Checks if an input field fits to an regular expression. If not a message can
 * be printed to an help span element. If the input is ok an function for formatting
 * the input and replace it can be specified.
 * @param {Object} regex
 * Expression for the input value.
 * @param {Object} inputField
 * Input objekt, with the input text.
 * @param {Object} helpSpan
 * @param {Object} helpMessage
 * @param {Object} formatFunction
 */
function editNodeText(regex, inputField, helpSpan, helpMessage, formatFunction) {
	var input = inputField.value;

	if (helpSpan != null) {
		// Remove any warnings that may exist
		while (helpSpan.firstChild) {
			helpSpan.removeChild(helpSpan.firstChild);
		}
	}

	// See if the visitor entered the right information
	if (!regex.test(input)) {
		// If the wrong information was entered, warn them
		if (helpSpan != null) {
			// Add new warning
			helpSpan.appendChild(document.createTextNode(helpMessage));
			return false;
		}

	}
	// If the right information was entered
	if (formatFunction != null)
		inputField.value = formatFunction(input);
	return true;
}

function removeStringUntilNextNumbers(input) {
	var tRegEx = /\d/;
	var tMatch = tRegEx.exec(input);
	return input.substr(tMatch.index);
}

function isCoordinateFinished(input) {
	tRegEx = /^\D*[NnSsEeWw]/;
	return tRegEx.test(input);
}

function removeLatitude(input) {
	var tRegEx = /N/;
	var tMatch = tRegEx.exec(input);
	return input.substr(tMatch.index + 1);
}

function formatCoordinate(input) {
	var tMatch;
	var tRegEx;
	var tCurrInput = input;

	// converted values
	var tDegree;
	var tMinutes;
	var t100DivMinutes;

	tCurrInput = removeStringUntilNextNumbers(tCurrInput);
	// get first numbers until next character is a letter
	tRegEx = /\D/;
	tMatch = tRegEx.exec(tCurrInput);
	tDegree = tCurrInput.substr(0, tMatch.index);
	tCurrInput = tCurrInput.substr(tMatch.index);
	// Check if latitude is finished
	if (isCoordinateFinished(tCurrInput)) {
		tMinutes = 0;
		t100DivMinutes = 0;
	} else {
		// remove . or °
		tCurrInput = removeStringUntilNextNumbers(tCurrInput);
		// get next numbers
		tRegEx = /\D/;
		tMatch = tRegEx.exec(tCurrInput);

		if (tMatch.index > 2) {
			tMinutes = tCurrInput.substr(0, 2);
			t100DivMinutes = tCurrInput.substring(2, tMatch.index);
		} else {
			tMinutes = tCurrInput.substr(0, tMatch.index);
			tCurrInput = tCurrInput.substr(tMatch.index);
			if (isCoordinateFinished(tCurrInput)) {
				t100DivMinutes = 0;
			} else {
				// remove .
				tCurrInput = removeStringUntilNextNumbers(tCurrInput);
				// get next numbers
				tRegEx = /\D/;
				tMatch = tRegEx.exec(tCurrInput);
				t100DivMinutes = tCurrInput.substr(0, tMatch.index);
			}
		}
	}

	tRegEx = /[NnSsWwEe]/;
	tMatch = tRegEx.exec(input);
	var tDirection = input.substr(tMatch.index, 1);

	var tRetArray = new Array(4);
	tRetArray[0] = tDegree;
	tRetArray[1] = tMinutes;
	tRetArray[2] = t100DivMinutes;
	tRetArray[3] = tDirection;

	return tRetArray;
}

function formatCoordinates(input) {
	var tRegEx = /[NnSs]/;
	var tMatch = tRegEx.exec(input);

	var tLat = formatCoordinate(input.substr(0, tMatch.index + 1));
	var tLong = formatCoordinate(input.substr(tMatch.index + 1));

	var tFormattedString = pad(tLat[0], 2) + "°" + pad(tLat[1], 2) + "." + pad(tLat[2], 2) + "'" + tLat[3] + " ";
	tFormattedString += pad(tLong[0], 3) + "°" + pad(tLong[1], 2) + "." + pad(tLong[2], 2) + "'" + tLong[3];

	return tFormattedString;
}

function pad(num, size) {
	var s = "000000000" + num;
	return s.substr(s.length - size);
}
