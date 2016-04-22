/*eslint-env browser, jquery*/

//players array
var roomNum = sessionStorage.getItem('RoomNumber');
var players = [];

function startGame() {
	
	//get all players
	for(var x = 1; x < 11; x++) {
		var playerName = document.getElementById("name" + x).value;
		var playerNum = document.getElementById("number1" + x).value;
		
		players[x - 1] = playerName;
	}
	console.log(roomNum);
	console.log(players);
	
	//make sure enough players have been entered
	if(players.length < 5 || players.length > 10) {
		return null;
	}
	
	//json to be posted
	var json;
	json.room = roomNum;
	json.playerList = players;
	
	//post data to server
	$.post( "/join", json);
}
	
