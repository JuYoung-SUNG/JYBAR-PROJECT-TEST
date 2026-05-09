const fs = require('fs');
const path = require('path');

// Configuration
const API_KEY = process.env.NEWS_API_KEY;
const DATA_PATH = path.join(__dirname, '../data/news.json');

async function fetchNews() {
  console.log('Fetching latest news...');

  if (!API_KEY) {
    console.log('No NEWS_API_KEY found. Generating mock data for demonstration.');
    return generateMockData();
  }

  try {
    // Example using NewsAPI (you can change this to any news provider)
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch news');
    }

    const articles = data.articles.slice(0, 10).map((art, index) => ({
      id: Date.now() + index,
      category: determineCategory(art.title + ' ' + art.description),
      translations: {
        en: {
          title: art.title,
          summary: art.description || art.content || 'No summary available.'
        },
        ko: {
          // In a real app, you might use a translation API here.
          // For now, we'll prefix for demo purposes.
          title: `[번역] ${art.title}`,
          summary: `[번역] ${art.description || art.content || '요약 내용이 없습니다.'}`
        }
      },
      date: new Date(art.publishedAt).toLocaleDateString(),
      image: art.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      featured: index === 0,
      url: art.url
    }));

    return articles;
  } catch (error) {
    console.error('Error fetching news from API:', error);
    return generateMockData();
  }
}

function determineCategory(text) {
  const t = text.toLowerCase();
  if (t.includes('sport') || t.includes('goal') || t.includes('match')) return 'Sports';
  if (t.includes('tech') || t.includes('ai') || t.includes('software') || t.includes('gadget')) return 'Tech';
  if (t.includes('economy') || t.includes('market') || t.includes('stock') || t.includes('finance')) return 'Economy';
  return 'Politics'; // Default
}

function generateMockData() {
  const categories = ['Politics', 'Economy', 'Sports', 'Tech'];
  const news = [];
  const now = new Date();
  
  for (let i = 1; i <= 6; i++) {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    news.push({
      id: Date.now() + i,
      category: cat,
      translations: {
        en: {
          title: `Automated News Item ${i} (${cat})`,
          summary: `This is an automatically generated news summary for ${cat}. It was collected at ${now.toLocaleTimeString()}.`
        },
        ko: {
          title: `자동 생성 뉴스 ${i} (${cat})`,
          summary: `이것은 ${cat} 분야의 자동 생성 뉴스 요약입니다. 수집 시간: ${now.toLocaleTimeString()}.`
        }
      },
      date: 'Today',
      image: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=800&q=80`,
      featured: i === 1,
      url: '#'
    });
  }
  return news;
}

async function main() {
  try {
    const newsData = await fetchNews();
    fs.writeFileSync(DATA_PATH, JSON.stringify(newsData, null, 2));
    console.log(`Successfully updated news data at ${DATA_PATH}`);
  } catch (error) {
    console.error('Failed to run news fetcher:', error);
    process.exit(1);
  }
}

main();
