# 🥘 Bangalore Food Map — Curated & Crowd-Sourced Dining Gems

An ultra-clean, interactive geospatial guide to Bengaluru's most iconic breakfast institutions, craft microbreweries, specialty third-wave coffee bars, late-night street food trails, and community-submitted dining spots.

Inspired by the concept of [Bangalore Startup Map](https://www.bangalorestartupmap.com/), redesigned with a modern, elegant, and food-first aesthetic (think Apple Maps / Linear / Airbnb quality).

---

## ✨ Features

- 🗺️ **Interactive Geospatial Map**: Leaflet & CartoDB Positron clean map tiles with glowing category pins, smooth fly-to animations, and rich preview popovers.
- ⚡ **Dual View Modes**: Seamless toggle between full-screen interactive Map View and responsive Magazine Grid View.
- 🔎 **Deep Search & Multi-Faceted Filters**:
  - Instant fuzzy search across restaurant names, must-try dishes, cuisines, and neighborhoods.
  - **Neighborhoods**: Indiranagar, Koramangala, Malleshwaram, Basavanagudi, Church Street / MG Road, Lavelle Road, HSR Layout, Whitefield, JP Nagar, Jayanagar, etc.
  - **Categories**: Iconic Heritage, Microbreweries, Specialty Coffee & Cafes, Pan-Asian & Japanese, Bakeries & Desserts, Cocktails & Rooftops, Regional & Coastal, Modern Indian, Street Food.
  - **Price Tiers**: ₹ (Budget < ₹400), ₹₹ (Casual ₹400–₹1000), ₹₹₹ (Premium ₹1000–₹2200), ₹₹₹₹ (Fine Dine ₹2200+).
  - **Vibe & Features**: Work-Friendly / Wi-Fi, Pet-Friendly, Outdoor/Rooftop, Pure Veg, Craft Beer, Late Night, Live Music.
- 🤝 **Crowd-Sourced Submissions**:
  - Community members can recommend new spots with must-order dishes, price for two, vibe tags, insider tips, and coordinates.
  - Confetti celebration upon recommendation!
  - Community Drops queue to explore user-submitted spots.
- ❤️ **Community Upvotes ("Recommend")**:
  - Optimistic client-side upvoting with localStorage persistence + server API synchronization.
- 📖 **Curated Food Trails & Guides**:
  - *The Great Filter Coffee & Dosa Trail* (CTR, Vidyarthi Bhavan, MTR, Brahmins' Coffee Bar, Veena Stores)
  - *Hop-Heads Guide to Microbreweries* (Toit, Windmills, Arbor, Byg Brewski, Geist)
  - *Third-Wave Coffee & Work Sanctuaries* (Araku, Paper & Pie, Blue Tokai, Third Wave)
  - 1-click "Explore Trail on Map" filter button.
- 📱 **Responsive Restaurant Drawer**:
  - High-res cover image, curated insider tip quote, must-order dish highlights, directions link to Google Maps, and instant share action.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons, Canvas Confetti
- **Geospatial & Maps**: Leaflet, React-Leaflet, CartoDB Positron Tiles
- **State & Storage**: Client optimistic updates + In-memory API routes + localStorage persistence

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/mohitgargai/bangalore-restaurant-map.git
   cd bangalore-restaurant-map
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 📦 Deployment

Deploy easily to Vercel or any Next.js compatible hosting:
```bash
npm run build
```

---

## 📝 License

MIT
