const servers = {
    kiev: [
        { name: "Kyiv Server #1", apiUrl: "https://example.com/api/server1" },
        { name: "Kyiv Server #2", apiUrl: "https://example.com/api/server2" }
    ],
    russia: [
        { name: "RU Server A", apiUrl: "https://example.com/api/ru1" },
        { name: "RU Server B", apiUrl: "https://example.com/api/ru2" }
    ],
    belarus: [
        { name: "BY Rust", apiUrl: "https://example.com/api/by1" }
    ],
    poland: [
        { name: "PL Server", apiUrl: "https://example.com/api/pl1" }
    ]
};

function showServers(region) {
    const list = document.getElementById('server-list');
    const info = document.getElementById('server-info');
    list.innerHTML = '';
    info.innerHTML = '';

    servers[region].forEach(server => {
        const div = document.createElement('div');
        div.className = 'server-item';
        div.innerHTML = `<strong>${server.name}</strong> — <span id="status-${server.name}">Загрузка...</span>`;
        div.onclick = () => showServerInfo(server);
        list.appendChild(div);
        updateServerStatus(server);
    });
}

function updateServerStatus(server) {
    fetch(server.apiUrl)
        .then(res => res.json())
        .then(data => {
            const status = data.online ? '🟢 Онлайн' : '🔴 Оффлайн';
            document.getElementById(`status-${server.name}`).innerText = status;
        })
        .catch(() => {
            document.getElementById(`status-${server.name}`).innerText = '❌ Ошибка';
        });
}

// Показ подробной информации о сервере
function showServerInfo(server) {
    fetch(server.apiUrl)
        .then(res => res.json())
        .then(data => {
            const infoDiv = document.getElementById('server-info');
            infoDiv.innerHTML = `
                <h2>${server.name}</h2>
                <p>Онлайн: ${data.players || 'неизвестно'}</p>
                <p>Следующий вайп: ${data.wipe || 'неизвестно'}</p>
                <p>Карта: ${data.map || 'неизвестно'}</p>
                <p>Время в Киеве: ${new Date().toLocaleTimeString('uk-UA')}</p>
                <p>Время в России: ${new Date().toLocaleTimeString('ru-RU')}</p>
                <p>Время в Беларуси: ${new Date().toLocaleTimeString('be-BY')}</p>
                <p>Время в Польше: ${new Date().toLocaleTimeString('pl-PL')}</p>
            `;
        });
}

// Обновление каждые 5 минут
setInterval(() => {
    const activeRegion = document.querySelector('.region-list button.active');
    if (activeRegion) {
        showServers(activeRegion.textContent.toLowerCase());
    }
}, 300000); // 5 минут
