app.console.log("running js");
var d = req.body;
var room = getRoom();

function getRoom() {
	var a = "Room Number: djafklj";
	app.console.log("getRoom");
	d.getElementById("RoomNum").innerHTML = a;
	return a;
}