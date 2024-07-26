// select control button
document.querySelector(".control-button span").onclick = function () {
  // get name from user
  let yourName = prompt("Whats Your Name ");
  // set default value to name if user don't enter true value
  if (yourName) {
    document.querySelector(".info-container .name span").innerHTML = yourName;
  } else {
    document.querySelector(".info-container .name span").innerHTML = "Guest";
  }
  // remove layout from page
  document.querySelector(".control-button").remove();
};

let duration = 1000;
let complete = 0;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

// add order css property to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  // add click event
  block.addEventListener("click", function () {
    // trigger the flip block function
    flipBlock(block);
  });
});

// flip block function
function flipBlock(selectedBLock) {
  selectedBLock.classList.add("is-flipped");
  // collect all flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  // if theres two flipped blocks
  if (allFlippedBlocks.length === 2) {
    // stop clicking
    stopClicking();
    // check matched block
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// stop clicking function

function stopClicking() {
  // add class no clicking on main container
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    // remove class no-clicking after duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
// check matched block function
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    document.getElementById("success").play();
    complete++;
    if (complete === blocks.length / 2) {
      document.querySelector(".success").classList.add("on");
      document.querySelector(
        ".success"
      ).innerHTML = `Congratulation, You Won After <span> ${parseInt(
        triesElement.innerHTML
      )} </span> Wrong Tries`;
    }
  } else {
    setTimeout(() => {
      triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
      document.getElementById("fail").play();
    }, duration);
  }
}
function shuffle(array) {
  // settings vars
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // get random number
    random = Math.floor(Math.random() * current);
    // decrease current by one
    current--;
    // save current element in stash
    temp = array[current];
    // current element = random element
    array[current] = array[random];
    // random element =  element on stash
    array[random] = temp;
  }
  return array;
}
