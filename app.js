/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com

/*globals cfg */
var express = require('express');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
// create a new express server
var app = express();

//PARSER
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
app.use(jsonParser);

//TWILIO
var twilio = require('twilio');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


//TWILIO
var twilioSid, twilioToken;
/* UN COMMENT FOR REAL
twilioSid = 'AC381a729ec42aca8502006c902713e480';
twilioToken = '2de3f800821dcc635a2563472fc840f7';
*/
//NOTHING
twilioSid = 'AC51499ee21f97088d905d385e9096c686';
twilioToken = 'a5ebc151376ec3f15ea2810fc15ffb32';

var	twilioNUM = '+13175486514';
	
app.get('/txt', function (req, res) {
   var client = new twilio.RestClient(twilioSid, twilioToken);
  	var tonum ='+13174323028';
  	var fromnum = '+13175486514';
  	var message = 'dfsdfsds';
  client.sendMessage(
     {
         to: tonum,
         from: fromnum, 
         body: message
      }, 
      function(err, message) {
         if (err) {
            console.error("Problemrr+," +message);
            res.send("Errorrr" +"," +message);
         } else {
            res.send("yay?");
         }
      }
   );
});

//END TWILIO
//Game room Number
var gameRoom = 0;
var games = [];
//Create Game Object
function Game(gamecode) {
	//Game Room Number
	this.roomnum = gamecode;
	this.Players = [];
	this.playersNum = 0;
	this.numberOfSpies = 0;
	
	// The mission pile
	this.pot = 0;
	//Round of game 1 - 5
	this.round = 1;	
	//amount of people on mission
	this.chosen = 0;
	//Max amount of people who can go on mission
	this.maxChosen = [];
	//List of players in Team Leader Order
	this.Leaders = [];
	//List of people on mission
	this.Mission = [];
	
	this.spyWins = 0;
	this.resWins = 0;
	this.voteFails = 0;
}
app.get('/host', function (req, res) {
		res.send(gameRoom);
        var a = new Game(gameRoom);
		games[gameRoom] = a;
		gameRoom++;
});
//Add players to game, after game has been made
//Make them spies
app.post('/join', function (req, res) {
		var js = req.body;
		var roomNumber = js.room;
		var playersList = js.playersList;
		
		console.log('\nSERVER: ' +js 
					+'\nRoom: ' + roomNumber+ '\nPlayers: ' + playersList);
		
		var spy1, spy2, spy3, spy4;
		
		games[roomNumber].Players = playersList.slice(0);
		games[roomNumber].playersNum = games[roomNumber].Players.length;

		var S = games[roomNumber].playersNum;
		
		//LEADERS
		//Creates Leaders, list of numbers 0-(s-1)
		var Bnums = 0;
		while ( Bnums < S) {
			games[roomNumber].Leaders.push(Bnums);
			++Bnums;
		}
		//Leaders[0] has position of first Leader
		//Randomize leader
		for (var x = 0; x < S; ++x ) {
			var i = Math.floor(Math.random()*S);
			var temp = games[roomNumber].Leaders[x];
			games[roomNumber].Leaders[x] = games[roomNumber].Leaders[i];
			games[roomNumber].Leaders[i] = temp;
		}
		//MAKE TEAM LEADER:
		games[roomNumber].Players[games[roomNumber].Leaders[0]].teamLeader = 1;
		
		var namesOfSpies = ' ';
		//SET SPIES, SET ROUNDS
		if (S === 5 || S === 6) {
			games[roomNumber].numberOfSpies = 2;	
			//SET ROUNDS
			if (S === 5)
				games[roomNumber].maxChosen = [2,3,2,3,3];
			else
				games[roomNumber].maxChosen = [2,3,4,3,4];
			
				//Make them SPIES
				spy1 = Math.floor(Math.random()*S);
				do {
					spy2 = Math.floor(Math.random()*S);
				} while (spy2 === spy1);
				games[roomNumber].Players[spy1].side = 1;
				games[roomNumber].Players[spy2].side = 1;
				namesOfSpies = games[roomNumber].Players[spy1].name + ' ' + games[roomNumber].Players[spy2].name +'\n';
		} else if (S === 7 || S === 8 || S === 9) {
			games[roomNumber].numberOfSpies = 3;	
			//SET ROUNDS
			if (S === 7)
				games[roomNumber].maxChosen = [2,3,3,4,4];
			else if (S === 8)
				games[roomNumber].maxChosen = [3,4,4,5,5];
			else 
				games[roomNumber].maxChosen = [3,4,4,5,5];	
				
				//Make them SPIES
				spy1 = Math.floor(Math.random()*S);
				do {
					spy2 = Math.floor(Math.random()*S);
					spy3 = Math.floor(Math.random()*S);
				} while (spy2 === spy1 || spy3 === spy1 || spy2 === spy3);
				games[roomNumber].Players[spy1].side = 1;
				games[roomNumber].Players[spy2].side = 1;
				games[roomNumber].Players[spy3].side = 1;
				namesOfSpies = games[roomNumber].Players[spy1].name + ' ' + games[roomNumber].Players[spy2].name + ' ' + games[roomNumber].Players[spy3].name  +'\n';
		} else if (S === 10) {
			games[roomNumber].numberOfSpies = 4;		
			games[roomNumber].maxChosen = [3,4,4,5,5];
				//Make them SPIES
					spy1 = Math.floor(Math.random()*(S + 1));
					do {
						spy2 = Math.floor(Math.random()*S );
						spy3 = Math.floor(Math.random()*S);
						spy4 = Math.floor(Math.random()*S);
					} while (spy2 === spy1 || spy3 === spy1 || spy2 === spy3 || spy4 === spy1 || spy4 === spy2 || spy4 === spy3);
					games[roomNumber].Players[spy1].side = 1;
					games[roomNumber].Players[spy2].side = 1;
					games[roomNumber].Players[spy3].side = 1;
					games[roomNumber].Players[spy4].side = 1;
					namesOfSpies = games[roomNumber].Players[spy1].name + ' ' + games[roomNumber].Players[spy2].name + ' ' + games[roomNumber].Players[spy3].name  + ' ' + games[roomNumber].Players[spy4].name +'\n';
		} 
		
		//SEND TEXTS
		var peps = games[roomNumber].Players;
		for (var x = 0; x < S; ++x){
			var person = peps[x];
			var MM = ' ';
			if (peps[x].phone.length > 9) {
			//getMessage
			if (person.side === 0) {
				//if person is resistance
				MM = 'You are Resistance';
			} else {
				//if person is spy
				MM = 'You are a Spy\nThese are Your fellow Spies: ' + namesOfSpies;
			}
			var tonum = '+1'+person.phone;
			var sender = new twilio.RestClient(twilioSid, twilioToken);
			
			sender.sendMessage(
				{
					to:tonum,
					from:twilioNUM,
					body:MM
				}, function(err, message) {
				});
			}

		}
		
		//FINAL
		if (games[roomNumber].numberOfSpies < 2)
			res.send('Joining ERROR');
		else {
			res.send(games[roomNumber].playersNum + ' Have Joined, ' + games[roomNumber].numberOfSpies + ' are Spies!\n');
		}
});
app.get('/getGames', function (req, res) {
		res.send(games);		
});
//Gives information for hosting game.
//Should have all information
app.get('/:id/getHost', function (req, res) {
	var Id = req.params.id;
	
	var List = [];
	for(var x = 0; x < games[Id].playersNum; ++x) {
		List.push(games[Id].Players[games[Id].Leaders[x]]);
	}
	var doubleJepardy = '';
	if (games[Id].round === 4 && games[Id].playersNum >= 7)
		doubleJepardy = 'YES';
	else
		doubleJepardy = 'NO';
		
	res.send('Room Number: ' + games[Id].roomnum + '\n\n' +
			'Resistance Wins: '+ games[Id].resWins + '\n\n'+
			'Spy Wins: ' + games[Id].spyWins + '\n\n' +
			'Round Order: ' + games[Id].maxChosen + '\n\n' +
			'Current Round: ' + games[Id].round + '\n\n' + 
			'Players: ' + JSON.stringify(List) + '\n\n'+
			'Players Chosen/Max able to Choose: ' + games[Id].chosen + '/' +games[Id].maxChosen[games[Id].round-1] + '\n\n'
			+'Chosen Players: ' + games[Id].Mission + '\n' + 
			'Team Leader: ' + JSON.stringify(games[Id].Players[games[Id].Leaders[0]]) + '\n\n'+
			'Failed Votes: ' + games[Id].voteFails + '\n\n' +
			'Double Jepardy Right Now: ' + doubleJepardy + '\n\n');
			
			//Need to reset Players Chosen and Chosen Players every round
});

//GET THINGS
//GET PLAYERS
app.get('/:id/getPlayers', function (req, res) {
	var roomId = req.params.id;
	try {
		res.send(games[roomId].Players);
	} catch (err){
		console.log("error: " + err.message);
		res.send(null);
	}

});
//GET SPIES
app.get('/:id/getSpies', function (req, res) {
		var roomId = req.params.id;
		var spies = [];
		
		for (var x = 0; x < games[roomId].Players.length;++x) {
			if (games[roomId].Players[x].side === 1)
				spies.push(games[roomId].Players[x]);
		}
		res.send(spies);
});
//GET WINS
app.get('/:id/getWins', function (req, res) {
		var roomId = req.params.id;
		res.send('Spies: ' + games[roomId].spyWins + " Res: " + games[roomId].resWins + '\n');
});
//Get Spy or Resistance wins solo
app.get('/:id/getSpyWins', function (req, res) {
		var roomId = req.params.id;
		res.send(games[roomId].spyWins + '\n');
		});
app.get('/:id/getResWins', function (req, res) {
		var roomId = req.params.id;
		res.send(games[roomId].resWins + '\n');
		});
//Get if akward
app.get('/:id/DoubleJ', function (req, res) {
	//return 1 if need 2 fail cards
	var id = req.params.id;
	if (games[id].round === 4 && games[id].playersNum >= 7)
		res.send('1');
	else
		res.send('0');
});
//Update Wins, and Round
//HANDLES VICTORY
app.get('/:id/spyWin', function (req, res) {
		var roomId = req.params.id;
		games[roomId].spyWins++;

		var wins = games[roomId].spyWins;
		if (wins >= 3) {
			res.send('Spies WINS GAME\n');			
		}
		res.send('Spies Win Round ' + games[roomId].round + '\n');
		games[roomId].round++;
		
		//CLEARS!
		games[roomId].Mission = [];
		games[roomId].chosen = 0;
		games[roomId].voteFails = 0;
		
		for (var x = 0; x < games[roomId].Players.length ;x++)
			games[roomId].Players[x].mission = 0;
});
app.get('/:id/resWin', function (req, res) {
		var roomId = req.params.id;
		games[roomId].resWins++;
		var wins = games[roomId].resWins;
		if (wins >= 3) {
			res.send('Resistance WINS GAME\n')	;	
		}
		res.send('Resistance Win Round ' + games[roomId].round + '\n' );
		games[roomId].round++;
				
		//CLEARS!
		games[roomId].Mission = [];
		games[roomId].chosen = 0;
		games[roomId].voteFails = 0;
		
		for (var x = 0; x < games[roomId].Players.length ;x++)
			games[roomId].Players[x].mission = 0;
});

//MISSION PREGAME
//Select user to go on a mission
app.post('/:id/select', function (req, res) {
		var roomId = req.params.id;
		var json = req.body;
		var name = json.name;
		
		for (var x = 0; x < games[roomId].playersNum; ++x) {
			if (name === games[roomId].Players[x].name) {
					if (games[roomId].Players[x].mission === 0) {
						//put on mission
						if (games[roomId].chosen < games[roomId].maxChosen[games[roomId].round - 1]) {
							games[roomId].Players[x].mission = 1;
							res.send(name + ' has been Chosen!\n');
							games[roomId].chosen++;
						} else { res.send('Mission Full!\n');}
					} else {
						//take off mission
						games[roomId].Players[x].mission = 0;
						res.send(name + ' has been Unchosen!\n');
						games[roomId].chosen--;
					}
				break;			
			}
		}
		res.send('Selected\n');
});
//Get who is on mission
app.get('/:id/whoMission', function (req, res) {
		var roomId = req.params.id;
		var onMission = [];
		var a = 0;
		for (var x = 0; x < games[roomId].playersNum; ++x) {
			if (games[roomId].Players[x].mission === 1) {
				//player is going on mission
				onMission[a] = games[roomId].Players[x];
				++a;
			}	
		}
		games[roomId].Mission = onMission;
		res.send(JSON.stringify(onMission));
});
app.get('/:id/totalSelected', function(req, res) {
		var id = req.params.id;
		res.send('Players Chosen/Max able to Choose: ' + games[id].chosen + '/' +games[id].maxChosen[games[id].round - 1] + '\n');
});

//Mission Voting
//get # of vote Fails
app.get('/:id/getVote', function (req, res) {
		var roomId = req.params.id;
		res.send(games[roomId].voteFails);
});
//Handle voting, gets Fail or Success from user
app.post('/:id/vote', function (req, res) {
		var roomId = req.params.id;
		var json = req.body;
		var pass = json.vote;
		if (pass === 0) {
			//if failed
			games[roomId].voteFails++;
			if (games[roomId].voteFails >= 5) {
				res.send("SPIES WIN GAME\n");
			} else {
						//CLEARS!
				games[roomId].Mission = [];
				games[roomId].chosen = 0;
				games[roomId].voteFails++;
				for (var x = 0; x < games[roomId].Players.length ;x++)
					games[roomId].Players[x].mission = 0;
				res.send('Vote Fails!\n');
			}
			//NEED new team leader
		} else {
			//if passes
			games[roomId].voteFails = 0;
			res.send('Vote Passes!\n');
			//Go to mission?
		}
});

//LEADER
//GET LIST OF PLAYERS IN LEADER ORDER
app.get('/:id/getLeaderList', function(req, res) {
	var id = req.params.id;
	var List = [];
	
	for(var x = 0; x < games[id].playersNum; ++x) {
		List.push(games[id].Players[games[id].Leaders[x]]);
	}
	
	res.send(List);
});
//Make New Team Leader
//Remove previous Team Leader, shift everything up
app.get('/:id/nextLeader', function(req, res) {
	var id = req.params.id;
	//make current leader not leader
	games[id].Players[games[id].Leaders[0]].teamLeader = 0;
	
	//shift everything up, put the first one in the rear
	var temp = games[id].Leaders[0];
	
	for(var x = 0; x < games[id].Leaders.length - 1; ++x) {
					games[id].Leaders[x] = games[id].Leaders[x+1];
	}
	games[id].Leaders[games[id].Leaders.length - 1] = temp;
	
	//Make new team leader (position 0)
	games[id].Players[games[id].Leaders[0]].teamLeader = 1;
	res.send('Team Leader Switched');
});
app.get('/:id/getLeader', function(req, res) {
	var id = req.params.id;
	console.log("Server-Leaders: " + games[id].Players[games[id].Leaders[0]]);
	res.send(games[id].Players[games[id].Leaders[0]]);
});















