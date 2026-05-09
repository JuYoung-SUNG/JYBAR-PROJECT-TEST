/**
 * Daily News Summary - Core Logic
 * Includes Mock Data, Web Components, Theme Toggle, Modal Logic, and i18n.
 */

const TRANSLATIONS = {
  en: {
    title: 'The Daily Brief',
    date: 'May 7, 2026',
    heroTitle: "Yesterday's Top Headlines",
    heroDesc: 'A concise summary of the events that shaped our world.',
    categories: {
      All: 'All Stories',
      Politics: 'Politics',
      Economy: 'Economy',
      Sports: 'Sports',
      Tech: 'Tech'
    },
    loading: 'Loading stories...',
    readMore: 'Read Full Article',
    yesterday: 'Yesterday',
    langBtn: '🇰🇷 KO'
  },
  ko: {
    title: '데일리 브리프',
    date: '2026년 5월 7일',
    heroTitle: '어제의 주요 헤드라인',
    heroDesc: '세상을 바꾼 사건들의 간결한 요약입니다.',
    categories: {
      All: '전체 뉴스',
      Politics: '정치',
      Economy: '경제',
      Sports: '스포츠',
      Tech: '테크'
    },
    loading: '뉴스를 불러오는 중...',
    readMore: '기사 전체 보기',
    yesterday: '어제',
    langBtn: '🇺🇸 EN'
  }
};

let NEWS_DATA = [];

// --- Data Fetching ---
async function fetchNewsData() {
  try {
    const response = await fetch('/data/news.json');
    if (!response.ok) throw new Error('Failed to fetch news data');
    NEWS_DATA = await response.json();
    
    // Initial UI updates after data is loaded
    updatei18n();
    initFilter();
  } catch (error) {
    console.error('Error loading news:', error);
    document.querySelector('.hero-section p').textContent = 'Error loading news stories. Please try again later.';
  }
}

// --- State Management ---
let currentLang = localStorage.getItem('lang') || 'en';

// --- i18n Management ---
function updatei18n() {
  const t = TRANSLATIONS[currentLang];
  
  // Header
  document.querySelector('.logo h1').textContent = t.title;
  document.querySelector('.date-badge').textContent = t.date;
  document.getElementById('langToggle').textContent = t.langBtn;
  
  // Navigation
  const navBtns = document.querySelectorAll('.filter-nav .filter-btn[data-category]');
  navBtns.forEach(btn => {
    const cat = btn.getAttribute('data-category');
    btn.textContent = t.categories[cat];
  });
  
  // Hero
  document.querySelector('.hero-section h2').textContent = t.heroTitle;
  document.querySelector('.hero-section p').textContent = t.heroDesc;
  
  // Modal
  document.getElementById('modalLink').textContent = t.readMore;

  // Refresh Grid
  const grid = document.querySelector('news-grid');
  if (grid) grid.render(document.querySelector('.filter-btn.active').getAttribute('data-category'));
}

function initLang() {
  const toggle = document.getElementById('langToggle');
  toggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ko' : 'en';
    localStorage.setItem('lang', currentLang);
    updatei18n();
  });
}

// --- Theme Management ---
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  
  toggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggle.textContent = newTheme === 'light' ? '🌓' : '☀️';
  });

  toggle.textContent = savedTheme === 'light' ? '🌓' : '☀️';
}

// --- Modal Management ---
const modal = {
  el: document.getElementById('newsModal'),
  title: document.getElementById('modalTitle'),
  image: document.getElementById('modalImage'),
  category: document.getElementById('modalCategory'),
  summary: document.getElementById('modalSummary'),
  link: document.getElementById('modalLink'),
  close: document.getElementById('closeModal'),

  open(data) {
    const t = data.translations[currentLang];
    this.title.textContent = t.title;
    this.image.src = data.image;
    this.category.textContent = TRANSLATIONS[currentLang].categories[data.category];
    this.summary.textContent = t.summary;
    this.link.href = data.url;
    this.el.showModal();
  },

  init() {
    this.close.addEventListener('click', () => this.el.close());
    this.el.addEventListener('click', (e) => {
      if (e.target === this.el) this.el.close();
    });
  }
};

// --- Web Component: News Card ---
class NewsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set article(data) {
    this._data = data;
    const isFeatured = data.featured ? 'featured' : '';
    const t = data.translations[currentLang];
    const catLabel = TRANSLATIONS[currentLang].categories[data.category];
    const dateLabel = TRANSLATIONS[currentLang].yesterday;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          height: 100%;
        }
        .card {
          background: var(--card-bg, white);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-soft);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(0,0,0,0.05);
          position: relative;
          cursor: pointer;
        }
        .card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lifted);
        }
        .image-container {
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: #eee;
        }
        .card.featured .image-container {
          height: 300px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .card:hover img {
          transform: scale(1.05);
        }
        .content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .category {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent-color, #3498db);
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }
        h3 {
          margin: 0 0 0.75rem 0;
          font-size: 1.25rem;
          line-height: 1.3;
          color: var(--text-primary);
        }
        .card.featured h3 {
          font-size: 1.75rem;
        }
        p {
          margin: 0;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .date {
          margin-top: auto;
          font-size: 0.8rem;
          color: #999;
          padding-top: 1rem;
        }
      </style>
      <div class="card ${isFeatured}">
        <div class="image-container">
          <img src="${data.image}" alt="${t.title}">
        </div>
        <div class="content">
          <div class="category">${catLabel}</div>
          <h3>${t.title}</h3>
          <p>${t.summary}</p>
          <div class="date">${dateLabel}</div>
        </div>
      </div>
    `;
    this.shadowRoot.querySelector('.card').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('open-article', {
        detail: this._data,
        bubbles: true,
        composed: true
      }));
    });
  }
}
customElements.define('news-card', NewsCard);

// --- Web Component: News Grid ---
class NewsGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.container = document.createElement('div');
    this.container.classList.add('grid');
    this.shadowRoot.innerHTML = `
      <style>
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        @container (min-width: 700px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @container (min-width: 1000px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      </style>
    `;
    this.shadowRoot.appendChild(this.container);
  }

  connectedCallback() {
    this.render();
  }

  filter(category) {
    this.render(category);
  }

  async fetchNews() {
    // Simulating a network fetch
    return new Promise(resolve => {
      setTimeout(() => resolve(NEWS_DATA), 500);
    });
  }

  async render(filterCategory = 'All') {
    this.container.innerHTML = `<p style="text-align:center; grid-column: 1/-1;">${TRANSLATIONS[currentLang].loading}</p>`;
    const data = await this.fetchNews();
    
    this.container.innerHTML = '';
    const filtered = filterCategory === 'All' 
      ? data 
      : data.filter(item => item.category === filterCategory);

    filtered.forEach(item => {
      const card = document.createElement('news-card');
      card.article = item;
      this.container.appendChild(card);
    });
  }
}
customElements.define('news-grid', NewsGrid);

// --- App Initialization ---
function initFilter() {
  const grid = document.querySelector('news-grid');
  const buttons = document.querySelectorAll('.filter-nav .filter-btn[data-category]');

  buttons.forEach(btn => {
    // Remove existing listeners if any (though not strictly necessary here)
    btn.onclick = () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      grid.filter(category);
    };
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLang();
  modal.init();
  fetchNewsData(); // Load data and trigger initial render

  // Handle Modal Open via Event Delegation from Web Component
  document.addEventListener('open-article', (e) => {
    modal.open(e.detail);
  });
});
