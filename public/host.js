
/*eslint-env browser, jquery*/
console.log("running js");
var url = "resistancegame.mybluemix.net";

var roundNumbers = [[2, 3, 2, 3, 3],
					[2, 3, 4, 3, 4],
					[2, 3, 3, 4, 4], 
					[3, 4, 4, 5, 5], 
					[3, 4, 4, 5, 5],
					[3, 4, 4, 5, 5]];

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
	
	var numPlayers = sessionStorage.numPlayers;
		
	for(i = 0; i < numberTexts.length; i++) {
		numberTexts[i].innerHTML = roundNumbers[numPlayers-5][i];
	}
	
	pull();
};


function pull() {
	var roomid = sessionStorage.gameNum;
	 window.setInterval(function () {
        // get from the server
        
     	$.get('/' + roomid + '/getHost', function(data) {
			console.log(data);
			}, false);
		$.get('/' + roomid + '/getLeaderList', function(data) {
			console.log(JSON.stringify(data));
			}, false);
    }, 5000); // repeat forever, polling every 3 seconds
}

