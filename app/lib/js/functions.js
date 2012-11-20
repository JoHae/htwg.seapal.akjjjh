function checkNorth() {
	north = document.getElementById("position_north").value;
	/*
	 * Tests:
	 * 0°12.23 -> ok
	 * 90° 59.59 -> ok
	 * 91° 34.56 -> ungültig
	 * 103° -> ungültig
	 *
	 */

	/*
	 * erste Zahl kann noch nicht aus einer einzigen Ziffer bestehen... Warum nicht??
	 */
	if (north.match(/^(([\d]|[0-8]?[\d]|90)([°]?|[\s]?|[°][\s])([0-5]?[\d])?([.]?|[\s]?)([0-5]?[\d])[']?)$/)) {
		north_regex = $[/^(([\d]|[0-8]?[\d]|90)([°]?|[\s]?|[°][\s])([0-5]?[\d])?([.]?|[\s]?)([0-5]?[\d])[']?)$/];
		alert("ok " + north_regex);
		document.getElementById("position_north").value = "ok";

	} else {
		alert("Bitte gültige North-Position eingeben");
	}
}

function checkEast() {
	east = document.getElementById("position_east").value;
	/*
	 * erste Zahl kann noch nicht aus einer einzigen Ziffer bestehen... Warum nicht??
	 */
	if (east.match(/^(([\d]|[01]?[0-8]?[\d]|180)([°]?|[\s]?|[°][\s])([0-5]?[\d])?([.]?|[\s]?)([0-5]?[\d])[']?)$/)) {
		alert("ok");
	} else {
		alert("Bitte gültige East-Position eingeben");
	}
}

function checkCOG() {
	cog = document.getElementById("cog").value;
	if (!cog.match(/^([0-2]?[\d]{1,2}.[\d]|[3][0-5][\d].[\d])$/)) {
		alert("Bitte gültigen COG-Wert eingeben! Format: ZZZ.Z von 0.0 bis 359.9");
	}
}

function checkSOG() {
	sog = document.getElementById("sog").value;
	if (!sog.match(/^([01]?[0-7]?[\d]{1,2}.[\d]|[1][8][0-5][1].[0-8])$/)) {
		alert("Bitte gültigen SOG-Wert eingeben! Format: ZZZZ.Z von 0.0 bis 1851.8");
	}
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
 * @param {Object} formattFunction
 */
function editNodeText(regex, inputField, helpSpan, helpMessage, formattFunction) {
	var input = inputField.value;

	if (helpSpan != null) {
		// Remove any warnings that may exist
		while (helpSpan.firstChild)
		helpSpan.removeChild(helpSpan.firstChild);
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
	if (formattFunction != null)
		inputField.value = formattFunction(input);
	return true;
}

function isCoordinatesOk(inputField, helpSpan) {
	var tRegEx = /^(\d|([0-8]\d)|90)([°.](([0-5]\d?(.\d\d?)?)|60(.00?)?)['`]?)?\s?[NS]\s?(0{0,2}\d\d?|1([0-7]\d)|180)([°.](([0-5]\d?(.\d\d?)?)|60(.00?)?)['`]?)?\s?[EW]$/
	return editNodeText(tRegEx, inputField, helpSpan, "Enter valid Coordinates. For example: 47°49.89'N 009°00.50'E", formattCoordinates);
}

function removeStringUntilNextNumbers(input) {
	var tRegEx = /\d/;
	var tMatch = tRegEx.exec(input);
	return input.substr(tMatch.index);
}

function isCoordinateFinished(input) {
	tRegEx = /^\D*[NSEW]/;
	return tRegEx.test(input);
}

function removeLatitude(input) {
	var tRegEx = /N/;
	var tMatch = tRegEx.exec(input);
	return input.substr(tMatch.index + 1);
}

function formattCoordinate(input) {
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

	tRegEx = /[NSWE]/;
	tMatch = tRegEx.exec(input);
	var tDirection = input.substr(tMatch.index, 1);

	var tRetArray = new Array(4);
	tRetArray[0] = tDegree;
	tRetArray[1] = tMinutes;
	tRetArray[2] = t100DivMinutes;
	tRetArray[3] = tDirection;

	return tRetArray;
}

function formattCoordinates(input) {
	var tRegEx = /[NS]/;
	var tMatch = tRegEx.exec(input);

	var tLat = formattCoordinate(input.substr(0, tMatch.index + 1));
	var tLong = formattCoordinate(input.substr(tMatch.index + 1));

	var tFormattedString = pad(tLat[0], 2) + "°" + pad(tLat[1], 2) + "." + pad(tLat[2], 2) + "'" + tLat[3] + " ";
	tFormattedString += pad(tLong[0], 3) + "°" + pad(tLong[1], 2) + "." + pad(tLong[2], 2) + "'" + tLong[3];

	return tFormattedString;
}

function pad(num, size) {
	var s = "000000000" + num;
	return s.substr(s.length - size);
}
