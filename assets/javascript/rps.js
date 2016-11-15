
//Initialize Firebase

var config = {
    apiKey: "AIzaSyABJOLPQITTjuRcwQ0eRvfB0bTN-Z1HTbI",
    authDomain: "rps-multiplayer-eeb35.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-eeb35.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "111248477940"
	};

firebase.initializeApp(config);

var db = firebase.database();

// Get Elements

// var player1Block = $('#player-1');
// var player2Block = $('#player-2');
// var name = $('#player-input').val().trim();

// Create References




//Functions===========

db.ref().on("value", function(snapshot) {



		//clicking on start will add player 2
		$('#add-player').on('click', function() {


			var playerName = $('#player-input').val().trim();

			var player = {
				name: playerName,
				choice: "",
				wins: 0,
				losses: 0,
			};

			//if the player node exists 
			//Need to update so that it not only checks to see exists but limit to only 2
			if (snapshot.child("player").exists()) {

				var player2Block = $('#player2');
				var player2Name = $('#player-input').val().trim();
				$('#player2').html(player2Name);
				
				db.ref('player/' + 2).push(player);
			}

			else {	
				//if player node does not exist, then add player 1
				var player1Block = $('#player1');
				var player1Name = $('#player-input').val().trim();
				$('#player1').html(player1Name);

				db.ref('player/' + 1).push(player);

			}
		});
	
});

//Buttons=============



