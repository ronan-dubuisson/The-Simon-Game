//game status variables
var buttonColors = ["green", "red", "yellow", "blue"];
var gameSequence = [];
var playerSequence = [];
var level = 1;
var gamestarted = false;
var playerTurn = false;
//sequence Indicators
var sequenceIndicators = [];
//audo variables
var audioRed = new Audio("sounds/red.mp3");
var audioBlue = new Audio("sounds/blue.mp3");
var audioGreen = new Audio("sounds/green.mp3");
var audioYellow = new Audio("sounds/yellow.mp3");
var audioWrong = new Audio("sounds/wrong.mp3");
/* Keep track of scores during session */
var sessionScores = [];

/* Constructor functions */
function Score(name, score){
  this.name = name;
  this.score = score
}

//event listeners keypress
$(document).keypress(function(e) {
  if (!gamestarted) {
    gamestarted = true;
    $(".sequence").remove();
    changeGameTitle("Level " + level);
    newGameSequence();
  }
});

//eventlistener button click
$("div.btn").click(function(e) {
  if (playerTurn) {
    var button = $(this);
    button.addClass("pressed");

    setTimeout(function () {
      button.removeClass("pressed");
    }, 100);
    var color = $(this).attr("id")
    playerSequence.push(color);
    checkPlayerEntry();
    playSound(color);
  } else {
    alert("It is not your turn");
  }
});

$("#start-button").click(function(e){
  if (!gamestarted) {
    gamestarted = true;
    $(".sequence").remove();
    changeGameTitle("Level " + level);
    newGameSequence();
  }
})

//game function
function newGameSequence() {
  playerSequence = [];
  var randomNumber = Math.floor(Math.random() * 4)
  var color = buttonColors[randomNumber];
  gameSequence.push(color);

  setTimeout(function() {
    playSound(color);
    newSequenceAnimation($("#" + color));
    $(".sequence").attr("class", "sequence");
    addPlayerSequenceElement();
    playerTurn = true;
  }, 1000);
}

function buttonClickedAnimation(button) {
  button.addClass("pressed");
  setTimeout(function() {
    button.removeClass("pressed");
  }, 100);
}


function newSequenceAnimation(button) {
  button.animate({
    opacity: '0%'
  }, 100);
  setTimeout(function() {
    button.animate({
      opacity: '100%'
    }, 100);
  }, 5);
}

function checkPlayerEntry() {
  var index = playerSequence.length - 1;
  sequenceIndicators[index].addClass(playerSequence[index]);

  if (gameSequence[index] === playerSequence[index]) {
    if (gameSequence.length === playerSequence.length) {
      playerTurn = false;
      level++;
      changeGameTitle("level " + level);
      newGameSequence();
    }
  } else {
    playSound("wrong");
    changeGameTitle("Game Over, Press Any Key to Restart");
    gameOver();
  }
}

function changeGameTitle(title) {
  $("#level-title").text(title);
}

function gameOver() {
  var body = $("body");
  body.addClass("wrong");
  setTimeout(function() {
    body.removeClass("wrong");
  }, 200);
  showEndSequence();
  sessionScores.push(new Score("Ronangus",level));

  resetGame();
}

function resetGame(){
  gameSequence = [];
  playerSequence = [];
  level = 1;
  gamestarted = false;
  playerTurn = false;
  sequenceIndicators = [];
}

function playSound(color) {
  switch (color) {
    case "green":
      audioGreen.play();
      break;
    case "red":
      audioRed.play();
      break;
    case "yellow":
      audioYellow.play();
      break;
    case "blue":
      audioBlue.play();
      break;
    default:
      audioWrong.play();
  }
}

function addPlayerSequenceElement() {
  var sequenceIndicator = $("<div class='sequence'></div>");
  sequenceIndicators.push(sequenceIndicator);
  $("#current-sequence").append(sequenceIndicator);
}

function showEndSequence() {
  $(gameSequence).each(function(index, value) {
    var gameSequence = $("<div class='sequence " + value + "'></div>")
    $("#end-sequence").append(gameSequence)
  })
}
