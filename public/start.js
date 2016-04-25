
/*eslint-env browser, jquery*/
console.log("running js");
//var url = "resistancegame.mybluemix.net";

function askServer() {
	return $.get("/" + sessionStorage.roomNum + "/getLeaderList").length;
}

//get room number
window.onload = function getData() {

	$.get( "/host", function( data ) {
	document.getElementById("RoomNum").innerHTML = data;
	sessionStorage.roomNum = data;
	});
	
	var dataLength = askServer();
	console.log("dataLength=" + dataLength + "OUTSIDE");
	while (dataLength === 0) {
		console.log("dataLength=" + dataLength + "INSIDE");
		dataLength = setTimeout(askServer, 1000);
	}
	window.location.href = "/host.html";
};


//get initial game info
