/*eslint-env browser, jquery*/

function voteFail() {
	//Vote failed
	//do post VOTE 
	//Go back to mission Select
	
	console.log("Vote Failed");
	var id = sessionStorage.getItem('roomNum');
	var address = '/' +id + '/vote';
	var json = {vote:1};
	
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", address);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(json));
	
	if (xmlhttp.responseText === 'SPIES WIN GAME') {
		//spys ahve won!
		console.log('SPYS WIN!');
	}
	
	//move team leader
	address = '/' +id + '/nextLeader';
	$.get( address, function() {
	});


}
	
