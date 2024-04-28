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

import { groups } from "./groups.js";
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
        <td>${img.outerHTML} ${team}</td> <!-- Logo ve takım adı eklendi -->
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
