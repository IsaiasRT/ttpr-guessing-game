function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  playersGuessSubmission(num) {
    if (num < 1 || num > 100 || typeof num !== "number") {
      throw new Error("Invalid guess.");
    }
    this.playersGuess = num;
    return this.checkGuess();
  }

  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      return "You Win!";
    }
  
    if (this.pastGuesses.length === 5) {
      updateUI(); // Ensure all slots update before losing
      return `You Lose. The correct number was ${this.winningNumber}`;
    }
  
    return "Keep guessing!";
  }
  
}

let game = new Game();

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submit");
  const resetButton = document.getElementById("reset");
  const hintButton = document.getElementById("hint");
  const inputField = document.getElementById("guess");
  const messageDisplay = document.getElementById("message");
  const guessesDisplay = document.querySelectorAll(".guess");

  function updateUI() {
    game.pastGuesses.forEach((guess, index) => {
      if (index < guessesDisplay.length) {
        guessesDisplay[index].textContent = guess; // Ensure all slots update
      }
    });
  }
  

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
    game = new Game();
    messageDisplay.textContent = "Game reset!";
    guessesDisplay.forEach((span) => (span.textContent = "?"));
    inputField.value = "";
  });

  hintButton.addEventListener("click", () => {
    messageDisplay.textContent = `Hint: One of these numbers is correct - ${game.winningNumber}`;
  });
});
