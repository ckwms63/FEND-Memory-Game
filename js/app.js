/*
 * 	Content:
 *  1. Create list of cards
 * 	2. Initialize the game
 * 	3. Shuffle card
 * 	4. Click event
 * 	5. Matching cards
 * 	6. Add moves
 * 	7. Game over
 * 	8. Game over message
 * 	9. Play again button
 * 	10. Rating
 * 	11. Start timer
    12. Stop timer
 * 	13. Reset timer
 * 	14. Restart game button
*/

/*
 * 1. Create list of cards
 */
const cardSymbol = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
                    "fa fa-cube", "fa fa-leaf", "fa fa-bicycle","fa fa-bomb"];
const symbol = cardSymbol.concat(cardSymbol);

/*
 * 2. Initialize the game
*/
const deck = document.querySelector(".deck");
function init(){
    const card = shuffle(symbol);
    for (let i = 0; i < symbol.length; i++ ){
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = "<i class='"+ symbol[i] + "'></i>";
        deck.appendChild(card);
        click(card); //click event function
    }
}

/*
 * 3. Shuffle card function from http://stackoverflow.com/a/2450976
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
* 4. Click event function
*/
let firstClick = true;
let openedCards = []; //empty array to save open cards
function click(card){
    card.addEventListener("click", function() {
      const card2 = this, card1 = openedCards[0];

    if(firstClick) {
      startTimer();
      firstClick = false; //to prevent timer to start again if another card is clicked
    }

    // if there are opened cards, match the cards
    if (openedCards.length === 1){
      card.classList.add("open", "show", "disable");
      openedCards.push(this);
      match(card2, card1); // matching cards function
    }  else {
    // if there's no opened cards
        card.classList.add("open", "show", "disable");
        openedCards.push(this);
    }
});
}

/*
* 5. Matching cards function
*/
let matchedCards = []; //empty array to save match cards
function match(card2, card1){
  if (card2.innerHTML === card1.innerHTML){
    card2.classList.add("match");
    card1.classList.add("match");
    matchedCards.push(card2, card1);
    openedCards = [];
    isOver(); //game over function
  } else {
    setTimeout(function() {
      card2.classList.remove("open", "show", "disable");
      card1.classList.remove("open", "show", "disable");
      openedCards = [];
    }, 300);
  }
  addMove();
}

/*
* 6. Add moves function
*/
const movesLabel = document.querySelector(".moves");
let moves = 0;
movesLabel.innerHTML = 0;
function addMove() {
  moves++;
  movesLabel.innerHTML = moves;
  rating();
}

/*
* 7. Game over function
*/
function isOver() {
   if (matchedCards.length === symbol.length){
          modalBox();
          stopTimer();
   }
}

/*
 * 8. Game over message
*/
const modal = document.querySelector(".modal");
function modalBox() {
      modal.style.top = "0"; // display the modal
      // add total time
      const totalHours       = document.querySelector("#totalHours");
      const totalMinutes     = document.querySelector("#totalMinutes");
      const totalSeconds     = document.querySelector("#totalSeconds");
      totalHours.innerHTML   = hours;
      totalMinutes.innerHTML = minutes;
      totalSeconds.innerHTML = seconds;
      // add total moves
      const totalMoves = document.querySelector("#totalMoves");
      totalMoves.innerHTML = moves + 1;
      // add rating
      const endRating = document.querySelector(".end-rating");
      endRating.innerHTML = stars.innerHTML;
}

/*
 * 9. Play again button
*/
const playAgain = document.querySelector(".play-again");
playAgain.addEventListener("click", function(){
      modal.style.top = "-150%"; //hide the modalBox
      restartGame();
});

/*
* 10. Rating function
*/
const stars = document.querySelector(".stars");
function rating() {
  if (moves > 10 && moves < 16) {
    stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                       <li><i class="fa fa-star"></i></li>`;
  } else if (moves > 16) {
    stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  }
}

/*
 * 11. Start timer
 */
const secondsContainer = document.querySelector("#seconds");
const minutesContainer = document.querySelector("#minutes");
const hoursContainer   = document.querySelector("#hours");
let totalTime = 0;
let interval = 0;
function startTimer() {
    // Start interval
    interval = setInterval(function() {
        totalTime += 1; // add totalTime by 1
        // convert total time to H:M:S
        hours   = Math.floor( totalTime / 60 / 60);
        minutes = Math.floor( (totalTime / 60) % 60);
        seconds = totalTime % 60;
        // change the current time values
        secondsContainer.innerHTML = seconds;
        minutesContainer.innerHTML = minutes;
        hoursContainer.innerHTML   = hours;
    }, 1000);
}

/*
 * 12. Stop timer
 */
function stopTimer() {
  clearInterval(interval);
}

/*
 * 13. Reset timer
 */
function resetTimer(){
    hoursContainer.innerHTML = "00";
    minutesContainer.innerHTML = "00";
    secondsContainer.innerHTML = "00";
    stopTimer();
    firstClick = true;
    totalTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
}

/*
* 14. Restart game button
*/
const restart = document.querySelector(".restart");
restart.addEventListener("click", restartGame);
function restartGame(){
      deck.innerHTML = ""; // delete all cards
      init(); // call init to create new cards
      matchedCards = []; // reset any related variables
      moves = 0;
      movesLabel.innerHTML = 0; // reset moves
      stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                         <li><i class="fa fa-star"></i></li>
                         <li><i class="fa fa-star"></i></li>`;
      resetTimer();
      openedCards = [];
}

init();
