var d = req.body;
var room = getRoom();

function getRoom() {
	var a = "Room Number: djafklj";
	d.getElementById("RoomNum").innerHTML = a;
	return a;
}