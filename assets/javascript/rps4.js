
//Global Variables

var player = {
			name: "",
			choice: "",
			wins: 0,
			losses: 0,
			
		};

var currentPlayer = null;
var opponentPlayer = null;

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

//Functions

var startGame = function() {

	db.ref().on("value", function(snapshot) {

	console.log("turn" + snapshot.child("turn").val());
	// //Code to change color of player boxes
	
					var turn = snapshot.child("turn").val();
					console.log("turn: " + turn);
					
					if (turn === 1) {

						$('#player-1').css({"border": "2px solid blue"});	
					}
					
					if (turn === currentPlayer) {
						$('#turn-indicator').html("It's Your Turn!");
					}

					if (turn !== currentPlayer) {
						$('#turn-indicator').html("Waiting for opponent to choose");	
					}

					else if (turn === 2) {

						$('#player-2').css({"border": "2px solid blue"});

					}
				});

};

$(document).ready(function(){

	

	db.ref().on("value", function(snapshot) {

		if(snapshot.child("players/1").exists() === true) {
			var player1Name = snapshot.child("players/1").val().name;
			$('#player1').html(player1Name);
		}
		
		if(snapshot.child("players/1").exists() === true) {
			var player2Name = snapshot.child("players/2").val().name;
			$('#player2').html(player2Name);
		}
		

		if(snapshot.child("players/1").exists() === true && snapshot.child("players/2").exists() === true) {
			
			startGame();
		
		}


	});


	//Buttons=================


	//Add player button
	$('#add-player').on('click', function(){

			//store player name inputed
			var playerName = $('#player-input').val().trim();
			// var user = firebase.auth().currentUser;
			player.name = playerName;
			

			db.ref().once('value').then(function(snapshot) {

				//if player 1 does not exist, create player 1
				if(snapshot.child("players/1").exists() === false) {

						db.ref('players/1/').update(player);
						currentPlayer = 1;
						opponentPlayer = 2;
						$('#bar-button').hide();
						$('#greeting').html("Hi " + player.name + "! You are player " + currentPlayer);
						return;

				}

				else if (snapshot.child("players/2").exists() === false) {


						db.ref('players/2/').update(player);
						db.ref('turn').set(1);
						currentPlayer = 2;
						opponentPlayer = 1;
						$('#bar-button').hide();
						$('#greeting').html("Hi " + player.name + "! You are player " + currentPlayer);
						
						return;


				}
				else {
						
					alert("Sorry. Game is already in session");

						return;
				}

				
			});
	});

});


