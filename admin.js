'use strict';

/* ============================================================
   NEERU SPACES — Admin Panel Logic
   ============================================================ */

const ADMIN_PASSWORD = 'admin123';
const STORAGE_KEYS = {
  properties: 'neeru_properties',
  propertiesReset: 'neeru_properties_reset_v7',
  keerthiListingSeeded: 'neeru_keerthi_listing_seeded_v7',
  keerthiPhotosUpdated: 'neeru_keerthi_photos_updated_v5',
  admin: 'neeru_admin_auth'
};
const DEFAULT_PROPERTY = {
  id: 'keerthi-office-clinic',
  title: 'Office / Clinic Space for Rent',
  ownerName: 'Dr Keerthi',
  contact: '6281738239',
  whatsapp: '916281738239',
  location: 'Vinayakanagar Vuda colony, MIG 1/151, Vinayaka Nagar, Gonthinavanipalem, Pedagantyada, Gajuwaka, Andhra Pradesh 530044',
  mapUrl: '',
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
};

const DEFAULT_PROPERTIES = [
  DEFAULT_PROPERTY,
  {
    id: '26-58-112-property',
    title: '26-58-11/2 Block',
    ownerName: 'Neeru Spaces',
    contact: '6281738239',
    whatsapp: '916281738239',
    location: '26-58-11/2, Prasanthi Nagar, Kanithi Road, Old Gajuwaka, Opp. Hanuman Statue, Andhra Pradesh 530026',
    mapUrl: '',
    price: 100000,
    deposit: 700000,
    priceLabel: '₹1,00,000 / month · Deposit ₹7,00,000',
    type: 'Commercial',
    category: 'Commercial',
    beds: 0,
    baths: 0,
    area: '1,500 sft',
    parking: '—',
    furnished: '—',
    badges: ['New', 'Verified'],
    featured: false,
    images: [
      'photos/26-58-112/WhatsApp Image 2026-11-25 at 12.18.13 AM.jpeg',
      'photos/26-58-112/WhatsApp Image 2026-11-25 at 12.18.14 AM (1).jpeg',
      'photos/26-58-112/WhatsApp Image 2026-11-25 at 12.18.14 AM (2).jpeg',
      'photos/26-58-112/WhatsApp Image 2026-11-25 at 12.18.14 AM.jpeg'
    ],
    desc: 'Commercial property at 26-58-11/2, Prasanthi Nagar, Kanithi Road, Old Gajuwaka, opposite the Hanuman Statue. The property has 1,500 sft of area. Monthly rent is ₹1 lakh with a ₹7 lakh deposit.',
    amenities: ['Commercial Requirement', '1,500 sft', 'Opposite Hanuman Statue', 'Kanithi Road', 'Viewing by Appointment']
  },
  {
    id: 'kalyan-towers-property',
    title: 'Kalyan Towers',
    ownerName: 'Neeru Spaces',
    contact: '6281738239',
    whatsapp: '916281738239',
    location: 'Opposite to Steel Plant Arch on NH5, Visakhapatnam',
    mapUrl: '',
    price: 40000,
    deposit: 120000,
    priceLabel: '₹40,000 / month · Deposit ₹1,20,000',
    type: 'Commercial',
    category: 'Commercial',
    beds: 0,
    baths: 0,
    area: '2,000 sft',
    height: '10 feet',
    parking: '—',
    furnished: '—',
    badges: ['New', 'Verified'],
    featured: false,
    images: [
      'photos/Kalyan towers/WhatsApp Image 2026-11-25 at 12.13.32 AM.jpeg',
      'photos/Kalyan towers/WhatsApp Image 2026-11-25 at 12.13.33 AM (1).jpeg',
      'photos/Kalyan towers/WhatsApp Image 2026-11-25 at 12.13.33 AM (2).jpeg',
      'photos/Kalyan towers/WhatsApp Image 2026-11-25 at 12.13.33 AM.jpeg',
      'photos/Kalyan towers/WhatsApp Image 2026-11-25 at 12.13.34 AM (1).jpeg',
      'photos/Kalyan towers/WhatsApp Image 2026-11-25 at 12.13.34 AM (2).jpeg',
      'photos/Kalyan towers/WhatsApp Image 2026-11-25 at 12.13.34 AM (3).jpeg',
      'photos/Kalyan towers/WhatsApp Image 2026-11-25 at 12.13.34 AM.jpeg',
      'photos/Kalyan towers/WhatsApp Image 2026-11-25 at 12.13.35 AM (1).jpeg',
      'photos/Kalyan towers/WhatsApp Image 2026-11-25 at 12.13.35 AM (2).jpeg',
      'photos/Kalyan towers/WhatsApp Image 2026-11-25 at 12.13.35 AM.jpeg'
    ],
    desc: 'Commercial property at Kalyan Towers, opposite the Steel Plant Arch on NH5. The property has 2,000 sft of area with a height of 10 feet. Monthly rent is ₹40,000 with a ₹1,20,000 deposit.',
    amenities: ['NH5 Location', 'Opposite Steel Plant Arch', '2,000 sft', '10 Feet Height', 'Viewing by Appointment']
  },
  {
    id: 'sre-plaza-property',
    title: 'S.R.E Plaza',
    ownerName: 'Neeru Spaces',
    contact: '6281738239',
    whatsapp: '916281738239',
    location: 'Visakhapatnam',
    mapUrl: '',
    price: 0,
    deposit: 0,
    priceLabel: 'Price on request',
    type: 'Commercial',
    category: 'Commercial',
    beds: 0,
    baths: 0,
    area: '—',
    parking: '—',
    furnished: '—',
    badges: ['New', 'Verified'],
    featured: false,
    images: [
      'photos/S.R.E Plaza/WhatsApp Image 2026-11-24 at 11.32.24 PM (1).jpeg',
      'photos/S.R.E Plaza/WhatsApp Image 2026-11-24 at 11.32.24 PM (2).jpeg',
      'photos/S.R.E Plaza/WhatsApp Image 2026-11-24 at 11.32.24 PM.jpeg',
      'photos/S.R.E Plaza/WhatsApp Image 2026-11-24 at 11.32.25 PM (1).jpeg',
      'photos/S.R.E Plaza/WhatsApp Image 2026-11-24 at 11.32.25 PM (2).jpeg',
      'photos/S.R.E Plaza/WhatsApp Image 2026-11-24 at 11.32.25 PM (3).jpeg',
      'photos/S.R.E Plaza/WhatsApp Image 2026-11-24 at 11.32.25 PM.jpeg',
      'photos/S.R.E Plaza/WhatsApp Image 2026-11-24 at 11.32.26 PM.jpeg'
    ],
    desc: 'Commercial property listing for S.R.E Plaza. Contact Neeru Spaces for complete details and viewing.',
    amenities: ['Photos Available', 'Viewing by Appointment']
  },
  {
    id: 'bharathi-books-building',
    title: '12-61-5/4 Block',
    ownerName: 'Neeru Spaces',
    contact: '6281738239',
    whatsapp: '916281738239',
    location: '12-61-5/4, Bharathi Books Building, Visakhapatnam',
    mapUrl: '',
    price: 40000,
    deposit: 500000,
    priceLabel: '₹40,000 / month · ₹5 lakh advance',
    type: 'Commercial',
    category: 'Commercial',
    beds: 0,
    baths: 0,
    area: '1,300 sft',
    parking: '—',
    furnished: '—',
    badges: ['New', 'Verified'],
    featured: false,
    images: [
      'photos/bharathi books building/WhatsApp Image 2026-11-25 at 12.16.54 AM (1).jpeg',
      'photos/bharathi books building/WhatsApp Image 2026-11-25 at 12.16.54 AM.jpeg'
    ],
    desc: 'Commercial block at 12-61-5/4, Bharathi Books Building, with 1,300 sft of area. Monthly rent is ₹40,000. The advance is ₹5 lakh, of which ₹3 lakh remains as advance while ₹10,000 per month is deducted from the remaining ₹2 lakh.',
    amenities: ['1,300 sft', '₹5 lakh Advance', '₹3 lakh Retained Advance', '₹10,000 Monthly Advance Deduction', 'Viewing by Appointment']
  }
];

/* ---------- Auth ---------- */
const loginScreen = document.getElementById('loginScreen');
const adminApp = document.getElementById('adminApp');
const loginForm = document.getElementById('loginForm');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

function isAuthed() {
  return sessionStorage.getItem(STORAGE_KEYS.admin) === 'true';
}
function showAdmin() {
  loginScreen.hidden = true;
  adminApp.hidden = false;
  renderTable();
}
function showLogin() {
  loginScreen.hidden = false;
  adminApp.hidden = true;
}

if (isAuthed()) showAdmin(); else showLogin();

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (loginPassword.value === ADMIN_PASSWORD) {
    sessionStorage.setItem(STORAGE_KEYS.admin, 'true');
    loginError.textContent = '';
    loginPassword.value = '';
    showAdmin();
  } else {
    loginError.textContent = 'Incorrect password. Please try again.';
  }
});

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem(STORAGE_KEYS.admin);
  showLogin();
});

/* ---------- Data helpers ---------- */
function getProperties() {
  if (localStorage.getItem(STORAGE_KEYS.propertiesReset) !== 'true') {
    localStorage.setItem(STORAGE_KEYS.properties, JSON.stringify(DEFAULT_PROPERTIES));
    localStorage.setItem(STORAGE_KEYS.propertiesReset, 'true');
    localStorage.setItem(STORAGE_KEYS.keerthiListingSeeded, 'true');
    return DEFAULT_PROPERTIES.slice();
  }

  let properties = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.properties);
    const parsed = raw ? JSON.parse(raw) : [];
    properties = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    properties = [];
  }

  if (localStorage.getItem(STORAGE_KEYS.keerthiListingSeeded) !== 'true') {
    if (!properties.some(property => property.id === DEFAULT_PROPERTY.id)) properties.unshift(DEFAULT_PROPERTY);
    localStorage.setItem(STORAGE_KEYS.properties, JSON.stringify(properties));
    localStorage.setItem(STORAGE_KEYS.keerthiListingSeeded, 'true');
  }

  if (localStorage.getItem(STORAGE_KEYS.keerthiPhotosUpdated) !== 'true') {
    const listing = properties.find(property => property.id === DEFAULT_PROPERTY.id);
    if (listing) {
      listing.images = DEFAULT_PROPERTY.images.slice();
      localStorage.setItem(STORAGE_KEYS.properties, JSON.stringify(properties));
    }
    localStorage.setItem(STORAGE_KEYS.keerthiPhotosUpdated, 'true');
  }

  if (localStorage.getItem('neeru_keerthi_address_updated_v1') !== 'true') {
    const listing = properties.find(property => property.id === DEFAULT_PROPERTY.id);
    if (listing) {
      listing.location = DEFAULT_PROPERTY.location;
      localStorage.setItem(STORAGE_KEYS.properties, JSON.stringify(properties));
    }
    localStorage.setItem('neeru_keerthi_address_updated_v1', 'true');
  }
  return properties;
}
function saveProperties(list) {
  localStorage.setItem(STORAGE_KEYS.properties, JSON.stringify(list));
}

/* ---------- Table rendering ---------- */
const tbody = document.getElementById('adminTableBody');
const propCount = document.getElementById('propCount');
const adminEmpty = document.getElementById('adminEmpty');

function renderTable() {
  const list = getProperties();
  propCount.textContent = `${list.length} propert${list.length === 1 ? 'y' : 'ies'}`;

  if (!list.length) {
    tbody.innerHTML = '';
    adminEmpty.hidden = false;
    return;
  }
  adminEmpty.hidden = true;

  tbody.innerHTML = list.map(p => `
    <tr>
      <td><img src="${(p.images && p.images[0]) || fallbackImg()}" alt="${p.title}"></td>
      <td>${p.title}</td>
      <td>${p.location}</td>
      <td>₹${Number(p.price).toLocaleString('en-IN')}</td>
      <td>${p.beds} / ${p.baths}</td>
      <td><span class="badge-pill ${p.featured ? '' : 'off'}">${p.featured ? 'Featured' : '—'}</span></td>
      <td>
        <div class="row-actions">
          <button class="icon-btn" data-edit="${p.id}" aria-label="Edit">✏️</button>
          <button class="icon-btn danger" data-delete="${p.id}" aria-label="Delete">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => openForm(btn.dataset.edit));
  });
  tbody.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => deleteProperty(btn.dataset.delete));
  });
}

function fallbackImg() {
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="80"%3E%3Crect width="100" height="80" fill="%23F5F5F5"/%3E%3C/svg%3E';
}

function deleteProperty(id) {
  if (!confirm('Delete this property? This cannot be undone.')) return;
  const list = getProperties().filter(p => p.id !== id);
  saveProperties(list);
  renderTable();
  showToast('Property deleted.');
}

/* ---------- Form modal ---------- */
const formOverlay = document.getElementById('formOverlay');
const propertyForm = document.getElementById('propertyForm');
const formTitle = document.getElementById('formTitle');
const imagePreview = document.getElementById('imagePreview');
let pendingImageData = [];

const fields = ['p-id','p-title','p-location','p-price','p-type','p-category','p-beds','p-baths','p-area','p-parking','p-furnished','p-desc','p-amenities'];

function openForm(id) {
  propertyForm.reset();
  imagePreview.innerHTML = '';
  pendingImageData = [];
  document.getElementById('p-featured').checked = false;
  document.getElementById('p-new').checked = false;

  if (id) {
    const p = getProperties().find(item => item.id === id);
    if (!p) return;
    formTitle.textContent = 'Edit Property';
    document.getElementById('p-id').value = p.id;
    document.getElementById('p-title').value = p.title;
    document.getElementById('p-location').value = p.location;
    document.getElementById('p-owner').value = p.ownerName || '';
    document.getElementById('p-contact').value = p.contact || '';
    document.getElementById('p-deposit').value = p.deposit || '';
    document.getElementById('p-map-url').value = p.mapUrl || '';
    document.getElementById('p-price').value = p.price;
    document.getElementById('p-type').value = p.type;
    document.getElementById('p-category').value = p.category;
    document.getElementById('p-beds').value = p.beds;
    document.getElementById('p-baths').value = p.baths;
    document.getElementById('p-area').value = p.area;
    document.getElementById('p-parking').value = p.parking || '';
    document.getElementById('p-furnished').value = p.furnished || 'Unfurnished';
    document.getElementById('p-desc').value = p.desc;
    document.getElementById('p-amenities').value = (p.amenities || []).join(', ');
    document.getElementById('p-featured').checked = !!p.featured;
    document.getElementById('p-new').checked = (p.badges || []).includes('New');
    pendingImageData = Array.isArray(p.images) ? p.images.slice() : [];
    imagePreview.innerHTML = pendingImageData
      .map((src, index) => `<img src="${src}" alt="Property photo ${index + 1} preview">`).join('');
  } else {
    formTitle.textContent = 'Add Property';
    document.getElementById('p-id').value = '';
  }

  formOverlay.classList.add('open');
}

function closeForm() {
  formOverlay.classList.remove('open');
}

document.getElementById('addPropertyBtn').addEventListener('click', () => openForm(null));
document.getElementById('formClose').addEventListener('click', closeForm);
document.getElementById('formCancel').addEventListener('click', closeForm);
formOverlay.addEventListener('click', (e) => { if (e.target === formOverlay) closeForm(); });

document.getElementById('p-image').addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;
  Promise.all(files.map(file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  }))).then(images => {
    pendingImageData = images;
    imagePreview.innerHTML = images
      .map((src, index) => `<img src="${src}" alt="Property photo ${index + 1} preview">`).join('');
  }).catch(() => showToast('Could not read one or more selected photos.'));
});

propertyForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('p-id').value || 'p_' + Date.now();
  const isNew = document.getElementById('p-new').checked;
  const isFeatured = document.getElementById('p-featured').checked;
  const badges = ['Verified'];
  if (isNew) badges.unshift('New');
  if (isFeatured) badges.unshift('Featured');

  const amenities = document.getElementById('p-amenities').value
    .split(',').map(s => s.trim()).filter(Boolean);

  const price = parseInt(document.getElementById('p-price').value, 10) || 0;

  const record = {
    id,
    title: document.getElementById('p-title').value.trim(),
    location: document.getElementById('p-location').value.trim(),
    ownerName: document.getElementById('p-owner').value.trim(),
    contact: document.getElementById('p-contact').value.trim().replace(/\D/g, ''),
    whatsapp: document.getElementById('p-contact').value.trim().replace(/\D/g, '')
      ? `91${document.getElementById('p-contact').value.trim().replace(/\D/g, '')}`
      : '',
    mapUrl: document.getElementById('p-map-url').value.trim(),
    price,
    deposit: parseInt(document.getElementById('p-deposit').value, 10) || 0,
    priceLabel: `₹${price.toLocaleString('en-IN')} / month${document.getElementById('p-deposit').value ? ` · Deposit ₹${Number(document.getElementById('p-deposit').value).toLocaleString('en-IN')}` : ''}`,
    type: document.getElementById('p-type').value,
    category: document.getElementById('p-category').value,
    beds: parseInt(document.getElementById('p-beds').value, 10) || 0,
    baths: parseInt(document.getElementById('p-baths').value, 10) || 0,
    area: document.getElementById('p-area').value.trim(),
    parking: document.getElementById('p-parking').value.trim() || '—',
    furnished: document.getElementById('p-furnished').value,
    badges,
    featured: isFeatured,
    images: pendingImageData.length ? pendingImageData : [fallbackImg()],
    desc: document.getElementById('p-desc').value.trim(),
    amenities: amenities.length ? amenities : ['Security', 'Water Supply']
  };

  const list = getProperties();
  const existingIndex = list.findIndex(p => p.id === id);
  if (existingIndex >= 0) {
    list[existingIndex] = record;
  } else {
    list.unshift(record);
  }
  saveProperties(list);
  renderTable();
  closeForm();
  showToast(existingIndex >= 0 ? 'Property updated.' : 'Property added.');
});

/* ---------- Toast ---------- */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('adminToast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}
