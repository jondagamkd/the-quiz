var countDown = 0
var previousScores = 0
var questionRound = 1
var answer = ""
var seconds = 75
var index = 0
var stopGame = 0

//Load in Questions and Answers
var QA = [
  {'q':'Which is not a JavaScript Data Type?', 'a1':'Number', 'a2':'Nill', 'a3':'Boolean', 'a4':'Object'},
  {'q':'Which symbol is used for comments in Javascript?', 'a1':'Line', 'a2':'Comment', 'a3':'double forward slash', 'a4':'double hyphen'},
  {'q':'In Javascript what is negative Infinity?', 'a1':'A number derived by dividing a negative number by zero.', 'a2':'Any number times zero.', 'a3':'Any number times infinity and beyond.', 'a4':'A negative number derived from zero plus its square root.'},
  {'q':'Which company developed JavaScript?', 'a1':'Google', 'a2':'IBM', 'a3':'Netscape', 'a4':'AOL'},
  {'q':'Does JavaScript support automatic type conversion?', 'a1':'no', 'a2':'depends on the situation', 'a3':'yes', 'a4':'only when specified in code'},
  {'q':'Which is not a looping structure in JavaScript?', 'a1':'For When', 'a2':'For', 'a3':'While', 'a4':'Do-While'},
  {'q':'In Javascript, which function converts a string to integer?', 'a1':'String()', 'a2':'tostring()', 'a3':'str()', 'a4':'format_string'},
  {'q':'In Javascript, What would be the result of 3+2+"7"?', 'a1':'12', 'a2':'42', 'a3':'null', 'a4':'57'}

]
var answerArray = ['Nill', 'double forward slash', 'A number derived by dividing a negative number by zero.', 'Netscape', 'yes', 'For When', 'String()', '57' ]


//Load previous highscores if any
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

//Function to save scores to localStorage
var saveScores = function() {
  localStorage.setItem("scores", JSON.stringify(scores));
};

//Function to store names and scores into temp memory from input and end game.
function storeName() {
  var message = document.getElementById("message").value;
  if (!scores) {
    scores = {
      aaa: 0
    };
  };
  if (message !== "") {
    scores[message] = seconds
    saveScores()
    document.getElementById("mainDiv").innerHTML = "<h1>Thank you for playing!</h1>"
    alert("WOOOT! You got " + seconds + " points!");
  }
  else {
    alert("Please enter a valid name.")
  }
}

var bodyEL = document.querySelector("#body");
var highScoresEL = document.querySelector("#highScores");
var timeLeftEL = document.querySelector("#timeLeft");
var beginEL = document.querySelector("#begin");
var mainDivEL = document.querySelector("#mainDiv");

timeLeftEL.textContent = "Time: 0";

//High scores button at the top left.
highScoresEL.addEventListener('click', function() {
  editedStr = JSON.stringify(scores, null, 1); 
  editedStr = editedStr.replace(/:/g, " =");
  editedStr = editedStr.replace(/,/g, "");
  editedStr = editedStr.replace(/"/g, "");
  editedStr = editedStr.replace("{", "High Scores!");
  editedStr = editedStr.replace("}", "");
  console.log(editedStr); 
  alert(editedStr);
});

//Begin the game upon click the main BEGIN button
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
      document.getElementById("mainDiv").innerHTML = "<h1>All done!</h1><h2>Please enter your name below to save your high score.</h2>";
      document.getElementById("mainDiv").innerHTML += "<input type='text' id = 'message'><input id = 'sbutton' type='submit' onclick='storeName()' value='submit' />";
    }
    return seconds
  } 

  //Main question loop to cycle through questions object
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








  

  