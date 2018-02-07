let Letter = require("./letter.js");

  function newLetterArray(word) {
  	let array = [];
  	for (var char of word) {
  		let newLetter = new Letter(char); // stored in upper case
  		array.push(newLetter);
  	}
  	return array;
  }

  var Word = function(word) {
  	this.word = word;
  	this.guessCount = 10;
  	this.letterArray = newLetterArray(this.word);

  	this.displayWord = function() {
  		var str='';
  		for (var letter of this.letterArray) {
  			str = str + letter.getLetter() + ' ';
  		}

  		return (str.trim());
  	}

  	this.updateWord = function(guess) {
  		for (var letter of this.letterArray) {
  			if (letter.letter == guess) {
  				letter.guessed = true;
  			}
  		}
  	}

  	this.checkGuess = function(guess) {
  		for (var letter of this.letterArray) {
  			if (letter.letter == guess) {
  				return true;
  			}
  		}

      return false;
  	}

  	this.wordGuessed = function() {
  		for (var letter of this.letterArray) {
  			if (letter.guessed == false) {
  				return false;
  			}
  		}

      return true;
  	}


  	this.resetWord = function() {
  		for (var letter of this.letterArray) {
  			letter.guessed = false;
  		}
  		this.guessCount = word.length;
  	}
  }

  module.exports = Word;
