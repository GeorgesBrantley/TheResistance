/*eslint-env browser, jquery*/
var roomNum = sessionStorage.getItem("roomNum");
var players = [];

console.log(roomNum);
function getList() {
	
	//denote current leader
/*	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("GET", "/" + roomNum + "/getLeader", true);
	xmlhttp.send(null);
	console.log("/getLeader: " + xmlhttp.responseText.name);
	leader = xmlhttp.responseText.name;
	
	*/
	$.get( "/" + roomNum + "/getLeader", function( data ) {
		var str = "Current leader is " + data.name;
		document.getElementById("leader").innerHTML = str;
	});
	

	//create selectable list
	var xmlhttp2 = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp2.open("GET", "/" + roomNum + "/getPlayers");
	xmlhttp2.send(null);
	console.log("/getPlayers: " + xmlhttp2.responseText);
	players = xmlhttp2.responseText;


/*	$.get( "/" + roomNum + "/getLeaderList", function( data ) {
		players = data;
	});
*/

	var table = document.getElementById("playerList");
	console.log("Size of players: " + players.length);
	for(var x = 0; x < players.length; x++) {
		console.log("data[x].name = " + players[x].name);
		var row = table.insertRow(x);
		var cell1 = row.insertCell(0);
		cell1.innerHTML = players.name[x];
	}
	
}
/*
function getPlayers() {
	$.get( "/" + roomNum + "/getLeaderList", function( data ) {
		if(data === "" || data === null) {
			getPlayers();
		}
		console.log("data: " + data);
		players = data;
	});
}
*/