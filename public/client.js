/*eslint-env browser, jquery*/
var roomNum = sessionStorage.getItem("roomNum");
console.log(roomNum);
function getLeader() {
		var leader;
		$.get( "/" + roomNum + "/getLeader" , function( data ) {
			leader = data;
			console.log(data);
		});
		console.log(leader);
		var str = "Current leader is " + leader;
		document.getElementById("leader").innerHTML = str;
}