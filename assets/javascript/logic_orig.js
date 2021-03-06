/////////////////////////////////////////////////////////////////////////////////////
// .NAME
//   lgic.js
// .WHAT
//   Contains functions that are used throughout the Sports Fan Application.
// .AUTHOR
//   SportsFan App team. 
// .DATE
//   01-AUG-2019
// .NOTES
//   
//   
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////
// Globals
//////////////////////////////////////////
var teams = [];  // Gets populated with all teams for all leagues when program starts.
var hits = [];  // Gets populated with teams matching the searchTerm.

//////////////////////////////////////////
//Functions
//////////////////////////////////////////
// Populates the teams[] array when loaded.
function populateSearchTerms() {
  var leagues = ["NBA", "NFL", "MLB", "American Major League Soccer"];
  for (var i = 0; i < leagues.length; i++) {
    var queryURL = "https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=" + leagues[i];
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      for (var j = 0; j < response.teams.length; j++) {
        var tempTeam = response.teams[j].strTeam;
        tempTeam = tempTeam.toLowerCase();
        teams.push(tempTeam);
        
      }
    });

  }
}

console.log(teams);

//Search function: Given a searchTerm, lookup the team in the array populated by populateSearchTerms
function search(searchTerm) {
  //If teams[] array is empty, return (maybe it is still loading or is empty for some reason)
  if (teams.length === 0) {
    return;
  }
  // Search the searchTerm in teams[], place hits in hits[]
  console.log("In search().  Search term is : " + searchTerm);
}

//////////////////////////////////////////
//Calls 
//////////////////////////////////////////
console.log('logic.js : javascript OK');

//Hides the leauge page on load
$(document).ready(function () {
  $('.div2').hide();

  //Materialize init
  $('.slider').slider({
    indicators: true,
    height: 400,
    transition: 500,
    interval: 6000
  });

  // Load teams from all leagues, only if teams[] is empty, so it does not get called every time.
  if (teams.length === 0) {
    populateSearchTerms();
  }
  var count = 0;
  $("#newSearch").on("keyup", function (event) {
    count = $("#newSearch").val().trim().length;
  

    
    if (event.keyCode === 13) {
      console.log("Position: " + teams.indexOf($("#newSearch").val().trim().toLowerCase()));
      console.log($("#newSearch").val().trim().toLowerCase());
      if(teams.indexOf($("#newSearch").val().trim().toLowerCase()) > -1 ){
        console.log("find")
        teamSearch($("#newSearch").val().trim());
        $("#error-message").text("");
      }else{
        console.log("enter a valid team");
        $("#error-message").text("enter a valid team");
      }
      $("#newSearch").val("");
    }   
    //console.log(count);

  })

  function teamSearch(searchText){
    console.log(searchText);

    var queryURL = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + searchText;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
       console.log(response);
       window.open("team.html?idTeam=" + response.teams[0].idTeam);

    });
  }


}); // end of $(document).ready()
