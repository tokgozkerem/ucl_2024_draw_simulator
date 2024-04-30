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
const groups = [[], [], [], []];
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

for (let i = 0; i < selections.length; i++) {
  selectTeams(groups[i], selections[i]);
}
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
    pot.splice(teamIndex, 1);
  }
}
export default groups;
export { pots, selections, selectTeams, selectUniqueTeamsFromPot };
