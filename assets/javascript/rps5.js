
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
var choicesSelected = 0;

$(document).ready(function(){

	//Buttons===================================

	//add player button
	$('#add-player').on('click', addPlayer);

	//select choice
	$('li').on('click', selectChoice);

	//chat send button
	$('#send').on('click', sendChat);

	//clicking enter to trigger page search button click
	$("input").keypress(function(event) {

	  // listen to see that key was "enter."
	  if (event.which === 13) {

	    // If so, run addTask.
	    pagesearchclick();
	  }
	});

	//Event Listeners==================================

	//Check player count value in db. Trigger startGame function once value equal to 2
	db.ref('player_count').on("value", function(snapshot) {
		numPlayers = snapshot.val();
		if (numPlayers === 2) {
			startGame();
		}
	});

	//Check whether both players have selected a choice
	// var dbChat = db.ref().child(Chat);
	// chathistory.on('child_added', function(data) {
	// 	console.log("This is child added data: ", data);
	// });

	//Listening for changes in 'searches' node in firebase so display recent searches to user
  db.ref('Chat').on('value', function(snapshot) {
  		$('#chatHistory').empty();
  		chathistory = [];

  		//loop through array returned by firebase
  		snapshot.forEach(function(childSnapshot) {
  			//creating an array with the search saved search terms from firebase
  			chathistory.push(childSnapshot.val());
  		});
  		//loop through the array and append search term to Recent Searches div.
  		chathistory.forEach(function(item, i) {
  			var eachMessage = "<p>" + chathistory[i].name + ": " + chathistory[i].message + "</p>";
  			$('#chatHistory').append(eachMessage);
  		}); 			

  });






	
	db.ref('choice_selections').on("value", function(snapshot) {
		var choices = snapshot.val();
		if (choices === 2) {
			compareChoices();
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
	db.ref('choice_selections').set(choicesSelected);
	db.ref('turn').set(1);


	db.ref('turn').on("value", function(snapshot) {
		turn = snapshot.val();

	//set a tracker to detect whether both players have selected choices

		//if it is the players turn
		if (turn === currPlayer) {
			//Show the players choices
			$('#playerChoices').css("visibility", "visible");
			//Highlight the player square
			$('#playerBlock').css({
				"border": "2px solid blue"
			});
			$('#oppBlock').css({
				"border": "1px solid grey"
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
			$('#playerBlock').css({
				"border": "1px solid grey"
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

	//Update DB choice counter to indicate that player has made a choice
	var dbChoicesSelected = db.ref('choice_selections');
	dbChoicesSelected.once('value', function(snapshot) {
		choicesSelected = snapshot.val();
		choicesSelected++;
		db.ref('choice_selections').set(choicesSelected);
	});
	//Hide the choices
	$('#playerChoices').css("visibility", "hidden");


	//Swith the turn
	var dbturn = db.ref('turn');
	dbturn.once('value', function(snapshot) {
		var currentTurn = snapshot.val();
		
		if (currentTurn === 1) {
			db.ref('turn').set(2);
		}	

		else {
			db.ref('turn').set(1);
		}
	});


};

function compareChoices() {

	db.ref().once("value", function(snapshot) {

		var playerName = snapshot.child('players/' + currPlayer + '/name').val();
		var playerChoice = snapshot.child('players/' + currPlayer + '/choice').val();
		var playerWins = snapshot.child('players/' + currPlayer + '/wins').val();
		var playerLosses = snapshot.child('players/' + currPlayer + '/losses').val();
		var opponentName = snapshot.child('players/' + oppPlayer + '/name').val();
		var opponentChoice = snapshot.child('players/' + oppPlayer + '/choice').val();
		var oppWins = snapshot.child('players/' + oppPlayer + '/wins').val();
		var oppLosses = snapshot.child('players/' + oppPlayer + '/losses').val();
		var dbChoicesSelected = db.ref('choice_selections');
		
		if ((playerChoice === "Rock" && opponentChoice === "Scissors") ||
			(playerChoice === "Paper" && opponentChoice === "Rock") ||
			(playerChoice === "Scissors" && opponentChoice === "Paper")) {

			//Update Player Wins in Firebase
			playerWins++;
			db.ref('players/' + currPlayer + '/wins').set(playerWins);
			$('#vsText').html(playerName + " Wins!");
		}

		else if ((playerChoice === "Rock" && opponentChoice === "Rock") ||
			(playerChoice === "Paper" && opponentChoice === "Paper") ||
			(playerChoice === "Scissors" && opponentChoice === "Scissors")) {
			$('#vsText').html("Tie Game!");
		}
		
		else {
			console.log("You Lose");
			//Update Player Losses in Firebase
			playerLosses++;
			db.ref('players/' + currPlayer + '/losses').set(playerLosses);
			//Update DOM with Player/Opponent Wins/Losses
			$('#vsText').html(opponentName + " Wins!");
		}
		//reset choices selection counter to 0
		dbChoicesSelected.set(0);
		//Update DOM with Player/Opponent Wins/Losses
		db.ref().once("value", function(snapshot) {
			var playerWins = snapshot.child('players/' + currPlayer + '/wins').val();
			var playerLosses = snapshot.child('players/' + currPlayer + '/losses').val();
			var oppWins = snapshot.child('players/' + oppPlayer + '/wins').val();
			var oppLosses = snapshot.child('players/' + oppPlayer + '/losses').val();
			$('#playerWL').html("Wins: " + playerWins + " Losses: " + playerLosses);
			$('#oppWL').html("Wins: " + oppWins + " Losses: " + oppLosses);
			console.log("Opponent Wins: " + oppWins + " Opponent Losses: " + oppLosses);
		});
	});


}

function sendChat() {

	var message = $('#chatInput').val();
	var chat = {
		name: player.name,
		message: message,
		time: firebase.database.ServerValue.TIMESTAMP
	};
	
	db.ref().once('value').then(function(snapshot) {

			db.ref('Chat/').push(chat);
	});

	$('#chatInput').val("");

};


