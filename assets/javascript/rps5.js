
//Initialize Firebase==================
	var config = {
	    apiKey: "AIzaSyB4UG3Fq7Z__3F2wXAMVloImoh31iRyNXQ",
	    authDomain: "rps-multi-2.firebaseapp.com",
	    databaseURL: "https://rps-multi-2.firebaseio.com",
	    storageBucket: "rps-multi-2.appspot.com",
	    messagingSenderId: "858193553121"
	  };

	  firebase.initializeApp(config);

	//database references===================
	var db = firebase.database();
	var dbPlayer1 = db.ref("players/1");
	var dbPlayer2 = db.ref("players/2");
	var dbPlayerCount = db.ref('player_count')


//Global Variables=======================

var player = {
			name: "",
			choice: "",
			wins: 0,
			losses: 0,
		};

var currPlayer = null;
var oppPlayer = null;
var numPlayers = null;
var opponentName = "";

$(document).ready(function(){

	//Buttons===================================

	//add player button
	$('#add-player').on('click', addPlayer);

	//select choice
	$('li').on('click', selectChoice);


	//Event Listeners==================================

	//Check player count value in db. Trigger startGame function once value equal to 2
	db.ref('player_count').on("value", function(snapshot) {
		numPlayers = snapshot.val();
		if (numPlayers === 2) {
			startGame();
		}
	});

});


//Function===================================

function addPlayer() {

	var playerName = $('#player-input').val().trim();
	player.name = playerName;

	db.ref().once('value').then(function(snapshot) {

		//Check if there is player 1 in DB.
		if(snapshot.child('players/1').exists() === false) {
			//if no player 1 exists then current player is player 1
			db.ref('players/1/').update(player);
			$('#playerName').html(playerName);
			currPlayer = 1;
			oppPlayer = 2;
			$('#bar-button').hide();
			$('#greeting').html("Hi " + player.name + "! You are player " + currPlayer);
			//display wins and losses for player
			$('#playerWL').css("visibility", "visible");

			//Snapshot of DB for player count value and set value accordingly
			db.ref('player_count').once('value').then(function(snapshot) {
			 	numPlayers = snapshot.val();
			 	if (numPlayers === null) {
			 		numPlayers = 1;	
			 		dbPlayerCount.set(numPlayers);
			 	}
			 	
			 	else {
			 		numPlayers ++;
			 		dbPlayerCount.set(numPlayers);
				}
			});
			return;
		}

		//if player 1 exists but player two does not exist
		else if (snapshot.child('players/2').exists() === false) {
			//create player 2 in db
			db.ref('players/2/').update(player);
			$('#playerName').html(playerName);
			currPlayer = 2;
			oppPlayer = 1;
			$('#bar-button').hide();
			$('#greeting').html("Hi " + player.name + "! You are player " + currPlayer);

			//Snapshot of DB for player count value and set value accordingly
			db.ref('player_count').once('value').then(function(snapshot) {
			 	numPlayers = snapshot.val();
			 	if (numPlayers === null) {
			 		numPlayers = 1;	
			 		dbPlayerCount.set(numPlayers);
			 	}
			 	
			 	else {
			 		numPlayers ++;
			 		dbPlayerCount.set(numPlayers);
				}
			});
			return;
		}

		//if both player 1 and player 2 exist in db, alert msg
		else {
			alert("Sorry. Game is already in session");
			return;
		}
	});
};


function startGame() {
	
	//Show opponent
	var oppName = db.ref('players/' + oppPlayer + '/name');
	oppName.on('value', function(snapshot) {
		opponentName = snapshot.val();
		$('#oppName').html(opponentName);
	});

	$('.wl').css("visibility", "visible");
	//Set turn to 1
	db.ref('turn').set(1);

	db.ref('turn').on("value", function(snapshot) {
		turn = snapshot.val();

		//if it is the players turn
		if (turn === currPlayer) {
			//Show the players choices
			$('#playerChoices').css("visibility", "visible");
			//Highlight the player square
			$('#playerBlock').css({
				"border": "2px solid blue"
			});
			//Notify the player it is their turn
			$('#turn-indicator').html("It's Your Turn!");
		}

		//if it is the opponents turn
		else {
			//highlight the opponent's block
			$('#oppBlock').css({
				"border": "2px solid blue"
			});
			//hide the player's choices
			$('#playerChoices').css("visibility", "hidden");

			var oppName = db.ref('players/' + oppPlayer + '/name');
				oppName.once('value', function(snapshot) {
					opponentName = snapshot.val();
					//Indicate that it is the opponent's turn
					$('#turn-indicator').html("Waiting for " + opponentName + " to choose.");
				});
		}
	});
	


};

function selectChoice() {

	//Update DB with player's selection
	var choice = $(this).html();
	var dbChoice = db.ref('players/' + currPlayer + '/choice');
	dbChoice.set(choice);

	//Hide the choices
	$('#playerChoices').css("visibility", "hidden");

	//Swith the turn
	var turn = db.ref('turn');
	turn.on('value', function(snapshot) {
		var currentTurn = snapshot.val();
		
		if (currentTurn === 1) {
			db.ref('turn').set(2);
		}	

		else {
			db.ref('turn').set(1);
		}
	});
	
};



function sendChat() {

};


