//Global Variables==============

var isPlayerOneActive = null;
var isPlayerTwoActive = null;


//Functions=====

$(document).ready(function(){




//Clicking on start button will perform a check to see if Player 1 or 2 exists and add respective player
	$('#add-player').on('click', function(){

		db.ref().once('value')
  		.then(function(snapshot) {
	  			
			//If there are no players 
			if(snapshot.child("players/1").exists() == false && snapshot.child("players/2").exists() == false) {

				addPlayer1();				
				return;

			}

			else if (snapshot.child("players/1").exists() == true && snapshot.child("players/2").exists() == false)	{


				addPlayer2();
				return;

			}

			else if (snapshot.child("players/1").exists() == false && snapshot.child("players/2").exists() == true)	{


				addPlayer1();
				return;
			}
		});
	});




//function to add player 1
function addPlayer1() {

	var playerName = $('#player-input').val().trim();

	var player = {
		name: playerName,
		choice: "",
		wins: 0,
		losses: 0,
	};

	db.ref('players/1').set(player);


	console.log(player);
}

//function to add player 2 (investigate later if i can remove this redundant code)
function addPlayer2() {

	var playerName = $('#player-input').val().trim();

	var player = {
		name: playerName,
		choice: "",
		wins: 0,
		losses: 0,
	};

	db.ref('players/2').set(player);
	db.ref('turn').set(1);

	console.log(player);
}



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


//DB References===================================

//Detecting changes in players node
const dbPlayers = db.ref().child('players');

dbPlayers.on('child_added', function(snapshot) {

	console.log("Child added");

});

// //Detecting changes in player 1 node
// const dbPlayer1 = db.ref().child('players/1');

// dbPlayer1.on('value', function(snapshot) {

// 	console.log("this is player 1 name: " + snapshot.val().name);
// 	$('#player1').html(snapshot.val().name)
	

// });

// //Detecting changes in player 2 node
// const dbPlayer2 = db.ref().child('players/2');

// dbPlayer2.on('value', function(snapshot) {

// 	console.log("this is player 2 name: " + snapshot.val().name);
// 	$('#player2').html(snapshot.val().name)
	

// });

db.ref().on("value", function(snapshot) {

	$('#player1').html(snapshot.child("players/1").val().name);
	$('#player2').html(snapshot.child("players/2").val().name);

});

//Functions===========

// var player1 = $('#player1');

// var dbPlayer1 = db.ref().child('object')

// dbPlayer1.on("value", function(snapshot) {
// 	console.log(snapshot.val);
// });


//document.ready() closing
}); 