// api.js - Express API for Lego deals

const express = require('express');
const { scrapeDeals, scrapeSales, saveData, loadData } = require('./scraper');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// Initial mock data
const initialDeals = [
  {
    "_id": "deal1",
    "link": "https://www.dealabs.com/bons-plans/lego-12345",
    "retail": 100,
    "price": 80,
    "discount": 20,
    "temperature": 150,
    "photo": "https://example.com/lego12345.jpg",
    "comments": 10,
    "published": Date.now() / 1000,
    "title": "Lego Set 12345 at 20% off",
    "id": "12345",
    "community": "dealabs"
  },
  {
    "_id": "deal2",
    "link": "https://www.dealabs.com/bons-plans/lego-67890",
    "retail": 200,
    "price": 150,
    "discount": 25,
    "temperature": 200,
    "photo": "https://example.com/lego67890.jpg",
    "comments": 5,
    "published": Date.now() / 1000,
    "title": "Lego Set 67890 at 25% off",
    "id": "67890",
    "community": "dealabs"
  }
];

const initialSales = [
  {
    "_id": "sale1",
    "link": "https://www.vinted.fr/items/12345-lego-12345",
    "price": 85,
    "title": "Lego 12345 used",
    "published": Date.now() / 1000
  },
  {
    "_id": "sale2",
    "link": "https://www.vinted.fr/items/67890-lego-67890",
    "price": 160,
    "title": "Lego 67890 new",
    "published": Date.now() / 1000
  }
];

// Load initial data or use defaults
let deals = loadData('deals.json');
if (deals.length === 0) {
  deals = initialDeals;
  saveData('deals.json', deals);
}

let sales = loadData('sales.json');
if (sales.length === 0) {
  sales = initialSales;
  saveData('sales.json', sales);
}

// Routes

// GET /deals - Get all deals
app.get('/deals', (req, res) => {
  res.json(deals);
});

// GET /deals/:id - Get deal by id
app.get('/deals/:id', (req, res) => {
  const deal = deals.find(d => d.id === req.params.id);
  if (deal) {
    res.json(deal);
  } else {
    res.status(404).json({ error: 'Deal not found' });
  }
});

// GET /deals/search - Search deals
app.get('/deals/search', (req, res) => {
  let filtered = [...deals];

  // Filter by price
  if (req.query.price) {
    filtered = filtered.filter(d => d.price <= parseFloat(req.query.price));
  }

  // Filter by date
  if (req.query.date) {
    const filterDate = new Date(req.query.date).getTime();
    filtered = filtered.filter(d => {
      const dDate = typeof d.published === 'number' && String(d.published).length === 10 ? d.published * 1000 : new Date(d.published).getTime();
      return dDate >= filterDate;
    });
  }

  // Filter by 'filterBy' param from project specs
  if (req.query.filterBy === 'best-discount') {
    filtered = filtered.filter(d => d.discount >= 50);
  } else if (req.query.filterBy === 'most-commented') {
    filtered = filtered.filter(d => d.comments > 15);
  }

  // Original compatibility logic
  if (req.query.minDiscount) {
    filtered = filtered.filter(d => d.discount >= parseInt(req.query.minDiscount));
  }
  if (req.query.minTemp) {
    filtered = filtered.filter(d => d.temperature >= parseInt(req.query.minTemp));
  }

  // Sort by price ascending as requested by default
  if (!req.query.sort || req.query.sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (req.query.sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  // Limit / Page
  const limit = req.query.limit ? parseInt(req.query.limit) : 12;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  res.json({
    limit: limit,
    total: filtered.length,
    results: paginated
  });
});

// GET /sales/search - Search sales
app.get('/sales/search', (req, res) => {
  let filtered = [...sales];

  // Filter by set id
  if (req.query.setId) {
    filtered = filtered.filter(s => s.title.includes(req.query.setId));
  }

  // Sort by price
  if (req.query.sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (req.query.sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  res.json(filtered);
});

// POST /scrape/deals - Scrape and save deals
app.post('/scrape/deals', async (req, res) => {
  try {
    const newDeals = await scrapeDeals();
    deals = newDeals;
    saveData('deals.json', deals);
    res.json({ message: 'Deals scraped and saved', count: deals.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /scrape/sales/:setId - Scrape and save sales for set
app.post('/scrape/sales/:setId', async (req, res) => {
  try {
    const newSales = await scrapeSales(req.params.setId);
    sales = sales.concat(newSales);
    saveData('sales.json', sales);
    res.json({ message: `Sales for set ${req.params.setId} scraped and saved`, count: newSales.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});