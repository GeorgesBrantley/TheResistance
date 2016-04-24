/*eslint-env browser, jquery*/

//players array
var roomNum = 0;
var players = [];

function startGame() {
	
	players = [];
	
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
			players.push(current);
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
	

	//json to be posted
	var json = {"room": "r", "playersList": "p"};
	var js = JSON.stringify(json);	
	var test1 = json.room;
	var test2 = json.playersList;
	console.log('\nJOIN\nPLAYERS: ' + players+ '\nJson: '+ json + '\nStringJS: '+ js+'\n'
				+ '\nObjectRoom: ' + test1 + '\nObjectList: ' +test2);

	
	//post data to server
	$.post( "/join", json, function(data) {
		console.log(data);
	});

}
	
