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

const NEWS_DATA = [
  {
    id: 1,
    category: 'Politics',
    translations: {
      en: {
        title: 'New Policy Reform Announced for 2026',
        summary: 'Government officials discussed a major overhaul of digital infrastructure policies to enhance connectivity across urban areas. This reform aims to provide high-speed internet to 95% of rural communities by 2028, fostering economic growth and digital literacy.',
      },
      ko: {
        title: '2026년 새로운 정책 개혁 발표',
        summary: '정부 관계자들은 도시 지역의 연결성을 강화하기 위한 디지털 인프라 정책의 대대적인 개편을 논의했습니다. 이 개혁은 2028년까지 농어촌 커뮤니티의 95%에 초고속 인터넷을 제공하여 경제 성장과 디지털 리터러시를 촉진하는 것을 목표로 합니다.',
      }
    },
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80',
    featured: true,
    url: '#'
  },
  {
    id: 2,
    category: 'Economy',
    translations: {
      en: {
        title: 'Market Hits Record High Amid Tech Surge',
        summary: 'The stock market saw unprecedented growth yesterday as leading technology firms reported higher-than-expected quarterly earnings. Analysts attribute this surge to increased adoption of green energy solutions and AI-driven efficiency in manufacturing.',
      },
      ko: {
        title: '기술주 급등 속 시장 사상 최고치 경신',
        summary: '어제 주요 기술 기업들이 예상보다 높은 분기 실적을 발표하면서 주식 시장은 전례 없는 성장을 기록했습니다. 분석가들은 이러한 급등의 원인을 친환경 에너지 솔루션 채택 증가와 제조업의 AI 기반 효율성 향상 덕분으로 보고 있습니다.',
      }
    },
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1611974714851-4821016f5743?auto=format&fit=crop&w=800&q=80',
    featured: false,
    url: '#'
  },
  {
    id: 3,
    category: 'Sports',
    translations: {
      en: {
        title: 'Underdog Victory in National Finals',
        summary: 'In a stunning upset, the city challengers defeated the reigning champions in a nail-biting finish during yesterday\'s finals. The match ended 3-2 after a dramatic overtime goal that left fans on the edge of their seats.',
      },
      ko: {
        title: '국가대표 결승전에서의 언더독 승리',
        summary: '어제 열린 결승전에서 시티 챌린저스가 디펜딩 챔피언을 꺾는 이변을 일으켰습니다. 경기는 연장전에서 터진 극적인 결승골로 3-2로 끝났으며, 팬들은 손에 땀을 쥐며 경기를 지켜봤습니다.',
      }
    },
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800&q=80',
    featured: false,
    url: '#'
  },
  {
    id: 4,
    category: 'Tech',
    translations: {
      en: {
        title: 'Breakthrough in Quantum Computing',
        summary: 'Researchers have achieved a new milestone in quantum stability, bringing us closer to practical quantum processors. The team successfully maintained qubit coherence for over 10 minutes at room temperature, a feat previously thought impossible.',
      },
      ko: {
        title: '양자 컴퓨팅의 획기적 발전',
        summary: '연구진은 양자 안정성에서 새로운 이정표를 달성하여 실용적인 양자 프로세서에 한 걸음 더 다가섰습니다. 연구팀은 이전에는 불가능하다고 여겨졌던 상온에서의 큐비트 일관성을 10분 이상 유지하는 데 성공했습니다.',
      }
    },
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    featured: true,
    url: '#'
  },
  {
    id: 5,
    category: 'Politics',
    translations: {
      en: {
        title: 'Global Summit Focuses on Climate Action',
        summary: 'World leaders gathered yesterday to sign a landmark agreement aimed at accelerating carbon neutrality goals. The pact includes strict regulations on industrial emissions and a collective fund of $500 billion to support renewable energy in developing nations.',
      },
      ko: {
        title: '글로벌 정상회의, 기후 행동에 집중',
        summary: '어제 세계 각국 정상들이 모여 탄소 중립 목표 달성을 가속화하기 위한 획기적인 협정에 서명했습니다. 이 협정에는 산업 배출에 대한 엄격한 규제와 개발도상국의 재생 에너지를 지원하기 위한 5,000억 달러 규모의 공동 기금 마련이 포함되어 있습니다.',
      }
    },
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1464692805480-a69dfaafdb0d?auto=format&fit=crop&w=800&q=80',
    featured: false,
    url: '#'
  },
  {
    id: 6,
    category: 'Sports',
    translations: {
      en: {
        title: 'World-Class Sprinter Sets New Record',
        summary: 'The track and field community was buzzing yesterday as a new world record was set in the 100m sprint. The 22-year-old athlete clocked in at 9.48 seconds, shattering the previous record by a significant margin.',
      },
      ko: {
        title: '세계 정상급 스프린터, 신기록 수립',
        summary: '어제 100m 달리기에서 새로운 세계 기록이 수립되면서 육상계가 들썩였습니다. 22세의 이 선수는 9.48초를 기록하며 이전 기록을 큰 차이로 경신했습니다.',
      }
    },
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
    featured: false,
    url: '#'
  }
];

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
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLang();
  modal.init();
  updatei18n(); // Initial i18n setup
  
  const grid = document.querySelector('news-grid');
  const buttons = document.querySelectorAll('.filter-nav .filter-btn[data-category]');

  // Handle Filtering
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      grid.filter(category);
    });
  });

  // Handle Modal Open via Event Delegation from Web Component
  document.addEventListener('open-article', (e) => {
    modal.open(e.detail);
  });
});
