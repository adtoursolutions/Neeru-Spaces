'use strict';

/* ============================================================
   NEERU SPACES — Admin Panel Logic
   ============================================================ */

const ADMIN_PASSWORD = 'admin123';
const STORAGE_KEYS = {
  properties: 'neeru_properties',
  admin: 'neeru_admin_auth'
};

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
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.properties);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
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
let pendingImageData = null;

const fields = ['p-id','p-title','p-location','p-price','p-type','p-category','p-beds','p-baths','p-area','p-parking','p-furnished','p-desc','p-amenities'];

function openForm(id) {
  propertyForm.reset();
  imagePreview.innerHTML = '';
  pendingImageData = null;
  document.getElementById('p-featured').checked = false;
  document.getElementById('p-new').checked = false;

  if (id) {
    const p = getProperties().find(item => item.id === id);
    if (!p) return;
    formTitle.textContent = 'Edit Property';
    document.getElementById('p-id').value = p.id;
    document.getElementById('p-title').value = p.title;
    document.getElementById('p-location').value = p.location;
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
    pendingImageData = (p.images && p.images[0]) || null;
    if (pendingImageData) imagePreview.innerHTML = `<img src="${pendingImageData}" alt="Preview">`;
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
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    pendingImageData = reader.result;
    imagePreview.innerHTML = `<img src="${pendingImageData}" alt="Preview">`;
  };
  reader.readAsDataURL(file);
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
    price,
    priceLabel: `₹${price.toLocaleString('en-IN')} / month`,
    type: document.getElementById('p-type').value,
    category: document.getElementById('p-category').value,
    beds: parseInt(document.getElementById('p-beds').value, 10) || 0,
    baths: parseInt(document.getElementById('p-baths').value, 10) || 0,
    area: document.getElementById('p-area').value.trim(),
    parking: document.getElementById('p-parking').value.trim() || '—',
    furnished: document.getElementById('p-furnished').value,
    badges,
    featured: isFeatured,
    images: pendingImageData ? [pendingImageData, pendingImageData, pendingImageData] : [fallbackImg(), fallbackImg(), fallbackImg()],
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
