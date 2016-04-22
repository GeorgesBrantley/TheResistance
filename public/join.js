/*eslint-env browser, jquery*/

//players array
var roomNum = 0;
var players = [];

function startGame() {
	
	//get all players
	for(var x = 1; x < 11; x++) {
		var playerName = document.getElementById("name" + x).value;
		var playerNum = document.getElementById("number" + x).value;
		console.log(playerName);
		if(playerName != "") {
			players[x - 1] = playerName;
		}
	}

	//get room number
	roomNum = document.getElementById("roomNum").value;

	//safety checks
	if(roomNum < 0 || roomNum == "") {
		return null;
	}
	//make sure enough players have been entered
	if(players.length < 5 || players.length > 10) {
		return null;
	}
	
	console.log(roomNum);
	console.log(players);
	
	//json to be posted
	var json;
	json.room = roomNum;
	json.playerList = players;
	
	console.log(json);
	
	//post data to server
	$.post( "/join", json);
}
	
