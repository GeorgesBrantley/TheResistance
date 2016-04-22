
/*eslint-env browser, jquery*/
console.log("running js");
var url = "resistancegame.mybluemix.net";
var roomNum;

//get room number
window.onload = function getRoom() {

	var v = url.concat("/host");
	console.log(v);
	$.get( "/host", function( data ) {
	document.getElementById("RoomNum").innerHTML = data;
	roomNum = data;
	sessionStorage.postItem('RoomNumber', roomNum);
	});
};

//get initial game info
