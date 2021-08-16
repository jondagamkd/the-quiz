var bodyEL = document.querySelector("#body");
var highScoresEL = document.querySelector("#highScores");
var timeLeftEL = document.querySelector("#timeLeft");
var beginEL = document.querySelector("#begin");

var countDown = 0
var previousScores = 0

timeLeftEL.textContent = "Time: " + countDown;

for (const x in localStorage) {
    if (x === 'highScores') {
        previousScores = 1
    }
  }

  beginEL.addEventListener('click', function() {
    count++;
    setCounterText();
  });

  