const roombaPathing = (pathing = "empty") => {
	if(pathing == 'empty'){
		console.log("No Data was Provided")
	}
	else{
		var fs = require('fs')
		var textFileData = fs.readFileSync(pathing.toString(), 'utf8').split('\n');


		var roomSize = textFileData[0].split(" ");
		roomSize[0] = parseInt(roomSize[0])
		roomSize[1] = parseInt(roomSize[1])




		var currentPosition = textFileData[1].split(" ");
		currentPosition[0] = parseInt(currentPosition[0])
		currentPosition[1] = parseInt(currentPosition[1])



		var allDirt = getDirt(textFileData);
		var foundDirt = [];

		var directions = textFileData[textFileData.length-1];


		for(var i = 0; i < directions.length; i++){
			if(i == 0){
				var checkIfDirt = dirtHandling(currentPosition[0],currentPosition[1],allDirt,foundDirt)
				if(!isNullorEmpty(checkIfDirt)){
					foundDirt.push(checkIfDirt)
				}
				
			}
			var currentDirection = directions[i];
			if(currentDirection == 'N'){
				if(currentPosition[1] + 1 < roomSize[1]){
					currentPosition[1] = currentPosition[1] + 1
				}
				else{
					continue;
				}
				
			}
			else if(currentDirection == 'S'){
				if(currentPosition[1] - 1 >= 0){
				currentPosition[1] = currentPosition[1] - 1
			}
			else{
				continue;
			}
			}
			else if(currentDirection == 'E'){
				if(currentPosition[0] + 1 < roomSize[0]){
					currentPosition[0] = currentPosition[0] + 1
				}
				else{
					continue;
				}
			}
			else if(currentDirection == 'W'){
				if(currentPosition[0] - 1 >= 0){
					currentPosition[0] = currentPosition[0] - 1
				}
				else{
					continue;
				}
				
			}
			//If some instruction not NSEW is provided, skip that instruction
			else{
				continue;
			}

			checkIfDirt = dirtHandling(currentPosition[0],currentPosition[1],allDirt,foundDirt)
			if(!isNullorEmpty(checkIfDirt)){
				foundDirt.push(checkIfDirt)
			}

		}
		console.log(currentPosition[0] + " " + currentPosition[1] + "\n" + foundDirt.length)
	}
   
}

function getDirt(textFileData){
	var dirtPiles = [];
	for(var v = 2; v < textFileData.length - 1; v++){
		var currDirt = textFileData[v];
		if(dirtPiles.indexOf(currDirt) == -1){
			dirtPiles.push(currDirt)
		}
	}
	return dirtPiles
}

function dirtHandling(currentPositionX, currentPositionY, allDirt, foundDirt){
	var isDirt = currentPositionX + " " + currentPositionY
	if(allDirt.indexOf(isDirt) != -1 && foundDirt.indexOf(isDirt) == -1){
		return isDirt;
	}
	
}
function isNullorEmpty(checkVal) {
    if (checkVal != null && checkVal != undefined && checkVal != '') {
        return false;
    } else {
        return true;
    }
};

roombaPathing(process.argv[2]);