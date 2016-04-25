/*eslint-env browser, jquery*/
var roomNum = sessionStorage.getItem("roomNum");
var players;
var numSelected = 0;
var checkboxes = [];

console.log(roomNum);
function getList() {

	$.get( "/" + roomNum + "/getLeader", function( data ) {
		var str = "Current leader is " + data.name;
		document.getElementById("leader").innerHTML = str;
	});

	
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
	
/*	for(var x = 0; x < checkboxes.length; x++) {
		checkboxes[x].onclick = function() {
			select(x);
		};
	}*/
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
		  checkBox.value = x;
		  checkBox.onchange = function() {
		  	select(x);
		  };
		  checkboxes.push(checkBox);
		  td1.style.border= "1px solid white";
		  td.style.border= "1px solid white";
		  td1.appendChild(checkBox);
		  td.appendChild(text);
		  td.style.textAlign="left";
		  tr.appendChild(td1);
		  tr.appendChild(td);
		  table.appendChild(tr);
	}
	 var ftr = document.createElement('tr'); 
  	 var ftd = document.createElement('td');
  	 var fbutton = document.createElement('input');
  	 fbutton.value="Vote on mission";
  	 fbutton.type="button";
  	 fbutton.innerHTML="Vote on mission";
  		fbutton.setAttribute("onclick", function() { window.location.href="vote.html"; });
  	 ftd.appendChild(fbutton);
  	ftr.appendChild(ftd);
	table.appendChild(ftr);
	
	table.style.border="2px solid white";
	table.style.paddingTop="10px";
	table.style.textAlign="left";
	document.body.appendChild(table);
}

function select(value) {
	var selected = {name:players[value].name};
	console.log("selected: " + selected);
	//send update to server
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", "/" + roomNum + "/select");
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(selected));
	console.log("Post response: " + xmlhttp.responseText);
	
	
	
	//test who is on the mission
	$.get( "/" + roomNum + "/whoMission", function( data ) {
		console.log("whoMission: " + data);
	});
}
