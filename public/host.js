
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
	
	var roomNumThing = document.getElementById(roomNum);
	roomNumThing.innerHTML = "Game: " + sessionStorage.roomNum;
	
	
	var roundCircles = [];
	roundCircles.add(document.getElementById('round1Cir'));
	roundCircles.add(document.getElementById('round2Cir'));
	roundCircles.add(document.getElementById('round3Cir'));
	roundCircles.add(document.getElementById('round4Cir'));
	roundCircles.add(document.getElementById('round5Cir'));
	
	var numberTexts = [];
	numberTexts.add(document.getElementById('round1Num'));
	numberTexts.add(document.getElementById('round2Num'));
	numberTexts.add(document.getElementById('round3Num'));
	numberTexts.add(document.getElementById('round4Num'));
	numberTexts.add(document.getElementById('round5Num'));		
	
	while (sessionStorage.numPlayer === null) {
		continue;
	}
	
	var numPlayers = sessionStorage.numPlayers;
		
	for(i = 0; i < numberTexts.length; i++) {
		numberTexts[i].innerHTML = roundNumbers[numPlayers-5][i];
	};

	});
};


//get initial game info
