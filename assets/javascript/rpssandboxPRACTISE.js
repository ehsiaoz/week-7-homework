//Global Variables==============


//Functions=====

$(document).ready(function(){


	$('#add-player').on('click', function(){


	var playerName = $('#player-input').val().trim();

	var player = {
		name: playerName,
		choice: "",
		wins: 0,
		losses: 0,
	};

	firebase.auth().signInAnonymously()

	.then(function(user) {
		user.updateProfile({playerName: playerName.value});
	});

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

//document.ready() closing
}); 