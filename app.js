const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const words = ['javascript', 'frontend', 'hangman'];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = '_'.repeat(chosenWord.length);
let attemptsLeft = 6;

console.log('Welcome to Hangman!');
console.log(guessedWord);

function askLetter() {
  rl.question('Guess a letter: ', (input) => {
    let letter = input.toLowerCase();
    let found = false;

    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === letter) {
        guessedWord =
          guessedWord.substring(0, i) +
          letter +
          guessedWord.substring(i + 1);
        found = true;
      }
    }

    if (!found) {
      attemptsLeft--;
      console.log(`Wrong! Attempts left: ${attemptsLeft}`);
    } else {
      console.log('Good guess!');
    }

    console.log(guessedWord);

    if (guessedWord === chosenWord) {
      console.log('You won! 🎉');
      rl.close();
      return;
    }

    if (attemptsLeft === 0) {
      console.log(`Game over! The word was "${chosenWord}"`);
      rl.close();
      return;
    }

    askLetter();
  });
}

askLetter();
