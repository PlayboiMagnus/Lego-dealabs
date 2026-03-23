// Lego Deals Analysis
// Workshop 1: Manipulate data with JavaScript

// TODO 1: Compute the number of deals
console.log('Number of deals:', deals.length);

// TODO 2: Find the most expensive deal
const mostExpensiveDeal = deals.reduce((max, deal) => deal.price > max.price ? deal : max);
console.log('Most expensive deal:', mostExpensiveDeal);

// TODO 3: Find the least expensive deal
const leastExpensiveDeal = deals.reduce((min, deal) => deal.price < min.price ? deal : min);
console.log('Least expensive deal:', leastExpensiveDeal);

// TODO 4: Find the deal with the biggest discount
const biggestDiscountDeal = deals.reduce((max, deal) => deal.discount > max.discount ? deal : max);
console.log('Deal with biggest discount:', biggestDiscountDeal);

// TODO 5: Find the deal with the smallest discount
const smallestDiscountDeal = deals.reduce((min, deal) => deal.discount < min.discount ? deal : min);
console.log('Deal with smallest discount:', smallestDiscountDeal);

// TODO 6: Compute the total value of all deals
const totalValueDeals = deals.reduce((sum, deal) => sum + deal.price, 0);
console.log('Total value of all deals:', totalValueDeals);

// TODO 7: Compute the average value of all deals
const averageValueDeals = totalValueDeals / deals.length;
console.log('Average value of all deals:', averageValueDeals);

// TODO 8: Compute the median value of all deals
const sortedPrices = deals.map(deal => deal.price).sort((a, b) => a - b);
const medianValueDeals = sortedPrices[Math.floor(sortedPrices.length / 2)];
console.log('Median value of all deals:', medianValueDeals);

// TODO 9: Find the deal with the most comments
const mostCommentsDeal = deals.reduce((max, deal) => deal.comments > max.comments ? deal : max);
console.log('Deal with most comments:', mostCommentsDeal);

// TODO 10: Find the deal with the least comments
const leastCommentsDeal = deals.reduce((min, deal) => deal.comments < min.comments ? deal : min);
console.log('Deal with least comments:', leastCommentsDeal);

// TODO 11: Compute the total number of comments
const totalComments = deals.reduce((sum, deal) => sum + deal.comments, 0);
console.log('Total number of comments:', totalComments);

// TODO 12: Compute the average number of comments
const averageComments = totalComments / deals.length;
console.log('Average number of comments:', averageComments);

// TODO 13: Compute the median number of comments
const sortedComments = deals.map(deal => deal.comments).sort((a, b) => a - b);
const medianComments = sortedComments[Math.floor(sortedComments.length / 2)];
console.log('Median number of comments:', medianComments);

// TODO 14: Find the deal with the highest temperature
const highestTempDeal = deals.reduce((max, deal) => deal.temperature > max.temperature ? deal : max);
console.log('Deal with highest temperature:', highestTempDeal);

// TODO 15: Find the deal with the lowest temperature
const lowestTempDeal = deals.reduce((min, deal) => deal.temperature < min.temperature ? deal : min);
console.log('Deal with lowest temperature:', lowestTempDeal);

// TODO 16: Compute the total temperature of all deals
const totalTemp = deals.reduce((sum, deal) => sum + deal.temperature, 0);
console.log('Total temperature of all deals:', totalTemp);

// TODO 17: Compute the average temperature of all deals
const averageTemp = totalTemp / deals.length;
console.log('Average temperature of all deals:', averageTemp);

// TODO 18: Compute the median temperature of all deals
const sortedTemps = deals.map(deal => deal.temperature).sort((a, b) => a - b);
const medianTemp = sortedTemps[Math.floor(sortedTemps.length / 2)];
console.log('Median temperature of all deals:', medianTemp);

// TODO 19: Compute the number of sales
console.log('Number of sales:', sales.length);

// TODO 20: Find the most expensive sale
const mostExpensiveSale = sales.reduce((max, sale) => sale.price > max.price ? sale : max);
console.log('Most expensive sale:', mostExpensiveSale);

// TODO 21: Find the least expensive sale
const leastExpensiveSale = sales.reduce((min, sale) => sale.price < min.price ? sale : min);
console.log('Least expensive sale:', leastExpensiveSale);

// TODO 22: Compute the total value of all sales
const totalValueSales = sales.reduce((sum, sale) => sum + sale.price, 0);
console.log('Total value of all sales:', totalValueSales);

// TODO 23: Compute the average value of all sales
const averageValueSales = totalValueSales / sales.length;
console.log('Average value of all sales:', averageValueSales);

// TODO 24: Compute the median value of all sales
const sortedSalePrices = sales.map(sale => sale.price).sort((a, b) => a - b);
const medianValueSales = sortedSalePrices[Math.floor(sortedSalePrices.length / 2)];
console.log('Median value of all sales:', medianValueSales);

// TODO 25: Find the sale with the most recent published date
const mostRecentSale = sales.reduce((max, sale) => sale.published > max.published ? sale : max);
console.log('Sale with most recent published date:', mostRecentSale);

// TODO 26: Find the sale with the oldest published date
const oldestSale = sales.reduce((min, sale) => sale.published < min.published ? sale : min);
console.log('Sale with oldest published date:', oldestSale);

// TODO 27: Compute the total published dates (timestamp)
const totalPublished = sales.reduce((sum, sale) => sum + sale.published, 0);
console.log('Total published dates:', totalPublished);

// TODO 28: Compute the average published date
const averagePublished = totalPublished / sales.length;
console.log('Average published date:', averagePublished);

// TODO 29: Compute the median published date
const sortedPublished = sales.map(sale => sale.published).sort((a, b) => a - b);
const medianPublished = sortedPublished[Math.floor(sortedPublished.length / 2)];
console.log('Median published date:', medianPublished);

// TODO 30: Find the sale with the longest title
const longestTitleSale = sales.reduce((max, sale) => sale.title.length > max.title.length ? sale : max);
console.log('Sale with longest title:', longestTitleSale);

// TODO 31: Find the sale with the shortest title
const shortestTitleSale = sales.reduce((min, sale) => sale.title.length < min.title.length ? sale : min);
console.log('Sale with shortest title:', shortestTitleSale);

// TODO 32: Compute the total length of all titles
const totalTitleLength = sales.reduce((sum, sale) => sum + sale.title.length, 0);
console.log('Total length of all titles:', totalTitleLength);

// TODO 33: Compute the average length of all titles
const averageTitleLength = totalTitleLength / sales.length;
console.log('Average length of all titles:', averageTitleLength);

// TODO 34: Compute the median length of all titles
const sortedTitleLengths = sales.map(sale => sale.title.length).sort((a, b) => a - b);
const medianTitleLength = sortedTitleLengths[Math.floor(sortedTitleLengths.length / 2)];
console.log('Median length of all titles:', medianTitleLength);