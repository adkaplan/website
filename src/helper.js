function filterBy(data,identifier,column) {
	var returnArray = [];
	for (var i = data.length - 1; i >= 0; i--) {
		if(data[i][column] == identifier) {
            returnArray.push(new Array(data[i],i));
		}
	};
	return returnArray;
}
