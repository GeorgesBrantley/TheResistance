/*eslint-env browser, jquery*/

//players array
var roomNum = 0;
var players = [];

function startGame() {
	
	
	console.log("startGame");
	
	//get all players
	for(var x = 1; x < 11; x++) {
		var playerName = document.getElementById("name" + x).value;
		var playerNum = document.getElementById("number" + x).value;
		if(playerName !== "") {
			//create player object
			var current = {};
			current.name = playerName;
			current.side = 0;
			current.mission = 0;
			current.phone = playerNum;
			
			console.log(current);
			
			//add current to array 
			players[x - 1] = current;
		}
	}

	//get room number
	roomNum = document.getElementById("roomNum").value;

	//safety checks
	if(roomNum < 0 || roomNum === "") {
		return null;
	}
	//make sure enough players have been entered
	if(players.length < 5 || players.length > 10) {
		return null;
	}
	
	console.log(roomNum);
	console.log(players.toString());
	
	//json to be posted
	var json = {"room": roomNum, "playersList": players};
   
	
	console.log('HERE: '+ json);
	
	//post data to server
	$.post( "/join", json, function(data) {
		console.log(data);
	});

}
	
