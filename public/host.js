
/*eslint-env browser, jquery*/
console.log("running js");
var url = "resistancegame.mybluemix.net";
var roomNum;

//get room number
window.onload = function getRoom() {

	$.get( "/host", function( data ) {
	document.getElementById("RoomNum").innerHTML = data;
	roomNum = data;
	});
	
	
	$.get("/" + roomNum + "/getLeaderList", function( data ){
		
		var round1 = document.getElementById(round1);
		var round2 = document.getElementById(round2);
		var round3 = document.getElementById(round3);
		var round4 = document.getElementById(round4);
		var round5 = document.getElementById(round5);
	});
};


//get initial game info
