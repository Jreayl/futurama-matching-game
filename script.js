/***  appendNewCard(flipCount)  <----- START HERE!

OVERVIEW:
This is the first function we're going to write in our project. The purpose of this function is to add a single new card element to the page (it won't have any pictures yet). We are going to "construct" this element and place it on the page using our knowledge of DOM Manipulation.

INPUT/OUTPUT: 
The appendNewCard function takes in a parent HTML element as a parameter named 'flipCount'. The parent element will look like this:

  <div id="card-container">
  </div>

After the function call the flipCount should look like this:

  <div id="card-container">
    <div class="card">
      <div class="card-down"></div>
      <div class="card-up"></div>
    </div>
  </div>

To accomplish this, the function is should create the new card element (i.e. .card), append it as a child to the flipCount (i.e. #card-container), and return the new card element.
*/
function appendNewCard(flipCount) {
    // Create new card element and add class name to it
    const newCardElement = document.createElement('div');
    newCardElement.classList.add('card');

    // Create children of new card element and add class names to them
    const childOne = document.createElement('div');
    childOne.classList.add('card-down');
    const childTwo = document.createElement('div');
    childTwo.classList.add('card-up');

    // Append children to new card element
    newCardElement.appendChild(childOne);
    newCardElement.appendChild(childTwo);

    // Append new card element to parent element
    flipCount.appendChild(newCardElement);

    // Return new card element
    return newCardElement;
}
// appendNewCardTest();

/***  shuffleCardImageClasses()

OVERVIEW:
We've defined image classes in the CSS named 'image-1' through 'image-6' that, when applied to a card, will make it show that particular image when it's flipped. Since the matching game works with pairs of images, we want to generate a random array with two of each image class string (12 total).

INPUT/OUTPUT: 
Returns an array with 12 randomly ordered image classes (i.e. image-X, where X is a value between 1 and 6). There should be exactly 2 of each image class in the array.
*/
function shuffleCardImageClasses() {
    return _.shuffle(createImageArray());
}

function createImageArray() {
    let imageArray = [];
    let count = 0;

    for (let i = 1; i < 16; ) {
        imageArray.push('image-' + i);
        count++;
        if (count == 2) {
            count = 0;
            i++;
        }
    }

    return imageArray;
}
// shuffleCardImageClassesTest();

/***  createCards()

OVERVIEW:
For each of the 12 cards in the game, this function will create a card, assign it a random image class, and create an object to represent that card in our program.

INPUT/OUTPUT:  
The 'flipCount' parameter is the DOM element where the cards should be appended as children (i.e. #card-container). 

The 'shuffledImageClasses' parameter is an array of 12 image class strings (e.g. "image-1", "image-5", "image-3"...) randomly ordered and with 2 strings from each image class.

Returns an array of card objects to track all the cards for the rest of our program.
*/
function createCards(flipCount, shuffledImageClasses) {
    let cards = [];

    for (let i = 0; i < 30; i++) {
        let newCard = appendNewCard(flipCount);
        newCard.classList.add(shuffledImageClasses[i]);

        const card = {
            index: i,
            element: newCard,
            imageClass: shuffledImageClasses[i],
        };

        cards.push(card);
    }

    return cards;
}
// createCardsTest();

/***  doCardsMatch

OVERVIEW:
Given two card objects, this will check if the card objects show the same image when flipped.

INPUT/OUTPUT:  
The 'cardObject1' parameter is the first card object in the comparison.

The 'cardObject2' parameter is the second card object in the comparison.

The function should return 'true' when both cards have the same imageClass property and 'false' otherwise.
*/
function doCardsMatch(cardObject1, cardObject2) {
    return cardObject1.imageClass == cardObject2.imageClass;
}
// doCardsMatchTest();

/* An object used below as a dictionary to store counter names and their respective values.  Do you remember using objects as dictionaries? If not, go back to that lecture to review. */
let counters = {};

/***  incrementCounter 

OVERVIEW:
Adds one to a counter being displayed on the webpage (meant for counting flips and matches).

INPUT/OUPUT
The 'counterName' parameter is the string representing the name of the counter to increment (e.g. "flip").

The 'flipCount' parameter is the DOM element that shows the counter (e.g. <span id="flip-count"> in the HTML). The 'innerHTML' of this element determines what value is displayed for the counter.

This function should use the global 'counters' object above to store counter names and their respective values and update the DOM to show the new counter value when changed.
*/
function incrementCounter(counterName, flipCount) {
    if (!counters.hasOwnProperty(counterName)) {
        counters[counterName] = 0;
    }
    counters[counterName]++;
    flipCount.innerText = counters[counterName];
}
// incrementCounterTest();

/* Variables storing an audio objects to make the various sounds.  See how it's used for the 'click' sound in the provided function below.  */
let clickAudio = new Audio('audio/click.wav');
let winAudio = new Audio('audio/win.wav');

// Voice quips for matching cards
let fryAudio = new Audio('audio/fry.mp3'); // 1
let benderAudio = new Audio('audio/bender.mp3'); // 2
let leelaAudio = new Audio('audio/leela.mp3'); // 3
let zoidbergAudio = new Audio('audio/zoidberg.mp3'); // 4
let zappAudio = new Audio('audio/zapp.mp3'); // 5
let hermesAudio = new Audio('audio/hermes.mp3'); // 6
let professorAudio = new Audio('audio/professor.mp3'); // 7
let amyAudio = new Audio('audio/amy.mp3'); // 8
let scruffyAudio = new Audio('audio/scruffy.mp3'); // 9
let kifAudio = new Audio('audio/kif.mp3'); // 10
let morboAudio = new Audio('audio/morbo.mp3'); // 11
let lrrrAudio = new Audio('audio/lrrr.mp3'); // 12
let nixonAudio = new Audio('audio/nixon.mp3'); // 13
let calculonAudio = new Audio('audio/calculon.mp3'); // 14
let momAudio = new Audio('audio/mom.mp3'); // 15

/***  flipCardWhenClicked
[The implementation of this function has been provided for you but you will still need to understand and call it.]

OVERVIEW:
Attaches a mouseclick listener to a card (i.e. onclick), flips the card when clicked, and calls the function 'onCardFlipped' after the flip is complete.

INPUT/OUPUT
The 'cardObject' parameter is a custom card object we created in the 'createCards' function.

This function will make the card element associated with 'cardObject' clickable and call onCardFlipped with that cardObject after the flip is complete.
*/
function flipCardWhenClicked(cardObject) {
    // Adds an "onclick" attribute/listener to the element that will call the function below.
    cardObject.element.onclick = function () {
        // THE CODE BELOW RUNS IN RESPONSE TO A CLICK.

        // Card is already flipped, return.
        if (cardObject.element.classList.contains('flipped')) {
            return;
        }

        // Play the "click" sound.
        clickAudio.play();

        // Add the flipped class immediately after a card is clicked.
        cardObject.element.classList.add('flipped');

        // Wait 500 milliseconds (1/2 of a second) for the flip transition to complete and then call onCardFlipped.
        setTimeout(function () {
            // THE CODE BELOW RUNS AFTER a 500ms delay.
            onCardFlipped(cardObject);
        }, 500);
    };
}

/* The 'onCardFlipped' function below will be called each time the user flips a card.  This variable is used to remember the first card flipped while we wait for the user to flip another card. It should be reset to 'null' each time a second card is flipped. */
let lastCardFlipped = null;

/***  flipCardWhenClicked
OVERVIEW:
This is called each time the user flips a card and should handle and track the game mechanics like: "Is this the first or second card flipped in a sequence?", "Do the cards match", and "Is the game over?"

INPUT/OUPUT
The 'newlyFlippedCard' parameter is a custom card object that has just been flipped.
*/
function onCardFlipped(newlyFlippedCard) {
    let flipCount = document.getElementById('flip-count');
    let matchCount = document.getElementById('match-count');

    incrementCounter('flip-count', flipCount);

    if (lastCardFlipped == null) {
        lastCardFlipped = newlyFlippedCard;
        return;
    }

    if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
        lastCardFlipped.element.classList.remove('flipped');
        newlyFlippedCard.element.classList.remove('flipped');
        lastCardFlipped = null;
        return;
    }

    incrementCounter('match-count', matchCount);

    lastCardFlipped.element.classList.add('glow');
    newlyFlippedCard.element.classList.add('glow');

    let cardClassList = newlyFlippedCard.element.classList;

    if (isWin()) winAudio.play();
    else playMatchAudio(cardClassList);

    lastCardFlipped = null;
}

function isWin() {
    return document.getElementById('match-count').innerText == 15;
}

function playMatchAudio(classList) {
    if (classList.contains('image-1')) fryAudio.play();
    if (classList.contains('image-2')) benderAudio.play();
    if (classList.contains('image-3')) leelaAudio.play();
    if (classList.contains('image-4')) zoidbergAudio.play();
    if (classList.contains('image-5')) zappAudio.play();
    if (classList.contains('image-6')) hermesAudio.play();
    if (classList.contains('image-7')) professorAudio.play();
    if (classList.contains('image-8')) amyAudio.play();
    if (classList.contains('image-9')) scruffyAudio.play();
    if (classList.contains('image-10')) kifAudio.play();
    if (classList.contains('image-11')) morboAudio.play();
    if (classList.contains('image-12')) lrrrAudio.play();
    if (classList.contains('image-13')) nixonAudio.play();
    if (classList.contains('image-14')) calculonAudio.play();
    if (classList.contains('image-15')) momAudio.play();
}

// Set up the game.
let cardObjects = createCards(
    document.getElementById('card-container'),
    shuffleCardImageClasses()
);

if (cardObjects != null) {
    for (let i = 0; i < cardObjects.length; i++) {
        flipCardWhenClicked(cardObjects[i]);
    }
}
// runAllTests();
