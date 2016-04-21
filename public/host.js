
/*eslint-env browser, jquery*/
console.log("running js");
var url = "resistancegame.mybluemix.net";

window.onload = function getRoom() {

	var v = url.concat("/host");
	console.log(v);
	$.get( v, function( data ) {
	console.log( "Data Loaded: " + data );
	document.getElementById("RoomNum").innerHTML = data;
	});
	//document.getElementById("RoomNum").innerHTML = a;
};