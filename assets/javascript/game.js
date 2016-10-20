// Global Variables
var modifiedWord = " ";
var gameOver = false;
var itemNumber;
var fired = true;  //flag for initial event listener
var keyFired = false; //flag for event listener for letter entry
var audioWin;


// Object
var hangman = {
    userCurrentLetterGuess: "",
    lettersGuessed: [],
    numberOfGuesses: 15,
    userWins: 0,
    gamesPlayed: 0,
	//listOfWords: [["MaMDD", "/assets/images/file.jpg"], ["MaMDD", "/assets/images/file.jpg"], ["MaMDD", "/assets/images/file.jpg"], ["MaMDD", "/assets/images/file.jpg"], ["MaMDD","/assets/images/file.jpg"],["MaMDD","/assets/images/file.jpg"]],  // need to add images here too make 2D Array
	listOfWords: [["broomstick", "assets/images/broomstick.png"], ["underworld", "assets/images/underworld.png"],["jackolantern", "assets/images/jackolantern.png"],["gravestones", "assets/images/gravestones.png"],["tombstones", "assets/images/tombstones.png"],["nightmare", "assets/images/nightmare.png"],["skeleton", "assets/images/skeleton.png"],["trick", "assets/images/trick.png"],["treat", "assets/images/treat.png"],["witch", "assets/images/witch.png"],["pumpkin", "assets/images/pumpkin.png"],["candy", "assets/images/candy.png"],["ghost", "assets/images/ghost.png"]],
	currentWord : "",
	hangmanWord: "",

    
	init: function(){
		if (fired === true){
			// set display = none to hide some of the document elements initially
			hideElementsById('hideKeyPress');
			changeElementsByClassName('is-hidden', 'block'); 
			changeElementsByClassName('hide-img', 'block');
			changeElementsByClassName('is-hidden-info-message','none'); 
			removeElement('messages'); //clears any old messages
			// randomly select a word
			hangman.selectNewWord();
			// switch off document keydown event listerner
			fired = false;
		
		}

		
	},

	selectNewWord: function(){
		// show  - lettersGuessed = 15 initially, userWins = 0
		//randomly select a word from the list ListOfWords
		itemNumber = Math.floor(Math.random() * this.listOfWords.length); 
		// sets the property currentWord 
		this.currentWord = hangman.listOfWords[itemNumber][0]; 
		this.currentWord = this.currentWord.toUpperCase();
	    modifiedWord = this.currentWord;  // working variable that  will be modified as letters are guessed.
	    this.hangmanWord = this.currentWord;  // set equal to get correct word length for formatting
	    this.hangmanWord = this.hangmanWord.replace(/[A-Z]/g, "*");  // replaces all the letters with *, to be filled in with correct letters
		// Format display on the document page based on word length
		letterPlaceholders(this.currentWord.length,'div', '_____', 'letterPlaceHolder', 'letters');
		// Change Formatting
		document.getElementById('currentwins').innerHTML = hangman.userWins;
		document.getElementById('currentgames').innerHTML = hangman.gamesPlayed;
		document.getElementById('guessesleft').innerHTML = hangman.numberOfGuesses;
		document.getElementById('userCurrentGuess').focus();	
	},

	handleUserGuess: function(){
			if (gameOver){
				audioWin.pause();
				audioWin.currentTime = 0;
				// Put this up here because the game was restarting too soon when I had it below in the win / lose IF
				hangman.gamesPlayed = hangman.gamesPlayed + 1; //increment the number of games played
			    //  start a new game
			    setTimeout(hangman.resetNewGame(), 3000);  // meant to pause before restarting -- not sure it does much
			    removeElement('messages'); //clears any old messages
			} 
			else {
				// display initial message
				addElement('div', 'Select A Letter to Begin the Game!', 'messages', 'msgclass');
				changeElementsByClassName('is-hidden-info-message','block'); 
				document.getElementById('userCurrentGuess').focus();
				// Grab the user letter guess from DOM
				hangman.userCurrentLetterGuess = document.getElementById('userCurrentGuess').value;
				// convert to capital case to compare with current word - also capital
				hangman.userCurrentLetterGuess = hangman.userCurrentLetterGuess.toUpperCase();
				// reset input box to be empty for next guess
				document.getElementById('userCurrentGuess').value = "";
			    //
				// checks that only letters are entered - no spaces or other characters
				if (( hangman.userCurrentLetterGuess.length === 0 ) || (/[^A-Z]/.test(hangman.userCurrentLetterGuess)))
				{
					//alert("Please try again and select a letter only!")
					removeElement('messages'); //clears any old messages
					addElement('div', 'Please Select A Letter!', 'messages', 'msgclass');
					changeElementsByClassName('is-hidden-info-message','block'); 

				}
				else{
					// check to see if letter already guessed
					if (hangman.lettersGuessed.includes(hangman.userCurrentLetterGuess)){
						var textValue = "The letter " + hangman.userCurrentLetterGuess + " has already been guessed!";
						removeElement('messages'); //clears any old messages
						addElement('div', textValue, 'messages', 'msgclass');
					}
					// check to see if the guess is in the currentWord
					else if (modifiedWord.includes(hangman.userCurrentLetterGuess)){
						removeElement('messages'); //clears any old messages
						// add message to div id = messages
						addElement('div', 'Correct Guess!', 'messages', 'msgclass');
						// add letter guessed to lettersGuessed Array
						hangman.lettersGuessed.push(hangman.userCurrentLetterGuess);
						//	add this letter to the display list on DOM all the letters guessed so far
						addElement('div',hangman.userCurrentLetterGuess, 'displayAllUserGuess', 'guessed'); 
						// there might be more that one instance of this letter in the word so they all need to be found and put in correct place
						while (modifiedWord.includes(hangman.userCurrentLetterGuess)){
						    //try to find the position of the current letter in the current word
						    var indexNumWord = modifiedWord.indexOf(hangman.userCurrentLetterGuess);  
						    // add the letter to the correct place in the word
					        document.getElementById('letterPlaceHolder').childNodes[indexNumWord].innerHTML = hangman.userCurrentLetterGuess;
							// add this to the hangmanWord
						    hangman.hangmanWord  = hangman.hangmanWord.slice(0, indexNumWord) + hangman.userCurrentLetterGuess + hangman.hangmanWord.slice(indexNumWord+1, hangman.hangmanWord.length);
						    //starts at 0 - replace letters with "*" to preserve index location of letters
						    modifiedWord = modifiedWord.slice(0, indexNumWord) + "*" + modifiedWord.slice(indexNumWord+1, hangman.currentWord.length);
						   
					   	}  // end of inner while
					}
					else{
						// add to lettersGuessed Array
						//alert("wrong letter try again!");
						removeElement('messages'); //clears any old messages
						addElement('div', 'Try Again!', 'messages', 'msgclass');
						hangman.lettersGuessed.push(hangman.userCurrentLetterGuess);
						addElement('div',hangman.userCurrentLetterGuess, 'displayAllUserGuess', 'guessed'); 
					}  // end of else
			
					// each time a valid letter is entered decrease the remaining guesses
					hangman.numberOfGuesses = hangman.numberOfGuesses - 1;
					// display on the DOM
					document.getElementById('guessesleft').innerHTML = hangman.numberOfGuesses;
		
					// verify whether this current word game will continue - guessed word or out of lives
					if ( hangman.currentWord === hangman.hangmanWord) {
						removeElement('messages'); //clears any old messages
						addElement('div', 'Great Job - YOU WON!!!', 'messages', 'winmsg');
						addElement('div', 'Press any key to continue.', 'messages', 'winmsg');
						audioWin = document.getElementById("myAudio");
						audioWin.play();
						hangman.userWins = hangman.userWins + 1;
						// set gameOver variable
						gameOver = true;
						document.getElementById('picture').src = hangman.listOfWords[itemNumber][1];
						
					} 
					else if (hangman.numberOfGuesses === 0 ){
						removeElement('messages'); //clears any old messages
						addElement('div', 'No Lives Left - Sorry YOU LOST!', 'messages', 'lossmsg');
						// set gameOver variable
						gameOver = true;
						//fired = true;
						//alert("You Lost! Now for another game!");
						document.getElementById('picture').src = "assets/images/sadface.png";
						
					}
					

				} // end of main if loop
				
		} // end of gameover check loop
	}, // end of handleUserGuess function

 resetNewGame: function(){
 	//resets document objects and counter (except UserWins) and starts new game
 	removeElement('messages'); //clears any old messages
 	this.userCurrentLetterGuess = "";
    this.lettersGuessed = [];
    this.numberOfGuesses = 15;
    gameOver = false;
	currentWord = "";
	hangmanWord = "";
	removeElement('letterPlaceHolder');
	removeElement('displayAllUserGuess');
	document.getElementById('picture').src = "assets/images/question.png"
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
	for(var i = 0, length = classHideElem.length; i < length; i++) {
          // loop through the elements with the current class and set display value
          classHideElem[i].style.display = textvalue;
    }
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
  newElem.setAttribute('class', newclass);
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
	changeElementsByClassName('hide-img', 'none');


}

// Hide Elements that will appear later and set up the page  - call initialiseFormat() function
		document.body.onload = initialiseFormat;
		
		
		// Press any key to begin - calls initialization function initHangman

		//document.getElementById("startGame").focus();
		//document.getElementById("startGame").addEventListener("keydown", hangman.init);
		// for intial keydown event - don't want it to fire again
		console.log("00 " + keyFired);
		if (fired){
			document.body.addEventListener('keydown', hangman.init);
			keyFired = true;
		}
		console.log("1 " + keyFired);
		if (keyFired){
			// listens for letters
			document.getElementById("userCurrentGuess").addEventListener("keyup", hangman.handleUserGuess);
		}
		

		

