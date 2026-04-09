// Sample data for Lego deals and sales
// Deals from Dealabs
const deals = [
  {
    "_id": "deal1",
    "link": "https://www.dealabs.com/bons-plans/lego-12345",
    "retail": 100,
    "price": 80,
    "discount": 20,
    "temperature": 150,
    "photo": "https://example.com/lego12345.jpg",
    "comments": 10,
    "published": 1640995200,
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
    "published": 1641081600,
    "title": "Lego Set 67890 at 25% off",
    "id": "67890",
    "community": "dealabs"
  }
];

// Sales from Vinted
const sales = [
  {
    "_id": "sale1",
    "link": "https://www.vinted.fr/items/12345-lego-12345",
    "price": 85,
    "title": "Lego 12345 used",
    "published": 1640995200
  },
  {
    "_id": "sale2",
    "link": "https://www.vinted.fr/items/67890-lego-67890",
    "price": 160,
    "title": "Lego 67890 new",
    "published": 1641081600
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { deals, sales };
}