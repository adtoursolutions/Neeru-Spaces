# Neeru Spaces — Premium Real Estate Website

A premium, fully responsive website for **Neeru Spaces**, a Property & Land Rental Agency in Visakhapatnam. Built with pure **HTML5, CSS3, and vanilla JavaScript (ES6)** — no frameworks, no build step, no backend.

## Running the site

No installation needed. Just open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).

For the best experience with the contact form's embedded maps and Google Fonts, keep an internet connection active (fonts and map embeds load from the web; everything else works fully offline).

> Tip: some browsers restrict `fetch`/module features on `file://` URLs. This site avoids those APIs, but if you ever see blank iframes for Google Maps, serving the folder with a simple local server (e.g. `npx serve` or the VS Code "Live Server" extension) will resolve it.

## Publish with GitHub Pages

The workflow at `.github/workflows/pages.yml` deploys the site whenever `main` or `master` is pushed.

1. Create a GitHub repository and upload/push the contents of this project folder to its `main` branch.
2. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Open the **Actions** tab and wait for **Deploy Neeru Spaces to GitHub Pages** to complete. GitHub will show the published URL in the deployment details and Pages settings.

**Important:** the admin panel is a frontend-only prototype. Its password is visible in the JavaScript, and property changes are stored only in each visitor's browser `localStorage`; they are not shared with other visitors or devices. Do not rely on this admin password to protect private data. A shared public listing system requires a backend/database and server-side authentication.

## File structure

```
neeru-spaces/
├── index.html      → Main website (all sections)
├── style.css        → Full design system + component styles
├── script.js        → All interactivity (cursor, search, modal, forms, etc.)
├── admin.html        → Hidden admin panel (password protected)
├── admin.css         → Admin panel styling
├── admin.js          → Admin CRUD logic (localStorage-based)
├── robots.txt         → SEO crawler rules
├── sitemap.xml         → SEO sitemap placeholder
└── README.md
```

## Admin panel

Visit `admin.html` directly (it is not linked from the public navigation).

- **Password:** `admin123`
- Add, edit, and delete property listings
- Upload an image for local preview (stored as a data URL in `localStorage`)
- Mark listings as **Featured** or **New**
- Changes save to `localStorage` under the key `neeru_properties` and appear immediately on the main site (refresh `index.html`, or it updates live if both pages are open in different tabs of the same browser)

**Note:** this is a local-storage-only prototype — there is no server, so data is scoped to a single browser and device. The property list starts empty; add listings through the Admin Panel.

## Key features implemented

- Custom animated cursor with magnetic buttons and mouse glow
- Luxury loading screen with animated logo and progress bar
- Sticky glass navbar with mega menu, scroll progress bar, and dark/light mode toggle
- Full-screen hero with background slideshow, typing animation, floating glass stat cards, and parallax
- Property search & filter (location, type, budget, bedrooms, category)
- Admin-managed properties with badges, tilt-hover cards, and a detail modal (gallery, amenities, map, WhatsApp inquiry)
- Property categories, "Why Choose Us," Services, animated counters, and a process timeline
- Auto-playing testimonial slider, scrolling client-logo marquee, masonry gallery with keyboard-navigable lightbox
- FAQ accordion, validated contact form with success toast + confetti, newsletter signup
- Floating WhatsApp / Call / Back-to-top buttons
- Dark mode preference and favorited properties persisted via `localStorage`
- SEO: meta tags, Open Graph, Twitter Cards, JSON-LD `RealEstateAgent` schema, semantic HTML, alt text, `robots.txt`, `sitemap.xml`

## Customizing content

- **Properties:** use the Admin Panel to add, edit, and delete listings.
- **Colors/fonts:** all design tokens live at the top of `style.css` under `:root`.
- **Contact details:** phone, WhatsApp, and address appear in `index.html` (Contact section, Footer, and floating buttons) and in the JSON-LD block in the `<head>`.

## Browser support

Tested against current versions of Chrome, Edge, Firefox, and Safari. Uses `IntersectionObserver`, CSS custom properties, `backdrop-filter`, and the Web Animations API (confetti) — all standard in modern evergreen browsers.
