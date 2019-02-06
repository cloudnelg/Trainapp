//Firebase//
var config = {
  apiKey: "AIzaSyArFUOTKtw-wlMzQQW-NvuG1qS07rvMBBQ",
  authDomain: "traintest-11955.firebaseapp.com",
  databaseURL: "https://traintest-11955.firebaseio.com",
  projectId: "traintest-11955",
  storageBucket: "traintest-11955.appspot.com",
  messagingSenderId: "143268121931"
};

firebase.initializeApp(config);

var trnData = firebase.database();

//Grab User Data//
  $("#trn-btn").on("click", function() {
  var frstTrn = $("#frst-trn-input").val().trim();
  var freq = $("#freq-input").val().trim();
  var trnName = $("#trn-name-input").val().trim();
  var dest = $("#dest-input").val().trim();
 
  //Object container//
  var addedTrain = { name: trnName, desti: dest, frstTrn: frstTrn, freq: freq };

  trnData.ref().push(addedTrain);

//Alert and Clear Fields//
  alert("Train has been added");
  $("#trn-name-input").val("");
  $("#dest-input").val("");
  $("#frst-trn-input").val("");
  $("#freq-input").val("");
  return false;
});

//Add to Firebase//
trnData.ref().on("child_added", function(childSnapshot) {
  var chooDest = childSnapshot.val().desti; 
  var chooFreq = childSnapshot.val().freq;
  var chooFirst = childSnapshot.val().frstTrn;
  var chooName = childSnapshot.val().name;
  var arrv = chooFirst.split(":");
  var trntime = moment().hours(arrv[0]).minutes(arrv[1]);
  var mom = moment.max(moment(), trntime);
  var cMins;
  var cAr;

  //Moment//

  if (mom === trntime) {
    cAr = trntime.format("hh:mm A");
    cMins = trntime.diff(moment(), "minutes");
  } else {

    
     var tDiff = moment().diff(trntime, "minutes");
     var remaining = tDiff % chooFreq;
    cMins = chooFreq - remaining;
    cAr = moment().add(cMins, "m").format("hh:mm A");
  }

  $("#trn-table > tbody").append("<tr><td>" + chooName + "</td><td>" + chooDest + "</td><td>" +
          chooFreq + "</td><td>" + cAr + "</td><td>" + cMins + "</td></tr>");
});
