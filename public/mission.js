/*eslint-env browser, jquery*/
var roomNum = sessionStorage.getItem("roomNum");
var player = sessionStorage.getItem("currentNum");
var currentPlayer = {};
var failCount;

window.onload = function fillPage() {
	
	//get current player
	var xhr = new XMLHttpRequest();
			xhr.open('GET', "/" + roomNum + "/whoMission", true);
			xhr.send();
			xhr.onreadystatechange = processRequest;
			function processRequest(data) {
				if(xhr.readyState === 4 && xhr.status === 200) {
					currentPlayer = JSON.parse(xhr.response)[player];
				}
			}
			
	//set up fail counter
	failCount = sessionStorage.getItem("failCount");
	if(failCount === null || failCount === "") {
		failCount = 0;
	}
	
	
	var title = document.getElementById("title");
	title.innerHTML = "Hey, " + currentPlayer.name + "!";
	var instructions = document.getElementById("instructions");
	if(currentPlayer.side === 0) {
		instructions.innerHTML = "You are resistance. Continue the mission.";
		document.getElementById("fail").style.visibility="hidden";
	} else {
		instructions.innerHTML = "You are a spy. Do you want to sabatoge the mission?";
	}
};

function switchPagePass() {
	sessionStorage.setItem("failCount", failCount);	
	window.location.href = "switchplayer.html";
}
function switchPageFail() {
	//increment failCount
	failCount++;
	sessionStorage.setItem("failCount", failCount);	
	window.location.href = "switchplayer.html";
}
