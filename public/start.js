
/*eslint-env browser, jquery*/
console.log("running js");
var gameNumLocal = -1;


window.onload = function getRoom() {
	
	console.log("GameNum Before: " + sessionStorage.getItem('gameNum'));
	
	if (sessionStorage.getItem('gameNum') === null) {
		$.get("/host", function(data) {
			console.log("Data: " + data + "\n");
			var room = parseInt(data.substring(1), 10);
			console.log("Room: " + room + "\n");
			sessionStorage.setItem("gameNum", room);
			gameNumLocal = room;
			console.log("GameNum: " + sessionStorage.gameNum + "\n");
		});
	}

	var roomNumThing = document.getElementById('RoomNumHeader');
	roomNumThing.innerHTML = "Game: ";
	console.log(sessionStorage.gameNum);
	//while(sessionStorage.gameNum === null) continue;
	roomNumThing.innerHTML = roomNumThing.innerHTML + gameNumLocal;
			
	
};

function gotoHost() {
	$.get("/" + sessionStorage.gameNum + "/getLeaderList", function(data) {
		sessionStorage.numPlayers = data.length;
		if (data.length > 0) window.location.href="host.html";
	});
}