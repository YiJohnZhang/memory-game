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
    newDiv.classList.add(color);  //optimization and sneaky-proof suggestion: don't assign the div a class with the color but hide it as much as possible in the array.

    // call a function handleCardClick when a div is clicked on
    //newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!

let clickSessionCount = 0; //this variable keeps track of the number of clicks in a 'match session' once it reaches '2' it is supposed to reset to 0
let clickedDivs = [];
let gameClickCount = 0;  //this variable keeps track of the number of clicks in the game as a whole

//2 states with the div, '.flipped' and '.matched'. '.flipped' and '.matched' have same display but '.flipped' will be togglable within the game while '.matched' is only toggled with a reset button.

gameContainer.addEventListener('click',handleCardClick);


function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let targetCard; //
  if(event.target.id != 'game'){
    targetCard = event.target;
    //console.log(targetCard.classList[0]);
    //console.log(gameContainer.children.indexOf(event.target));  doesn't work b/c event.target gives the HTMLElement, not node?idk
  }else{
    return; //prevent from executing the rest and breaking execution
  }
  //console.log(targetCard);
  if(!(targetCard.classList.contains('flipped') || targetCard.classList.contains('matched'))){
    console.log();
    clickSessionCount += 1;
    targetCard.classList.toggle('flipped');
    targetCard.style.backgroundColor = targetCard.classList[0];
    clickedDivs.push(targetCard.classList[0]);
  } //doesn't have class flipped or .matched

  switch(clickSessionCount){
    case 2:
      clickSessionCount = 0;
      for(let memoryCard of gameContainer.children)
        memoryCard.classList.remove('flipped');

      if(clickedDivs[0] == clickedDivs[1]){ //handle matched
        for(let memoryCard of gameContainer.children){
          if(memoryCard.classList.contains(clickedDivs[0])){
            memoryCard.classList.add('matched');
            memoryCard.style.backgroundColor = clickedDivs[0];
          }
        }
      }
      clickedDivs = [];

      //reset card bg
      setTimeout(function(){
        for(let memoryCard of gameContainer.children){
          if(!memoryCard.classList.contains('matched')){
           memoryCard.style.backgroundColor = '#FFF';
          }
        }
      }, 1000);
      break;
    default:
      break;
  }

}

//console.log(gameContainer.children);  //doesn't work b/c divs are dynamically generated
// when the DOM loads
createDivsForColors(shuffledColors);
