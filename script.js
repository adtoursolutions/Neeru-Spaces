'use strict';

/* ============================================================
   NEERU SPACES — script.js
   ============================================================ */

/* ---------- Default property data (used to seed localStorage) ---------- */
const DEFAULT_PROPERTIES = [
  {
    id: 'p1', title: '2BHK Modern Apartment', location: 'MVP Colony, Visakhapatnam',
    price: 18000, priceLabel: '₹18,000 / month', type: 'Apartment', category: 'Residential',
    beds: 2, baths: 2, area: '1150 sqft', parking: 'Yes', furnished: 'Semi-Furnished',
    badges: ['New', 'Verified'], featured: false,
    images: [
      'https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=900',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=900',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=900'
    ],
    desc: 'A bright, well-ventilated 2BHK in the heart of MVP Colony, close to schools and hospitals. Ideal for small families.',
    amenities: ['Lift', 'Power Backup', '24x7 Water', 'Security', 'Children\'s Play Area']
  },
  {
    id: 'p2', title: 'Independent Villa with Garden', location: 'Madhurawada, Visakhapatnam',
    price: 45000, priceLabel: '₹45,000 / month', type: 'Villa', category: 'Residential',
    beds: 4, baths: 4, area: '3200 sqft', parking: 'Yes (2 cars)', furnished: 'Fully Furnished',
    badges: ['Featured', 'Verified'], featured: true,
    images: [
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?q=80&w=900',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=900',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=900'
    ],
    desc: 'Spacious 4BHK independent villa with a private garden and terrace, tucked in a quiet Madhurawada layout.',
    amenities: ['Private Garden', 'Terrace', 'Modular Kitchen', 'Servant Room', 'Covered Parking']
  },
  {
    id: 'p3', title: 'Prime Commercial Shop', location: 'Gajuwaka, Visakhapatnam',
    price: 30000, priceLabel: '₹30,000 / month', type: 'Commercial', category: 'Commercial',
    beds: 0, baths: 1, area: '800 sqft', parking: 'Street Parking', furnished: 'Unfurnished',
    badges: ['Verified'], featured: false,
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=900',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=900',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900'
    ],
    desc: 'High-footfall shop space right on Gajuwaka - Scindia Road, perfect for retail or showroom use.',
    amenities: ['Main Road Facing', 'Shutter Front', 'Power Load 10kW', 'Restroom']
  },
  {
    id: 'p4', title: 'Cozy 1BHK for Bachelors', location: 'Dwaraka Nagar, Visakhapatnam',
    price: 9500, priceLabel: '₹9,500 / month', type: 'Apartment', category: 'Residential',
    beds: 1, baths: 1, area: '550 sqft', parking: 'Two-wheeler only', furnished: 'Semi-Furnished',
    badges: ['New'], featured: false,
    images: [
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=900',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=900',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=900'
    ],
    desc: 'Compact and affordable 1BHK, walking distance to bus stops and local markets. Great for working professionals.',
    amenities: ['Wi-Fi Ready', 'Water Purifier Point', 'Security', 'Balcony']
  },
  {
    id: 'p5', title: 'Executive Office Space', location: 'Seethammadhara, Visakhapatnam',
    price: 55000, priceLabel: '₹55,000 / month', type: 'Office Space', category: 'Commercial',
    beds: 0, baths: 2, area: '2000 sqft', parking: 'Yes (6 cars)', furnished: 'Fully Furnished',
    badges: ['Featured', 'Verified'], featured: true,
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=900',
      'https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=900',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=900'
    ],
    desc: 'Ready-to-move office floor with cabins, a conference room, and a pantry — ideal for a growing team.',
    amenities: ['Conference Room', 'Pantry', 'Central AC', 'Fiber Internet', 'Reception Area']
  },
  {
    id: 'p6', title: 'Residential Plot (200 sq.yd)', location: 'Pendurthi, Visakhapatnam',
    price: 12000, priceLabel: '₹12,000 / month lease', type: 'Land', category: 'Residential',
    beds: 0, baths: 0, area: '200 sq.yd', parking: '—', furnished: '—',
    badges: ['Verified'], featured: false,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=900',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=900',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=900'
    ],
    desc: 'A clear, corner residential plot in a developing Pendurthi layout with approach road on two sides.',
    amenities: ['Corner Plot', 'Approach Road', 'Clear Title', 'Boundary Wall']
  },
  {
    id: 'p7', title: 'Warehouse & Storage Unit', location: 'Gajuwaka Industrial Area',
    price: 65000, priceLabel: '₹65,000 / month', type: 'Warehouse', category: 'Commercial',
    beds: 0, baths: 1, area: '6000 sqft', parking: 'Truck Access', furnished: 'Unfurnished',
    badges: ['Verified'], featured: false,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=900',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?q=80&w=900'
    ],
    desc: 'High-clearance warehouse with dock access and three-phase power, suited for storage or light manufacturing.',
    amenities: ['Loading Dock', '3-Phase Power', 'Security Cabin', 'Truck Turning Space']
  },
  {
    id: 'p8', title: 'Luxury 3BHK Penthouse', location: 'Beach Road, Visakhapatnam',
    price: 75000, priceLabel: '₹75,000 / month', type: 'Luxury Home', category: 'Residential',
    beds: 3, baths: 3, area: '2600 sqft', parking: 'Yes (2 cars)', furnished: 'Fully Furnished',
    badges: ['Featured', 'New', 'Verified'], featured: true,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=900',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=900',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=900'
    ],
    desc: 'A stunning penthouse with sea-facing balconies, premium interiors, and a private terrace lounge.',
    amenities: ['Sea View', 'Private Terrace', 'Modular Kitchen', 'Home Theatre Room', 'Covered Parking']
  }
];

const STORAGE_KEYS = {
  properties: 'neeru_properties',
  favorites: 'neeru_favorites',
  theme: 'neeru_theme',
  admin: 'neeru_admin_auth'
};

/* ---------- Seed localStorage on first load ---------- */
function getProperties() {
  const raw = localStorage.getItem(STORAGE_KEYS.properties);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.properties, JSON.stringify(DEFAULT_PROPERTIES));
    return DEFAULT_PROPERTIES.slice();
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_PROPERTIES.slice();
  } catch (e) {
    return DEFAULT_PROPERTIES.slice();
  }
}

function getFavorites() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites)) || []; }
  catch (e) { return []; }
}
function setFavorites(list) {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(list));
}

/* ============================================================
   LOADER
   ============================================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const fill = document.querySelector('.loader-bar-fill');
  let pct = 0;
  const timer = setInterval(() => {
    pct += Math.random() * 22;
    if (pct >= 100) { pct = 100; clearInterval(timer); }
    fill.style.width = pct + '%';
  }, 120);
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1400);
});

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
(function initCursor() {
  const dot = document.getElementById('cursorDot');
  const glow = document.getElementById('cursorGlow');
  if (!dot || !glow) return;
  let targetX = 0, targetY = 0, glowX = 0, glowY = 0;

  window.addEventListener('mousemove', (e) => {
    document.body.classList.add('cursor-active');
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    targetX = e.clientX; targetY = e.clientY;
  });

  function animateGlow() {
    glowX += (targetX - glowX) * 0.12;
    glowY += (targetY - glowY) * 0.12;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  const hoverables = 'a, button, input, select, textarea, .property-card, .cat-card, .service-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) dot.classList.add('grow');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables)) dot.classList.remove('grow');
  });
})();

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
(function initMagnetic() {
  const items = document.querySelectorAll('[data-magnetic]');
  items.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
})();

/* ============================================================
   SCROLL PROGRESS + NAVBAR STATE + BACK TO TOP
   ============================================================ */
(function initScrollFx() {
  const progress = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = pct + '%';

    navbar.classList.toggle('scrolled', scrollTop > 40);
    backToTop.classList.toggle('show', scrollTop > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   MOBILE NAV
   ============================================================ */
(function initMobileNav() {
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    links.classList.toggle('open');
    burger.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
  }));
  const megaParent = document.querySelector('.nav-item.has-mega');
  megaParent.querySelector('a').addEventListener('click', (e) => {
    if (window.innerWidth <= 860) {
      e.preventDefault();
      megaParent.classList.toggle('open');
    }
  });
})();

/* ============================================================
   DARK / LIGHT MODE
   ============================================================ */
(function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem(STORAGE_KEYS.theme);
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(STORAGE_KEYS.theme, 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem(STORAGE_KEYS.theme, 'dark');
    }
  });
})();

/* ============================================================
   HERO TYPING EFFECT
   ============================================================ */
(function initTyping() {
  const el = document.getElementById('typedLine');
  if (!el) return;
  const phrases = ['Find Your Perfect Rental', 'Verified Properties', 'Trusted Rental Agency'];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 70);
  }
  tick();
})();

/* ============================================================
   HERO PARTICLES
   ============================================================ */
(function initParticles() {
  const wrap = document.getElementById('heroParticles');
  if (!wrap) return;
  const count = window.innerWidth < 700 ? 18 : 36;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = (0.3 + Math.random() * 0.5).toString();
    wrap.appendChild(p);
  }
})();

/* ============================================================
   HERO SLIDESHOW
   ============================================================ */
(function initHeroSlides() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 6000);
})();

/* ============================================================
   HERO PARALLAX / MOUSE MOVEMENT
   ============================================================ */
(function initParallax() {
  const hero = document.querySelector('.hero-content');
  if (!hero) return;
  document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;
    hero.style.transform = `translate(${x}px, ${y}px)`;
  });
})();

/* ============================================================
   SCROLL INDICATOR CLICK
   ============================================================ */
document.getElementById('scrollIndicator')?.addEventListener('click', () => {
  document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
});

/* ============================================================
   REVEAL ON SCROLL (Intersection Observer)
   ============================================================ */
function initReveal() {
  const items = document.querySelectorAll('.reveal:not(.in)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1600;
      const start = performance.now();
      function frame(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target);
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = target;
      }
      requestAnimationFrame(frame);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  nums.forEach(el => io.observe(el));
}

/* ============================================================
   PROPERTY CARD RENDERING
   ============================================================ */
function badgeClass(name) {
  if (name === 'New') return 'badge-new';
  if (name === 'Featured') return 'badge-featured';
  return 'badge-verified';
}

function propertyCardHTML(p, favorites) {
  const isFav = favorites.includes(p.id);
  const badges = p.badges.map(b => `<span class="badge ${badgeClass(b)}">${b}</span>`).join('');
  return `
  <article class="property-card tilt-card" data-id="${p.id}">
    <div class="property-media">
      <img src="${p.images[0]}" alt="${p.title} in ${p.location}" loading="lazy">
      <div class="property-badges">${badges}</div>
      <button class="fav-btn ${isFav ? 'active' : ''}" data-fav="${p.id}" aria-label="Save to favorites">❤️</button>
    </div>
    <div class="property-body">
      <div class="property-price">${p.priceLabel}</div>
      <h3 class="property-title">${p.title}</h3>
      <p class="property-loc">📍 ${p.location}</p>
      <div class="property-specs">
        <span>🛏 ${p.beds} Beds</span>
        <span>🛁 ${p.baths} Baths</span>
        <span>📐 ${p.area}</span>
        <span>🚗 ${p.parking}</span>
        <span>🛋 ${p.furnished}</span>
      </div>
      <div class="property-actions">
        <button class="btn btn-outline" data-view="${p.id}">View Details</button>
        <a class="btn btn-primary" href="https://wa.me/916281738239?text=${encodeURIComponent('Hi, I\'m interested in ' + p.title + ' (' + p.location + ')')}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </article>`;
}

let currentProperties = [];

function renderProperties(list) {
  const grid = document.getElementById('propertiesGrid');
  const empty = document.getElementById('propertiesEmpty');
  const favorites = getFavorites();
  if (!list.length) {
    grid.innerHTML = '';
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  grid.innerHTML = list.map(p => propertyCardHTML(p, favorites)).join('');
  attachCardEvents();
  initReveal();
  initTiltEffect();
}

function attachCardEvents() {
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.view));
  });
  document.querySelectorAll('[data-fav]').forEach(btn => {
    btn.addEventListener('click', () => toggleFavorite(btn.dataset.fav, btn));
  });
}

function toggleFavorite(id, btn) {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
    btn.classList.remove('active');
    showToast('Removed from favorites');
  } else {
    favs.push(id);
    btn.classList.add('active');
    showToast('Saved to favorites ❤️');
  }
  setFavorites(favs);
}

/* ---------- tilt effect on hover ---------- */
function initTiltEffect() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ============================================================
   PROPERTY MODAL
   ============================================================ */
function openModal(id) {
  const p = currentProperties.find(item => item.id === id);
  if (!p) return;
  document.getElementById('modalGallery').innerHTML = p.images.slice(0, 3)
    .map(src => `<img src="${src}" alt="${p.title} photo" loading="lazy">`).join('');
  document.getElementById('modalBadges').innerHTML = p.badges.map(b => `<span class="badge ${badgeClass(b)}">${b}</span>`).join('');
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalLocation').textContent = '📍 ' + p.location;
  document.getElementById('modalPrice').textContent = p.priceLabel;
  document.getElementById('modalSpecs').innerHTML = `
    <span>🛏 ${p.beds} Bedrooms</span><span>🛁 ${p.baths} Bathrooms</span>
    <span>📐 ${p.area}</span><span>🚗 ${p.parking}</span><span>🛋 ${p.furnished}</span>`;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalAmenities').innerHTML = p.amenities.map(a => `<span>${a}</span>`).join('');

  const overlay = document.getElementById('propertyModal');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const waLink = overlay.querySelector('.modal-owner-actions .btn-primary');
  waLink.href = `https://wa.me/916281738239?text=${encodeURIComponent('Hi, I\'m interested in ' + p.title + ' (' + p.location + ')')}`;
}

function closeModal() {
  const overlay = document.getElementById('propertyModal');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('propertyModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'propertyModal') closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ============================================================
   SEARCH / FILTER
   ============================================================ */
document.getElementById('searchForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.getElementById('f-location').value;
  const type = document.getElementById('f-type').value;
  const budget = document.getElementById('f-budget').value;
  const beds = document.getElementById('f-beds').value;
  const cat = document.getElementById('f-cat').value;

  const filtered = currentProperties.filter(p => {
    if (location && !p.location.includes(location)) return false;
    if (type && p.type !== type) return false;
    if (budget && p.price > parseInt(budget, 10)) return false;
    if (beds) {
      const bedsNum = parseInt(beds, 10);
      if (bedsNum === 4) { if (p.beds < 4) return false; }
      else if (p.beds !== bedsNum) return false;
    }
    if (cat && p.category !== cat) return false;
    return true;
  });

  renderProperties(filtered);
  document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
});

/* ============================================================
   TESTIMONIAL SLIDER (auto-play)
   ============================================================ */
(function initTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  if (!track) return;
  const slides = track.children.length;
  let index = 0;

  for (let i = 0; i < slides; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }

  function goTo(i) {
    index = i;
    track.style.transform = `translateX(-${index * 100}%)`;
    [...dotsWrap.children].forEach((d, di) => d.classList.toggle('active', di === index));
  }

  let auto = setInterval(() => goTo((index + 1) % slides), 5000);
  track.parentElement.addEventListener('mouseenter', () => clearInterval(auto));
  track.parentElement.addEventListener('mouseleave', () => {
    auto = setInterval(() => goTo((index + 1) % slides), 5000);
  });
})();

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
(function initFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
})();

/* ============================================================
   GALLERY LIGHTBOX
   ============================================================ */
(function initLightbox() {
  const imgs = Array.from(document.querySelectorAll('#galleryMasonry img'));
  if (!imgs.length) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#10094;</button>
    <img alt="">
    <button class="lightbox-nav lightbox-next" aria-label="Next">&#10095;</button>`;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');
  let current = 0;

  function show(i) {
    current = (i + imgs.length) % imgs.length;
    lbImg.src = imgs[current].src;
    lbImg.alt = imgs[current].alt;
  }
  function open(i) { show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }

  imgs.forEach((img, i) => img.addEventListener('click', () => open(i)));
  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
  lb.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();

/* ============================================================
   VIDEO PLAY BUTTON
   ============================================================ */
document.getElementById('playBtn')?.addEventListener('click', () => {
  showToast('Promo video coming soon — check back shortly!');
});

/* ============================================================
   CONTACT FORM VALIDATION
   ============================================================ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const validators = {
    'c-name': (v) => v.trim().length >= 2 || 'Please enter your full name.',
    'c-phone': (v) => /^[0-9]{10}$/.test(v.trim()) || 'Enter a valid 10-digit phone number.',
    'c-email': (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.',
    'c-type': (v) => v !== '' || 'Please select a property type.',
    'c-message': (v) => v.trim().length >= 10 || 'Message should be at least 10 characters.'
  };

  function validateField(id) {
    const field = document.getElementById(id);
    const row = field.closest('.form-row');
    const errorEl = form.querySelector(`[data-error-for="${id}"]`);
    const result = validators[id](field.value);
    if (result === true) {
      row.classList.remove('error');
      errorEl.textContent = '';
      return true;
    } else {
      row.classList.add('error');
      errorEl.textContent = result;
      return false;
    }
  }

  Object.keys(validators).forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener('blur', () => validateField(id));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = Object.keys(validators).map(validateField).every(Boolean);
    if (!allValid) return;

    showToast('Message sent! We\'ll get back to you shortly.');
    fireConfetti();
    form.reset();
  });
})();

document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('Subscribed! Watch your inbox for new listings.');
  e.target.reset();
});

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ============================================================
   CONFETTI (lightweight canvas-free version)
   ============================================================ */
function fireConfetti() {
  const colors = ['#D32F2F', '#FFC107', '#FFECB3', '#121212'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    const size = 6 + Math.random() * 6;
    Object.assign(piece.style, {
      position: 'fixed',
      left: '50%',
      top: '40%',
      width: size + 'px',
      height: size + 'px',
      background: colors[Math.floor(Math.random() * colors.length)],
      borderRadius: Math.random() > 0.5 ? '50%' : '3px',
      zIndex: 4000,
      pointerEvents: 'none',
      transform: `translate(-50%,-50%)`
    });
    document.body.appendChild(piece);

    const angle = Math.random() * Math.PI * 2;
    const distance = 150 + Math.random() * 250;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance - 100;

    piece.animate([
      { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1 },
      { transform: `translate(${endX}px, ${endY}px) rotate(${Math.random() * 500}deg)`, opacity: 0 }
    ], { duration: 1200 + Math.random() * 600, easing: 'cubic-bezier(.22,1,.36,1)' })
      .onfinish = () => piece.remove();
  }
}

/* ============================================================
   YEAR
   ============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   INIT
   ============================================================ */
function init() {
  currentProperties = getProperties();
  renderProperties(currentProperties);
  initReveal();
  initCounters();

  // Re-render if admin panel updates localStorage in another tab
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEYS.properties) {
      currentProperties = getProperties();
      renderProperties(currentProperties);
    }
  });
}
document.addEventListener('DOMContentLoaded', init);
