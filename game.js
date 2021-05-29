var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//to keep track whether if the game has started or not
var started = false;

//game start at level 0
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    //Store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

    //Add the contents of userChosenColour to the end of userClickedPattern
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);

    //same way playing sound in nextSequence(), when clicking a button, the corresponding sound should be played.
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key To Restart");

        startOver();
    }
}

function nextSequence() {
    //Once this triggered, reset the userClickedPattern to an empty array for the next level
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //Flash Animation on buttons
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //Refactor the code in playSound() for both playing sound in nextSequence() and when the user clicks a button.
    playSound(randomChosenColour);
    // animatePress(randomChosenColour);
}

function playSound(name) {
    //Add sounds to button
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
