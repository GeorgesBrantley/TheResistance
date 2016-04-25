
/*eslint-env browser, jquery*/
console.log("running js");
var url = "resistancegame.mybluemix.net";

var roundNumbers = [[2, 3, 2, 3, 3],
					[2, 3, 4, 3, 4],
					[2, 3, 3, 4, 4], 
					[3, 4, 4, 5, 5], 
					[3, 4, 4, 5, 5],
					[3, 4, 4, 5, 5]];

//get room number
window.onload = function getRoom() {
	
	$.get("/host", function(data) {	
		var roomNumThing = document.getElementById('RoomNumHeader');
		roomNumThing.innerHTML = "Game: " + data;
		sessionStorage.roomNum = data;
	});

	
	var roundCircles = [];
	roundCircles.push(document.getElementById('round1Cir'));
	roundCircles.push(document.getElementById('round2Cir'));
	roundCircles.push(document.getElementById('round3Cir'));
	roundCircles.push(document.getElementById('round4Cir'));
	roundCircles.push(document.getElementById('round5Cir'));
	
	var numberTexts = [];
	numberTexts.push(document.getElementById('round1Num'));
	numberTexts.push(document.getElementById('round2Num'));
	numberTexts.push(document.getElementById('round3Num'));
	numberTexts.push(document.getElementById('round4Num'));
	numberTexts.push(document.getElementById('round5Num'));		
	
	while (sessionStorage.numPlayer === null) {
		console.log("in while loop");
		continue;
	}
	
	var numPlayers = sessionStorage.numPlayers;
		
	for(i = 0; i < numberTexts.length; i++) {
		numberTexts[i].innerHTML = roundNumbers[numPlayers-5][i];
	}
};


//get initial game info
