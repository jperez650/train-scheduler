$(document).ready(function() {




  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA5ls2EAYwR07FaNoyzEOSb1iOLrg3r9Fo",
    authDomain: "train-scheduler-20f10.firebaseapp.com",
    databaseURL: "https://train-scheduler-20f10.firebaseio.com",
    projectId: "train-scheduler-20f10",
    storageBucket: "",
    messagingSenderId: "565319708154"
  };
  firebase.initializeApp(config);

var dataRef = firebase.database();


var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

	$("#add-train-btn").on("click", function(event){
		event.preventDefault();

		trainName = $("#train-name-input").val().trim();
		destination = $("#destination-input").val().trim();
		firstTrain = $("#first-train-input").val().trim();
		frequency = $("#frequency-input").val().trim();

		// console.log(trainName)

		dataRef.ref().push({
			trainName: trainName,
			destination: destination, 
			firstTrain: firstTrain,
			frequency: frequency,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		});
	});


dataRef.ref().on("child_added", function(childSnapshot) {
	var currentTime = moment();
	var startTime = childSnapshot.val().firstTrain
	// console.log(startTime)
	var trainFrequency = childSnapshot.val().frequency
	console.log(trainFrequency)
	var nextArrival = null;
	var minutesAway = null;
	var timeDifference = moment().diff(moment(startTime, "hh:mm A"),"m");
	var remainingTime = timeDifference % trainFrequency;
	console.log(remainingTime)
	var minutesAway = trainFrequency - remainingTime

	nextArrival = moment().add(minutesAway, "m");
	var actualArrival = moment(nextArrival).format("hh:mm A") 
	// console.log(moment(startTime, 'HH:mm').format('HH:mm a'));



	$("#info-output").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" +trainFrequency +"</td><td>"+actualArrival+"</td><td>"+minutesAway+"</td></tr>");


})





































});