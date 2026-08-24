'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Restaurant,
  Category,
  Neighborhood,
  ALL_CATEGORIES,
  ALL_NEIGHBORHOODS,
  ALL_PRICE_LEVELS,
} from '@/types';
import { INITIAL_RESTAURANTS } from '@/data/restaurants';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc, orderBy, query } from 'firebase/firestore';
import {
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  Download,
  Copy,
  Plus,
  RefreshCw,
  Sparkles,
  MapPin,
  Check,
  AlertCircle,
  Database,
  Inbox,
  Code,
  Lock,
  Shield,
  Key,
  LogOut,
  ArrowLeft,
  X,
} from 'lucide-react';

interface FirestoreSubmission {
  id: string;
  name: string;
  googleMapsUrl: string;
  whyRecommend: string;
  submittedBy: string;
  neighborhood?: string;
  lat?: number;
  lng?: number;
  status?: string;
  createdAt?: any;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [activeTab, setActiveTab] = useState<'restaurants' | 'submissions' | 'export'>('restaurants');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All');

  // Edit spot modal
  const [editingSpot, setEditingSpot] = useState<Restaurant | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Submissions state
  const [submissions, setSubmissions] = useState<FirestoreSubmission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  // Check authentication session & overrides
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('blr_admin_authenticated') === 'true';
      setIsAuthenticated(isAuth);

      try {
        const savedOverrides = localStorage.getItem('blr_custom_overrides');
        if (savedOverrides) {
          const parsed = JSON.parse(savedOverrides);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRestaurants(parsed);
          }
        }
      } catch (e) {}
    }
  }, []);

  // Fetch Firestore submissions when submissions tab is active
  useEffect(() => {
    if (isAuthenticated && activeTab === 'submissions') {
      fetchSubmissions();
    }
  }, [isAuthenticated, activeTab]);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      // Calculate SHA-256 hash of input
      const msgBuffer = new TextEncoder().encode(passcode.trim());
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

      // Valid SHA-256 hashes: 'Blr@Culinary#2026!' and 'blr2026'
      const validHashes = [
        'a81f9d03d6ccd36bc440ac0134c37276a45cdb197fca74d0610c398c5375857c', // Blr@Culinary#2026!
        'fc1ab8861507f2b99b43b51892adc7fd8a08947d0c92c184acd24021e4f07501', // blr2026
      ];

      const customEnvPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

      if (
        validHashes.includes(hashHex) ||
        passcode.trim() === 'Blr@Culinary#2026!' ||
        passcode.trim() === 'blr2026' ||
        (customEnvPass && passcode.trim() === customEnvPass)
      ) {
        sessionStorage.setItem('blr_admin_authenticated', 'true');
        setIsAuthenticated(true);
        setPasscode('');
      } else {
        setAuthError('Access Denied. Incorrect admin master password.');
      }
    } catch (err) {
      setAuthError('Authentication verification failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('blr_admin_authenticated');
    setIsAuthenticated(false);
  };

  const fetchSubmissions = async () => {
    setLoadingSubmissions(true);
    setSubmissionError('');
    try {
      const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const items: FirestoreSubmission[] = [];
      snapshot.forEach((d) => {
        items.push({ id: d.id, ...(d.data() as any) });
      });
      setSubmissions(items);
    } catch (err: any) {
      console.warn('Firestore fetch error:', err);
      setSubmissionError('Could not load Firestore submissions. Check database permissions.');
    } finally {
      setLoadingSubmissions(false);
    }
  };

  // Filtered restaurants
  const filteredSpots = restaurants.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesHood = selectedNeighborhood === 'All' || r.neighborhood === selectedNeighborhood;
    return matchesSearch && matchesHood;
  });

  // Save changes to a spot
  const handleSaveSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSpot) return;

    const updatedList = restaurants.map((r) => (r.id === editingSpot.id ? editingSpot : r));
    setRestaurants(updatedList);

    try {
      localStorage.setItem('blr_custom_overrides', JSON.stringify(updatedList));
    } catch (err) {}

    setSaveSuccessMsg(`Updated ${editingSpot.name} successfully!`);
    setTimeout(() => setSaveSuccessMsg(''), 2500);
    setEditingSpot(null);
  };

  // Delete a spot
  const handleDeleteSpot = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const updatedList = restaurants.filter((r) => r.id !== id);
      setRestaurants(updatedList);
      try {
        localStorage.setItem('blr_custom_overrides', JSON.stringify(updatedList));
      } catch (err) {}
    }
  };

  // Approve a submission into the main dataset
  const handleApproveSubmission = async (sub: FirestoreSubmission) => {
    const newId = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36);
    const approvedSpot: Restaurant = {
      id: newId,
      name: sub.name,
      slug: newId,
      tagline: sub.whyRecommend.slice(0, 80),
      description: sub.whyRecommend,
      category: 'Iconic Heritage',
      neighborhood: (sub.neighborhood as any) || 'Indiranagar',
      address: `${sub.neighborhood || 'Indiranagar'}, Bengaluru`,
      lat: sub.lat || 12.9716,
      lng: sub.lng || 77.5946,
      priceLevel: '₹₹',
      priceForTwo: '₹600',
      mustTry: [sub.whyRecommend.split('.')[0].slice(0, 45) || 'Signature Item'],
      vibeTags: ['Pocket Friendly'],
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      googleMapsUrl: sub.googleMapsUrl,
      timings: 'Open Daily',
      curatorNote: sub.whyRecommend,
      submittedBy: sub.submittedBy || 'Community Foodie',
      submittedAt: new Date().toISOString(),
      verified: true,
    };

    const updated = [approvedSpot, ...restaurants];
    setRestaurants(updated);

    try {
      localStorage.setItem('blr_custom_overrides', JSON.stringify(updated));
      await updateDoc(doc(db, 'submissions', sub.id), { status: 'approved' });
      setSubmissions((prev) =>
        prev.map((item) => (item.id === sub.id ? { ...item, status: 'approved' } : item))
      );
      setSaveSuccessMsg(`Approved "${sub.name}" into curated map!`);
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    } catch (err) {
      console.warn('Approval save notice:', err);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (confirm('Delete this submission permanently?')) {
      try {
        await deleteDoc(doc(db, 'submissions', id));
        setSubmissions((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        alert('Failed to delete from Firestore');
      }
    }
  };

  const exportCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(
    restaurants,
    null,
    2
  )};\n`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(exportCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(restaurants, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bangalore-restaurants-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 font-sans">
      {!isAuthenticated ? (
        /* ================= AUTHENTICATION CHALLENGE SCREEN ================= */
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-500 mb-4 shadow-lg shadow-orange-500/5">
                <Shield className="h-8 w-8" />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white">Curator Vault</h1>
              <p className="mt-2 text-xs text-zinc-400 max-w-xs leading-relaxed">
                Authorized Personnel Only. Enter the master password to access database management and review queues.
              </p>
            </div>

            <form onSubmit={handleAuthenticate} className="mt-8 space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Master Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="password"
                    required
                    autoFocus
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 transition-colors focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400 animate-in fade-in">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href="/"
                  className="w-1/2 rounded-xl border border-zinc-800 bg-zinc-950 py-3 text-center text-xs font-semibold text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  ← Back to Map
                </Link>
                <button
                  type="submit"
                  disabled={authLoading || !passcode.trim()}
                  className="w-1/2 flex items-center justify-center gap-1.5 rounded-xl bg-orange-600 py-3 text-xs font-semibold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-500 transition-all disabled:opacity-50 active:scale-95"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>{authLoading ? 'Verifying…' : 'Unlock Vault'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* ================= FULL AUTHENTICATED ADMIN PORTAL ================= */
        <div className="flex flex-col min-h-screen">
          {/* Top Header */}
          <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/95 px-6 py-4 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title="View Public Map"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-bold tracking-tight text-white">BLR EATS // Data Studio</h1>
                    <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">
                      Authenticated
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">Master database curation & live submissions review</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="hidden sm:flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>View Public Site</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Lock Vault</span>
                </button>
              </div>
            </div>
          </header>

          {/* Subheader Navigation */}
          <div className="border-b border-zinc-800 bg-zinc-900/50 px-6 py-3">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('restaurants')}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    activeTab === 'restaurants'
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  <Database className="h-4 w-4" />
                  <span>Curated Spots ({restaurants.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    activeTab === 'submissions'
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  <Inbox className="h-4 w-4" />
                  <span>Submissions Queue ({submissions.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('export')}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    activeTab === 'export'
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  <Code className="h-4 w-4" />
                  <span>Export Code</span>
                </button>
              </div>

              {saveSuccessMsg && (
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-medium animate-in fade-in">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <main className="mx-auto flex-1 w-full max-w-7xl p-6">
            {/* ================= TAB 1: CURATED RESTAURANTS ================= */}
            {activeTab === 'restaurants' && (
              <div className="flex flex-col gap-4">
                {/* Search & Filter Bar */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                  <div className="relative flex-1 min-w-0 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search spots by name, neighborhood, or address…"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedNeighborhood}
                      onChange={(e) => setSelectedNeighborhood(e.target.value)}
                      className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-300 focus:outline-none"
                    >
                      <option value="All">All Neighborhoods ({restaurants.length})</option>
                      {ALL_NEIGHBORHOODS.map((hood) => (
                        <option key={hood} value={hood}>
                          {hood}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => {
                        const newSpot: Restaurant = {
                          id: 'new-spot-' + Date.now().toString(36),
                          name: 'New Spot',
                          slug: 'new-spot-' + Date.now().toString(36),
                          tagline: 'Tagline description',
                          description: 'Full curated backstory and reason to visit.',
                          category: 'Iconic Heritage',
                          neighborhood: 'Indiranagar',
                          address: 'Indiranagar, Bengaluru',
                          lat: 12.9716,
                          lng: 77.5946,
                          priceLevel: '₹₹',
                          priceForTwo: '₹600',
                          mustTry: ['Signature Dish'],
                          vibeTags: ['Pocket Friendly'],
                          imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
                          googleMapsUrl: 'https://www.google.com/maps',
                          timings: 'Open Daily',
                          curatorNote: 'Insider tip.',
                          submittedBy: 'Curator',
                          submittedAt: new Date().toISOString(),
                          verified: true,
                        };
                        setEditingSpot(newSpot);
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-orange-500 transition-colors"
                    >
                      <Plus className="h-4 w-4 stroke-[2.5]" />
                      <span>Add Spot</span>
                    </button>
                  </div>
                </div>

                {/* Table of Restaurants */}
                <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/60">
                  <table className="w-full text-left text-xs text-zinc-300">
                    <thead className="border-b border-zinc-800 bg-zinc-900 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      <tr>
                        <th className="px-4 py-3">Spot</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Neighborhood</th>
                        <th className="px-4 py-3">Coordinates</th>
                        <th className="px-4 py-3">Google Maps Link</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {filteredSpots.map((spot) => (
                        <tr key={spot.id} className="hover:bg-zinc-800/40 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={spot.imageUrl}
                                alt={spot.name}
                                className="h-8 w-8 rounded-lg object-cover bg-zinc-800 shrink-0"
                              />
                              <div>
                                <p className="font-bold text-white text-xs">{spot.name}</p>
                                <p className="text-[10.5px] text-zinc-400 truncate max-w-xs">{spot.address}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[10px] font-medium text-zinc-300">
                              {spot.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-zinc-300">{spot.neighborhood}</td>
                          <td className="px-4 py-3 font-mono text-[10.5px] text-zinc-400">
                            {spot.lat.toFixed(5)}, {spot.lng.toFixed(5)}
                          </td>
                          <td className="px-4 py-3">
                            <a
                              href={spot.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-orange-400 hover:text-orange-300 text-[11px]"
                            >
                              <span>Open Maps</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setEditingSpot(spot)}
                                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                                title="Edit Spot"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteSpot(spot.id, spot.name)}
                                className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                title="Delete Spot"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ================= TAB 2: FIRESTORE SUBMISSIONS ================= */}
            {activeTab === 'submissions' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                  <div>
                    <h2 className="text-sm font-bold text-white">Live Community Submissions Queue</h2>
                    <p className="text-xs text-zinc-400">Real-time submissions stored in Firebase Firestore.</p>
                  </div>
                  <button
                    onClick={fetchSubmissions}
                    className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${loadingSubmissions ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>

                {submissionError && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                    {submissionError}
                  </div>
                )}

                {submissions.length === 0 && !loadingSubmissions ? (
                  <div className="flex flex-col items-center justify-center p-12 bg-zinc-900 rounded-2xl border border-zinc-800 text-center">
                    <Inbox className="h-10 w-10 text-zinc-600 mb-2" />
                    <p className="text-sm font-bold text-white">No submissions currently pending</p>
                    <p className="text-xs text-zinc-500 mt-1">Community submissions will appear here live.</p>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-white text-sm">{sub.name}</h3>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider ${
                                sub.status === 'approved'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                              }`}
                            >
                              {sub.status || 'Pending'}
                            </span>
                          </div>

                          <p className="mt-2 text-xs text-zinc-300 leading-relaxed italic">
                            "{sub.whyRecommend}"
                          </p>

                          <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
                            <span>By: {sub.submittedBy || 'Foodie'}</span>
                            <a
                              href={sub.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-orange-400 hover:text-orange-300"
                            >
                              <span>Maps Link</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>

                          {sub.status !== 'approved' && (
                            <button
                              onClick={() => handleApproveSubmission(sub)}
                              className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Approve to Map</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ================= TAB 3: EXPORT CODE ================= */}
            {activeTab === 'export' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                  <div>
                    <h2 className="text-sm font-bold text-white">Export Curated Dataset</h2>
                    <p className="text-xs text-zinc-400">Copy the full TypeScript dataset or download raw JSON.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md hover:bg-orange-500 transition-colors"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>{copiedCode ? 'Copied!' : 'Copy TypeScript Code'}</span>
                    </button>

                    <button
                      onClick={handleDownloadJSON}
                      className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download JSON</span>
                    </button>
                  </div>
                </div>

                <pre className="flex-1 max-h-[70vh] overflow-auto rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 font-mono text-[11px] text-zinc-300">
                  {exportCode}
                </pre>
              </div>
            )}
          </main>

          {/* ================= EDIT SPOT MODAL ================= */}
          {editingSpot && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-xs">
              <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 font-bold">
                      <Edit2 className="h-4 w-4" />
                    </div>
                    <h3 className="text-base font-bold text-white">Edit {editingSpot.name}</h3>
                  </div>
                  <button
                    onClick={() => setEditingSpot(null)}
                    className="p-1 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveSpot} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-zinc-400 uppercase tracking-wider mb-1">Name</label>
                      <input
                        type="text"
                        required
                        value={editingSpot.name}
                        onChange={(e) => setEditingSpot({ ...editingSpot, name: e.target.value })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-zinc-400 uppercase tracking-wider mb-1">Neighborhood</label>
                      <select
                        value={editingSpot.neighborhood}
                        onChange={(e) => setEditingSpot({ ...editingSpot, neighborhood: e.target.value as any })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white focus:border-orange-500 focus:outline-none font-semibold"
                      >
                        {ALL_NEIGHBORHOODS.map((hood) => (
                          <option key={hood} value={hood}>
                            {hood}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-zinc-400 uppercase tracking-wider mb-1">Category</label>
                      <select
                        value={editingSpot.category}
                        onChange={(e) => setEditingSpot({ ...editingSpot, category: e.target.value as any })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white focus:border-orange-500 focus:outline-none font-semibold"
                      >
                        {ALL_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-zinc-400 uppercase tracking-wider mb-1">Price Level</label>
                      <select
                        value={editingSpot.priceLevel}
                        onChange={(e) => setEditingSpot({ ...editingSpot, priceLevel: e.target.value as any })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                      >
                        {ALL_PRICE_LEVELS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-400 uppercase tracking-wider mb-1">Address</label>
                    <input
                      type="text"
                      required
                      value={editingSpot.address}
                      onChange={(e) => setEditingSpot({ ...editingSpot, address: e.target.value })}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-bold text-zinc-400 uppercase tracking-wider">
                        Google Maps URL
                      </label>
                      <a
                        href={editingSpot.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
                      >
                        <span>🔗 Test Link</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <input
                      type="text"
                      required
                      value={editingSpot.googleMapsUrl}
                      onChange={(e) => setEditingSpot({ ...editingSpot, googleMapsUrl: e.target.value })}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white focus:border-orange-500 focus:outline-none font-mono text-[11px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-zinc-400 uppercase tracking-wider mb-1">Latitude</label>
                      <input
                        type="number"
                        step="any"
                        required
                        value={editingSpot.lat}
                        onChange={(e) => setEditingSpot({ ...editingSpot, lat: parseFloat(e.target.value) || 0 })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white focus:border-orange-500 focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-zinc-400 uppercase tracking-wider mb-1">Longitude</label>
                      <input
                        type="number"
                        step="any"
                        required
                        value={editingSpot.lng}
                        onChange={(e) => setEditingSpot({ ...editingSpot, lng: parseFloat(e.target.value) || 0 })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white focus:border-orange-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Must-Try Items (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editingSpot.mustTry.join(', ')}
                      onChange={(e) =>
                        setEditingSpot({
                          ...editingSpot,
                          mustTry: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-400 uppercase tracking-wider mb-1">Curator Insider Tip</label>
                    <textarea
                      rows={2}
                      value={editingSpot.curatorNote || ''}
                      onChange={(e) => setEditingSpot({ ...editingSpot, curatorNote: e.target.value })}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-white focus:border-orange-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingSpot(null)}
                      className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-5 py-2 text-xs font-semibold text-white hover:bg-orange-500 shadow-md shadow-orange-500/20 active:scale-95"
                    >
                      <Check className="h-4 w-4 stroke-[2.5]" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
