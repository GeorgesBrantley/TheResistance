
/*eslint-env browser, jquery*/
console.log("running js");


window.onload = function getRoom() {
	
	if (sessionStorage.getItem('gameNum') === null) {
		$.get("/host", function(data) {
			var room = parseInt(data.substring(1), 10);
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
		window.location.href="host.html";
	});
}