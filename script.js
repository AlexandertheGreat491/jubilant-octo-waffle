/*The application will allow users who are learning JavaScript
to take a timed quiz on JavaScript that stores high scores, in order 
for users to compare themselves to their peers.*/

// Users will click the start button and a timer will start.
// Users wil be presented with a question and another question.
// When a question is answered incorrectly, time is subtracted from the timer.
// When all questions are answered OR the timer reaches 0, then the game is over.
// When the game is over the users can save their initials and score.


    

// Users wil be presented with a question and another question.

/* The questions are contained in the array variable questions*/

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if/else statement is enclosed within_______.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store ______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within___when being assigned.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console log"],
        answer: "console.log"
    },


];

// Declared variables

var score = 0;
var questionIndex = 0;

// Start of js that will render on the page.
// Declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#gameStart");
var beginning = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// Variable that sets total time for timer.

var secondsLeft = 120;

// This variable holds the interval time.

var maintainInterval = 0;

// This variable holds the penalty time.

var penalty = 10;

// Creates a new element

var ulCreate = document.createElement("ul");

// Triggers the timer and the user can see the time on the screen.

timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Questions and choices will be rendered on the page.
function render(questionIndex) {
    // Removes existing data
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // This for loop, loops through the array.
    for (var i=0; i < questions.length; i++) {
        // Appends question
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }

    // For question choices.

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Event that compares the choices with the answer.

function comparison(event) {
    var element = event.target;

if (element.matches("li")) {
var makeDiv = document.createElement("div");
makeDiv.setAttribute("id", "makeDiv");
// Condition if the correct option is selected for a question
if (element.textContent == questions[questionIndex].answer) {
    score++;
    makeDiv.textContent ="Correct! The answers is: " + questions[questionIndex].answer;
} else {
    // Will deduct -10 seconds off secondsLeft for wrong answers.
    secondsLeft = secondsLeft - penalty;
    makeDiv.textContent = "Wrong! The correct answer is: " + questions[questionIndex].correct;
}
}

// Question Bank determines which question the user is on.
questionBank++;

if (questionIndex >= questions.length) {
    // Appends last page with user scores
    allDone();
    makeDiv.textContent = "End of quiz!" + "" + "You got  " + score + questions.length + "Correct!";
} else {
    render(questionIndex);
}
questionsDiv.appendChild(makeDiv);
}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";
// creates heading
var createH1 = document.createElement("h1");
createH1.setAttribute("id", "createH1");
createH1.textContent = "All Done!"

questionsDiv.appendChild(createH1);

// create paragraph

var createP = document.createElement("p");
createP.setAttribute("id", "createP");

questionsDiv.appendChild(createP);

// Time remaining and replaces it with score.
if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    questionsDiv.appendChild(createP2);
}

// Label
var makeLabel = document.createElement("label");
makeLabel.setAttribute("id", "makeLabel");
makeLabel.textContent = "Enter your initials: ";

beginning.appendChild(createLabel);

// Input
var makeInput = document.createElement("input");
makeInput.setAttribute("type", "text");
makeInput.setAttribute("id", "initials");
makeInput.textContent = "";

beginning.appendChild(createInput);

// Submit

var makeSubmission = document.createElement("button");
makeSubmission.setAttribute("type", "submit");
makeSubmission.setAttribute("id", "Submit");
makeSubmission.textContent = "Submit";

beginning.appendChild(makeSubmission);

// This event listener captures user's initials & local storage for initials and score.
makeSubmission.addEventListener("click", function(){
var initials = makeInput.value;
if (initials === null) {
    console.log("No value entered!");
} else {
    var lastScore = {
        initials: initials,
        score: timeRemaining
    }
    console.log(lastScore);
    var allScores = localStorage.getItem("allScores");
    if (allScores === null) {
        allScores = [];
    } else {
        allScores = JSON.parse(allScores);

    }
    allScores.push(lastScore);
    var newScore = JSON.stringify(allScores);
    localStorage.setItem("allScores", newScore);
    // User is sent to the final page.
    window.location.replace("secondary.html")
}
});
}

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
