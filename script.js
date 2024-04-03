const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

const clickedCards = []; // array to hold cards which have been clicked

function handleCardClick(event) {
  // if no cards have been selected yet
  if (clickedCards.length === 0) {
    revealCard(event.target);

  // else if one card has already been selected
  } else if (clickedCards.length === 1) {
    // check that same card has not been selected twice
    if (event.target !== clickedCards[0]) {
      revealCard(event.target);

      // check if the selected cards have the same color
      if (event.target.classList[0] === clickedCards[0].classList[0]) {
        cardsMatch();
      } else {
        setTimeout (cardsDontMatch, 1000);
      }
    }
  // prevent more than two cards from being revealed at a time
  } else {
    alert ("Only two cards may be revealed at a time!");
  }
}

// reveal the card color and add to the clickedCards array
function revealCard(card) {
  card.style.backgroundColor = card.classList[0];
  clickedCards.push(card);
}

// remove matching cards from the clickedCards array
function cardsMatch() {
  let counter = clickedCards.length;
  while (counter > 0) {
    counter--;
    // remove event listener so matched cards cannot be selected again
    clickedCards[counter].removeEventListener('click', handleCardClick);
    clickedCards.pop();
  }
}

// hide colors of nonmatching cards and remove them from the array
function cardsDontMatch() {
  let counter = clickedCards.length;
  while (counter > 0) {
    counter--;
    clickedCards[counter].style.backgroundColor = "";
    clickedCards.pop();
  }
}
// when the DOM loads
createDivsForColors(shuffledColors);