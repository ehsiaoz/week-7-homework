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

var player1 = $('#player1');

var dbPlayer1 = db.ref().child('object')

dbPlayer1.on("value", function(snapshot) {
	console.log(snapshot.val);
});