
/*eslint-env browser, jquery*/
console.log("running js");
var url = "resistancegame.mybluemix.net";

window.onload = function getRoom() {

	var a = jQuery.get(url+"/host");
	document.getElementById("RoomNum").innerHTML = a;
};