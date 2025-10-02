const olderBtn = document.getElementById("older");
const newerBtn = document.getElementById("newer");
const nextBtn = document.getElementById("next");
const resetBtn = document.getElementById("reset");
const scoreDisplay = document.getElementById("score");
const firstIconDisplay = document.getElementById("first-icon");
const secondIconDisplay = document.getElementById("second-icon");
let score = 0;

olderBtn.addEventListener("click", (event) => {
  console.log("older!");
});
newerBtn.addEventListener("click", (event) => {
  console.log("newer!");
});
nextBtn.addEventListener("click", (event) => {
  getIcons();
});

async function getIcons() {
  const icon = await fetchIcons();
  renderFirstIcon(icon[0]);
  renderSecondIcon(icon[1]);
}

async function fetchIcons() {
  try {
    const response = await fetch("./sets.json");
    if (!response.ok) throw new Error("Failed to load icons");

    const data = await response.json();

    const firstIndex = Math.floor(Math.random() * data.length);
    let secondIndex = Math.floor(Math.random() * data.length);
    while (secondIndex === firstIndex) {
      secondIndex = Math.floor(Math.random() * data.length);
    }
    console.log(firstIndex, secondIndex);
    console.log(data[firstIndex], data[secondIndex]);
    return [data[firstIndex], data[secondIndex]];
  } catch (error) {
    console.log(error);
  }
}

function renderFirstIcon(icon) {
  const { image, name, date } = icon;
  console.log(icon);
  console.log(image, name, date);
  firstIconDisplay.innerHTML = `<span id=icon2>
<img src="${image}"/></span>
<p>${name}</p>
<h2>than this?</h2>`;
}
function renderSecondIcon(icon) {
  const { image, name, date } = icon;
  console.log(icon);
  console.log(image, name, date);
  secondIconDisplay.innerHTML = `<span id=icon2>
<img src="${image}"/></span>
<p>${name}</p>
<h2>than this?</h2>`;
}

window.addEventListener("load", getIcons);
