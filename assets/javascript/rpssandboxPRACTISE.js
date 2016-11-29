

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

// Global Variables==============

var currentUser = "";

// Functions=====

$(document).ready(function(){


	$('#add-player').on('click', function(){

		db.ref().once('value')
  		.then(function(snapshot) {

		// firebase.auth().signInAnonymously().catch(function(error) {

		// 	var errorCode = error.code;
		// 	var errorMessage = errorMessage;
		// });

		var playerName = $('#player-input').val().trim();
		// var user = firebase.auth().currentUser;

		var player = {
			name: playerName,
			choice: "",
			wins: 0,
			losses: 0,
			
		};

		
		db.ref('users/' + player.name).update(player);
		currentUser = player.name;

		if(snapshot.child("players/1").exists() == false && snapshot.child("players/2").exists() == false) {

				db.ref('players/1/' + player.name).update(player);		
				return;

		}

		else if (snapshot.child("players/1").exists() == true && snapshot.child("players/2").exists() == false)	{


				db.ref('players/2/' + player.name).update(player);

				return;

		}

		else if (snapshot.child("players/1").exists() == false && snapshot.child("players/2").exists() == true)	{


				db.ref('players/1/' + player.name).update(player);

				return;
			}

		});
		
		
	});

	$('#logout').on('click', function(){
		
		firebase.auth().signOut().then(function() {
		
			console.log("signout");	
		});
		
	
	});

//document.ready() closing
}); 




// firebase.auth().onAuthStateChanged(function(user) {
// 	if (user) {
// 		var signInAnonymous = user.signInAnonymous;
// 		var uid = user.uid;
// 		console.log('uid', uid);
// 		console.log('user', user);
// 	}

// 	else {

// 	}
// });


