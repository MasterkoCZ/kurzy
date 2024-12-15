function renderTable(data) {
    if (!data.kurzy || typeof data.kurzy !== 'object') {
        document.getElementById('kl').innerHTML = '<p>Data nejsou ve správném formátu.</p>';
        console.error('Neočekávaný formát dat:', data);
        return;
    }

    let html = '<table><thead><tr><th>Měna</th><th>Jednotka</th><th>Kurz</th></tr></thead><tbody>';
    for (const key in data.kurzy) {
        const kurz = data.kurzy[key];
        html += `<tr>
            <td>${kurz.nazev}</td>
            <td>${kurz.jednotka}</td>
            <td>${kurz.dev_stred}</td>
        </tr>`;
    }
    html += '</tbody></table>';
    document.getElementById('kl').innerHTML = html;
}

function vypiskurzy(data) {
    renderTable(data);
}

function fetchJSONP(url) {
    const script = document.createElement('script');
    script.src = url;
    script.onerror = () => {
        document.getElementById('kl').innerHTML = '<p>Chyba při načítání dat.</p>';
        console.error('Chyba při načítání dat ze zdroje:', url);
    };
    document.body.appendChild(script);
}

function fetchData() {
    fetchJSONP('https://data.kurzy.cz/json/meny/b[6]cb[vypiskurzy].js');
}

fetchData();
setInterval(fetchData, 60000);

document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    this.textContent = isDark ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim';
});
