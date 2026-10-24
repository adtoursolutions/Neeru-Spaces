'use strict';

/* ============================================================
   NEERU SPACES — script.js
   ============================================================ */

/* ---------- Owner-provided featured listing ---------- */
const DEFAULT_PROPERTIES = [{
  id: 'keerthi-office-clinic',
  title: 'Office / Clinic Space for Rent',
  ownerName: 'Dr Keerthi',
  contact: '8220418415',
  whatsapp: '918220418415',
  location: 'Vinayakanagar Vuda colony, MIG 1/151, Vinayaka Nagar, Gonthinavanipalem, Pedagantyada, Gajuwaka, Andhra Pradesh 530044',
  mapUrl: 'https://maps.app.goo.gl/HF9Xv4iXHdMkTDXo9?g_st=ac',
  price: 25000,
  deposit: 50000,
  priceLabel: '₹25,000 / month · Deposit ₹50,000',
  type: 'Office Space',
  category: 'Commercial',
  beds: 0,
  baths: 0,
  area: 'Approx. 1,000 sft',
  parking: '—',
  furnished: '—',
  badges: ['Featured', 'Verified'],
  featured: true,
  images: [
    'photos/DrKeerthi/Building.jpeg',
    'photos/DrKeerthi/enterance.jpeg',
    'photos/DrKeerthi/office1.jpeg',
    'photos/DrKeerthi/office2.jpeg',
    'photos/DrKeerthi/office3.jpeg',
    'photos/DrKeerthi/office4.jpeg',
    'photos/DrKeerthi/lobby.jpeg',
    'photos/DrKeerthi/kitchen.jpeg'
  ],
  desc: 'Commercial space suitable for offices, clinics, physiotherapy, or diagnostic labs. Rent is ₹25,000 per month with a ₹50,000 deposit. Approximately 1,000 sft.',
  amenities: ['Suitable for Offices', 'Clinics', 'Physiotherapy', 'Diagnostic Labs']
}];

const STORAGE_KEYS = {
  properties: 'neeru_properties',
  propertiesReset: 'neeru_properties_reset_v1',
  keerthiListingSeeded: 'neeru_keerthi_listing_seeded_v1',
  keerthiPhotosUpdated: 'neeru_keerthi_photos_updated_v5',
  favorites: 'neeru_favorites',
  theme: 'neeru_theme',
  admin: 'neeru_admin_auth'
};

/* ---------- Seed localStorage on first load ---------- */
function getProperties() {
  if (localStorage.getItem(STORAGE_KEYS.propertiesReset) !== 'true') {
    localStorage.setItem(STORAGE_KEYS.properties, JSON.stringify(DEFAULT_PROPERTIES));
    localStorage.setItem(STORAGE_KEYS.propertiesReset, 'true');
    localStorage.setItem(STORAGE_KEYS.keerthiListingSeeded, 'true');
    return DEFAULT_PROPERTIES.slice();
  }

  const raw = localStorage.getItem(STORAGE_KEYS.properties);
  let properties = [];
  try {
    const parsed = JSON.parse(raw);
    properties = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    properties = [];
  }

  if (localStorage.getItem(STORAGE_KEYS.keerthiListingSeeded) !== 'true') {
    if (!properties.some(property => property.id === DEFAULT_PROPERTIES[0].id)) {
      properties.unshift(DEFAULT_PROPERTIES[0]);
    }
    localStorage.setItem(STORAGE_KEYS.properties, JSON.stringify(properties));
    localStorage.setItem(STORAGE_KEYS.keerthiListingSeeded, 'true');
  }

  if (localStorage.getItem(STORAGE_KEYS.keerthiPhotosUpdated) !== 'true') {
    const listing = properties.find(property => property.id === DEFAULT_PROPERTIES[0].id);
    if (listing) {
      listing.images = DEFAULT_PROPERTIES[0].images.slice();
      localStorage.setItem(STORAGE_KEYS.properties, JSON.stringify(properties));
    }
    localStorage.setItem(STORAGE_KEYS.keerthiPhotosUpdated, 'true');
  }

  if (localStorage.getItem('neeru_keerthi_address_updated_v1') !== 'true') {
    const listing = properties.find(property => property.id === DEFAULT_PROPERTIES[0].id);
    if (listing) {
      listing.location = DEFAULT_PROPERTIES[0].location;
      localStorage.setItem(STORAGE_KEYS.properties, JSON.stringify(properties));
    }
    localStorage.setItem('neeru_keerthi_address_updated_v1', 'true');
  }
  return properties;
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

  const hoverables = 'a, button, input, select, textarea, .property-card, .service-card';
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
  const whatsappNumber = p.whatsapp || (p.contact ? `91${p.contact.replace(/\D/g, '')}` : '916281738239');
  const specs = propertySpecs(p);
  const locationMarkup = `<p class="property-loc">📍 ${p.location}</p>${p.mapUrl
    ? `<a class="property-map-link" href="${p.mapUrl}" target="_blank" rel="noopener">Google Maps ↗</a>`
    : ''}`;
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
      ${locationMarkup}
      <div class="property-specs"${specs.length ? '' : ' hidden'}>${specs.join('')}</div>
      <div class="property-actions">
        <button class="btn btn-outline" data-view="${p.id}">View Details</button>
        <a class="btn btn-primary" href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi, I\'m interested in ' + p.title + ' (' + p.location + ')')}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </article>`;
}

function propertySpecs(p, detail = false) {
  const specs = [];
  if (Number(p.beds) > 0) specs.push(`<span>🛏 ${p.beds} ${detail ? 'Bedrooms' : 'Beds'}</span>`);
  if (Number(p.baths) > 0) specs.push(`<span>🛁 ${p.baths} ${detail ? 'Bathrooms' : 'Baths'}</span>`);
  if (p.area && p.area !== '—') specs.push(`<span>📐 ${p.area}</span>`);
  if (p.parking && p.parking !== '—') specs.push(`<span>🚗 ${p.parking}</span>`);
  if (p.furnished && p.furnished !== '—') specs.push(`<span>🛋 ${p.furnished}</span>`);
  return specs;
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
  document.getElementById('modalGallery').innerHTML = p.images
    .map(src => `<img src="${src}" alt="${p.title} photo" loading="lazy">`).join('');
  document.getElementById('modalBadges').innerHTML = p.badges.map(b => `<span class="badge ${badgeClass(b)}">${b}</span>`).join('');
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalLocation').textContent = '📍 ' + p.location;
  document.getElementById('modalPrice').textContent = p.priceLabel;
  const modalSpecs = document.getElementById('modalSpecs');
  const specs = propertySpecs(p, true);
  modalSpecs.innerHTML = specs.join('');
  modalSpecs.hidden = !specs.length;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalAmenities').innerHTML = p.amenities.map(a => `<span>${a}</span>`).join('');

  const mapFrame = document.getElementById('modalMapFrame');
  const mapLink = document.getElementById('modalMapLink');
  mapFrame.hidden = !!p.mapUrl;
  mapLink.hidden = !p.mapUrl;
  if (p.mapUrl) mapLink.href = p.mapUrl;

  const ownerName = p.ownerName || 'Neeru Spaces';
  const ownerPhone = p.contact || '6281738239';
  const ownerWhatsapp = p.whatsapp || (p.contact ? `91${p.contact.replace(/\D/g, '')}` : '916281738239');
  document.getElementById('modalOwnerName').textContent = ownerName;
  document.getElementById('modalOwnerRole').textContent = p.ownerName
    ? `Property Owner · +91 ${ownerPhone}`
    : 'Listing Consultant';
  document.getElementById('modalCallOwner').href = `tel:+91${ownerPhone}`;

  const overlay = document.getElementById('propertyModal');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const waLink = overlay.querySelector('.modal-owner-actions .btn-primary');
  waLink.href = `https://wa.me/${ownerWhatsapp}?text=${encodeURIComponent('Hi, I\'m interested in ' + p.title + ' (' + p.location + ')')}`;
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
