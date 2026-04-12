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

### 🍪 Vinted Cookie Setup (Required for Arbitrage)

Vinted uses anti-bot protections. To allow the backend to cross-reference prices automatically, you **must** provide your personal session cookie:

1. Open your browser natively and go to **Vinted.fr**.
2. Accept the cookie consent pop-up and log into your account.
3. Open the **Developer Tools** (Press `F12` or right-click -> **Inspect**).
4. Go to the **Network** tab and refresh the page (`F5`).
5. Click on the very first request in the list (usually named `vinted.fr`).
6. Scroll down the right panel to the **Request Headers** section.
7. Right-click the massive string next to `cookie: ` and select **Copy value**.
8. Open `server/websites/vinted.js` and paste that string into the constant at the top:
   ```javascript
   const COOKIE = "PASTE_YOUR_LONG_COOKIE_HERE";
   ```

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

## 📖 Usage Guide

Once the application is running, here is how you can use the Lego Dealabs Searching Project to identify the best investment opportunities:

### 1. Browse and Filter Deals 🛍️
- When you open the frontend interface, the application will display a list of current Lego deals scraped from Dealabs.
- Use the provided filters to narrow down the deals based on your budget, highest discounts, or best temperature (hottest deals).
- You can also search for a specific Lego set by entering its official Set ID.

### 2. Cross-Reference with Vinted Sales ⚖️
- The true power of this project lies in market arbitrage. Select a Lego deal to initiate a search for recent sales of the identical set on Vinted.
- The interface compares the active Dealabs set price directly with the real-world market prices observed on Vinted.

### 3. Evaluate Profitability and ROI 💰
- By reviewing the compiled statistics (average price, median price, highest sale), you can determine the margin you are likely to make.
- If the Dealabs price is substantially lower than what the set successfully sells for on Vinted, you have found a profitable Lego set to invest in!

## �📝 Licence

Uncopyrighted
