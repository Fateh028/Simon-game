
var started = false;
var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];

$(".btn").click(function () {  
    var userChosenColour = $(this).attr("id");    
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length - 1);
    
});

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickPattern = []
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    level++;
    $("#level-title").html("Level " + level);
    playSound(randomChosenColour);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3" );
    audio.play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {  
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success")
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){nextSequence()},1000);
            userClickPattern = [];
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(function () {  
            $("body").removeClass("game-over");
        },200);
        playSound("wrong");
        $("#level-title").html("Game over, Press Any Key to Restart");
        startOver();
        console.log("wrong")}
}

function startOver() {  
    level = 0;
    gamePattern = [];
    started = false;
}