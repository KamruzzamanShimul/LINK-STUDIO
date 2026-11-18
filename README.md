# Shimul King | Link Studio

A high-performance, zero-middleman Google Share Link Converter, 50+ Worldwide ccTLD Domain Multiplier, and Query Salting Anti-Spam Suite with 6-Hour Auto-Rotating Live Wallpapers.

---

## 🚀 Features & Architecture

### 1. ⚡ Link Converter (Section 1)
- Extracts raw Google Share tokens (`q=...`, `share.google/...`, and direct token strings).
- Converts tokens into official Google Search domain format:
  `https://www.google.com/share.google?q={token}`
- One-click copy with clipboard feedback.
- One-click "Test Link" opening directly in a new tab.
- Quick workflow buttons: "↳ Send to Section 2 (Domains)" and "↳ Send to Section 3 (Salt)".

### 2. 🌐 Google Worldwide Domain Multiplier (Section 2)
- Multiplies single tokens across **50 regional Google country code top-level domains (ccTLDs)**:
  USA (`.com`), UK (`.co.uk`), Canada (`.ca`), Germany (`.de`), France (`.fr`), Australia (`.com.au`), Japan (`.co.jp`), Italy (`.it`), Spain (`.es`), Brazil (`.com.br`), India (`.co.in`), Netherlands (`.nl`), Poland (`.pl`), Sweden (`.se`), Switzerland (`.ch`), Austria (`.at`), Belgium (`.be`), Mexico (`.com.mx`), Argentina (`.com.ar`), New Zealand (`.co.nz`), Ireland (`.ie`), Denmark (`.dk`), Norway (`.no`), Finland (`.fi`), Portugal (`.pt`), Singapore (`.com.sg`), Turkey (`.com.tr`), South Africa (`.co.za`), Colombia (`.com.co`), Chile (`.cl`), Egypt (`.com.eg`), UAE (`.ae`), Saudi Arabia (`.com.sa`), Malaysia (`.com.my`), Philippines (`.com.ph`), Thailand (`.com.th`), Vietnam (`.com.vn`), Indonesia (`.co.id`), Taiwan (`.com.tw`), South Korea (`.co.kr`), Greece (`.gr`), Czech Republic (`.cz`), Romania (`.ro`), Hungary (`.hu`), Ukraine (`.com.ua`), Pakistan (`.com.pk`), Bangladesh (`.com.bd`), Nigeria (`.com.ng`), Peru (`.com.pe`), Israel (`.co.il`).
- Interactive quantity pills (`5`, `10`, `25`, `50`) & custom quantity input.
- Copy All & Download `.txt` export functionality.

### 3. 🛡️ Query Parameter Salt Multiplier (Section 3)
- Rotates across 10 query keys: `['v', 's', 'sub', 'trk', 'm', 'tag', 'ref', 'uid', 'c', 'rnd']`.
- Generates 10-character high-entropy alphanumeric salts to prevent spam-filters and URL clustering.
- Interactive quantity pills (`5`, `10`, `25`, `50`) & custom quantity input.
- Copy All & Download `.txt` export functionality.

### 4. 🔒 Facebook Anti-Detect Shield Cloaker (Section 4)
- **Zero Redirect Leak:** Prevents Facebook crawler (`facebookexternalhit`) from following 301/302 redirects to destination/CPA domains (e.g. `auctionr.org`).
- **Disguised Open Graph Presets:**
  - 🔍 **Google Search:** High-trust Google Search title & banner preview.
  - ▶️ **HD Video Stream:** High-CTR streaming video card preview.
  - 📰 **Breaking News:** Verified news article card preview.
- **Instant Human Forwarding:** Real users clicking from Facebook/Instagram/WhatsApp are seamlessly forwarded to the target offer link in milliseconds.
- **One-Click Facebook Debugger Test:** Directly verify any generated link in Facebook Sharing Debugger.

### 5. 🎬 6-Hour Auto-Rotating Live Wallpaper Engine
- Seamlessly loads playlists from `wallpapers.json`.
- Automatically schedules wallpapers in 6-hour time slots.
- Manual refresh button with `sessionStorage` index persistence.
- High-performance HTML5 video background with smooth opacity fading.

---

## 💻 Local Testing & Usage (XAMPP)

1. Make sure Apache is running in XAMPP.
2. Access the project in your browser:
   `http://localhost/link%20shortner/`
   or
   `http://localhost/link%20shortner/index.html`

---

## 🌐 Deploy to GitHub Pages (Under 1 Minute)

1. Create a repository on GitHub (e.g. `link-studio`).
2. Make it **Public**.
3. Push or upload these files to the root of the repository:
   - `index.html`
   - `converter.html`
   - `wallpapers.json`
   - `README.md`
4. In GitHub repository settings:
   - Go to **Settings** → **Pages**
   - Source: **Deploy from a branch** → Branch: `main` / `root`
   - Click **Save**.
