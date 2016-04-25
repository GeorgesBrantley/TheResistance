
/*eslint-env browser, jquery*/
console.log("running js");
var url = "resistancegame.mybluemix.net";
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
	while (dataLength === 0) {
		dataLength = setTimeout(askServer, 1000);
	}
	window.location.href = url + "/host.html";
};


//get initial game info
