// IPL Player Search (Working API)

async function searchPlayer() {
    let name = document.getElementById("searchInput").value.trim().toLowerCase();

    if (!name) return alert("Enter player name!");

    // Working Free Mock API
    const url = "https://mocki.io/v1/0f997708-d577-4bf7-8a10-739f0cee1c5a";

    let res = await fetch(url);
    let data = await res.json();

    const listBox = document.getElementById("playersList");
    listBox.innerHTML = "";

    let players = data.players.filter(p =>
        p.name.toLowerCase().includes(name)
    );

    if (players.length === 0) {
        listBox.innerHTML = "<p>No players found.</p>";
        return;
    }

    players.forEach(player => {
        let div = document.createElement("div");
        div.innerHTML = player.name;
        div.onclick = () => loadPlayerDetails(player);
        listBox.appendChild(div);
    });
}

function loadPlayerDetails(player) {
    const box = document.getElementById("playerDetails");

    box.innerHTML = `
        <h3>${player.name}</h3>
        <img src="${player.image}" width="200" style="border-radius:10px" />

        <p><b>Country:</b> ${player.country}</p>
        <p><b>Role:</b> ${player.role}</p>

        <h3>Batting Stats</h3>
        <p><b>Matches:</b> ${player.batting.matches}</p>
        <p><b>Runs:</b> ${player.batting.runs}</p>

        <h3>Bowling Stats</h3>
        <p><b>Wickets:</b> ${player.bowling.wickets}</p>
    `;
}
