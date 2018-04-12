var potForm = document.querySelector('#potForm');
var teamsArray = [];
var potTeams = document.querySelector('#potTeams');
var button = document.querySelector('#shuffle');
var results = document.querySelector('#results');
var teamIndex = 0;
var teamsElements;

var firstDraw = true;

potForm.addEventListener('submit', function(){
  var teamInput = document.querySelector('input[name=\'teamName\']');
  var team = teamInput.value;

  if(team === '') {
    alert('Enter team name.');
    return false;
  }

  teamsArray.push(team);

  potTeams.innerHTML += '<li>'+team+'</li>';

  teamInput.value = '';
});

button.addEventListener('click', function(){
  if(firstDraw) {
    if (teamsArray.length === 0) {
      alert('No teams in pot.');
      return false;
    }

    if (teamsArray.length % 2 === 1) {
      alert('1 team missing.');
      return false;
    }

    createResults(teamsArray.length/2);

    teamsElements = document.querySelectorAll('.team');

    firstDraw = false;
  }
  
  if(teamsArray.length !== 0) {
    teamsArray = shuffle(teamsArray);
    var chosenTeam = teamsArray[0];

    teamsElements[teamIndex].innerHTML = chosenTeam;

    teamsArray.splice(0, 1);
    teamIndex++;
  }

  if(teamsArray.length === 0) {
    button.disabled = true;
  }
});



// FUNCTIONS
function createResults(n) {
  for(var i=0; i<n; i++) {

    var html = "<div class='result'>";
    html += "<div class='inline team'></div>";
    html += "<div class='inline vs'>vs</div>";
    html += "<div class='inline team'></div>";
    html += "</div>";

    results.innerHTML += html;

  }
}

function shuffle(arr) {
  var len = arr.length;
  var random;
  var temp;

  for(var i=len-1; i>0; i--) {
    random = Math.floor(Math.random()*i);
    temp = arr[i];
    arr[i] = arr[random];
    arr[random] = temp;
  }

  return arr;
}