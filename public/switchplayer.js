/*eslint-env browser, jquery*/
var roomNum = sessionStorage.getItem("roomNum");

function getNextPlayer() {
	var player = sessionStorage.getItem("currentNum");
	//if mission has just started
	if(player === null || player === "") 
		player = 0;
	else {
		player++;
	}
	//check to see if mission is over
	var numPeopleOnMission = sessionStorage.getItem("maxPlayers") - 1;
	console.log("maxtimes: " + numPeopleOnMission);
	console.log("Player: " + player);
	if(player === numPeopleOnMission){
		endMission();
	}
/*   	$.get( "/" + roomNum + "/whoMission", function( data ) {
		var str = "Pass the phone to " + data[player].name;
		document.getElementById("par").innerHTML = str;
	});
*/
	//build player table
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "/" + roomNum + "/whoMission", true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	function processRequest(data) {
		if(xhr.readyState === 4 && xhr.status === 200) {
			var str = "Pass the phone to " + JSON.parse(xhr.response)[player].name;
			document.getElementById("par").innerHTML = str;
		}
	}

	//update for next player
	sessionStorage.setItem("currentNum", player);
}


function endMission() {
	//mission is over
	//check if pass or fail (Certian rounds require multiple fails)
	var reqFails;
	var fails = sessionStorage.getItem("failCount");
	var xhr1 = new XMLHttpRequest();
	xhr1.open('GET', "/" + roomNum + "/DoubleJ", true);
	xhr1.send();
	xhr1.onreadystatechange = processRequest1;
	function processRequest1(data) {
		if(xhr1.readyState === 4 && xhr1.status === 200) {
			reqFails = xhr1.responseText;
		}
	}
	
	//check if spies win round
	if(reqFails === 1 && fails >= 2 || reqFails === 0 && fails >= 1) {
		//mission is failed, spies win round
		var xhr2 = new XMLHttpRequest();
		xhr2.open('GET', "/" + roomNum + "/spyWin", true);
		xhr2.send();
		//check if game is over
		if (xhr2.responseText === 'spies WINS GAME') {
			//spys ahve won!
			console.log('SPYS WIN!');
			window.location.href = "SpyWin.html";
		}
	} else {
		var xhr3 = new XMLHttpRequest();
		xhr3.open('GET', "/" + roomNum + "/resWin", true);
		xhr3.send();	
		//check if game is over
		if (xhr3.responseText === 'resistance WINS GAME') {
			//Resistance ahve won!
			console.log('RESISTANCE WIN!');
			window.location.href = "ResWin.html";
		}
	}
	
	continueGame();
}

function continueGame() {
	var id = sessionStorage.getItem('roomNum');
	
	//move team leader
	var address = '/' +id + '/nextLeader';
	var xhr = new XMLHttpRequest();
	xhr.open('GET', address, true);
	xhr.send();
	
	window.location.href = "client.html";
}
	