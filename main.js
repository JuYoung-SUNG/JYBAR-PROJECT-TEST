/**
 * Daily News Summary - Core Logic
 * Includes Mock Data, Web Components, and Filtering.
 */

const NEWS_DATA = [
  {
    id: 1,
    category: 'Politics',
    title: 'New Policy Reform Announced for 2026',
    summary: 'Government officials discussed a major overhaul of digital infrastructure policies to enhance connectivity across urban areas.',
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 2,
    category: 'Economy',
    title: 'Market Hits Record High Amid Tech Surge',
    summary: 'The stock market saw unprecedented growth yesterday as leading technology firms reported higher-than-expected quarterly earnings.',
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1611974714851-4821016f5743?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 3,
    category: 'Sports',
    title: 'Underdog Victory in National Finals',
    summary: 'In a stunning upset, the city challengers defeated the reigning champions in a nail-biting finish during yesterday\'s finals.',
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 4,
    category: 'Tech',
    title: 'Breakthrough in Quantum Computing',
    summary: 'Researchers have achieved a new milestone in quantum stability, bringing us closer to practical quantum processors.',
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 5,
    category: 'Politics',
    title: 'Global Summit Focuses on Climate Action',
    summary: 'World leaders gathered yesterday to sign a landmark agreement aimed at accelerating carbon neutrality goals.',
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1464692805480-a69dfaafdb0d?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 6,
    category: 'Sports',
    title: 'World-Class Sprinter Sets New Record',
    summary: 'The track and field community was buzzing yesterday as a new world record was set in the 100m sprint.',
    date: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
    featured: false
  }
];

// --- Web Component: News Card ---
class NewsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set article(data) {
    const isFeatured = data.featured ? 'featured' : '';
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
          color: #1a1a1a;
        }
        .card.featured h3 {
          font-size: 1.75rem;
        }
        p {
          margin: 0;
          font-size: 0.95rem;
          color: #555;
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
          <img src="${data.image}" alt="${data.title}">
        </div>
        <div class="content">
          <div class="category">${data.category}</div>
          <h3>${data.title}</h3>
          <p>${data.summary}</p>
          <div class="date">${data.date}</div>
        </div>
      </div>
    `;
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

  render(filterCategory = 'All') {
    this.container.innerHTML = '';
    const filtered = filterCategory === 'All' 
      ? NEWS_DATA 
      : NEWS_DATA.filter(item => item.category === filterCategory);

    filtered.forEach(item => {
      const card = document.createElement('news-card');
      card.article = item;
      // Feature styling logic for grid
      if (item.featured) {
        card.style.gridColumn = 'span 1';
      }
      this.container.appendChild(card);
    });
  }
}
customElements.define('news-grid', NewsGrid);

// --- App Initialization & Filtering ---
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('news-grid');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');
      grid.filter(category);
    });
  });
});
