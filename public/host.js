
/*eslint-env browser, jquery*/
console.log("running js");
var roundNumbers = [[2, 3, 2, 3, 3],
					[2, 3, 4, 3, 4],
					[2, 3, 3, 4, 4], 
					[3, 4, 4, 5, 5], 
					[3, 4, 4, 5, 5],
					[3, 4, 4, 5, 5]];

var roundCircles = [];

var currentRoundInfo;
var currentRound = 1, currSpyWins = 0, currResWins = 0;

var players;

//get room number
window.onload = function getRoom() {
	
	if (sessionStorage.getItem('gameNum') === null) {
		$.get("/host", function(data) {
			var room = parseInt(data.substring(1), 10);
			sessionStorage.gameNum = room;
			console.log(sessionStorage.gameNum);
		});
	}
	
	$.get('/' + sessionStorage.gameNum + '/getLeaderList', function(data) {
			console.log(JSON.stringify(data));
			players = data;
			console.log(JSON.stringify(players));
	}, false);

	var roomNumThing = document.getElementById('RoomNumHeader');
	roomNumThing.innerHTML = "Game: ";
	roomNumThing.innerHTML = roomNumThing.innerHTML + sessionStorage.gameNum;
	
	var numberTexts = [];
	numberTexts.push(document.getElementById('round1Num'));
	numberTexts.push(document.getElementById('round2Num'));
	numberTexts.push(document.getElementById('round3Num'));
	numberTexts.push(document.getElementById('round4Num'));
	numberTexts.push(document.getElementById('round5Num'));		
	
	var numPlayers = sessionStorage.numPlayers;
		
	for(i = 0; i < numberTexts.length; i++) {
		numberTexts[i].innerHTML = roundNumbers[numPlayers-5][i];
	}
	
	$(document).ready(function() {
		roundCircles.push(document.getElementById('round1Cir'));
		roundCircles.push(document.getElementById('round2Cir'));
		roundCircles.push(document.getElementById('round3Cir'));
		roundCircles.push(document.getElementById('round4Cir'));
		roundCircles.push(document.getElementById('round5Cir'));
	});
	
	console.log("got to the build\n");
	buildTable();
	pull();
};

function buildTable() {

	var table = document.createElement('table');
	console.log("Size of players HOST: " + players.length);
	for(var x = 0; x < players.length; x++) {
	    var tr = document.createElement('tr'); 
  		var td = document.createElement('td');
   		var text = document.createTextNode(players[x].name);
   		  
   		if(players[x].teamLeader === 1) {
   			td.style.backgroundColor = "green";			
   		} else if (players[x].mission === 1) {
   			td.style.backgroundColor = "yellow";
   		} else {
   			td.style.backgroundColor = "white";
   		}
   		
   		text.style.color = "black";
		td.style.border= "1px solid white";
        td.appendChild(text);
		td.style.textAlign="center";
		td.setAttribute('id', 'playerCell' + x);
		tr.appendChild(td);
		table.appendChild(tr);
	}

	table.style.border="2px solid white";
	table.style.paddingTop="10px";
	table.style.textAlign="left";
	document.getElementById('playerListRow').appendChild(table);
}

function pull() {
	var roomid = sessionStorage.gameNum;
	 window.setInterval(function () {
        // get from the server
        
     	$.get('/' + roomid + '/getHost', function(data) {
			console.log(data);
			currentRoundInfo = data;
			}, false);
		
		var thisRoundLoc = currentRoundInfo.indexOf("Current Round: ") + 15;		
		var spyWinsLoc = currentRoundInfo.indexOf("Spy Wins: ") + 10;
		var resWinsLoc = currentRoundInfo.indexOf("Resistance Wins: ") + 17;
		
		var thisRound = parseInt(currentRoundInfo.substring(thisRoundLoc), 10);
		var spyWins = parseInt(currentRoundInfo.substring(spyWinsLoc), 10);
		var resWins = parseInt(currentRoundInfo.substring(resWinsLoc), 10);
		console.log("thisRound= " + thisRound
					+ "\nspyWins= " + spyWins
					+ "\nresWins= " + resWins + "\n");
		if (thisRound > currentRound) {
			console.log("in if statement\n");
			console.log("Current round: " + currentRound);
			if (spyWins > currSpyWins) {
				roundCircles[currentRound-1].setAttribute('src', 'images/blueCircle.png');
				currSpyWins = spyWins;
				var spyPara = document.getElementById('spyPara');
				spyPara.innerHTML = "Spy Wins: " + currSpyWins + "/3";
			} else {
				roundCircles[currentRound-1].setAttribute('src', 'images/redCircle.png');
				currResWins = resWins;
				var resPara = document.getElementById('resPara');
				resPara.innerHTML = "Resistance Wins: " + currResWins + "/3";
			}
			currentRound = thisRound;
			roundCircles[currentRound-1].setAttribute('src', 'images/greenCircle.png');
		}
		
		if (currSpyWins === 3) {
			window.location.href = "SpyWin.html";
		}
		if (currResWins === 3) {
			window.location.href = "ResWin.html";
		}
		
		$.get('/' + roomid + '/getLeaderList', function(data) {
			console.log(JSON.stringify(data));
			players = data;
			}, false);
		
		updateTable();
	}, 5000); // repeat forever, polling every 3 seconds
}

function updateTable() {
	for(var x = 0; x < players.length; x++) {
  		var td = document.getElementById('playerCell' + x);
   		if(players[x].teamLeader === 1) {
   			td.style.backgroundColor = "green";			
   		} else if (players[x].mission === 1) {
   			td.style.backgroundColor = "yellow";
   		} else {
   			td.style.backgroundColor = "white";
   		}
	}
}































































































































