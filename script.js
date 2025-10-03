const olderBtn = document.getElementById("older");
const newerBtn = document.getElementById("newer");
const nextBtn = document.getElementById("next");
const resetBtn = document.getElementById("reset");
const scoreDisplay = document.getElementById("score");
const firstIconDisplay = document.getElementById("first-icon");
const secondIconDisplay = document.getElementById("second-icon");
const firstSetNameDisplay = document.getElementById("first-set-name");
const secondSetNameDisplay = document.getElementById("second-set-name");
const setDetailsDisplay = document.getElementById("set-details");
const scoreTitle = document.querySelector("h3");
let pairValue = 0;
let score = 0;
let currentFirstSet = null;
let currentSecondSet = null;

olderBtn.addEventListener("click", () => {
  compareResult(1);
});
newerBtn.addEventListener("click", () => {
  compareResult(2);
});
nextBtn.addEventListener("click", () => {
  getIcons();
});
resetBtn.addEventListener("click", () => {
  getIcons();
  score = 0;
  scoreDisplay.textContent = 0;
  scoreDisplay.classList.remove("game-over");
  setDetailsDisplay.innerHTML = "";
  scoreTitle.classList.remove("game-over");
});

async function getIcons() {
  const icon = await fetchIcons();
  currentFirstSet = icon[0];
  currentSecondSet = icon[1];

  renderIcon(currentFirstSet, firstIconDisplay, firstSetNameDisplay);
  renderIcon(currentSecondSet, secondIconDisplay, secondSetNameDisplay);

  setGameState("playing");
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

    if (new Date(data[firstIndex].date) > new Date(data[secondIndex].date)) {
      pairValue = 2;
    } else {
      pairValue = 1;
    }
    return [data[firstIndex], data[secondIndex]];
  } catch (error) {
    setDetailsDisplay.textContent = error;
    console.error(error);
  }
}

function renderIcon(icon, displayElement, setNameDisplay) {
  const { image, name, date } = icon;

  displayElement.innerHTML = `<span><img src="${image}"/></span>`;
  setNameDisplay.textContent = name;
}

function compareResult(userValue) {
  if (userValue === pairValue) {
    score++;
    scoreDisplay.textContent = score;
    setGameState("correct");
    showSetDetails();
  } else {
    setGameState("gameover");

    setDetailsDisplay.innerHTML = "";
    scoreDisplay.classList.add("game-over");
    scoreTitle.classList.add("game-over");
    showSetDetails();
  }
}

function showSetDetails() {
  const firstSetDate = currentFirstSet.date;
  const secondSetDate = currentSecondSet.date;
  const firstSetName = currentFirstSet.name;
  const secondSetName = currentSecondSet.name;

  setDetailsDisplay.innerHTML = `
    <p>${firstSetName} was published: ${firstSetDate}</p>
    <p>${secondSetName} was published: ${secondSetDate}</p>
  `;
}

function setGameState(state) {
  switch (state) {
    case "playing":
      show(newerBtn);
      show(olderBtn);
      hide(nextBtn);
      hide(resetBtn);
      break;
    case "correct":
      hide(newerBtn);
      hide(olderBtn);
      show(nextBtn);
      hide(resetBtn);
      break;
    case "gameover":
      hide(newerBtn);
      hide(olderBtn);
      hide(nextBtn);
      show(resetBtn);
      break;
  }
}

function show(element) {
  setClasses(element, { show: true, hidden: false });
}

function hide(element) {
  setClasses(element, { show: false, hidden: true });
}

function setClasses(el, { show = false, hidden = false } = {}) {
  el.classList.toggle("show", show);
  el.classList.toggle("hidden", hidden);
}

window.addEventListener("load", getIcons);
