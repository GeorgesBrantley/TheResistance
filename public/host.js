/*eslint-env browser */
app.console.log("running js");
var room = getRoom();

function getRoom() {
	var a = "Room Number: djafklj";
	app.console.log("getRoom");
	window.getElementById("RoomNum").innerHTML = a;
	return a;
}