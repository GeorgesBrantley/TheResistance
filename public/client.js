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
/*	var xmlhttp2 = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp2.open("GET", "/" + roomNum + "/getLeaderList");
	xmlhttp2.send(null);
	console.log("/getLeaderList: " + JSON.parse(xmlhttp2.responseText));
	players = JSON.parse(xmlhttp2.responseText);
*/

	$.get( "/" + roomNum + "/getLeaderList", function( data ) {
		players = data;
	});


	var table = document.createElement('table');
	console.log("Size of players: " + players.length);
	for(var x = 0; x < players.length; x++) {
		  var tr = document.createElement('tr'); 
  		  var td = document.createElement('td');
   		  var text = document.createTextNode(players[x].name);

		  td.appendChild(text);
		  tr.appendChild(td);
		  table.appendChild(tr);
	}
	document.body.appendChild(table);
	
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