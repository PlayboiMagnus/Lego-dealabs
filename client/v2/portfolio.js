// Portfolio.js - Lego Deals Interface

let currentDeals = [];
let currentPage = 1;
let itemsPerPage = 6;
let selectedSetId = null;
let currentSales = [];

// API base URL
const API_BASE = 'http://localhost:3000';

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await loadDeals();
  populateLegoSetIds();
  displayDeals();
  updateIndicators();
  setupEventListeners();
});

async function loadDeals() {
  try {
    const response = await fetch(`${API_BASE}/deals`);
    currentDeals = await response.json();
  } catch (error) {
    console.error('Failed to load deals:', error);
    // Fallback to local data
    currentDeals = deals;
  }
}

function setupEventListeners() {
  // Show select
  document.getElementById('show-select').addEventListener('change', (e) => {
    itemsPerPage = parseInt(e.target.value);
    displayDeals();
  });

  // Page select
  document.getElementById('page-select').addEventListener('change', (e) => {
    currentPage = parseInt(e.target.value);
    displayDeals();
  });

  // Filters
  document.getElementById('best-discount').addEventListener('click', () => {
    filterDeals({ minDiscount: 20 });
  });

  document.getElementById('most-commented').addEventListener('click', () => {
    filterDeals({ minTemp: 150 }); // Assuming hot deals have high temp
  });

  document.getElementById('hot-deals').addEventListener('click', () => {
    filterDeals({ minTemp: 100 });
  });

  // Sort
  document.getElementById('sort-select').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    sortDeals(sortBy);
  });

  // Lego set select
  document.getElementById('lego-set-id-select').addEventListener('change', (e) => {
    selectedSetId = e.target.value;
  });

  // Load sales
  document.getElementById('load-sales').addEventListener('click', () => {
    if (selectedSetId) {
      loadSalesForSet(selectedSetId);
    }
  });

  // Scrape Deals
  const scrapeBtn = document.getElementById('scrape-deals');
  if (scrapeBtn) {
    scrapeBtn.addEventListener('click', async () => {
      try {
        scrapeBtn.textContent = 'Scraping en cours... ⏳';
        scrapeBtn.style.opacity = '0.7';
        const response = await fetch(`${API_BASE}/scrape/deals`, { method: 'POST' });
        const res = await response.json();
        alert(`Scraping terminé! ${res.count || 0} deals récupérés.`);
        window.location.reload();
      } catch(err) {
        alert('Erreur: Le serveur backend (node api.js) est-il démarré ?');
        scrapeBtn.textContent = 'Scraper Dealabs maintenant';
        scrapeBtn.style.opacity = '1';
      }
    });
  }
}

async function filterDeals(filters) {
  try {
    const params = new URLSearchParams(filters);
    // passing limit=100 so client pagination doesn't break
    const response = await fetch(`${API_BASE}/deals/search?limit=100&${params}`);
    const body = await response.json();
    currentDeals = body.results || [];
    displayDeals();
  } catch (error) {
    console.error('Failed to filter deals:', error);
  }
}

async function sortDeals(sortBy) {
  try {
    const response = await fetch(`${API_BASE}/deals/search?limit=100&sort=${sortBy}`);
    const body = await response.json();
    currentDeals = body.results || [];
    displayDeals();
  } catch (error) {
    console.error('Failed to sort deals:', error);
  }
}

function populateLegoSetIds() {
  const select = document.getElementById('lego-set-id-select');
  const uniqueIds = [...new Set(currentDeals.map(deal => deal.id))];
  uniqueIds.forEach(id => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = id;
    select.appendChild(option);
  });
}

function displayDeals() {
  const container = document.getElementById('deals-container');
  container.innerHTML = '';

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const dealsToShow = currentDeals.slice(start, end);

   dealsToShow.forEach(deal => {
    const dealDiv = document.createElement('div');
    dealDiv.className = 'deal';
    
    // Create profit badge HTML
    let profitHtml = '';
    if (deal.profitability && deal.profitability > 0) {
      profitHtml = `<div style="color: #4CAF50; font-weight: bold; margin-top: 5px;">🟢 Bon Deal (Profit: +€${deal.profitability.toFixed(2)})</div>`;
    } else if (deal.vinted_price > 0 && deal.profitability <= 0) {
      profitHtml = `<div style="color: #ff5252; margin-top: 5px;">🔴 Pas de profit (Vinted: €${deal.vinted_price})</div>`;
    } else {
      profitHtml = `<div style="color: #ffa500; margin-top: 5px;">⚠️ Prix Vinted non récupéré</div>`;
    }

    dealDiv.innerHTML = `
      <img src="${deal.photo}" onerror="this.src='https://via.placeholder.com/200?text=Pas+d+image'" alt="${deal.title}">
      <span class="discount-badge">-${deal.discount}%</span>
      <h3>${deal.title}</h3>
      <p class="price-line">Prix: <span class="val">€${deal.price}</span> <del>(€${deal.retail})</del></p>
      ${profitHtml}
      <p class="stats-line">🔥 ${deal.temperature}° &nbsp;|&nbsp; 💬 ${deal.comments}</p>
      <div style="display: flex; gap: 5px; margin-top: 10px;">
        <a href="${deal.link}" class="btn-deal" target="_blank" style="flex: 1;">Voir l'offre</a>
        <a href="https://www.vinted.fr/catalog?search_text=lego%20${deal.id}" class="btn-deal" target="_blank" style="flex: 1; background-color: #09b1ba; color: white;">Prix Vinted</a>
      </div>
    `;
    container.appendChild(dealDiv);
  });

  updatePageSelect();
}

function updatePageSelect() {
  const select = document.getElementById('page-select');
  select.innerHTML = '';
  const totalPages = Math.ceil(currentDeals.length / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    if (i === currentPage) option.selected = true;
    select.appendChild(option);
  }
}

async function loadSalesForSet(setId) {
  try {
    const response = await fetch(`${API_BASE}/sales/search?setId=${setId}`);
    currentSales = await response.json();
    displaySales();
    updateSalesIndicators();
  } catch (error) {
    console.error('Failed to load sales:', error);
  }
}

function displaySales() {
  const container = document.getElementById('sales-container');
  container.innerHTML = '';

  currentSales.forEach(sale => {
    const saleDiv = document.createElement('div');
    saleDiv.className = 'deal';
    saleDiv.innerHTML = `
      <h3>${sale.title}</h3>
      <p>Price: €${sale.price}</p>
      <a href="${sale.link}" target="_blank">View Sale</a>
    `;
    container.appendChild(saleDiv);
  });
}

function updateIndicators() {
  document.getElementById('nbDeals').textContent = currentDeals.length;
  document.getElementById('nbSales').textContent = currentSales.length;
}

function updateSalesIndicators() {
  document.getElementById('nbSales').textContent = currentSales.length;

  if (currentSales.length > 0) {
    const prices = currentSales.map(s => s.price).sort((a, b) => a - b);
    const p5 = prices[Math.floor(prices.length * 0.05)] || 0;
    const p25 = prices[Math.floor(prices.length * 0.25)] || 0;
    const p50 = prices[Math.floor(prices.length * 0.5)] || 0;
    const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;

    document.getElementById('p5Price').textContent = p5;
    document.getElementById('p25Price').textContent = p25;
    document.getElementById('p50Price').textContent = p50;
    document.getElementById('avgPrice').textContent = avg.toFixed(2);
  }
}