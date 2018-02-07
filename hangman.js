
	let inquirer = require("inquirer");
	let Word = require("./word.js");


	let words = ['MERCY','REAPER','TRACER',
    'DOOMFIST','HANZO','WIDOWMAKER','D.VA',
    'WINSTON','MEI','MCCREE','GENJI',
    'PHARAH','SOLDIER:76','SOMBRA','BASTION',
    'JUNKRAT','TORBJORN','ORISA','REINHARDT',
    'ROADHOG','ZAYA','ANA','LUCIO',
    'MOIRA','SYMMTRA','ZENYATTA'];

  let wordArray = [];

	initWords = ()=> {
		for (var i = 0; i < words.length; i++) {
			let newWord = new Word(words[i]);
			wordArray.push(newWord);
	}
}

	resetGame = ()=> {
		for (var i = 0; i < wordArray.length; i++) {
			wordArray[i].resetWord();
	}
}

	let round = 1;

	function startGame() {
		console.log("ROUND: " + round);

		let display_str = wordArray[round].displayWord();
    console.log(display_str);

		inquirer.prompt([
		{
			name: "guess",
			message: "Guess a letter? "
		}
	]).then(function(answers) {

		if (wordArray[round].checkGuess(answers.guess.toUpperCase())) {
			wordArray[round].updateWord(answers.guess.toUpperCase());
			if (wordArray[round].wordGuessed())
			{

				console.log("You got it right! Lets Keep Going!.")
				round++;

			if (round >= wordArray.length) {
					console.log("Game Over!");

					inquirer.prompt([
						{
							type: "confirm",
							name: "play",
							message: "Do you want to play again? ",
							default: false
						}
					]).then(function(answer) {
						console.log(answer.play);
						if (answer.play == false) {
              return;
						}
				        round = 1;
						    resetGame();
						    startGame();
					});

        } else {
					startGame();
				}

        } else {
				startGame();
			  }

        } else {
			       wordArray[round].guessCount--;
			       if (wordArray[round].guessCount > 0) {

				     console.log("INCORRECT!  " + wordArray[round].guessCount + " guesses left.");
				         startGame();
			  } else {

				      console.log("INCORRECT! No guesses left!")
				      console.log("Word is: " + wordArray[round].word);
				          round++;

              if (round >= wordArray.length) {
					    console.log("Game Over!");

					    inquirer.prompt([
                {
							    type: "confirm",
							    name: "play",
							    message: "Do you want to play again? ",
							    default: false
						    }

              ]).then(function(answer) {
						      if (answer.play == false) {
							    return;
						}

						round = 1;
						resetGame();
						startGame();
					});

        } else {
					inquirer.prompt([
					{
						type: "confirm",
						name: "play",
						message: "Do you want to play more?",
						default: true
					}

          ]).then(function(answer) {
						if (answer.play == false) {
							return;
						}
						startGame();
					});
				}
			}
		}
	});
}


initWords();

console.log("WELCOME TO OVERWATCH HANGMAN!  LET US START THE GAME.");
console.log("-----------------------------------------------------");


startGame();
