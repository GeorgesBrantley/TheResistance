/*eslint-env browser, jquery*/
var roomNum = sessionStorage.getItem("roomNum");
var leader;
console.log(roomNum);
function getList() {
	
	//denote current leader
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("GET", "/" + roomNum + "/getLeader");
	xmlhttp.send(null);
	console.log("/getLeader: " + xmlhttp.responseText);
	leader = xmlhttp.responseText.name;
	var str = "Current leader is " + leader;
	document.getElementById("leader").innerHTML = str;
	
	//create selectable list
	xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("GET", "/" + roomNum + "/getPlayers");
	xmlhttp.send(null);
	console.log("/getPlayers: " + xmlhttp.responseText);
	var players = xmlhttp.responseText;
	
	console.log("Size of players: " + players.length);
	for(var x = 0; x < players.length; x++) {
		var option = document.createElement("option");
		option.value = x;
		option.innerHTML = players[x].name;
		
		document.getElementById("playerList").appendChild(option);
	}
}