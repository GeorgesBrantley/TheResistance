/*eslint-env browser, jquery*/
var roomNum = sessionStorage.getItem("roomNum");
var players;

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
	
	//show # players to select
	$.get( "/" + roomNum + "/totalSelected", function( data ) {
		var str = "Select " + data.charAt(2) + " players to go on the mission.";
		document.getElementById("description").innerHTML = str;
	});
	
	//build player table
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "/" + roomNum + "/getLeaderList", true);
	xhr.send();
 
	xhr.onreadystatechange = processRequest;
	function processRequest(data) {
		if(xhr.readyState === 4 && xhr.status === 200) {
			players = JSON.parse(xhr.response);
			console.log(players[0].name);
			buildTable();
		}
	}
}

function buildTable() {
	var table = document.createElement('table');
	console.log("Size of players: " + players.length);
	for(var x = 0; x < players.length; x++) {
		  var tr = document.createElement('tr'); 
  		  var td = document.createElement('td');
  		  var td1 = document.createElement('td');
   		  var text = document.createTextNode(players[x].name);
   		  
		  var checkBox = document.createElement('input');
		  checkBox.type = "checkbox";
		  checkBox.value = text;
		  td1.appendChild(checkBox);
		  td.appendChild(text);
		  tr.appendChild(td);
		  tr.appendChild(td1);
		  table.appendChild(tr);
	}
	 var ftr = document.createElement('tr'); 
  	 var ftd = document.createElement('td');
  	 var fbutton = document.createElement('button');
  	 fbutton.value="Vote on mission";
  	 fbutton.innerHTML="Vote on mission";
  	 ftd.appendChild(fbutton);
  	ftr.appendChild(ftd);
	table.appendChild(ftr);
	
	table.style.border="2px solid white";
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