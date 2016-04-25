
/*eslint-env browser, jquery*/
console.log("running js");
//var url = "resistancegame.mybluemix.net";
var roomNum;

function askServer() {
	return $.get("/" + roomNum + "/getLeaderList").length;
}

//get room number
window.onload = function getData() {

	$.get( "/host", function( data ) {
	document.getElementById("RoomNum").innerHTML = data;
	roomNum = data;
	});
	
	var dataLength = 0;
	var trf = 0;
	while (trf <10) {
		console.log("dataLength=" + dataLength);
		dataLength = setTimeout(askServer, 1000);
		trf++;
	}
	window.location.href = "/host.html";
};


//get initial game info
