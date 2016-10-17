var hangman = {
    alphabet: "abcdefghijklmnopqrstuvwxyz",
    lettersGuessed: [],
    numberOfGuesses: 15,
    userWins: 0,
	listOfWordsPicturesSounds: [["Mayo", "/assets/images/file.jpg"], ["Wexford", "/assets/images/file.jpg"], ["Sligo", "/assets/images/file.jpg"], ["Kilkenny", "/assets/images/file.jpg"], ["Cork","/assets/images/file.jpg"],["Clare","/assets/images/file.jpg"]],  // need to add images here too make 2D Array
	currentGameWon : false,
	currentWord : "",

    
	init: function(){
		// hide initial elements
		hideElementsById("startGame");
		hideElementsById("hideKeyPress");
		showElementsById("hangmanHeading", "block");
		// randomly select a word
		hangman.selectNewWord();
	},

	selectNewWord: function(){
		//randomly select a word from the list
		var itemNumber = Math.floor(Math.random() * 6); // Need to update number 2 depending on number of  items in array
		// sets the variable currentWord
		this.currentWord = hangman.listOfWordsPicturesSounds[itemNumber][0];
		// Format display page based on word length 
		letterPlaceholders(this.currentWord.length,"div", "_____", "letterPlaceHolder");
		showElementsById("userGuess", "block");
		showElementsById("userCurrentGuess", "block");
	},

	placeholder: function(){
		hangman.userCurrentGuess = document.getElementById("userCurrentGuess").value;
		alert(hangman.userCurrentGuess);
		// add it to the array of user guesses
		hangman.lettersGuessed.push(hangman.userCurrentGuess);
		alert(hangman.lettersGuessed + "   letters guessed array");
		// display guess on the page
		displayGuesses(hangman.lettersGuessed.length, "div", hangman.lettersGuessed ,"displayAllUserGuess");
	}

	
}  // end of hangman object and its functions

// to hide elements by ID 
function hideElementsById(text){
    document.getElementById(text).style.display = 'none';
}
// to show elements by ID 
function showElementsById(text, textvalue){
    document.getElementById(text).style.display = textvalue;
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
// to display input places for hangman letters - te
function letterPlaceholders(maxlength, elem, text, elemById){

	// alert("letterPlaceholders " + hangman.currentWord.length); // -1 because there is already a div on the page
	for (var i=1; i <= maxlength; i++) {
		//Create a new div with text
		// addElement("div", "_____"); 
	    addElement(elem,text, elemById); 

	}
}	

// displayGuesses(hangman.lettersGuessed.length, "div", hangman.lettersGuessed ,"displayAllUserGuess");
// to  display letters already guessed 
function displayGuesses(maxlength, elem, letterToDisplay ,elemById){

	for (var i=0; i <= maxlength-1; i++) {
		//Create a new div with text
		// addElement("div", "_____"); 
		letterToDisplay=hangman.lettersGuessed[i];
		alert("this is text" + letterToDisplay);
	    addElement(elem,letterToDisplay, elemById); 

	}
}
// From mozilla.org - how to add an element

function addElement(elem, text, elemById) { 
  // create a new div element 
  // and give it some content 
  var newElem = document.createElement(elem); 
  var newContent = document.createTextNode(text); 
  newElem.appendChild(newContent); //add the text node to the newly created div. 
  // Format the element
  newElem.style.width = "20px";
  newElem.style.height = "30px";
  newElem.style.float = "left";
  newElem.style.margin = "20px";
  // add the newly created element and its content into the DOM 
  var currentElem = document.getElementById(elemById); 
  //document.body.insertBefore(newDiv, currentDiv); 
  currentElem.appendChild(newElem);
}

// called when the document loads - hides relevant content
function initialiseFormat(){
	hideElementsById("userCurrentGuess");
	hideElementsById("userGuess");
	hideElementsById("hangmanHeading");

}

// Hide Elements that will appear later and set up the page  - call initialiseFormat() function
		document.body.onload = initialiseFormat;
		// Press any key to begin - calls initialization function initHangman
		document.getElementById("startGame").addEventListener("keydown", hangman.init);
		// Capture the Users Guess - this bit needs work!
		document.getElementById("userCurrentGuess").addEventListener("keypress", hangman.placeholder);

//needed for later
// var foo = document.getElementById("foo");

// if ( foo.hasChildNodes() ) { 
//   foo.removeChild( foo.childNodes[0] );
// }

	
