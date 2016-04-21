
/*eslint-env browser, jquery*/
console.log("running js");
var url = "resistancegame.mybluemix.net";

window.onload = function getRoom() {

	
	$.get( url.concat("/host"), function( data ) {
	alert( "Data Loaded: " + data );
	document.getElementById("RoomNum").innerHTML = data;
	});
	//document.getElementById("RoomNum").innerHTML = a;
};