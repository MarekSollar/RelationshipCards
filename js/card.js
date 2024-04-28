var clickCount = 0;
let questions = [];
var num = 0;
fetch("test.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((entry) => {
      questions.push(entry.question);
    });
  })
  .catch((error) => {
    console.error("Error fetching quotes:", error);
  });

document.addEventListener("DOMContentLoaded", () => {
  spawnCard();
});

function spawnCard() {
  const cards = document.body.querySelector("div.cards");
  const figure = document.createElement("figure");
  figure.classList.add("card", "active");
  var figcaption = document.createElement("figcaption");
  figcaption.classList.add("face");
  var span = document.createElement("span");
  //   span.textContent = "test";
  figcaption.appendChild(span);

  var div = document.createElement("div");
  div.classList.add("back");

  figure.appendChild(figcaption);
  figure.appendChild(div);
  cards.appendChild(figure);
  figure.addEventListener("click", cardClick);
}

const cardClick = (event) => {
  //   console.log(clickCount);
  const card = event.currentTarget;
  if (clickCount === 0 && !card.classList.contains("turned")) {
    card.classList.toggle("turned");
    card.querySelector("figcaption span").textContent = questions[num];
    num++;
  }
  if (clickCount >= 1) {
    spawnCard();
    toggleCardDone(card);
    clickCount = 0;
  } else {
    clickCount++;
  }
};
function toggleCardDone(clickedCard) {
  // Get the container where the card will be moved
  const doneContainer = document.body.querySelector("div.done-container");

  // Check if the clicked card already has the card-done class
  if (!clickedCard.classList.contains("card-done")) {
    // Add the card-done class to the clicked card
    clickedCard.classList.add("card-done");

    // Append the clicked card to the done container
    doneContainer.appendChild(clickedCard);
  } else {
    // If the clicked card already has the card-done class, remove it
    clickedCard.classList.remove("card-done");

    // Move the card back to its original container
    document.querySelector(".cards-container").appendChild(clickedCard);
  }
}
