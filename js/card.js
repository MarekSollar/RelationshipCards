var clickCount = 0;
let questions = [];
var num = 0;
fetch("test.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((entry) => {
      questions.push(entry.question);
      questions.sort(() => Math.random() - 0.5);
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
  figcaption.appendChild(span);
  var div = document.createElement("div");
  div.classList.add("back");
  figure.appendChild(figcaption);
  figure.appendChild(div);
  cards.appendChild(figure);
  figure.addEventListener("click", cardClick);
}

const cardClick = (event) => {
  const card = event.currentTarget;
  if (card.classList.contains("card-done")) {
    return;
  }

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
  const doneContainer = document.body.querySelector("div.done-container");
  void clickedCard.offsetWidth;
  clickedCard.classList.add("card-done");
  doneContainer.appendChild(clickedCard);
}
