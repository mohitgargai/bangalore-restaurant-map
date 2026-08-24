'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Restaurant, Category, Neighborhood, ALL_CATEGORIES, ALL_NEIGHBORHOODS, ALL_PRICE_LEVELS } from '@/types';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc, orderBy, query } from 'firebase/firestore';
import {
  X,
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
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  restaurants: Restaurant[];
  onUpdateRestaurants: (updated: Restaurant[]) => void;
}

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

export default function AdminDashboard({
  isOpen,
  onClose,
  restaurants,
  onUpdateRestaurants,
}: AdminDashboardProps) {
  // Authentication Gate State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

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

  // Check authentication on open
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('blr_admin_authenticated') === 'true';
      setIsAuthenticated(isAuth);
      setAuthError('');
      setPasscode('');
    }
  }, [isOpen]);

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

      // Valid hashes: 'blr2026' and 'blr2026!'
      const validHashes = [
        'fc1ab8861507f2b99b43b51892adc7fd8a08947d0c92c184acd24021e4f07501', // blr2026
        'a1ba6b286819b25b07fb094bc4624d61e695c1e12adf68287c97ca3c988ceb2f', // blr2026!
      ];

      const customEnvPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

      if (
        validHashes.includes(hashHex) ||
        passcode.trim() === 'blr2026' ||
        passcode.trim() === 'blr2026!' ||
        (customEnvPass && passcode.trim() === customEnvPass)
      ) {
        sessionStorage.setItem('blr_admin_authenticated', 'true');
        setIsAuthenticated(true);
        setPasscode('');
      } else {
        setAuthError('Access Denied. Incorrect admin master passcode.');
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
    onClose();
  };

  // Fetch Firestore submissions when submissions tab is clicked
  useEffect(() => {
    if (isOpen && activeTab === 'submissions') {
      fetchSubmissions();
    }
  }, [isOpen, activeTab]);

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
      setSubmissionError('Could not load Firestore submissions. Check network or database permissions.');
    } finally {
      setLoadingSubmissions(false);
    }
  };

  if (!isOpen) return null;

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
    onUpdateRestaurants(updatedList);

    // Persist in localStorage
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
      onUpdateRestaurants(updatedList);
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
      neighborhood: (sub.neighborhood as Neighborhood) || 'Indiranagar',
      address: `${sub.neighborhood || 'Bengaluru'}, Bengaluru`,
      lat: sub.lat || 12.9716,
      lng: sub.lng || 77.5946,
      priceLevel: '₹₹',
      priceForTwo: '₹600',
      mustTry: [sub.whyRecommend.split('.')[0].slice(0, 45) || 'Signature Special'],
      vibeTags: ['Pocket Friendly'],
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      googleMapsUrl: sub.googleMapsUrl,
      timings: 'Open Daily',
      curatorNote: sub.whyRecommend,
      submittedBy: sub.submittedBy || 'Community Foodie',
      submittedAt: new Date().toISOString(),
      verified: true,
    };

    const updatedList = [approvedSpot, ...restaurants];
    onUpdateRestaurants(updatedList);

    try {
      localStorage.setItem('blr_custom_overrides', JSON.stringify(updatedList));
      // Mark as approved in Firestore
      await updateDoc(doc(db, 'submissions', sub.id), { status: 'approved' });
      setSubmissions((prev) => prev.map((item) => (item.id === sub.id ? { ...item, status: 'approved' } : item)));
    } catch (err) {}

    alert(`"${sub.name}" approved and added to live map!`);
  };

  // Delete a submission from Firestore
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

  // Generate clean TypeScript code for restaurants.ts
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
    <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4">
      {!isAuthenticated ? (
        /* ================= AUTHENTICATION CHALLENGE MODAL ================= */
        <div className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-500 mb-4 shadow-lg shadow-orange-500/5">
              <Shield className="h-7 w-7" />
            </div>

            <h2 className="text-xl font-bold tracking-tight text-white">Curator Vault</h2>
            <p className="mt-1.5 text-xs text-zinc-400 max-w-xs">
              Enter the master passcode to access dataset curation, live submissions queue, and data studio.
            </p>
          </div>

          <form onSubmit={handleAuthenticate} className="mt-6 space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Master Passcode
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
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 transition-colors focus:border-orange-500 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-2.5 text-xs text-red-400 animate-in fade-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="pt-2 flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 text-xs font-semibold text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={authLoading || !passcode.trim()}
                className="w-1/2 flex items-center justify-center gap-1.5 rounded-xl bg-orange-600 py-2.5 text-xs font-semibold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-500 transition-all disabled:opacity-50 active:scale-95"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>{authLoading ? 'Verifying…' : 'Unlock Studio'}</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* ================= FULL AUTHENTICATED ADMIN DASHBOARD ================= */
        <>
          <div className="relative flex h-[94vh] w-full max-w-6xl flex-col rounded-3xl border border-zinc-200 bg-white shadow-2xl overflow-hidden">
            {/* Top Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-950 px-6 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-white font-mono font-bold text-sm">
                ⚙️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold tracking-tight">Admin & Data Studio</h2>
                  <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">
                    Authenticated
                  </span>
                </div>
                <p className="text-xs text-zinc-400">Verify Google Maps links, edit coordinates & manage community submissions.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                title="Lock Vault & Sign Out"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Lock</span>
              </button>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-6 py-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'restaurants'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:bg-zinc-200/70'
              }`}
            >
              <Database className="h-3.5 w-3.5" />
              <span>Curated Spots ({restaurants.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'submissions'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:bg-zinc-200/70'
              }`}
            >
              <Inbox className="h-3.5 w-3.5" />
              <span>Community Submissions {submissions.length > 0 && `(${submissions.length})`}</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'export'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:bg-zinc-200/70'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>Export Code / JSON</span>
            </button>
          </div>

          {saveSuccessMsg && (
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 animate-fade-in">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}
        </div>

        {/* Tab 1: Manage Curated Restaurants */}
        {activeTab === 'restaurants' && (
          <div className="flex flex-1 flex-col overflow-hidden p-4 sm:p-6">
            {/* Search & Filters */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-1 items-center gap-2 min-w-[240px]">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by spot name, neighborhood, or address..."
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-1.5 pl-8 pr-3 text-xs text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <select
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Neighborhoods</option>
                  {ALL_NEIGHBORHOODS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-zinc-500 font-mono">
                Showing {filteredSpots.length} of {restaurants.length} spots
              </div>
            </div>

            {/* Table of Restaurants */}
            <div className="flex-1 overflow-y-auto rounded-2xl border border-zinc-200 bg-zinc-50/50">
              <table className="w-full text-left text-xs text-zinc-600">
                <thead className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-100 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-4 py-3">Place Name</th>
                    <th className="px-4 py-3">Neighborhood</th>
                    <th className="px-4 py-3">Coordinates (Lat, Lng)</th>
                    <th className="px-4 py-3">Google Maps Link</th>
                    <th className="px-4 py-3">Must Try</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white">
                  {filteredSpots.map((r) => (
                    <tr key={r.id} className="hover:bg-zinc-50/80 transition-colors">
                      {/* Name */}
                      <td className="px-4 py-3 font-bold text-zinc-900">
                        <div className="flex items-center gap-2">
                          <span>{r.name}</span>
                          {r.isVegetarian && <span className="text-[10px] text-emerald-600" title="Pure Veg">🌱</span>}
                        </div>
                      </td>

                      {/* Neighborhood */}
                      <td className="px-4 py-3 font-medium text-zinc-700">
                        <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px]">
                          {r.neighborhood}
                        </span>
                      </td>

                      {/* Coordinates */}
                      <td className="px-4 py-3 font-mono text-[11px] text-zinc-600">
                        {r.lat.toFixed(5)}, {r.lng.toFixed(5)}
                      </td>

                      {/* Google Maps Link */}
                      <td className="px-4 py-3">
                        <a
                          href={r.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-semibold hover:underline max-w-[200px] truncate"
                          title={r.googleMapsUrl}
                        >
                          <span className="truncate">{r.googleMapsUrl.replace('https://www.google.com/maps/search/?api=1&query=', 'maps: ')}</span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      </td>

                      {/* Must Try */}
                      <td className="px-4 py-3 text-zinc-700 max-w-[180px] truncate">
                        {r.mustTry.join(', ')}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingSpot({ ...r })}
                            className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 transition-colors shadow-2xs"
                            title="Edit Spot"
                          >
                            <Edit2 className="h-3 w-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteSpot(r.id, r.name)}
                            className="flex items-center justify-center rounded-lg p-1 text-zinc-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                            title="Delete"
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

        {/* Tab 2: Firestore Community Submissions */}
        {activeTab === 'submissions' && (
          <div className="flex flex-1 flex-col overflow-y-auto p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-900">Incoming Community Recommendations</h3>
                <p className="text-xs text-zinc-500">Live submissions saved in Cloud Firestore from website visitors.</p>
              </div>
              <button
                onClick={fetchSubmissions}
                disabled={loadingSubmissions}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 shadow-2xs"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loadingSubmissions ? 'animate-spin' : ''}`} />
                <span>Refresh Submissions</span>
              </button>
            </div>

            {submissionError && (
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 mb-4 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
                <span>{submissionError}</span>
              </div>
            )}

            {loadingSubmissions ? (
              <div className="flex flex-1 items-center justify-center text-xs text-zinc-400 font-mono">
                Loading Firestore submissions…
              </div>
            ) : submissions.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 mb-2">
                  <Inbox className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold text-zinc-800">No submissions yet</p>
                <p className="text-xs text-zinc-500 max-w-sm mt-0.5">
                  When visitors submit food recommendations on the live site, they will appear here for review.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {submissions.map((sub) => {
                  const isApproved = sub.status === 'approved';
                  return (
                    <div
                      key={sub.id}
                      className={`rounded-2xl border p-4 transition-all ${
                        isApproved
                          ? 'border-emerald-200 bg-emerald-50/40'
                          : 'border-zinc-200 bg-white shadow-xs hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-zinc-900 text-sm">{sub.name}</h4>
                            {isApproved && (
                              <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.2 text-[10px] font-bold">
                                Approved
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            📍 {sub.neighborhood || 'Bengaluru'} • By: <b className="text-zinc-700">{sub.submittedBy || 'Foodie'}</b>
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          {!isApproved && (
                            <button
                              onClick={() => handleApproveSubmission(sub)}
                              className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 shadow-xs active:scale-95"
                              title="Approve and Pin to Map"
                            >
                              <Check className="h-3 w-3 stroke-[2.5]" />
                              <span>Approve</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Why Recommend */}
                      <div className="mt-2.5 rounded-xl bg-zinc-50 border border-zinc-100 p-2.5 text-xs text-zinc-700">
                        <span className="font-semibold text-zinc-900 block mb-0.5">Recommendation Note:</span>
                        <p className="italic">&ldquo;{sub.whyRecommend}&rdquo;</p>
                      </div>

                      {/* Maps link */}
                      <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-zinc-100">
                        <a
                          href={sub.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-orange-600 font-semibold hover:underline"
                        >
                          <span>Test Google Maps Link</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Export Code / JSON */}
        {activeTab === 'export' && (
          <div className="flex flex-1 flex-col overflow-hidden p-4 sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-900">Export Master Dataset</h3>
                <p className="text-xs text-zinc-500">Copy TypeScript code to sync into <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">src/data/restaurants.ts</code> or download JSON backup.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 shadow-xs"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCode ? 'Copied TS Code!' : 'Copy TypeScript'}</span>
                </button>

                <button
                  onClick={handleDownloadJSON}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 shadow-xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download JSON</span>
                </button>
              </div>
            </div>

            <pre className="flex-1 overflow-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[11px] text-zinc-300">
              {exportCode}
            </pre>
          </div>
        )}
      </div>

      {/* Spot Edit Modal */}
      {editingSpot && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/70 p-3">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-600 font-bold">
                  <Edit2 className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-zinc-900">Edit {editingSpot.name}</h3>
              </div>
              <button
                onClick={() => setEditingSpot(null)}
                className="p-1 rounded-full text-zinc-400 hover:bg-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSpot} className="space-y-4 text-xs">
              {/* Name & Neighborhood */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">Place Name</label>
                  <input
                    type="text"
                    required
                    value={editingSpot.name}
                    onChange={(e) => setEditingSpot({ ...editingSpot, name: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">Neighborhood</label>
                  <select
                    value={editingSpot.neighborhood}
                    onChange={(e) => setEditingSpot({ ...editingSpot, neighborhood: e.target.value as Neighborhood })}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none cursor-pointer"
                  >
                    {ALL_NEIGHBORHOODS.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Google Maps URL with Live Test */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-zinc-700 uppercase tracking-wider">
                    Google Maps URL
                  </label>
                  <a
                    href={editingSpot.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1"
                  >
                    <span>🔗 Test on Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <input
                  type="text"
                  required
                  value={editingSpot.googleMapsUrl}
                  onChange={(e) => setEditingSpot({ ...editingSpot, googleMapsUrl: e.target.value })}
                  placeholder="https://maps.app.goo.gl/... or https://www.google.com/maps/search/?api=1&query=..."
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none font-mono text-[11px]"
                />
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={editingSpot.lat}
                    onChange={(e) => setEditingSpot({ ...editingSpot, lat: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={editingSpot.lng}
                    onChange={(e) => setEditingSpot({ ...editingSpot, lng: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={editingSpot.category}
                    onChange={(e) => setEditingSpot({ ...editingSpot, category: e.target.value as Category })}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none cursor-pointer"
                  >
                    {ALL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">Price Tier</label>
                  <select
                    value={editingSpot.priceLevel}
                    onChange={(e) => setEditingSpot({ ...editingSpot, priceLevel: e.target.value as any })}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none cursor-pointer"
                  >
                    {ALL_PRICE_LEVELS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">Price For Two</label>
                  <input
                    type="text"
                    value={editingSpot.priceForTwo}
                    onChange={(e) => setEditingSpot({ ...editingSpot, priceForTwo: e.target.value })}
                    placeholder="e.g. ₹400"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Must Try Dishes */}
              <div>
                <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Must-Order Dishes (Comma Separated)
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
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Exact Address */}
              <div>
                <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">Street Address</label>
                <input
                  type="text"
                  value={editingSpot.address}
                  onChange={(e) => setEditingSpot({ ...editingSpot, address: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Curator Insider Note */}
              <div>
                <label className="block font-bold text-zinc-700 uppercase tracking-wider mb-1">Curator Insider Tip</label>
                <textarea
                  rows={2}
                  value={editingSpot.curatorNote || ''}
                  onChange={(e) => setEditingSpot({ ...editingSpot, curatorNote: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSpot(null)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-5 py-2 text-xs font-semibold text-white hover:bg-orange-700 shadow-md shadow-orange-500/20 active:scale-95"
                >
                  <Check className="h-4 w-4 stroke-[2.5]" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}
