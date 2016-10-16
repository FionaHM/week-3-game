var hangman = {
    alphabet: "abcdefghijklmnopqrstuvwxyz",
    lettersGuessed: [],
    numberOfGuesses: 15,
    userWins: 0,
	listOfWordsPicturesSounds: [["Kilkenny", "/assets/images/file.jpg"], ["Cork","/assets/images/file.jpg"],["Clare","/assets/images/file.jpg"]],  // need to add images here too make 2D Array
	currentGameWon : false,
	currentWord : "",

    
	init: function(){
		//this.alphabet = "abcdefghijklmnopqrstuvwxyz";
	//	alert(hangman.alphabet);
		//myHeading.setAttribute("color", "red");
		hideElementsById("startGame");
		hideElementsById("hideMe");
		showElementsById("showMe", "block")
		hangman.selectNewWord();
	},

	selectNewWord: function(){
		//randomly select a word from the list
		var itemNumber = Math.floor(Math.random() * 2); // Need to update depending on number of  items in array
		//alert(hangman.listOfWordsPicturesSounds[0][0]);
		this.currentWord = hangman.listOfWordsPicturesSounds[itemNumber][0];
		//alert(itemNumber + "  " + hangman.listOfWordsPicturesSounds[itemNumber][0]);
		letterPlaceholders();
	},

	placeholder: function(){
		alert("userguess" + document.getElementById("userCurrentGuess").value);  //make it upper case
	}

	
}  // end of hangman object and its functions

// to hide elements by ID 
function hideElementsById(text){
	// document.getElementById(id).style.display = 'block';
    // hide the lorem ipsum text
    document.getElementById(text).style.display = 'none';
    // hide the link
    // btn.style.display = 'none';
}
// to show elements by ID 
function showElementsById(text, textvalue){
	// document.getElementById(id).style.display = 'block';
    // hide the lorem ipsum text
    document.getElementById(text).style.display = textvalue;
    // hide the link
    // btn.style.display = 'none';
}
// to hide elements by class 
function showElementsByClass(text, textvalue){
	var nodeList = document.getElementsByClassName(text);
	nodeList.style.display = 'textvalue';
}
// to show elements by class 
function hideElementsByClass(text){
	var nodeList = document.getElementsByClassName(text);
	nodeList.style.display = 'none';
}
// to hide and display input places for hangman letters - te
function letterPlaceholders(){
	var nodeList = document.getElementsByClassName("letterPlaceHolder");
	var hideInputs = nodeList.length - hangman.currentWord.length;
	alert(hideInputs + " = hideinputs" + hangman.currentWord.length + "current word length")
	for (var i=1; i <= hideInputs; i++) {
		nodeList[i].style.display = "none"
	}
	for (var i=1; i <= hangman.currentWord.length(); i++) {
		nodeList[i].style.display = "block"
	}
}	


// Hide Elements that will appear later. Maybe create an initialization function.
		hideElementsById("showMe");

		// Press any key to begin - calls initialization function initHangman
		document.getElementById("startGame").addEventListener("keydown", hangman.init);
		// Capture the Users Guess - this bit needs work!
		document.getElementById("userCurrentGuess").addEventListener("keyup", hangman.placeholder);

		//document.getElementById("hideMe").setAttribute("display","none");

 


	
