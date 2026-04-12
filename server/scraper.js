// scraper.js - Scraping deals and sales

const fs = require('fs');
const path = require('path');
const dealabs = require('./websites/dealabs');
const vinted = require('./websites/vinted');

// Scrape deals from Dealabs
async function scrapeDeals() {
  console.log('Scraping deals from Dealabs...');
  const deals = await dealabs.scrape('https://www.dealabs.com/groupe/lego');
  
  if (deals && deals.length > 0) {
    console.log(`Found ${deals.length} deals. Processing Vinted cross-references...`);
    // Enrich with Vinted data sequentially
    for (const deal of deals) {
      if (deal.id && deal.id.match(/^\d{5}$/)) { // If it's a valid 5-digit Lego ID
        try {
          const sales = await scrapeSales(deal.id);
          if (sales && sales.length > 0) {
            const prices = sales.map(s => s.price).sort((a,b) => a - b);
            const p50 = prices[Math.floor(prices.length * 0.5)] || 0;
            deal.vinted_price = p50;
            deal.profitability = Math.max(0, p50 - deal.price); // Profit amount
          } else {
            deal.vinted_price = 0;
            deal.profitability = 0;
          }
        } catch (e) {
          console.error(`Error cross-referencing ${deal.id}: `, e.message);
          deal.vinted_price = 0;
          deal.profitability = 0;
        }
      } else {
        deal.vinted_price = 0;
        deal.profitability = 0;
      }
    }
    return deals;
  }
  console.log('Warning: No deals scraped from Dealabs.');
  return [];
}

// Scrape sales from Vinted
async function scrapeSales(setId) {
  console.log(`Scraping sales for Lego set ${setId} from Vinted...`);
  const sales = await vinted.scrape(`lego ${setId}`);
  if (sales && sales.length > 0) {
    return sales;
  }
  console.log('Warning: Vinted returned no data.');
  return [];
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