/*eslint-env browser, jquery*/

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
			if(playerNum === "") {
				current.phone = 0;
			} else {
				current.phone = playerNum;
			}
			current.teamLeader = 0;
			
			//add current to array 
			players.push(current);
		}
	}

	//get room number
	roomNum = document.getElementById("roomNum").value;
	//sessionStorage.setItem("roomNum", roomNum);
	sessionStorage.setItem("numPlayers", players.length);

	//safety checks
	if(roomNum < 0 || roomNum === "") {
		return null;
	}
	//make sure enough players have been entered
	if(players.length < 5 || players.length > 10) {
		return null;
	}

	var json = {"room": roomNum, "playersList": players};
	
	//post data to server
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", "/join");
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(json));
	console.log(xmlhttp.responseText);
	
	//switch pages
	window.location.href = "client.html";
}
	
