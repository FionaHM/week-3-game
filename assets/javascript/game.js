// Global Variables
var modifiedWord = " ";
var gameOver = false;

// Object
var hangman = {
    userCurrentLetterGuess: "",
    lettersGuessed: [],
    numberOfGuesses: 15,
    userWins: 0,
    gamesPlayed: 0,
	listOfWords: [["MaMDD", "/assets/images/file.jpg"], ["MaMDD", "/assets/images/file.jpg"], ["MaMDD", "/assets/images/file.jpg"], ["MaMDD", "/assets/images/file.jpg"], ["MaMDD","/assets/images/file.jpg"],["MaMDD","/assets/images/file.jpg"]],  // need to add images here too make 2D Array
	currentWord : "",
	hangmanWord: "",

    
	init: function(){

		// set display = none to hide some of the document elements initially
		hideElementsById("startGame");
		hideElementsById("hideKeyPress");
		showElementsById("hangmanHeading", "block");
		changeElementsByClassName("is-hidden", "block");  // newly added needs to be verified
		changeElementsByClassName("is-hidden-info-message","none"); 
		// hide  - lettersGuessed = 15 initially, userWins = 0
		hideElementsById("remainingguesses");
		hideElementsById("userwins");
		removeElement("messages"); //clears any old messages
		// randomly select a word
		hangman.selectNewWord();
	},

	selectNewWord: function(){
		// show  - lettersGuessed = 15 initially, userWins = 0
		//randomly select a word from the list ListOfWords
		var itemNumber = Math.floor(Math.random() * this.listOfWords.length); 

		// sets the property currentWord 
		this.currentWord = hangman.listOfWords[itemNumber][0]; 
		this.currentWord = this.currentWord.toUpperCase();
		console.log(this.currentWord);
	    modifiedWord = this.currentWord;  // working variable that  will be modified as letters are guessed.
	    this.hangmanWord = this.currentWord;  // set equal to get correct word length for formatting
	    this.hangmanWord = this.hangmanWord.replace(/[A-Z]/g, "*");  // replaces all the letters with *, to be filled in with correct letters
		console.log("current " + this.currentWord + "hangman " + this.hangmanWord + "mod " + modifiedWord);
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
		    ///hangman.resetNewGame(); //  start a new game
		    setTimeout(hangman.resetNewGame(), 3000);  //pause before restarting
		    removeElement("messages"); //clears any old messages
		} 
		else {
			document.getElementById("userCurrentGuess").focus();
			// Grab the user letter guess from DOM
			hangman.userCurrentLetterGuess = document.getElementById("userCurrentGuess").value;
			//console.log("user current guess" + hangman.userCurrentLetterGuess);
			// convert to capital case to compare with current word - also capital
			hangman.userCurrentLetterGuess = hangman.userCurrentLetterGuess.toUpperCase();
			
			// reset input box to be empty for next guess
			document.getElementById("userCurrentGuess").value = "";
		    removeElement("messages"); //clears any old messages
			// checks that only letters are entered - no spaces or other characters
			if (( hangman.userCurrentLetterGuess.length === 0 ) || (/[^A-Z]/.test(hangman.userCurrentLetterGuess)))
			{
				//alert("Please try again and select a letter only!")
				addElement("div", "Please Select A Letter!", "messages", "msgclass");
				changeElementsByClassName("is-hidden-info-message","block"); 

			}
			else{
				// check to see if letter already guessed
				if (hangman.lettersGuessed.includes(hangman.userCurrentLetterGuess)){
					console.log("user current guess" + hangman.userCurrentLetterGuess);
					var textValue = "already guessed the letter " + hangman.userCurrentLetterGuess;
					addElement("div", textValue, "messages", "msgclass");
				}
				// check to see if the guess is in the currentWord
				else if (modifiedWord.includes(hangman.userCurrentLetterGuess)){
					// add message to div id = messages
					addElement("div", "Good Guess!", "messages", "msgclass");
					// add letter guessed to lettersGuessed Array
					hangman.lettersGuessed.push(hangman.userCurrentLetterGuess);
					//	add this letter to the display list on DOM all the letters guessed so far
					addElement("div",hangman.userCurrentLetterGuess, "displayAllUserGuess"); 
					// there might be more that one instance of this letter in the word so they all need to be found and put in correct place
					console.log(modifiedWord.includes(hangman.userCurrentLetterGuess));
					while (modifiedWord.includes(hangman.userCurrentLetterGuess)){
					    //try to find the position of the current letter in the current word
					    console.log("in while loop modified word " + modifiedWord);
					    var indexNumWord = modifiedWord.indexOf(hangman.userCurrentLetterGuess);  
					    console.log("index word " + indexNumWord);
					    // add the letter to the correct place in the word
				        document.getElementById("letterPlaceHolder").childNodes[indexNumWord].innerHTML = hangman.userCurrentLetterGuess;
						// add this to the hangmanWord
					    hangman.hangmanWord  = hangman.hangmanWord.slice(0, indexNumWord) + hangman.userCurrentLetterGuess + hangman.hangmanWord.slice(indexNumWord+1, hangman.hangmanWord.length);
					    //starts at 0 - replace letters with "*" to preserve index location of letters
					    modifiedWord = modifiedWord.slice(0, indexNumWord) + "*" + modifiedWord.slice(indexNumWord+1, hangman.currentWord.length);
					   
				   	}  // end of inner while
				  console.log("out of while loop modified word " + modifiedWord);
				}
				else{
					// add to lettersGuessed Array
					//alert("wrong letter try again!");
					addElement("div", "Try Again!", "messages", "msgclass");
					hangman.lettersGuessed.push(hangman.userCurrentLetterGuess);
					addElement("div",hangman.userCurrentLetterGuess, "displayAllUserGuess"); 
				}  // end of else
		
				// each time a valid letter is entered decrease the remaining guesses
				hangman.numberOfGuesses = hangman.numberOfGuesses - 1;
				// display on the DOM
				document.getElementById("guessesleft").innerHTML = hangman.numberOfGuesses;
	
				// verify whether this current word game will continue - guessed word or out of lives
				if ( hangman.currentWord === hangman.hangmanWord) {
					//alert("you won this game!");
					addElement("div", "YOU WON!!!", "messages", "msgclass");
					hangman.userWins = hangman.userWins + 1;
					// set gameOver variable
					gameOver = true;
					alert("You Won! Now for another game!");
					
				} 
				else if (hangman.numberOfGuesses === 0 ){
					addElement("div", "No Lives Left - YOU LOST!", "messages", "msgclass");
					// set gameOver variable
					gameOver = true;
					alert("You Lost! Now for another game!");
					
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

//Global DOM functions start here.

// to hide elements by ID 
function hideElementsById(text){
    document.getElementById(text).style.display = 'none';
}
// to show elements by ID 
function showElementsById(text, textvalue){
    document.getElementById(text).style.display = textvalue;
}

// // to hide elements by ClassName // newly added needs to be verified
function changeElementsByClassName(text, textvalue){

	var classHideElem = document.getElementsByClassName(text);
	console.log("Im being called" + classHideElem.length);
	for(var i = 0, length = classHideElem.length; i < length; i++) {
       	  console.log("classHideElem[i]" + classHideElem[i]);
          classHideElem[i].style.display = textvalue;
    }
	// classHideElem.style.display = 'none';
}


// to display input places for hangman letters 
function letterPlaceholders(maxlength, elem, text, elemById, newclass){
    // loop though the letters of the word and create placeholders on the page
	for (var i=1; i <= maxlength; i++) {
		//Create a new div with text
	    addElement(elem,text, elemById, newclass); 

	}
}	// end of letterPlaceholders function

function addElement(elem, text, elemById, newclass) { 
  // create a new div element 
  // and give it some content 
  var newElem = document.createElement(elem); 
  var newContent = document.createTextNode(text); 
  newElem.appendChild(newContent); //add the text node to the newly created div. 
  // Set the attributes of the element
  newElem.style.margin = "10px";
  // add class to the div
  newElem.setAttribute("class", newclass);
  // add the newly created element and its content into the DOM 
  var currentElem = document.getElementById(elemById); 
  //document.body.insertBefore(newDiv, currentDiv); 
  currentElem.appendChild(newElem);
}

function removeElement(parent1) {
	// remove child nodes created in a previous game
	var myNode = document.getElementById(parent1);
		while (myNode.firstChild) {
    	   myNode.removeChild(myNode.firstChild);
		}
}

// called when the document loads - hides relevant content
function initialiseFormat(){

	// hideElementsById("userCurrentGuess");
	// hideElementsById("userGuess");
	//hideElementsById("hangmanHeading");
	changeElementsByClassName('is-hidden', 'none');	


}

// Hide Elements that will appear later and set up the page  - call initialiseFormat() function
		document.body.onload = initialiseFormat;
		// Press any key to begin - calls initialization function initHangman

		document.getElementById("startGame").focus();
		document.getElementById("startGame").addEventListener("keydown", hangman.init);
		// listens for letters
		document.getElementById("userCurrentGuess").addEventListener("keyup", hangman.handleUserGuess);

