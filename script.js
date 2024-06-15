// Fetch data using .then
function fetchDataThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error('Error fetching data:', error));
}

// Fetch data using async/await
async function fetchDataAsync() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderTable(data) {
    const tbody = document.querySelector('#cryptoTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name}" width="32"></td>
            <td>${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>${coin.current_price}</td>
            <td>${coin.total_volume}</td>
        `;
        tbody.appendChild(row);
    });
}

// Search functionality
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('search').value.toLowerCase();
    fetchDataAsync().then(() => {
        const rows = document.querySelectorAll('#cryptoTable tbody tr');
        rows.forEach(row => {
            const name = row.cells[1].textContent.toLowerCase();
            const symbol = row.cells[2].textContent.toLowerCase();
            if (name.includes(query) || symbol.includes(query)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});

// Sorting functionality
document.getElementById('sortMarketCap').addEventListener('click', () => {
    fetchDataAsync().then(data => {
        data.sort((a, b) => b.market_cap - a.market_cap);
        renderTable(data);
    });
});

document.getElementById('sortPercentageChange').addEventListener('click', () => {
    fetchDataAsync().then(data => {
        data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        renderTable(data);
    });
});

// Initial data fetch
fetchDataAsync();
