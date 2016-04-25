
/*eslint-env browser, jquery*/
console.log("running js");
var roundNumbers = [[2, 3, 2, 3, 3],
					[2, 3, 4, 3, 4],
					[2, 3, 3, 4, 4], 
					[3, 4, 4, 5, 5], 
					[3, 4, 4, 5, 5],
					[3, 4, 4, 5, 5]];

var roundCircles = [];

var currentRoundInfo;
var currentRound = 0, currSpyWins = 0, currResWins = 0;

/*function askServer() {
	return $.get("/" + sessionStorage.gameNum + "/getLeaderList", function(data) {
		if (data.length === 0) {
			return false;
		} 
		return true;
	});
}*/

//get room number
window.onload = function getRoom() {
	
	if (sessionStorage.getItem('gameNum') === null) {
		$.get("/host", function(data) {
			var room = parseInt(data.substring(1), 10);
			sessionStorage.gameNum = room;
			console.log(sessionStorage.gameNum);
		});
	}

	var roomNumThing = document.getElementById('RoomNumHeader');
	roomNumThing.innerHTML = "Game: ";
	roomNumThing.innerHTML = roomNumThing.innerHTML + sessionStorage.gameNum;
	
	var numberTexts = [];
	numberTexts.push(document.getElementById('round1Num'));
	numberTexts.push(document.getElementById('round2Num'));
	numberTexts.push(document.getElementById('round3Num'));
	numberTexts.push(document.getElementById('round4Num'));
	numberTexts.push(document.getElementById('round5Num'));		
	
	var numPlayers = sessionStorage.numPlayers;
		
	for(i = 0; i < numberTexts.length; i++) {
		numberTexts[i].innerHTML = roundNumbers[numPlayers-5][i];
	}
	
	roundCircles.push(document.getElementById('round1Cir'));
	roundCircles.push(document.getElementById('round2Cir'));
	roundCircles.push(document.getElementById('round3Cir'));
	roundCircles.push(document.getElementById('round4Cir'));
	roundCircles.push(document.getElementById('round5Cir'));
	
	pull();
};


function pull() {
	var roomid = sessionStorage.gameNum;
	 window.setInterval(function () {
        // get from the server
        
     	$.get('/' + roomid + '/getHost', function(data) {
			console.log(data);
			currentRoundInfo = data;
			}, false);
		$.get('/' + roomid + '/getLeaderList', function(data) {
			console.log(JSON.stringify(data));
			}, false);
			
		var thisRoundLoc = currentRoundInfo.indexOf("Current Round: ") + 15;		
		var spyWinsLoc = currentRoundInfo.indexOf("Spy Wins: ") + 10;
		var resWinsLoc = currentRoundInfo.indexOf("Resistance Wins: ") + 17;
		
		var thisRound = parseInt(currentRoundInfo.substring(thisRoundLoc), 10);
		var spyWins = parseInt(currentRoundInfo.substring(spyWinsLoc), 10);
		var resWins = parseInt(currentRoundInfo.substring(resWinsLoc), 10);
		console.log("thisRound= " + thisRound
					+ "\nspyWins= " + spyWins
					+ "\nresWins= " + resWins + "\n");
		if (thisRound > currentRound) {
			console.log("in if statement\n");
			console.log("Current round: " + currentRound);
			if (spyWins > currSpyWins) {
				roundCircles[currentRound].setAttribute('src', 'images/blueCircle.png');
				currSpyWins = spyWins;
			} else {
				roundCircles[currentRound].setAttribute('src', 'images/redCircle.png');
				currResWins = resWins;
			}
			currentRound = thisRound;
			roundCircles[currentRound].setAttribute('src', 'images/greenCircle.png');
		}
	}, 5000); // repeat forever, polling every 3 seconds
}































































































































