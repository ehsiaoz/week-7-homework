
//Global Variables

var player = {
			name: "",
			choice: "",
			wins: 0,
			losses: 0,
			
		};

var currentPlayer = null;

$(document).ready(function(){

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

	db.ref().on("value", function(snapshot) {

		var player1Name = snapshot.child("players/1").val().name;
		$('#player1').html(player1Name);
		var player2Name = snapshot.child("players/2").val().name;
		$('#player2').html(player2Name);

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
						return;

				}

				else if (snapshot.child("players/2").exists() === false) {


						db.ref('players/2/').update(player);
						currentPlayer = 2;
						return;

				}

				else {
						
					alert("Game is already in session");

						return;
				}
		});
	});

});