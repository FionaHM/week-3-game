// the object hangman with its properties and functions  starts here.
var hangman = {
    alphabet: "abcdefghijklmnopqrstuvwxyz",
    userCurrentLetterGuess: "",
    lettersGuessed: [],
    numberOfGuesses: 15,
    userWins: 0,
	listOfWordsPicturesSounds: [["Mayo", "/assets/images/file.jpg"], ["Wexford", "/assets/images/file.jpg"], ["Sligo", "/assets/images/file.jpg"], ["Kilkenny", "/assets/images/file.jpg"], ["Cork","/assets/images/file.jpg"],["Clare","/assets/images/file.jpg"]],  // need to add images here too make 2D Array
	currentGameWon : false,
	currentWord : "",

    
	init: function(){
		// set display = none to hide some of the document elements initially
		hideElementsById("startGame");
		hideElementsById("hideKeyPress");
		showElementsById("hangmanHeading", "block");
		// hide  - lettersGuessed = 15 initially, userWins = 0
		hideElementsById("remainingguesses");
		hideElementsById("userwins");
		// randomly select a word
		hangman.selectNewWord();
	},

	selectNewWord: function(){
		// show  - userWins = 0. lettersGuessed = 15 initially, userWins = 0
		//randomly select a word from the list ListOfWordsPicturesSounds
		var itemNumber = Math.floor(Math.random() * 6); // Need to update multiplicand depending on number of  items in array
		// sets the variable currentWord 
		this.currentWord = hangman.listOfWordsPicturesSounds[itemNumber][0];
		this.currentWord = this.currentWord.toUpperCase();
		// add some space for filling in the letters over the _____
		// letterPlaceholders(this.currentWord.length, "div", "X", "letterHolder");
		// Format display on the document page based on word length 
		letterPlaceholders(this.currentWord.length,"div", "_____", "letterPlaceHolder");
		showElementsById("userGuess", "block");
		showElementsById("userCurrentGuess", "block");
		showElementsById("userwins", "block");
		document.getElementById("currentwins").innerHTML = hangman.userWins;
		showElementsById("remainingguesses", "block");
		document.getElementById("guessesleft").innerHTML = hangman.numberOfGuesses;
		
		
	},

	handleUserGuess: function(){
		hangman.userCurrentLetterGuess = document.getElementById("userCurrentGuess").value;
		// convert to capital case to compare with current word - also capital
		hangman.userCurrentLetterGuess = hangman.userCurrentLetterGuess.toUpperCase();
		
		// reset input box to be empty for next guess
		document.getElementById("userCurrentGuess").value = "";
		alert(hangman.currentWord);
		// check to see if letter already guessed
		if (hangman.lettersGuessed.includes(hangman.userCurrentLetterGuess)){
			alert("already guessed the letter " + hangman.userCurrentLetterGuess);
		}
		// check to see if the guess is in the currentWord
		else if (hangman.currentWord.includes(hangman.userCurrentLetterGuess)){
			alert("good guess!" );
			// add to lettersGuessed Array
			hangman.lettersGuessed.push(hangman.userCurrentLetterGuess);
			//try to find the position of the current letter in the current word
			var indexNumWord =hangman.currentWord.indexOf(hangman.userCurrentLetterGuess);
		//	alert("index of" + hangman.currentWord.indexOf(hangman.userCurrentLetterGuess));
			addElement("div",hangman.userCurrentLetterGuess, "displayAllUserGuess"); 
			// // display the letter on the hangman placeholder, in the right location!
			// var x = document.getElementById("letterplaceholder");
			alert("Current User guess value" + indexNumWord);
		    // Need to look up how to access child nodes ********working here 
		    document.getElementById("letterPlaceHolder").childNodes[indexNumWord].innerHTML = hangman.userCurrentLetterGuess;
		    // document.getElementsByElementId("letterplaceholder")[indexNumWord].innerHTML.replace = hangman.userCurrentLetterGuess;

			// var x = document.getElementById("letterplaceholder");
			// x.getElementsByElementId("letterplaceholder")[indexWord].innerHTML = hangman.userCurrentLetterGuess;

		}
		else{
			// add to lettersGuessed Array
			alert("wrong letter try again!");
			hangman.lettersGuessed.push(hangman.userCurrentLetterGuess);
			addElement("div",hangman.userCurrentLetterGuess, "displayAllUserGuess"); 
		}
		// decrease numberOfGuesses by one - this is done for each guess.
		alert("number of Guess after" + hangman.numberOfGuesses);
		hangman.numberOfGuesses = hangman.numberOfGuesses - 1;
		document.getElementById("guessesleft").innerHTML = hangman.numberOfGuesses;

	
	}

	
}  // end of hangman object its properties and its functions

//Global functions start here.

// to hide elements by ID 
function hideElementsById(text){
    document.getElementById(text).style.display = 'none';
}
// to show elements by ID 
function showElementsById(text, textvalue){
    document.getElementById(text).style.display = textvalue;
}

// to hide elements by class 
// function showElementsByClass(text, textvalue){
// 	document.getElementsByClassName(text).style.display = textvalue;
// }
// to show elements by class 
// function hideElementsByClass(text){
// 	// var nodeList = document.getElementsByClassName(text);
// 	// nodeList.style.display = 'none';
// 	document.getElementsByClassName(text).style.display = 'none';
// }
// to display input places for hangman letters - te
function letterPlaceholders(maxlength, elem, text, elemById){
    // loop though the letters of the word and create placeholders on the page
	for (var i=1; i <= maxlength; i++) {
		//Create a new div with text
	    addElement(elem,text, elemById); 

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
		document.getElementById("userCurrentGuess").addEventListener("keyup", hangman.handleUserGuess);

//needed for later
// var foo = document.getElementById("foo");

// if ( foo.hasChildNodes() ) { 
//   foo.removeChild( foo.childNodes[0] );
// }

	
