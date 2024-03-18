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

// HTML içine tablo oluşturma fonksiyonu
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

// Tabloları HTML'e ekleme
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

// Draw butonunu seç
const drawButton = document.getElementById("drawButton");

// Draw butonuna click olayı ekle
drawButton.addEventListener("click", drawTeams);

// Takımları gruplara ayır ve ekrana ekle
function drawTeams() {
  displayGroups(); // Grupları ekrana göster
}

// Grupları ekranda göster
function displayGroups() {
  // Grup container'ını seç
  const groupContainer = document.getElementById("groupContainer");
  groupContainer.innerHTML = ""; // Grup container'ını temizle

  // Grupları ekrana ekle
  for (let i = 0; i < groups.length; i++) {
    const groupName = `GROUP ${i + 1}`;
    const groupTable = createTable(groupName, groups[i]); // Grup tablosunu oluştur
    groupContainer.appendChild(groupTable); // Grup tablosunu ekrana ekle
    displayTeams(groupTable); // Takımları göster
  }
}

// Takımları belirli aralıklarla göster
function displayTeams(table) {
  const teams = Array.from(table.querySelectorAll("tbody tr"));

  // İlk takımı görünür yap ve diğerlerini gizle
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
      teams[index].style.display = "table-row"; // Takımı görünür yap
      index++;
    } else {
      clearInterval(interval); // Tüm takımlar gösterildi, aralığı temizle
    }
  }, 850); // Her bir takımın gösterilme zamanı (500 ms aralıkla)
}
