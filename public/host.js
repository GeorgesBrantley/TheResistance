
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
		
		//var round1 = document.getElementById(round1Cir);
		//var round2 = document.getElementById(round2Cir);
		//var round3 = document.getElementById(round3Cir);
		//var round4 = document.getElementById(round4Cir);
		//var round5 = document.getElementById(round5Cir);
	});
};


//get initial game info
