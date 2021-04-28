const buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour = null;
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

const nextSequence = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Make the selected button "flash"
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  // Increase level and update title
  level += 1;
  $("h1").text("Level " + level);
};

const checkAnswer = (currentLevel) => {
  console.log(currentLevel);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

// Play the selected button sound
const playSound = (name) => {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

// Add animation to pressed button
const animatePress = (currentColour) => {
  const $clickedButton = $("#" + currentColour);
  $clickedButton.addClass("pressed");
  setTimeout(() => {
    $clickedButton.removeClass("pressed");
  }, 100);
};

const startOver = () => {
  gameStarted = false;
  gamePattern = [];
  level = 0;
};

// Detect first keypress and start game
$(document).on("keypress", () => {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
    $("h1").text("Level " + level);

    // Add event listener to detect button click
    $(".btn").on("click", (event) => {
      const $clickedButton = $(event.target);
      const userChosenColour = $clickedButton.attr("id");
      userClickedPattern.push(userChosenColour);
      console.log(userClickedPattern);

      playSound(userChosenColour);
      animatePress(userChosenColour);
      // Check if the last answer is correct
      checkAnswer(userClickedPattern.length - 1);
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => {
          nextSequence();
          userClickedPattern = [];
        }, 1000);
      }
    });
  }
});
