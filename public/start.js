
/*eslint-env browser, jquery*/
console.log("running js");


window.onload = function getRoom() {
	
	if (sessionStorage.getItem('gameNum') === null) {
		$.get("/host", function(data) {
			console.log("Data: " + data);
			var room = parseInt(data.substring(1), 10);
			console.log("Room: " + room);
			sessionStorage.gameNum = room;
			console.log("GameNum: " + sessionStorage.gameNum);
		});
	}

	var roomNumThing = document.getElementById('RoomNumHeader');
	roomNumThing.innerHTML = "Game: ";
	roomNumThing.innerHTML = roomNumThing.innerHTML + sessionStorage.gameNum;
			
	
};

function gotoHost() {
	$.get("/" + sessionStorage.gameNum + "/getLeaderList", function(data) {
		sessionStorage.numPlayers = data.length;
		if (data.length > 0) window.location.href="host.html";
	});
}