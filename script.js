const olderBtn = document.getElementById("older");
const newerBtn = document.getElementById("newer");
const nextBtn = document.getElementById("next");
const resetBtn = document.getElementById("reset");
const scoreDisplay = document.getElementById("score");
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
  //icons.forEach((icon) => {
  const { image, name, date } = icon;
  console.log(icon);
  renderIcons(image, name, date);
  //});
}

async function fetchIcons() {
  try {
    const response = await fetch("./sets.json");
    if (!response.ok) throw new Error("Failed to load icons");

    const data = await response.json();
    const firstIndex = Math.floor(Math.random() * 3);
    const secondIndex = Math.floor(Math.random() * 3);
    console.log(firstIndex, secondIndex);
    console.log(data[firstIndex], data[secondIndex]);
    return data[firstIndex], data[secondIndex];
  } catch (error) {
    console.log(error);
  }
}

function renderIcons(image, name, date) {
  console.log(image, name, date);
  secondIconDisplay.innerHTML = `<span id=icon2>
<img src="${image}"/></span>
<h2>than this?</h2>`;
}

window.addEventListener("load", getIcons);
