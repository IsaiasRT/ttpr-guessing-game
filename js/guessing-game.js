
 
 // Generate random number between 1-100 (inclusive)
  
 function generateWinningNumber() {
   // Return random integer
   return Math.floor(Math.random() * 100) + 1;
 }
 
 
   // Return random integer
   
     //Use the fisher-yates Shuffle algorithm
     //Here is a great resource on the algorithm with an animation.  Read all the way to the end!
     //https://bost.ocks.org/mike/shuffle/
    
 
 // Shuffle array using Fisher-Yates algorithm
 function shuffle(array) {
   // Modify array in place and return it
   let length = array.length;
   for (let i = length - 1; i > 0; i--) {
     let j = Math.floor(Math.random() * (i + 1));
     [array[i], array[j]] = [array[j], array[i]]; // Swap elements
   }
   return array;
 }
 
 
 
 class Game {
   constructor() {
     // Initialize properties:
     // - playersGuess (current guess)
     // - pastGuesses (array of previous guesses)
     // - winningNumber (generated number)
     this.playersGuess = null;
     this.pastGuesses = [];
     this.winningNumber = generateWinningNumber();
   }
 
   // Return absolute difference between guess and winning number
   difference() {
     // Calculate and return difference
     return Math.abs(this.playersGuess - this.winningNumber);
   }
 
   // Return true if guess is lower than winning number
   isLower() {
     // Return boolean comparison
     return this.playersGuess < this.winningNumber;
   }
 
   // Validate and process guess
   playersGuessSubmission(num) {
     // Throw error if invalid number
     // Set playersGuess
     // Return checkGuess result
     if (num < 1 || num > 100 || typeof num !== "number") {
       throw "That is an invalid guess.";
     }
     this.playersGuess = num;
     return this.checkGuess();
   }
 
   // Evaluate guess and return feedback message
   checkGuess() {
     // Handle win condition
     // Handle duplicate guess
     // Add to pastGuesses
     // Handle max guesses
     // Return temperature feedback
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
 
   // Generate array with 3 numbers (winning + 2 random)
   provideHint() {
     // Create array and shuffle
     let hints = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
     return shuffle(hints);
   }
 }
 
 // DOM Setup - Implement event listeners
 function newGame() {
   return new Game();
 }
 
 
 document.addEventListener("DOMContentLoaded", () => {
   // Initialize game state
   // Get DOM elements
   // Set up event handlers for:
   // - Submit guess
   // - Reset game
   // - Show hint
   // Implement:
   // - Input validation
   // - Display updates
   // - Game state management
   let game = new Game();
 
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
     game = new Game();
     messageDisplay.textContent = "Game reset! Enter a new guess.";
     inputField.value = "";
   });
 
   hintButton.addEventListener("click", () => {
     messageDisplay.textContent = "Hint: One of these numbers is correct - " + game.provideHint().join(", ");
   });
 });