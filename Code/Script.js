const API_KEY = "3d36ad53-577e-444f-90b5-7e6f645d0b5e";

// Search players by name
async function searchPlayer() {
    let name = document.getElementById("searchInput").value.trim();

    if (!name) return alert("Enter player name!");

    const url = `https://api.cricapi.com/v1/players?apikey=${API_KEY}&search=${name}`;

    let res = await fetch(url);
    let data = await res.json();

    const listBox = document.getElementById("playersList");
    listBox.innerHTML = "";

    if (!data.data || data.data.length === 0) {
        listBox.innerHTML = "<p>No players found.</p>";
        return;
    }

    data.data.forEach(player => {
        let div = document.createElement("div");
        div.innerHTML = `${player.name}`;
        div.onclick = () => loadPlayerDetails(player.id);
        listBox.appendChild(div);
    });
}

// Load full player details using ID
async function loadPlayerDetails(id) {
    const url = `https://api.cricapi.com/v1/players_info?apikey=${API_KEY}&id=${id}`;

    let res = await fetch(url);
    let data = await res.json();
    let player = data.data;

    const box = document.getElementById("playerDetails");

    box.innerHTML = `
        <h3>${player.name}</h3>
        <img src="${player.playerImg}" width="200" style="border-radius:10px"/>

        <p><b>Country:</b> ${player.country}</p>
        <p><b>Role:</b> ${player.role}</p>

        <h3>Batting Stats</h3>
        <p><b>Matches:</b> ${player.stats[0]?.value || "N/A"}</p>
        <p><b>Runs:</b> ${player.stats[8]?.value || "N/A"}</p>

        <h3>Bowling Stats</h3>
        <p><b>Wickets:</b> ${player.stats[18]?.value || "N/A"}</p>
    `;
}
