var highScore = document.querySelector("#highScore");
var remove = document.querySelector("#remove");
var goBack = document.querySelector("#back");

// Event listener for "Clear high scores" button.

remove.addEventListener("click", function () {
localStorage.clear();
location.reload();
});

// Scores are retrieved local storage.

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

// Event listener for the "Go Back" button that will take the user to the beginning of the quiz.

goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});