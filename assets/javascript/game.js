// Global Variables
var modifiedWord = " ";
var gameOver = false;

// the object hangman with its properties and functions  starts here.
var hangman = {
   // alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    userCurrentLetterGuess: "",
    lettersGuessed: [],
    numberOfGuesses: 15,
    userWins: 0,
    gamesPlayed: 0,
	listOfWordsPicturesSounds: [["MaMDD", "/assets/images/file.jpg"], ["WWLEJJDD", "/assets/images/file.jpg"], ["Sligo", "/assets/images/file.jpg"], ["Kilkenny", "/assets/images/file.jpg"], ["Cork","/assets/images/file.jpg"],["Clare","/assets/images/file.jpg"]],  // need to add images here too make 2D Array
	currentWord : "",
	hangmanWord: "",

    
	init: function(){
		// set display = none to hide some of the document elements initially
		hideElementsById("startGame");
		hideElementsById("hideKeyPress");
		showElementsById("hangmanHeading", "block");
		// hide  - lettersGuessed = 15 initially, userWins = 0
		hideElementsById("remainingguesses");
		hideElementsById("userwins");
		removeElement("messages"); //clears any old messages
		// randomly select a word
		hangman.selectNewWord();
	},

	selectNewWord: function(){
		// show  - lettersGuessed = 15 initially, userWins = 0
		//randomly select a word from the list ListOfWordsPicturesSounds
		var itemNumber = Math.floor(Math.random() * 6); // Need to update multiplicand depending on number of  items in array
		// sets the variable currentWord 
		this.currentWord = hangman.listOfWordsPicturesSounds[itemNumber][0]; // kept intact for reference at end
		this.currentWord = this.currentWord.toUpperCase();
	    modifiedWord = this.currentWord;  // this will be modified as letters are guessed.
	    this.hangmanWord = this.currentWord;  // set equal to get correct word length
	    this.hangmanWord = this.hangmanWord.replace(/[A-Z]/g, "*");  // replaces all the letters with *, to be filled in with correct letters
	  //  alert(this.hangmanWord + "" + this.currentWord);
	 //    this.hangmanWord.length = this.currentWord.length;  // set to same length and fill in the blanks as letters correctly guessed
		// alert("hangman word length" + this.hangmanWord.length);
		// add some space for filling in the letters over the _____
		// letterPlaceholders(this.currentWord.length, "div", "X", "letterHolder");
		// Format display on the document page based on word length 
		letterPlaceholders(this.currentWord.length,"div", "_____", "letterPlaceHolder", "letters");
		showElementsById("userGuess", "block");
		showElementsById("userCurrentGuess", "block");
		showElementsById("userwins", "block");
		document.getElementById("currentwins").innerHTML = hangman.userWins;
		document.getElementById("currentgames").innerHTML = hangman.gamesPlayed;
		showElementsById("remainingguesses", "block");
		document.getElementById("guessesleft").innerHTML = hangman.numberOfGuesses;
		document.getElementById("userCurrentGuess").focus();
		
	},

	handleUserGuess: function(){
		if (gameOver){
			hangman.gamesPlayed = hangman.gamesPlayed + 1; //increment the number of games played
		    setTimeout(hangman.resetNewGame(), 5000); // wait a bit and start a new game
		} 
		else {
			document.getElementById("userCurrentGuess").focus();
			hangman.userCurrentLetterGuess = document.getElementById("userCurrentGuess").value;
			// convert to capital case to compare with current word - also capital
			hangman.userCurrentLetterGuess = hangman.userCurrentLetterGuess.toUpperCase();
			// reset input box to be empty for next guess
			document.getElementById("userCurrentGuess").value = "";
		    removeElement("messages"); //clears any old messages
			// checks that only letter are entered - no spaces or other characters
			if (( hangman.userCurrentLetterGuess.length === 0 ) || (/[^A-Z]/.test(hangman.userCurrentLetterGuess)))
			{
				//alert("Please try again and select a letter only!")
				addElement("div", "Please try again and select a letter only!", "messages", "msgclass");

			}
			else{
				// check to see if letter already guessed
				if (hangman.lettersGuessed.includes(hangman.userCurrentLetterGuess)){
					//alert("already guessed the letter " + hangman.userCurrentLetterGuess)
					var textValue = "already guessed the letter " + hangman.userCurrentLetterGuess;
					addElement("div", textValue, "messages", "msgclass")
				}
				// check to see if the guess is in the currentWord
				else if (modifiedWord.includes(hangman.userCurrentLetterGuess)){
					//alert("good guess!" );
					addElement("div", "Good Guess!", "messages", "msgclass");
					// add to lettersGuessed Array
					hangman.lettersGuessed.push(hangman.userCurrentLetterGuess);
					//	add this letter to the list all the letters guessed so far
					addElement("div",hangman.userCurrentLetterGuess, "displayAllUserGuess"); 
					// there might be more that one instance of this letter in the word so they all need to be found and put in correct place
					//modifiedWord = hangman.currentWord;
					//alert("modifiedWord" + modifiedWord);
					while (modifiedWord.includes(hangman.userCurrentLetterGuess)){
					    //try to find the position of the current letter in the current word
					    var indexNumWord = modifiedWord.indexOf(hangman.userCurrentLetterGuess);  
					    // add the letter to the correct place in the word
				        document.getElementById("letterPlaceHolder").childNodes[indexNumWord].innerHTML = hangman.userCurrentLetterGuess;
				       // hangman.hangmanWord = document.getElementById("letterPlaceHolder").childNodes[0-hangman.hangmanWord.length].innerHTML;
						//alert(document.getElementById("letterPlaceHolder").querySelectorAll(".letters").value);
						// add this to the hangmanWord
					   // hangman.hangmanWord = hangman.hangmanWord[indexNumWord];
					    hangman.hangmanWord  = hangman.hangmanWord.slice(0, indexNumWord) + hangman.userCurrentLetterGuess + hangman.hangmanWord.slice(indexNumWord+1, hangman.hangmanWord.length);
				         //alert("hangmanword is " +  hangman.hangmanWord);
				        // hangman.currentWord.splice(1, indexNumWord);
					    // alert(hangman.currentWord + "after splice");
					    //hangman.currentWord.replace('','');
					    //starts at 0 - replace letters with "*" to preserve index location of letters
					    modifiedWord = modifiedWord.slice(0, indexNumWord) + "*" + modifiedWord.slice(indexNumWord+1, hangman.currentWord.length);
					   // alert("modified word" + modifiedWord);
					    // hangman.currentWord = hangman.currentWord.replaceAt(indexNumWord, hangman.userCurrentLetterGuess);
					    //alert("hello" + hangman.currentWord);
				   }
				  // hangman.currentWord = modifiedWord;	    
				}
				else{
					// add to lettersGuessed Array
					//alert("wrong letter try again!");
					addElement("div", "Try Again!", "messages", "msgclass");
					hangman.lettersGuessed.push(hangman.userCurrentLetterGuess);
					addElement("div",hangman.userCurrentLetterGuess, "displayAllUserGuess"); 
				}
				// decrease numberOfGuesses by one - this is done for each guess.
				//alert("number of Guess after" + hangman.numberOfGuesses);

				// each time a valid letter is entered decrease the remaining guesses
				hangman.numberOfGuesses = hangman.numberOfGuesses - 1;
				document.getElementById("guessesleft").innerHTML = hangman.numberOfGuesses;

				
				// verify whether this game will continue - won or out of lives
				if ( hangman.currentWord === hangman.hangmanWord) {
					//alert("you won this game!");
					addElement("div", "YOU WON!!!", "messages", "msgclass");
					hangman.userWins = hangman.userWins + 1;
					//pause a bit to savor the win and start another game
					gameOver = true;
					//hangman.gamesPlayed = hangman.gamesPlayed + 1; //increment the number of games played
				} 
				else if (hangman.numberOfGuesses === 0 ){
					addElement("div", "No Lives Left - YOU LOST!", "messages", "msgclass");
					//alert("no lives left - you list this game!");
					gameOver = true;
					//hangman.gamesPlayed = hangman.gamesPlayed + 1; //increment the number of games played
				}
				

			} // end of main if loop
			
	} // end of gameover check loop

	}, // end of handleUserGuess function

 resetNewGame: function(){
 	//resets document objects and counter (except UserWins) and starts new game
 	removeElement("messages"); //clears any old messages
 	this.userCurrentLetterGuess = "";
    this.lettersGuessed = [];
    this.numberOfGuesses = 15;
    gameOver = false;
	currentWord = "";
	hangmanWord = "";
	removeElement("letterPlaceHolder");
	removeElement("displayAllUserGuess");
 	hangman.selectNewWord();  //start a new game

 } // end of resetNewGame function
	
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

// from stackoverflow - how to replace a string character at index position - tried splice but it didnt work
// function replaceAt(index, character) {
//     return this.substr(0, index) + character + this.substr(index+character.length);
// }
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
function letterPlaceholders(maxlength, elem, text, elemById, newclass){
    // loop though the letters of the word and create placeholders on the page
	for (var i=1; i <= maxlength; i++) {
		//Create a new div with text
	    addElement(elem,text, elemById, newclass); 

	}
}	// end of letterPlaceholders function

// From mozilla.org - how to add an element

function addElement(elem, text, elemById, newclass) { 
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
  // add class to the div
  newElem.setAttribute("class", newclass);
  // add the newly created element and its content into the DOM 
  var currentElem = document.getElementById(elemById); 
  //document.body.insertBefore(newDiv, currentDiv); 
  currentElem.appendChild(newElem);
}

function removeElement(parent1) {
	//alert("in remove element function");
	var myNode = document.getElementById(parent1);
		while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
		}
	// var parent = document.getElementById(parent1);
	// var child = document.getElementsByClassName(child1);
	// parent.removeChild(child);
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
		document.getElementById("startGame").focus();
		document.getElementById("startGame").addEventListener("keydown", hangman.init);
		//document.body.addEventListener("keydown", hangman.init);
		// Capture the Users Guess - this bit needs work!
		document.getElementById("userCurrentGuess").addEventListener("keyup", hangman.handleUserGuess);

//needed for later
// var foo = document.getElementById("foo");

// if ( foo.hasChildNodes() ) { 
//   foo.removeChild( foo.childNodes[0] );
// }

	
