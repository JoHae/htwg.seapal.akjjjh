
// data operation functions

function createBindingListData(backendListDataArray, newItemData, infoData) {
	var tData = jQuery.extend(true, {}, backendListDataArray);
	var tBindingData = new Array();
	// add the new item to the list
	tBindingData.push(newItemData);
	for (var item in tData) {
		tBindingData.push(tData[item]);
	}
	for (var item in tBindingData) {
		// add the info structure
		tBindingData[item]["info"] = infoData;
	}
	return tBindingData;
}

function setBindingData(bindingDataList, data, itemId) {
	for (var key in bindingDataList) {
		if (bindingDataList[key].dataId == itemId) {
			$.observable(bindingDataList[key]).setProperty(data);
			return;
		}
	}
}

function getDataFromDataList(dataList, data, itemId) {
	for (var key in dataList) {
		if (dataList[key].dataId == itemId) {
			for (var dataKey in data) {
				data[dataKey] = dataList[key][dataKey];
			}
			return;
		}
	}
}

function createBindingData(backendData, infoData) {
 var tData = jQuery.extend(true, {}, backendData);
 tData.info = infoData;
 return tData;
}

function getDataFromBindedData(bindedData, copiedData) {
 for (var dataKey in copiedData) {
  copiedData[dataKey] = bindedData[dataKey];
 }
 return;
}