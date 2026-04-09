const cheerio = require('cheerio');
const { v5: uuidv5 } = require('uuid');

const parse = data => {
  const $ = cheerio.load(data, {'xmlMode': true});
  const deals = [];

  $('article').each((i, element) => {
    const vueDiv = $(element).find('[data-vue3]').first();
    const vueDataRaw = vueDiv.attr('data-vue3');
    
    if (vueDataRaw) {
      try {
        const vueData = JSON.parse(vueDataRaw);
        if (vueData.name === "ThreadMainListItemNormalizer" && vueData.props && vueData.props.thread) {
          const thread = vueData.props.thread;
          const link = thread.shareableLink || `https://www.dealabs.com/bons-plans/${thread.titleSlug}-${thread.threadId}`;
          const photo = thread.mainImage ? `https://static.dealabs.com/threads/raw/${thread.mainImage.slotId}/${thread.mainImage.name}.${thread.mainImage.ext}` : null;
          
          deals.push({
            discount: thread.percentage || 0,
            link,
            price: thread.price || 0,
            retail: thread.nextBestPrice || thread.price,
            temperature: thread.temperature || 0,
            comments: thread.commentCount || 0,
            photo,
            title: thread.title,
            id: thread.threadId.toString(),
            uuid: uuidv5(link, uuidv5.URL)
          });
        }
      } catch (e) {
        // ignore parsing errors on specific articles
      }
    }
  });

  return deals;
};

const scrape = async url => {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
      }
    });

    if (response.ok) {
      const body = await response.text();
      return parse(body);
    }

    console.error(`Failed to fetch Dealabs. Status: ${response.status}`);
  } catch (error) {
    console.error(error);
  }

  return null;
};

module.exports = { scrape };
