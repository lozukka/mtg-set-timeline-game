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

  renderFirstIcon(currentFirstSet);
  renderSecondIcon(currentSecondSet);

  setClasses(newerBtn, { show: true, hidden: false });
  setClasses(olderBtn, { show: true, hidden: false });
  setClasses(nextBtn, { show: false, hidden: true });
  setClasses(resetBtn, { show: false, hidden: true });
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
    console.log(error);
  }
}
function setClasses(el, { show = false, hidden = false } = {}) {
  el.classList.toggle("show", show);
  el.classList.toggle("hidden", hidden);
}

function renderFirstIcon(icon) {
  const { image, name, date } = icon;

  firstIconDisplay.innerHTML = `<span id=icon2>
<img src="${image}"/></span>
`;
  firstSetNameDisplay.textContent = name;
}
function renderSecondIcon(icon) {
  const { image, name, date } = icon;

  secondIconDisplay.innerHTML = `<span id=icon2>
<img src="${image}"/></span>
`;
  secondSetNameDisplay.textContent = name;
}

function compareResult(userValue) {
  if (userValue === pairValue) {
    score++;
    scoreDisplay.textContent = score;
    setClasses(newerBtn, { show: false, hidden: true });
    setClasses(nextBtn, { show: true, hidden: false });
    setClasses(olderBtn, { show: false, hidden: true });
    showSetDetails();
  } else {
    setClasses(newerBtn, { show: false, hidden: true });
    setClasses(resetBtn, { show: true, hidden: false });
    setClasses(olderBtn, { show: false, hidden: true });

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

window.addEventListener("load", getIcons);
