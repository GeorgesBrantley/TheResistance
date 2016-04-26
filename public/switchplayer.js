/*eslint-env browser, jquery*/

function endMission() {
	//mission is over
	//check if pass or fail (Certian rounds require multiple fails)
	var reqFails;
	var fails = sessionStorage.getItem("failCount");
	var xhr1 = new XMLHttpRequest();
	xhr1.open('GET', "/" + roomNum + "/DoubleJ", true);
	xhr1.send();
	xhr1.onreadystatechange = processRequest;
	function processRequest(data) {
		if(xhr1.readyState === 4 && xhr1.status === 200) {
			reqFails = xhr1.responseText;
		}
	}
	
	//check if spies win round
	if((reqFails === 1 && fails >= 2) || (reqFails === 0 && fails >= 1)) {
		//mission is failed, spies win round
		var xhr2 = new XMLHttpRequest();
		xhr2.open('GET', "/" + roomNum + "/spyWin", true);
		xhr2.send();
		//check if game is over
		if (xhr2.responseText === 'spies WINS GAME') {
			//spys ahve won!
			console.log('SPYS WIN!');
			window.location.href = "SpyWin.html";
		}
	} else {
		var xhr3 = new XMLHttpRequest();
		xhr3.open('GET', "/" + roomNum + "/resWin", true);
		xhr3.send();	
		//check if game is over
		if (xhr3.responseText === 'resistance WINS GAME') {
			//Resistance ahve won!
			console.log('RESISTANCE WIN!');
			window.location.href = "ResWin.html";
		}
	}
	
	continueGame();
}

function continueGame() {
	var id = sessionStorage.getItem('roomNum');
	
	//move team leader
	var address = '/' +id + '/nextLeader';
	var xhr = new XMLHttpRequest();
	xhr.open('GET', address, true);
	xhr.send();
	
	window.location.href = "client.html";
}
	