const greetingsDialog = document.querySelector("#greetings-dialog");
const startGameButton = document.querySelector("#form-button");

window.onload = function () {
  greetingsDialog.showModal();
}

startGameButton.addEventListener("click", function(event) {
  event.preventDefault();
  greetingsDialog.close();
  console.log("FINE");
  let inputWord = document.querySelector("#input-word").value;
  let inputDescription = document.querySelector("#input-description").value;
})