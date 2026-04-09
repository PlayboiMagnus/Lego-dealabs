// scraper.js - Scraping deals and sales

const fs = require('fs');
const path = require('path');
const dealabs = require('./websites/dealabs');
const vinted = require('./websites/vinted');

// Mock data for demonstration
const mockDeals = [
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
  }
];

const mockSales = [
  {
    "_id": "sale1",
    "link": "https://www.vinted.fr/items/12345-lego-12345",
    "price": 85,
    "title": "Lego 12345 used",
    "published": Date.now() / 1000
  }
];

// Scrape deals from Dealabs
async function scrapeDeals() {
  console.log('Scraping deals from Dealabs...');
  const deals = await dealabs.scrape('https://www.dealabs.com/groupe/lego');
  if (deals && deals.length > 0) {
    return deals;
  }
  console.log('Warning: No deals scraped from Dealabs. Returning mock fallback data...');
  return mockDeals;
}

// Scrape sales from Vinted
async function scrapeSales(setId) {
  console.log(`Scraping sales for Lego set ${setId} from Vinted...`);
  const sales = await vinted.scrape(`lego ${setId}`);
  if (sales && sales.length > 0) {
    return sales;
  }
  console.log('Warning: Vinted returned no data (likely missing cookie). Using mock fallback data...');
  return mockSales.filter(sale => sale.title.includes(setId));
}

// Save data to JSON files
function saveData(filename, data) {
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Data saved to ${filename}`);
}

// Load data from JSON files
function loadData(filename) {
  const filePath = path.join(__dirname, filename);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return [];
}

module.exports = {
  scrapeDeals,
  scrapeSales,
  saveData,
  loadData
};