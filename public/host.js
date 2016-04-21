/*eslint-env browser, jquery*/
console.log("running js");

window.onload = function getRoom() {
	var a = "Room Number: djafklj";
	console.log("getRoom");
	console.log(a);
	document.getElementById("RoomNum").innerHTML = a;
}