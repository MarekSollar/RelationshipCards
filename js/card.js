document.addEventListener("DOMContentLoaded", () => {
  const figure = document.createElement("figure");
  figure.classList.add("card", "turned", "active");

  var figcaption = document.createElement("figcaption");
  figcaption.classList.add("face");
  var span = document.createElement("span");
  span.textContent = "test";
  figcaption.appendChild(span);

  var div = document.createElement("div");
  div.classList.add("back");

  figure.appendChild(figcaption);
  figure.appendChild(div);
  document.body.appendChild(figure);
  figure.addEventListener("click", cardClick);
});
const cardClick = (event) => {
  const card = event.currentTarget;
  card.classList.toggle("turned");
};
