var bodyEL = document.querySelector("#body");
var highScoresEL = document.querySelector("#highScores");
var timeLeftEL = document.querySelector("#timeLeft");
var beginEL = document.querySelector("#begin");
var mainDivEL = document.querySelector("#mainDiv");

var countDown = 0
var previousScores = 0
var questionRound = 1
var answer = ""
var seconds = 75
var index = 0
var stopGame = 0

var QA = [
  {'q':'tacos?', 'a1':'tacos', 'a2':'llamas', 'a3':'burritos', 'a4':'zebras'},
  {'q':'tacobell?', 'a1':'pandas', 'a2':'blue', 'a3':'black', 'a4':'orange'}

]

var answerArray = ['llamas', 'blue']

timeLeftEL.textContent = "Time: 0";


var loadScores = function() {
  scores = JSON.parse(localStorage.getItem("scores"));

  // if nothing in localStorage, create a new object to track all the high scores
  if (!scores) {
    scores = {
      aaa: 0
    };
  };
}
loadScores()

var saveScores = function() {
  localStorage.setItem("scores", JSON.stringify(scores));
};

function storeName() {
  var message = document.getElementById("message").value;
  if (!scores) {
    scores = {
      aaa: 0
    };
  };
  scores[message] = seconds
  saveScores()

  alert("WOOOT! You got " + seconds + "points!")
}


beginEL.addEventListener('click', function() {
  var setInt = setInterval(secondsFunc, 1000);
  function secondsFunc() {
    if (seconds > 0 && !stopGame) {
    seconds -= 1;
    timeLeftEL.textContent = "Time: " + seconds;
    }
    else if (seconds <= 0 || stopGame) {
      clearInterval(setInt);
      timeLeftEL.textContent = "Time: " + seconds;
      document.getElementById("mainDiv").innerHTML = "<h1>Times UP!</h1>";
      document.getElementById("mainDiv").innerHTML += "<input type='text' id = 'message'><input type='submit' onclick='storeName()' value='submit' />";
    }
    return seconds
  } 

  function questionLoop(index, finalAnswer) {  
    document.getElementById("mainDiv").innerHTML = 
    "<h2>" + QA[index]['q'] + "</h2>";
    document.getElementById("mainDiv").innerHTML += 
    "<button id='a1'>" + QA[index]['a1'] + "</button>";
    document.getElementById("mainDiv").innerHTML += 
    "<button id='a2'>" + QA[index]['a2'] + "</button>";
    document.getElementById("mainDiv").innerHTML += 
    "<button id='a3'>" + QA[index]['a3'] + "</button>";
    document.getElementById("mainDiv").innerHTML += 
    "<button id='a4'>" + QA[index]['a4'] + "</button>";
    if ( typeof finalAnswer !== 'undefined' ) {
      document.getElementById("mainDiv").innerHTML += 
      "<h1>Last answer was " + finalAnswer + "</h1>";
      console.log("TOASTY!")
    }

    function userAnswer(input) {
      if (input === answerArray[index]) {
        var finalAnswer = "CORRECT!";
        if (QA.length > index + 1) {
          index++
        }
        else {
          stopGame = 1
        }    
        questionLoop(index, finalAnswer);
      }
      else {
        var finalAnswer = "WRONG!";
        if (QA.length > index + 1) {
          index++
        }
        else {
          stopGame = 1
        }
        seconds -= 5
        questionLoop(index, finalAnswer);
        
      }
      return finalAnswer
    }

    var answer1 = document.querySelector("#a1");
    var answer2 = document.querySelector("#a2");
    var answer3 = document.querySelector("#a3");
    var answer4 = document.querySelector("#a4");


    answer1.addEventListener('click', function() {
      userAnswer(QA[index]['a1'])
    });
    answer2.addEventListener('click', function() {
      userAnswer(QA[index]['a2'])
    });
    answer3.addEventListener('click', function() {
      userAnswer(QA[index]['a3'])
    });
    answer4.addEventListener('click', function() {
      userAnswer(QA[index]['a4'])
    });
  }
  questionLoop(index)
});








  

  