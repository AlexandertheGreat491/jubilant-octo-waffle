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

// The local storage is retrieved.

var everyScore = localStorage.getItem("everyScore");
everyScore = JSON.parse(everyScore);

if (everyScore !== null) {
    for (var i = 0; i < everyScore.length; i++) {
        var makeLi = document.createElement("li");
        makeLi.textContent = everyScore[i].initials + "" + everyScore[i].score;
        highScore.appendChild(makeLi);
    }
    
}