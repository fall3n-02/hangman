let incorrectGuesses = 0;
let maxWrongGuesses = 10;

const wordDialog = document.querySelector("#wordDialog");
const messageDialog = document.querySelector("#messageDialog");
const alphabetContainer = document.querySelector(".alphabet");
const wordContainer = document.querySelector(".word-section");
const wordDescriptionContainer = document.querySelector(".word-description");
const hangmanPaths = document.querySelectorAll(".hangman-svg path");

function toggleAlphabetButtons() {
  let input = document.getElementById("wordInput").value;
  let buttons = document.querySelectorAll(".alphabet-button");
  buttons.forEach(button => button.disabled = input.length === 0);
}

function generateBlocks() {
  let input = document.getElementById("wordInput").value.toUpperCase();
  let description = document.getElementById("wordDescription").value;
  wordContainer.innerHTML = "";
  wordDescriptionContainer.textContent = description;
  document.querySelector("#wordDescription").value = "";
  incorrectGuesses = 0;
  hideHangman();
  wordDialog.close();

  let letters = input.replace(/[^A-Z]/g, "");

  for (let letter of letters) {
    let block = document.createElement("div");
    block.className = "word-letter";
    block.textContent = letter;
    block.style.color = "transparent";
    block.setAttribute("data-letter", letter);
    wordContainer.appendChild(block);
  }
}

function checkLetter(letter, button) {
  let blocks = document.querySelectorAll(".word-letter");
  let found = false;
  blocks.forEach(block => {
    if (block.getAttribute("data-letter") === letter) {
      block.style.color = "white";
      found = true;
    }
  });
  button.style.backgroundColor = found ? "green" : "darkRed";
  button.disabled = true;

  if (!found) {
    hangmanPaths[incorrectGuesses].style.visibility = "visible";
    incorrectGuesses++;
    if (incorrectGuesses >= maxWrongGuesses) {
      showDialog("YOU LOST", "A man died because of your lack of knowledge. Learn harder, learn more.");
    }
  } else if ([...blocks].every(block => block.style.color === "white")) {
    showDialog("YOU WON", "Well done! You can take this man(or his part) as a prize for your victory.");
  }
}

function showDialog(title, description) {
  messageDialog.querySelector(".message-title").textContent = title;
  messageDialog.querySelector(".message-description").textContent = description;
  messageDialog.showModal();
}

function hideHangman() {
  hangmanPaths.forEach(path => path.style.visibility = "hidden");
}

function resetGame() {
  document.getElementById("wordInput").value = "";
  wordContainer.innerHTML = "";
  wordDescriptionContainer.textContent = "";
  messageDialog.close();
  createAlphabetButtons();
  hideHangman();
  incorrectGuesses = 0;
  wordDialog.showModal();
}

function createAlphabetButtons() {
  alphabetContainer.innerHTML = "";
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let letter of alphabet) {
    let button = document.createElement("button");
    button.className = "alphabet-button";
    button.textContent = letter;
    button.onclick = () => checkLetter(letter, button);
    button.disabled = true;
    alphabetContainer.appendChild(button);
  }
}

createAlphabetButtons();
wordDialog.showModal();