const olderBtn = document.getElementById("older");
const newerBtn = document.getElementById("newer");
const nextBtn = document.getElementById("next");
const resetBtn = document.getElementById("reset");
const scoreDisplay = document.getElementById("score");
const firstIconDisplay = document.getElementById("first-icon");
const secondIconDisplay = document.getElementById("second-icon");
const firstSetNameDisplay = document.getElementById("first-set-name");
const secondSetNameDisplay = document.getElementById("second-set-name");
let pairValue = 0;
let score = 0;

olderBtn.addEventListener("click", () => {
  console.log("older!");

  compareResult(1);
});
newerBtn.addEventListener("click", () => {
  console.log("newer!");
  compareResult(2);
});
nextBtn.addEventListener("click", () => {
  getIcons();
});
resetBtn.addEventListener("click", () => {
  getIcons();
  score = 0;
  scoreDisplay.textContent = 0;
});

async function getIcons() {
  const icon = await fetchIcons();
  renderFirstIcon(icon[0]);
  renderSecondIcon(icon[1]);
  console.log(pairValue);
  newerBtn.classList.add("show");
  newerBtn.classList.remove("hidden");
  olderBtn.classList.add("show");
  olderBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  nextBtn.classList.remove("show");
  resetBtn.classList.add("hidden");
  resetBtn.classList.remove("show");
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
    if (new Date(data[firstIndex].date) > new Date(data[secondIndex].date)) {
      pairValue = 2;
    } else {
      pairValue = 1;
    }
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
`;
  firstSetNameDisplay.textContent = name;
}
function renderSecondIcon(icon) {
  const { image, name, date } = icon;
  console.log(icon);
  console.log(image, name, date);
  secondIconDisplay.innerHTML = `<span id=icon2>
<img src="${image}"/></span>
`;
  secondSetNameDisplay.textContent = name;
}

function compareResult(userValue) {
  if (userValue === pairValue) {
    score++;
    scoreDisplay.textContent = score;
    nextBtn.classList.add("show");
    nextBtn.classList.remove("hidden");
    newerBtn.classList.add("hidden");
    newerBtn.classList.remove("show");
    olderBtn.classList.add("hidden");
    olderBtn.classList.remove("show");
  } else {
    console.log("you lost!");
    resetBtn.classList.add("show");
    resetBtn.classList.remove("hidden");
    newerBtn.classList.add("hidden");
    newerBtn.classList.remove("show");
    olderBtn.classList.add("hidden");
    olderBtn.classList.remove("show");
  }
}

window.addEventListener("load", getIcons);
