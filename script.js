/*The application will allow users who are learning JavaScript
to take a timed quiz on JavaScript fundamentals that stores high scores, in order 
for users to compare themselves to their peers.*/

// Users will click the start button and a timer will start.
// Users wil be presented with a question and another question.
// When a question is answered incorrectly, time is subtracted from the timer.
// When all questions are answered OR the timer reaches 0, then the game is over.
// When the game is over the users can save their initials and score.


    

// Users wil be presented with a question and another question.

/* The data for the questions are contained in the array variable questions*/

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];


// These variables are used for the bulk of the js in this application.

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var quizTimer = document.querySelector("#gameStart");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// document.query.Selector() will return the first element within the documentation that has a corresponding id. 
// The timer is set to 100 seconds.

var timeRemaining = 100;

// Holds interval time for the beginning of the timer.

var holdInterval = 0;

// Holds the amount of time that will be subtracted for wrong answers.

var penalty = 10;

// The document.createElement() method creates new <ul> element.

var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen.
// The timer will start counting down as soon as the user clicks the "Start Quiz" button.

quizTimer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            timeRemaining--;
            currentTime.textContent = "Time: " + timeRemaining;

            if (timeRemaining <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

/* The function below renders questions and choices to 
, using the innerHTML property, which sets or returns HTML content.*/

function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

/*Event to compare choices with answer
when the user selects one of the choices.*/

function compare(event) {
    var element = event.target;
    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        // The if statement is triggered when the user selects the correct choice.

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            
        } else {
            // Will deduct -10 seconds off timeRemaining for wrong answers
            timeRemaining = timeRemaining - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

// The else statement will be triggered if the user selects the wrong answer.

    }

    // Question Index determines number question user is currently answering.

    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();

    // When the allDone() function is triggered the string in createDiv.textContent will display to the user.

        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }

    questionsDiv.appendChild(createDiv);

}

// All done will append last page

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading on the second to last screen.

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

// appendChild() adds the questionsDiv node onto the createP parent node.

    // Calculates time remaining and replaces it with the user's score.

    if (timeRemaining >= 0) {
        var timeRemaining = timeRemaining;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    /* Creates the label for the input field,
    in other words the text that comes right before the input field.*/

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

// appendChild() adds the questionsDiv node onto the createLabel parent node.

// Creates the input field & tells the application what to expect in the input field.

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

// appendChild() adds the questionsDiv node onto the createInput parent node.

// Directs the application on actions to be taken when the "Submit" button is clicked by the user.
// createElement() creates the element for the "Submit" button.

    var createSubmit = document.createElement("button");

    createSubmit.setAttribute("type", "submit");

// setAttribute() sets the type of button the "Submit" button will be.

    createSubmit.setAttribute("id", "Submit");

// setAttribute() sets the id for the button.

    createSubmit.textContent = "Submit";

// textContent dicates the text that will be displayed for the createSubmit node.

    questionsDiv.appendChild(createSubmit);

// appendChild() adds the questionsDiv node onto the createSubmit parent node.
// Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("HighScores.html");
        }
    });

}

