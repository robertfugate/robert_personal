const roombaPathing = (pathing = "empty") => {
	try{
		//If no text file is provided, end the process
	if(pathing == 'empty'){
		console.log("No Data was Provided")
	}
	else{
		//Parse file information into array
		var fs = require('fs')
		var textFileData = fs.readFileSync(pathing.toString(), 'utf8').split('\n');


		var roomSize = textFileData[0].split(" ");
		roomSize[0] = parseInt(roomSize[0])
		roomSize[1] = parseInt(roomSize[1])




		var currentPosition = textFileData[1].split(" ");
		currentPosition[0] = parseInt(currentPosition[0])
		currentPosition[1] = parseInt(currentPosition[1])


		//allDirt are all lines in the file outside of lines 0, 1, and the final line
		//foundDirt are the coordinate pairs of any dirt pile the Hoover has encountered
		var allDirt = getDirt(textFileData);
		var foundDirt = [];

		var directions = textFileData[textFileData.length-1];

		//Loop through all directions provided and move the Hoover accordingly checking for dirt
		//at the end of each instruction
		for(var i = 0; i < directions.length; i++){
			//Hoover is always on, check if starting position has dirt
			if(i == 0){
				var checkIfDirt = dirtHandling(currentPosition[0],currentPosition[1],allDirt,foundDirt)
				if(!isNullorEmpty(checkIfDirt)){
					foundDirt.push(checkIfDirt)
				}
				
			}

			//Movement actions given the current direction in the instructions.
			//Skip to the next direction if an instruction not NSEW is provided
			//Convert to upper case for data consistency; n,s,e,w are valid instructions given this
			//For S & W: confirm next move won't move outside lower bound (inclusive of zero)
			//For N & E: confirm next move won't move outside upper bound (exclusive of room size)
			var currentDirection = directions[i].toUpperCase();
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
			//If some instruction not NSEW/nsew is provided, skip that instruction
			else{
				continue;
			}

			//Check final coordinates of current instruction cycle and compare against all
			//possible dirt piles.
			//If coordinate contains a dirt pile, compare against previously found Dirt Piles
			//If this coordinate has not been previously found, add it to the array of found Dirt
			checkIfDirt = dirtHandling(currentPosition[0],currentPosition[1],allDirt,foundDirt)
			if(!isNullorEmpty(checkIfDirt)){
				foundDirt.push(checkIfDirt)
			}

		}

		//Final output of program. Final coordinates on line one, dirt piles cleaned on line 2
		console.log(currentPosition[0] + " " + currentPosition[1] + "\n" + foundDirt.length)
	}
	}
	catch (error) {
		console.error(error)
	}
	
   
}

//Compile all lines that aren't the Start Point [0], Hoover Position [1], and Directions [max] 
//into a single array. Used later to validate if current position is a dirt pile
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

//Given the current location coordinates, check to see if the current position has dirt on it
//as well as check that that coordinate hasn't already been cleaned for dirt.
//If coordinate has dirt and coordinate has not been cleaned, return the coordinate
function dirtHandling(currentPositionX, currentPositionY, allDirt, foundDirt){
	var isDirt = currentPositionX + " " + currentPositionY
	if(allDirt.indexOf(isDirt) != -1 && foundDirt.indexOf(isDirt) == -1){
		return isDirt;
	}
	
}

//Check if a value is null/empty/etc.
function isNullorEmpty(checkVal) {
    if (checkVal != null && checkVal != undefined && checkVal != '') {
        return false;
    } else {
        return true;
    }
};

roombaPathing(process.argv[2]);