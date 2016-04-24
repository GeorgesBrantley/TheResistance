/*eslint-env browser, jquery*/
var roomNum = sessionStorage.getItem("roomNum");
console.log(roomNum);
function getLeader() {
		console.log("/" + roomNum + "/getLeader");
		$.get( "/" + roomNum + "/getLeader" , function( data ) {
			var leader = data.name;
			console.log("data: " + data);
			console.log("leader: " + leader);
			var str = "Current leader is " + leader;
			document.getElementById("leader").innerHTML = str;
		});
}