
let Letter = function(letter) {
	this.letter = letter;
	this.guessed = false;

	this.getLetter = ()=> {
		var char = '-';
		if(this.guessed == true) {
			return this.letter;
		}

		return char;
	}
}

module.exports = Letter;
