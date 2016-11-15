
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

	if (snapshot.child("Player").exists()) {
		$('#add-player').on('click', function() {

			var player2Block = $('#player2');
			var name = $('#player-input').val().trim();
			$('#player2').html(name);

		});
	}

	else {
			$('#add-player').on('click', function() {

			var player1Block = $('#player1');
			var name = $('#player-input').val().trim();
			$('#player1').html(name);

		});
	}
});

//Buttons=============



