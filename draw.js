import groups from "./groups.js";
localStorage.setItem("groups", JSON.stringify(groups));
console.log(groups);
const pots = {
  "POT 1": [
    "Man City",
    "Sevilla",
    "Barcelona",
    "Napoli",
    "Bayern",
    "Paris",
    "Benfica",
    "Feyenoord",
    "Liverpool",
  ],
  "POT 2": [
    "Real Madrid",
    "Man United",
    "Internazionale",
    "Dortmund",
    "Atletico",
    "Leipzig",
    "Porto",
    "Arsenal",
    "Atalanta",
  ],
  "POT 3": [
    "Shakhtar",
    "Salzburg",
    "Milan",
    "Braga",
    "PSV",
    "Lazio",
    "Crvena zvezda",
    "Copenhagen",
    "Marseille",
  ],
  "POT 4": [
    "Young Boys",
    "Real Sociedad",
    "Galatasaray",
    "Celtic",
    "Newcastle",
    "Union Berlin",
    "Antwerp",
    "Lens",
    "Molde",
  ],
};

window.addEventListener("wheel", handleScroll);
window.addEventListener("touchmove", handleScroll);

function handleScroll(event) {
  if (event.deltaY > 0 || event.touches[0].clientY > 0) {
    document.getElementById("welcomeScreen").style.opacity = 0;
    setTimeout(function () {
      document.getElementById("welcomeScreen").style.display = "none";
      document.getElementById("contentContainer").style.display = "block";
    }, 1500);
  }
}

function createTable(potName, teams) {
  const table = document.createElement("table");
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");
  const headRow = document.createElement("tr");
  const headCell = document.createElement("td");
  const headSpan = document.createElement("span");
  headSpan.textContent = potName;
  headSpan.id = `${potName.replace(/\s+/g, "-").toLowerCase()}-heading`; // id ekleyelim
  headCell.appendChild(headSpan);
  headRow.appendChild(headCell);
  tableHead.appendChild(headRow);

  teams.forEach((teamName) => {
    const bodyRow = document.createElement("tr");
    const bodyCell = document.createElement("td");
    const teamContainer = document.createElement("div");
    teamContainer.classList.add("team-container");

    const img = document.createElement("img");
    img.src = `images/${teamName.replace(/\s+/g, "_").toLowerCase()}_logo.png`;
    img.alt = `${teamName} Logo`;
    img.classList.add("groups-team-logo");
    img.width = 25;
    img.height = 29;

    const teamNameSpan = document.createElement("span");
    teamNameSpan.textContent = teamName.toUpperCase();
    teamNameSpan.classList.add("team-name");
    teamContainer.appendChild(img);
    teamContainer.appendChild(teamNameSpan);
    bodyCell.appendChild(teamContainer);
    bodyRow.appendChild(bodyCell);
    tableBody.appendChild(bodyRow);
  });

  table.appendChild(tableHead);
  table.appendChild(tableBody);
  return table;
}

const drawContainer = document.getElementById("drawContainer");
for (const [potName, teams] of Object.entries(pots)) {
  drawContainer.appendChild(createTable(potName, teams));
}

function createLeftPanelTable(teams) {
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");

  teams.forEach((teamName) => {
    const bodyRow = document.createElement("tr");
    const bodyCell = document.createElement("td");

    const teamContainer = document.createElement("div");
    teamContainer.classList.add("team-container");

    const img = document.createElement("img");
    img.src = `images/${teamName.replace(/\s+/g, "_").toLowerCase()}_logo.png`;
    img.alt = `${teamName} Logo`;
    img.classList.add("groups-team-logo");
    img.width = 32;
    img.height = 25;

    const teamNameSpan = document.createElement("span");
    teamNameSpan.textContent = teamName.toUpperCase();
    teamNameSpan.classList.add("team-name");
    teamContainer.appendChild(img);
    teamContainer.appendChild(teamNameSpan);
    bodyCell.appendChild(teamContainer);
    bodyRow.appendChild(bodyCell);
    tableBody.appendChild(bodyRow);
  });

  table.appendChild(tableBody);
  return table;
}
const drawButton = document.getElementById("drawButton");
drawButton.addEventListener("click", drawTeams);

function drawTeams() {
  displayGroups();
}

function displayGroups() {
  const groupContainer = document.getElementById("groupContainer");
  groupContainer.innerHTML = "";
  for (let i = 0; i < groups.length; i++) {
    const groupName = `GROUP ${i + 1}`;
    const groupTable = createTable(groupName, groups[i]);
    groupContainer.appendChild(groupTable);
    displayTeams(groupTable);
  }
}

function displayTeams(table) {
  const teams = Array.from(table.querySelectorAll("tbody tr"));
  teams.forEach((team, index) => {
    if (index === 0) {
      team.style.display = "table-row";
    } else {
      team.style.display = "none";
    }
  });
  let index = 1;
  const interval = setInterval(() => {
    if (index < teams.length) {
      teams[index].style.display = "table-row";
      index++;
    } else {
      clearInterval(interval);
    }
  }, 2000);
}

const nextButton = document.getElementById("nextButton");

nextButton.addEventListener("click", function () {
  window.location.href = "groupstage.html";
});
