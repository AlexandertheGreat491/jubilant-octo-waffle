/*The application will allow users who are learning JavaScript
to take a timed quiz on JavaScript that stores high scores, in order 
for users to compare themselves to their peers.*/

// Users will click the start button and a timer will start.
// Users wil be presented with a question and another question.
// When a question is answered incorrectly, time is subtracted from the timer.
// When all questions are answered OR the timer reaches 0, then the game is over.
// When the game is over the users can save their initials and score.

// Users will click the "Start Quiz" button and the timer will start.

document.getElementById("gameStart").addEventListener("click", function(){
    var timeleft = 120;

    var quizTimer = setInterval(function function1(){
    document.getElementById("countdown").innerHTML = timeleft + 
    "&nbsp"+"seconds remaining";

    timeleft -= 1;
    if(timeleft <= 0){
        clearInterval(quizTimer);
        document.getElementById("countdown").innerHTML = "Time has expired."
    }
    }, 1000);

    console.log(countdown);
});
    
/*cb64. (2019, February 11). javascript - how to add onclick event to start timer. Stack Overflow. 
Retrieved May 16, 2022, from https://stackoverflow.com/questions/54637148/how-to-add-onclick-event-to-start-timer*/

// Users wil be presented with a question and another question.
/* The questions are contained in the array variable quizQuestions
as objects. */

var quizQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        correct: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within_______.",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correct: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above"
    },
    {
        question: "String values must be enclosed within___when being assigned.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        correct: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal/bash", "for loops", "console log"],
        correct: "console.log"
    },


];
// High scores will be stored.

//Variables declared for high scores.

var highScore = document.querySelector("#highScore");
var remove = document.querySelector("#blank");
var backward = document.querySelector("#back");

// The event listener to clear/remove scores.

remove.addEventListener("click", function () {
    localStorage.remove();
    location.reload();
});

//location.reload() reloads the document without any of the scores that were previously stored.

// The local storage is retrieved for high scores.

var everyScore = localStorage.getItem("everyScore");
everyScore = JSON.parse(everyScore);

if (everyScore !== null) {
    for (var i = 0; i < everyScore.length; i++) {
        var makeLi = document.createElement("li");
        makeLi.textContent = everyScore[i].initials + "" + everyScore[i].score;
        highScore.appendChild(makeLi);
    }
}

/* The event listener that will allow the user to 
go back in the index.html*/

backward.addEventListener("click", function() {
    window.location.replace("index.html");
});
