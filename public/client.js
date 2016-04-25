/*eslint-env browser, jquery*/
var roomNum = sessionStorage.getItem("roomNum");
var leader;
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
	xmlhttp2.open("GET", "/" + roomNum + "/getPlayers");
	xmlhttp2.send(null);
	console.log("/getPlayers: " + xmlhttp2.responseText);
	var players = xmlhttp2.responseText;
*/

	$.get( "/" + roomNum + "/getPlayers", function( data ) {
		console.log("Size of players: " + data.length);
		for(var x = 0; x < data.length; x++) {
			console.log("data[x].name = " + data[x].name);
			var option = document.createElement("option");
			option.value = x;
			option.innerHTML = data[x].name;
		
			document.getElementById("playerList").appendChild(option);
		}
	});
	
	
}