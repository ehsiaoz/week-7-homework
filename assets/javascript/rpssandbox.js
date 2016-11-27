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

//Detecting changes in player 1 node
const dbPlayer1 = db.ref().child('players/1');

dbPlayer1.on('value', function(snapshot) {

	console.log("this is player 1 name: " + snapshot.val().name);
	$('#player1').html(snapshot.val().name)
	

});

//Detecting changes in player 2 node
const dbPlayer2 = db.ref().child('players/2');

dbPlayer2.on('value', function(snapshot) {

	console.log("this is player 2 name: " + snapshot.val().name);
	$('#player2').html(snapshot.val().name)
	

});



//Global Variables==============



console.log(Boolean(isPlayerOneActive));

//Functions=====

$(document).ready(function(){




//Clicking on start button will perform a check to see if Player 1 or 2 exists and add respective player
	$('#add-player').on('click', function(){

		db.ref().on("value", function(snapshot) {

			//If there are no players 
			if(snapshot.child("players/1") == false && snapshot.child("players/2") == false) {

				isPlayerOneActive = true;
				addPlayer1();
			
				console.log("Player 1 active: " + isPlayerOneActive);
				console.log("Player 2 active: " + isPlayerTwoActive);
				
				console.log("Player 1 name: " + player1);
				
				return;
			}

			else if (Boolean(isPlayerOneActive) == true && Boolean(isPlayerTwoActive) == false)	{

				isPlayerTwoActive = true;
				addPlayer2();
				
				console.log("Player 1 active: " + isPlayerOneActive);
				console.log("Player 2 active: " + isPlayerTwoActive);

				return;

			}

			else if (Boolean(isPlayerOneActive) == false && Boolean(isPlayerTwoActive) == true)	{

				isPlayerOneActive = true;
				addPlayer1();
				
				console.log("Player 1 active: " + isPlayerOneActive);
				console.log("Player 2 active: " + isPlayerTwoActive);

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





//Functions===========

// var player1 = $('#player1');

// var dbPlayer1 = db.ref().child('object')

// dbPlayer1.on("value", function(snapshot) {
// 	console.log(snapshot.val);
// });


//document.ready() closing
}); 