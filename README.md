# 🥘 BLR // EATS — Curated Bangalore Food & Spatial Guide

An interactive geospatial guide to Bengaluru's most iconic heritage breakfast institutions, craft microbreweries, specialty third-wave coffee bars, coastal seafood kitchens, and progressive cocktail lounges.

Live URL: **[https://blreats.com](https://blreats.com)** *(and [https://blr-food-map-2026.web.app](https://blr-food-map-2026.web.app))*

---

## ✨ Features

- 🗺️ **Spatial Map Canvas**: Fullscreen Leaflet + CartoDB Voyager raster tiles with category-colored glowing pins, smooth camera panning, and live viewport centering.
- 📍 **Multi-Branch Spatial Isolation**: When filtering by neighborhood (e.g. *Bellandur & Ecoworld* or *Whitefield*), only physical outlets matching the target district are rendered on the map.
- ⚡ **Dual View Modes**: Seamless toggle between full-screen interactive Map View and responsive Grid View.
- 🔎 **Deep Search & Multi-Faceted Filters**:
  - Instant search across restaurant names, must-try dishes, cuisines, and neighborhoods.
  - **16 Curated Neighborhoods**: Indiranagar, Koramangala, Malleshwaram, Basavanagudi, Church Street & MG Road, Lavelle Road, HSR Layout, JP Nagar, Jayanagar, CBD & Central, Bellandur & Ecoworld, Sarjapur Road, Kalyan Nagar & Kammanahalli, Whitefield, Sadashivanagar & Palace Grounds, Bel Road & North BLR.
  - **9 Core Cuisines & Categories**: Iconic Heritage, Specialty Coffee & Cafe, Microbrewery, Pan-Asian & Japanese, Bakeries & Desserts, Cocktails & Rooftops, Regional & Coastal, Modern Indian & Dining, Street Food & Chaat.
  - **Price Tiers**:
    - `₹`: Pocket-Friendly (< ₹400 for two)
    - `₹₹`: Casual Dining (₹400 – ₹1,000 for two)
    - `₹₹₹`: Premium Craft & Specialty (₹1,000 – ₹2,500 for two)
    - `₹₹₹₹`: Fine Dining & Luxury (₹2,500+ for two)
- 🤝 **Community Suggestion Pipeline**:
  - Community members can recommend culinary gems with signature dishes, neighborhood tags, and Google Maps links.
  - Submissions are securely validated and saved as `pending` moderation records in Firestore for editorial review.
- 🛡️ **Curator Vault (`/admin`)**:
  - Protected by Firebase Google Authentication with verified email whitelist.
  - Curators can review pending submissions, audit rooftop coordinates, and export updated TypeScript datasets.
- 📱 **Restaurant Dossier Drawer**:
  - Self-hosted high-resolution photography, curator notes, must-order signature dish badges, Google Maps directions links, and synchronized physical outlet switchers.

---

## 🏛️ Data Schema & Provenance

Every restaurant and branch record follows a verified spatial schema:

```typescript
export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: Category;
  neighborhood: Neighborhood;
  address: string;
  lat: number;
  lng: number;
  priceLevel: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  priceForTwo: string;
  mustTry: string[];
  vibeTags: VibeTag[];
  imageUrl: string;
  googleMapsUrl: string;
  placeId?: string;
  operationalStatus?: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';
  lastVerifiedAt?: string;
  verificationSource?: 'google_places_api_v1' | 'manual_editorial';
  confidence?: 'verified_rooftop' | 'approximate';
  timings: string;
  curatorNote?: string;
  isVegetarian?: boolean;
  verified: boolean;
  branches?: Branch[];
}
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Static Export `output: 'export'`), React 19, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons, Canvas Confetti
- **Mapping & Geospatial**: Leaflet, React-Leaflet, CartoDB Voyager Tiles
- **Backend & Storage**: Firebase Firestore (Security Rules v2), Firebase Auth (Google Sign-In), Firebase Hosting
- **Image Pipeline**: Self-hosted high-resolution WebP/JPEG assets processed with `sharp`

---

## 🚀 Development & Verification

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run local development server:
   ```bash
   npm run dev
   ```

3. Type-check & lint:
   ```bash
   npx tsc --noEmit
   npm run lint
   ```

4. Build production static export:
   ```bash
   npm run build
   ```

---

## 🚢 CI/CD Deployment

Automated builds and deployments to Firebase Hosting trigger on pushes to `main` via GitHub Actions (`.github/workflows/deploy.yml`).

---

## 📝 License

MIT
