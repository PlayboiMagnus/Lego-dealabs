# 🧱 Lego Dealabs

> First bricks for profitability

## 📱 Context

LEGO investments is a good source of profit.

## 🤔 The bullet-list Problems

Collecting profit on your LEGO investments isn't as easy as it sounds.

• How to identify profitable lego sets?
• How to buy lego sets under the retail price to maximise the profit?
• How to sell profitable lego sets above the retail price?

## 🎯 Objective

Build an end-to-end web application to determine if a lego set deal is really a good deal.

## 🛣 How to solve it?

1. 🎨 Make a frictionless experience: How to easily identify profitable deals in very few clicks
2. 🧱 Manipulate deals and sold items: How to manipulate the products in the browser
3. 🧹 Scrape deals and sales: How to fetch Products from different website sources
4. 📱 Render deals and sales in the browser: How to interact with the Products in the browser
5. 💽 Save deals and sales in database: How to avoid to scrape again and again the same data
6. ⤵️ Request deals and sales with an api: How to give access to your data
7. 🐛 Test your code: How to ensure quality and confidence
8. 🚀 Deploy in production: How to give access to anyone

## 👩🏽‍💻 Implementation

This project implements a web application that scrapes Lego deals from Dealabs and sales from Vinted to help identify profitable Lego set investments.

### Features

- Scrape Lego deals from Dealabs
- Scrape sales data from Vinted
- Compare deal prices with market sales prices
- Web interface to browse and filter deals
- API endpoints for data access

### Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Scraping: Cheerio, Node-fetch
- Data storage: JSON files (can be extended to database)

## � Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation and Startup 🚀

**Step 1: Start the Backend server**
1. Open up a terminal / command prompt.
2. Navigate to your server folder:
   ```bash
   cd server
   ```
3. Install the node modules (if you haven't already):
   ```bash
   npm install
   ```
4. Start the API server:
   ```bash
   node api.js
   ```
   *You should see a message saying "API server running on http://localhost:3000" in your terminal. Leave this terminal open!*

**Step 2: Open the Frontend**
Since the frontend is built using standard HTML/JS, no separate server is needed.
Simply navigate to `client/v2/` in your File Explorer and **double-click** the `index.html` file to open it directly in your web browser. It will automatically connect to your local API server.

### 📸 Screenshots

*(Replace the placeholder links below with your actual screenshot images once you take them!)*

![Main Interface](./path/to/your/screenshot1.png)
*Caption: Browsing Deals and filtering results*

![Sales Interface](./path/to/your/screenshot2.png)
*Caption: Checking individual Vinted sales for a specific Lego set*

### API Endpoints

- `GET /deals` - Get all deals
- `GET /deals/:id` - Get deal by Lego set ID
- `GET /deals/search` - Search/filter deals
- `GET /sales/search` - Search sales by set ID
- `POST /scrape/deals` - Scrape new deals
- `POST /scrape/sales/:setId` - Scrape sales for a set

### Usage

1. The main interface loads deals from the API
2. Use filters to find deals with high discounts or hot deals
3. Select a Lego set ID and load sales data to compare prices
4. View price statistics to determine if a deal is profitable

## �📝 Licence

Uncopyrighted
