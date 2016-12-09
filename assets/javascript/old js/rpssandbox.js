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

	$('#logout').on('click', function(){
		
		firebase.auth().signOut().then(function() {
		
			console.log("signout");	
		});
		
	
	});


//function to add player 1
function addPlayer1() {

	firebase.auth().signInAnonymously().catch(function(error) {

			var errorCode = error.code;
			var errorMessage = errorMessage;
		});

		var playerName = $('#player-input').val().trim();
		var userID = firebase.auth().currentUser.uid;

		var player = {
			name: playerName,
			choice: "",
			wins: 0,
			losses: 0,
			uid: "",
			
		};

		
		db.ref('players').push(player);
		// db.ref('players/1').update({
		// 	uid: userID,
		// });
	


	console.log(player);
}

//function to add player 2 (investigate later if i can remove this redundant code)
function addPlayer2() {

	firebase.auth().signInAnonymously().catch(function(error) {

			var errorCode = error.code;
			var errorMessage = errorMessage;
		});

		var playerName = $('#player-input').val().trim();
		var userID = firebase.auth().currentUser.uid;

		var player = {
			name: playerName,
			choice: "",
			wins: 0,
			losses: 0,
			uid: "",
			
		};
	
	db.ref('players').push(player);
	db.ref('players/1').update({
			uid: userID,
		});
	db.ref('turn').set(1);

	console.log(player);
}



// //Initialize Firebase

// var config = {
//     apiKey: "AIzaSyB4UG3Fq7Z__3F2wXAMVloImoh31iRyNXQ",
//     authDomain: "rps-multi-2.firebaseapp.com",
//     databaseURL: "https://rps-multi-2.firebaseio.com",
//     storageBucket: "rps-multi-2.appspot.com",
//     messagingSenderId: "858193553121"
//   };

//   firebase.initializeApp(config);

// var db = firebase.database();


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

//Initialize Firebase

var config = {
    apiKey: "AIzaSyB4UG3Fq7Z__3F2wXAMVloImoh31iRyNXQ",
    authDomain: "rps-multi-2.firebaseapp.com",
    databaseURL: "https://rps-multi-2.firebaseio.com",
    storageBucket: "rps-multi-2.appspot.com",
    messagingSenderId: "858193553121"
  };

  firebase.initializeApp(config);

var db = firebase.database();


firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		var signInAnonymous = user.signInAnonymous;
		var uid = user.uid;
		console.log('uid', uid);
		console.log('user', user);
	}

	else {

	}
});