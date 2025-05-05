// Generate random number between 1-100 (inclusive)
function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(num) {
    if (num < 1 || num > 100 || typeof num !== "number") {
      throw new Error("That is an invalid guess.");
    }
    this.playersGuess = num;
    return this.checkGuess();
  }

  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      return "You Win!";
    }
    if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    }
    this.pastGuesses.push(this.playersGuess);

    if (this.pastGuesses.length >= 5) {
      return "You Lose.";
    }

    return this.difference() < 10
      ? "You're burning up!"
      : this.difference() < 25
      ? "You're lukewarm."
      : this.difference() < 50
      ? "You're a bit chilly."
      : "You're ice cold!";
  }

  provideHint() {
    let hints = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hints);
  }
}

// Function to return a new game instance
function newGame() {
  return new Game();
}

// DOM Setup - Implement event listeners
document.addEventListener("DOMContentLoaded", () => {
  let game = newGame();

  const submitButton = document.getElementById("submit");
  const resetButton = document.getElementById("reset");
  const hintButton = document.getElementById("hint");
  const inputField = document.getElementById("guess");
  const messageDisplay = document.getElementById("message");

  submitButton.addEventListener("click", () => {
    const guess = parseInt(inputField.value, 10);
    try {
      messageDisplay.textContent = game.playersGuessSubmission(guess);
    } catch (error) {
      messageDisplay.textContent = error.message;
    }
    inputField.value = "";
  });

  resetButton.addEventListener("click", () => {
    game = newGame();
    messageDisplay.textContent = "Game reset! Enter a new guess.";
    inputField.value = "";
  });

  hintButton.addEventListener("click", () => {
    messageDisplay.textContent = "Hint: One of these numbers is correct - " + game.provideHint().join(", ");
  });
});
