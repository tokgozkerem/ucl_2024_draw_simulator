class MatchHistory {
  constructor() {
    this.history = {};
  }

  addMatch(team, opponent, result) {
    if (!this.history[team]) {
      this.history[team] = [];
    }
    this.history[team].push({ opponent, result });
  }

  getMatchHistory(team) {
    return this.history[team] || [];
  }

  getWinsAgainstOpponent(team, opponent) {
    const history = this.history[team] || [];
    return history.filter(
      (result) => result.opponent === opponent && result.result === "W"
    ).length;
  }

  getLossesAgainstOpponent(team, opponent) {
    const history = this.history[team] || [];
    return history.filter(
      (result) => result.opponent === opponent && result.result === "L"
    ).length;
  }

  getDrawsAgainstOpponent(team, opponent) {
    const history = this.history[team] || [];
    return history.filter(
      (result) => result.opponent === opponent && result.result === "D"
    ).length;
  }

  showMatchHistory() {
    Object.keys(this.history).forEach((team) => {
      console.log(`${team} Maç Geçmişi:`);
      const matches = this.history[team];
      let wins = 0,
        draws = 0,
        losses = 0;
      matches.forEach((match) => {
        console.log(`Rakip: ${match.opponent}, Sonuç: ${match.result}`);
        if (match.result === "W") wins++;
        else if (match.result === "D") draws++;
        else if (match.result === "L") losses++;
      });
      const points = wins * 3 + draws;
      console.log(
        `Toplam Puan: ${points} (Galibiyet: ${wins}, Beraberlik: ${draws}, Mağlubiyet: ${losses})`
      );
    });
  }
}

const groups = JSON.parse(localStorage.getItem("groups"));
console.log(groups);

function simulateTournament(groups) {
  const matchHistory = new MatchHistory();

  groups.forEach((group) => {
    group.forEach((team1, index1) => {
      group.slice(index1 + 1).forEach((team2) => {
        const result = simulateMatch();
        matchHistory.addMatch(team1, team2, result);
        matchHistory.addMatch(
          team2,
          team1,
          result === "W" ? "L" : result === "L" ? "W" : "D"
        );
      });
    });
  });

  return matchHistory;
}

function calculateTournamentResults(matchHistory) {
  const teamPoints = {};

  Object.keys(matchHistory.history).forEach((team) => {
    const matches = matchHistory.getMatchHistory(team);
    let points = 0;
    matches.forEach((match) => {
      if (match.result === "W") points += 3;
      else if (match.result === "D") points += 1;
    });
    teamPoints[team] = points;
  });

  return Object.entries(teamPoints).sort((a, b) => b[1] - a[1]);
}

function simulateMatch() {
  const result = Math.random();
  if (result < 0.35) return "W";
  if (result <= 0.65) return "D";
  return "L";
}

function showTournamentResultsAsHTML(
  containerId,
  tournamentResults,
  matchHistory
) {
  const container = document.getElementById(containerId);
  let tableHTML = `
    <table id="tournament-results-table">
      <tr>
        <th>POS</th>
        <th>TEAM</th>
        <th>P</th>
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th>PTS</th>
      </tr>
  `;

  tournamentResults.forEach(([team, points], index) => {
    const position = index + 1;
    let rowClass = "";

    if (position <= 8) {
      rowClass = "team-rank-green";
    } else if (position <= 24) {
      rowClass = "team-rank-yellow-orange";
    } else {
      rowClass = "team-rank-red";
    }
    const matches = matchHistory.getMatchHistory(team);
    const wins = matches.filter((match) => match.result === "W").length;
    const draws = matches.filter((match) => match.result === "D").length;
    const losses = matches.filter((match) => match.result === "L").length;
    const playedGames = wins + draws + losses;

    const img = document.createElement("img");
    img.src = `images/${team.replace(/\s+/g, "_").toLowerCase()}_logo.png`;
    img.alt = `${team} Logo`;
    img.classList.add("team-logo");
    img.width = 20;
    img.height = 20;

    tableHTML += `
      <tr class="${rowClass}">
        <td>${position}</td>
        <td>${
          img.outerHTML
        } ${team.toUpperCase()}</td> <!-- Logo ve takım adı eklendi -->
        <td>${playedGames}</td>
        <td>${wins}</td>
        <td>${draws}</td>
        <td>${losses}</td>
        <td>${points}</td>
      </tr>
    `;
  });

  tableHTML += "</table>";
  container.innerHTML = tableHTML;
}

// Turnuva sonuçlarını hesapla ve ekrana yazdır
const matchHistory = simulateTournament(groups);
const tournamentResults = calculateTournamentResults(matchHistory);
console.log("Turnuva Sonuçları:");
tournamentResults.forEach(([team, points]) => {
  console.log(`${team}: ${points} puan`);
});

showTournamentResultsAsHTML(
  "tournament-results-container",
  tournamentResults,
  matchHistory
);
matchHistory.showMatchHistory();

function showMatchHistoryForTeam(containerId, matchHistory) {
  const container = document.getElementById(containerId);

  groups.forEach((group, groupIndex) => {
    const groupContainerId = `${containerId}-group-${groupIndex + 1}`;

    const groupDiv = document.createElement("div");
    groupDiv.id = groupContainerId;
    groupDiv.classList.add("group-container");
    container.appendChild(groupDiv);

    const groupHeader = document.createElement("h2");
    groupHeader.textContent = `GROUP ${groupIndex + 1}`;
    groupHeader.classList.add("group-header");
    groupDiv.appendChild(groupHeader);

    group.forEach((team) => {
      const matches = matchHistory.getMatchHistory(team);

      const teamContainer = document.createElement("div"); // Takım resmi ve başlığı içeren div
      teamContainer.classList.add("team-container");

      // Takım logosunu oluştur
      const teamLogo = document.createElement("img");
      teamLogo.src = `images/${team
        .replace(/\s+/g, "_")
        .toLowerCase()}_logo.png`;
      teamLogo.alt = `${team} Logo`;
      teamLogo.classList.add("team-logo");

      // Takım başlığını oluştur
      const teamHeader = document.createElement("h3");
      teamHeader.textContent = team;
      teamHeader.classList.add("team-header");

      // Takım logosu ve başlığını içeren div'i grupDiv'e ekle
      teamContainer.appendChild(teamLogo);
      teamContainer.appendChild(teamHeader);
      groupDiv.appendChild(teamContainer);

      const table = document.createElement("table");
      table.classList.add("match-table");
      const tableHeader = document.createElement("tr");
      const opponentHeader = document.createElement("th");
      opponentHeader.textContent = "OPPONENT";
      const resultHeader = document.createElement("th");
      resultHeader.textContent = "RESULT";
      tableHeader.appendChild(opponentHeader);
      tableHeader.appendChild(resultHeader);
      table.appendChild(tableHeader);

      matches.forEach((match) => {
        const row = document.createElement("tr");
        const opponentCell = document.createElement("td");
        opponentCell.textContent = match.opponent;
        const resultCell = document.createElement("td");
        resultCell.textContent = match.result;
        row.appendChild(opponentCell);
        row.appendChild(resultCell);
        table.appendChild(row);
      });

      groupDiv.appendChild(table);
    });
  });
}

showMatchHistoryForTeam("match-history-container", matchHistory);
