let questions = [];

fetch("test.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((entry) => {
      questions.push(entry.question);
    });
    questions.sort(() => Math.random() - 0.5);
    spawnCard();
  })
  .catch((error) => {
    console.error("Error fetching quotes:", error);
  });

document.addEventListener("DOMContentLoaded", () => {});

function spawnCard() {
  const cards = document.querySelector("div.cards");
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

let clickCount = 0;
let num = 0;

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
  const doneContainer = document.querySelector("div.done-container");
  void clickedCard.offsetWidth;
  const rect = doneContainer.getBoundingClientRect();
  clickedCard.classList.add("card-done");
  clickedCard.style.transition = "transform 0.3s ease";
  clickedCard.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
  doneContainer.appendChild(clickedCard);
}
