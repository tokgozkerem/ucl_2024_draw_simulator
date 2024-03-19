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

window.addEventListener("wheel", function (event) {
  if (event.deltaY > 0) {
    document.getElementById("welcomeScreen").style.opacity = 0;
    setTimeout(function () {
      // Hoş geldiniz ekranını tamamen kaldır ve diğer içerikleri göster
      document.getElementById("welcomeScreen").style.display = "none";
      document.getElementById("contentContainer").style.display = "block";
    }, 1500); // 1.5 saniye beklet (geçiş efekti için)
  }
});
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

    // Create div container for logo and team name
    const teamContainer = document.createElement("div");
    teamContainer.classList.add("team-container");

    // Create image element for logo
    const img = document.createElement("img");
    img.src = `images/${teamName.replace(/\s+/g, "_").toLowerCase()}_logo.png`;
    img.alt = `${teamName} Logo`;
    img.classList.add("team-logo");
    img.width = 25; // Set width to 25 pixels
    img.height = 25; // Set height to 25 pixels

    // Create span element for team name
    const teamNameSpan = document.createElement("span");
    teamNameSpan.textContent = teamName.toUpperCase();
    teamNameSpan.classList.add("team-name");

    // Append image and team name to team container
    teamContainer.appendChild(img);
    teamContainer.appendChild(teamNameSpan);

    // Append team container to body cell
    bodyCell.appendChild(teamContainer);

    // Append body cell to body row
    bodyRow.appendChild(bodyCell);

    // Append body row to table body
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

// Yeni tablo oluşturma fonksiyonu
function createLeftPanelTable(teams) {
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");

  teams.forEach((teamName) => {
    const bodyRow = document.createElement("tr");
    const bodyCell = document.createElement("td");

    // Create div container for logo and team name
    const teamContainer = document.createElement("div");
    teamContainer.classList.add("team-container");

    // Create image element for logo
    const img = document.createElement("img");
    img.src = `images/${teamName.replace(/\s+/g, "_").toLowerCase()}_logo.png`;
    img.alt = `${teamName} Logo`;
    img.classList.add("team-logo");
    img.width = 25;
    img.height = 25;

    // Create span element for team name
    const teamNameSpan = document.createElement("span");
    teamNameSpan.textContent = teamName.toUpperCase();
    teamNameSpan.classList.add("team-name");

    // Append image and team name to team container
    teamContainer.appendChild(img);
    teamContainer.appendChild(teamNameSpan);

    // Append team container to body cell
    bodyCell.appendChild(teamContainer);

    // Append body cell to body row
    bodyRow.appendChild(bodyCell);

    // Append body row to table body
    tableBody.appendChild(bodyRow);
  });

  table.appendChild(tableBody);
  return table;
}
const groups = [[], [], [], []];

// Grup seçimlerini tanımla
const selections = [
  [
    { pot: "POT 1", count: 3 },
    { pot: "POT 2", count: 2 },
    { pot: "POT 3", count: 2 },
    { pot: "POT 4", count: 2 },
  ],
  [
    { pot: "POT 1", count: 2 },
    { pot: "POT 2", count: 3 },
    { pot: "POT 3", count: 2 },
    { pot: "POT 4", count: 2 },
  ],
  [
    { pot: "POT 1", count: 2 },
    { pot: "POT 2", count: 2 },
    { pot: "POT 3", count: 3 },
    { pot: "POT 4", count: 2 },
  ],
  [
    { pot: "POT 1", count: 2 },
    { pot: "POT 2", count: 2 },
    { pot: "POT 3", count: 2 },
    { pot: "POT 4", count: 3 },
  ],
];

// Grup seçimlerini gerçekleştir
for (let i = 0; i < selections.length; i++) {
  selectTeams(groups[i], selections[i]);
}

console.log(groups);

function selectTeams(group, selections) {
  for (const selection of selections) {
    selectUniqueTeamsFromPot(pots[selection.pot], selection.count, group);
  }
}

function selectUniqueTeamsFromPot(pot, count, selectedTeams) {
  for (let i = 0; i < count; i++) {
    if (pot.length === 0) {
      console.error("Hata: Pot boş.");
      return;
    }
    const teamIndex = Math.floor(Math.random() * pot.length);
    selectedTeams.push(pot[teamIndex]);
    pot.splice(teamIndex, 1); // Seçilen takımı listeden çıkar
  }
}

const drawButton = document.getElementById("drawButton");
drawButton.addEventListener("click", drawTeams);

// Takımları gruplara ayır ve ekrana ekle
function drawTeams() {
  displayGroups();
}

// Grupları ekranda göster
function displayGroups() {
  // Grup container'ını seç
  const groupContainer = document.getElementById("groupContainer");
  groupContainer.innerHTML = "";

  // Grupları ekrana ekle
  for (let i = 0; i < groups.length; i++) {
    const groupName = `GROUP ${i + 1}`;
    const groupTable = createTable(groupName, groups[i]);
    groupContainer.appendChild(groupTable);
    displayTeams(groupTable);
  }
}

// Takımları belirli aralıklarla göster
function displayTeams(table) {
  const teams = Array.from(table.querySelectorAll("tbody tr"));
  teams.forEach((team, index) => {
    if (index === 0) {
      team.style.display = "table-row";
    } else {
      team.style.display = "none";
    }
  });

  // Her bir takımı belirli aralıklarla göster
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
  window.location.href = "groupstages.html";
});
