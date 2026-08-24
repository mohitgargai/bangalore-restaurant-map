'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Restaurant,
  Category,
  Neighborhood,
  ALL_CATEGORIES,
  ALL_NEIGHBORHOODS,
} from '@/types';
import { INITIAL_RESTAURANTS } from '@/data/restaurants';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc, orderBy, query } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';
import {
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  Database,
  Inbox,
  Code,
  Shield,
  LogOut,
  ArrowLeft,
  X,
  Loader2,
} from 'lucide-react';

interface FirestoreSubmission {
  id: string;
  name: string;
  category?: Category;
  neighborhood?: Neighborhood;
  googleMapsUrl?: string;
  whyRecommend: string;
  submittedBy?: string;
  status?: string;
  createdAt?: unknown;
}

const ALLOWED_ADMIN_EMAILS = [
  'mohitgarg.ai@gmail.com',
  'mohit@merakal.in',
  'admin@getoden.com',
];

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedOverrides = localStorage.getItem('blr_custom_overrides');
        if (savedOverrides) {
          const parsed = JSON.parse(savedOverrides);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {
        // Ignore parse error
      }
    }
    return INITIAL_RESTAURANTS;
  });

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

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthLoading(false);
      if (user && user.email && ALLOWED_ADMIN_EMAILS.includes(user.email.toLowerCase())) {
        setCurrentUser(user);
        setIsAuthorized(true);
        setAuthError('');
      } else if (user) {
        setCurrentUser(user);
        setIsAuthorized(false);
        setAuthError(`Access Denied: ${user.email} is not on the authorized curator whitelist.`);
      } else {
        setCurrentUser(null);
        setIsAuthorized(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch Firestore submissions when authorized and tab active
  useEffect(() => {
    let isCancelled = false;
    if (isAuthorized && activeTab === 'submissions') {
      const load = async () => {
        setLoadingSubmissions(true);
        setSubmissionError('');
        try {
          const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(q);
          if (!isCancelled) {
            const items: FirestoreSubmission[] = [];
            snapshot.forEach((d) => {
              const data = d.data();
              items.push({
                id: d.id,
                name: data.name || 'Untitled',
                category: data.category,
                neighborhood: data.neighborhood,
                googleMapsUrl: data.googleMapsUrl || '',
                whyRecommend: data.whyRecommend || '',
                submittedBy: data.submittedBy || 'Anonymous',
                status: data.status || 'pending',
                createdAt: data.createdAt,
              });
            });
            setSubmissions(items);
          }
        } catch (err: unknown) {
          if (!isCancelled) {
            console.warn('Firestore fetch error:', err);
            setSubmissionError('Could not load Firestore submissions. Ensure your account is authenticated with curator rights.');
          }
        } finally {
          if (!isCancelled) {
            setLoadingSubmissions(false);
          }
        }
      };
      load();
    }
    return () => {
      isCancelled = true;
    };
  }, [isAuthorized, activeTab]);

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Sign-in failed. Please try again.';
      setAuthError(errorMsg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setIsAuthorized(false);
    } catch {
      // Ignore logout errors
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
    } catch {
      // Ignore storage errors
    }

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
      } catch {
        // Ignore storage errors
      }
    }
  };

  // Delete submission from Firestore
  const handleDeleteSubmission = async (id: string) => {
    if (confirm('Delete this submission from Firestore?')) {
      try {
        await deleteDoc(doc(db, 'submissions', id));
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Delete failed';
        alert(`Failed to delete submission: ${errorMsg}`);
      }
    }
  };

  // Mark submission reviewed
  const handleMarkReviewed = async (id: string) => {
    try {
      await updateDoc(doc(db, 'submissions', id), { status: 'reviewed' });
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: 'reviewed' } : s))
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Update failed';
      alert(`Failed to mark reviewed: ${errorMsg}`);
    }
  };

  // Copy full dataset as TS export
  const handleCopyTypeScript = () => {
    const tsCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(
      restaurants,
      null,
      2
    )};\n`;
    navigator.clipboard.writeText(tsCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 font-sans">
      {!isAuthorized ? (
        /* ================= AUTHENTICATION CHALLENGE SCREEN ================= */
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-500 mb-4 shadow-lg shadow-orange-500/5">
                <Shield className="h-8 w-8" />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white">Curator Vault</h1>
              <p className="mt-2 text-xs text-zinc-400 max-w-xs leading-relaxed">
                Authorized Curators Only. Sign in with your verified Google Account to review community submissions and manage master data.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {authError && (
                <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3.5 text-xs text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {currentUser && !isAuthorized && (
                <div className="text-center text-xs text-zinc-500">
                  Signed in as <span className="text-zinc-300 font-medium">{currentUser.email}</span>
                </div>
              )}

              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={authLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-orange-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-500 transition-all disabled:opacity-50 active:scale-98"
                >
                  {authLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Verifying Credentials…</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      <span>Sign in with Google</span>
                    </>
                  )}
                </button>

                <Link
                  href="/"
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-3 text-center text-xs font-semibold text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  ← Back to Public Map
                </Link>
              </div>
            </div>
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
                      {currentUser?.email}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">Master database curation &amp; verified submissions queue</p>
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
                  <span>Sign Out</span>
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
                      ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400'
                      : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                  }`}
                >
                  <Database className="h-3.5 w-3.5" />
                  <span>Catalog Records ({restaurants.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    activeTab === 'submissions'
                      ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400'
                      : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                  }`}
                >
                  <Inbox className="h-3.5 w-3.5" />
                  <span>Submissions Queue ({submissions.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('export')}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    activeTab === 'export'
                      ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400'
                      : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                  }`}
                >
                  <Code className="h-3.5 w-3.5" />
                  <span>Export TypeScript</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 px-6 py-6">
            <div className="mx-auto max-w-7xl">
              {saveSuccessMsg && (
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* ================= TAB: RESTAURANTS ================= */}
              {activeTab === 'restaurants' && (
                <div>
                  {/* Search & Filter Bar */}
                  <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Search venues, neighborhoods…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <select
                        value={selectedNeighborhood}
                        onChange={(e) => setSelectedNeighborhood(e.target.value)}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300 focus:border-orange-500 focus:outline-none"
                      >
                        <option value="All">All Neighborhoods ({restaurants.length})</option>
                        {ALL_NEIGHBORHOODS.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Restaurants Table */}
                  <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="border-b border-zinc-800 bg-zinc-900 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                          <tr>
                            <th className="px-4 py-3.5">Venue</th>
                            <th className="px-4 py-3.5">Category</th>
                            <th className="px-4 py-3.5">Neighborhood</th>
                            <th className="px-4 py-3.5">Price</th>
                            <th className="px-4 py-3.5">Coords</th>
                            <th className="px-4 py-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60">
                          {filteredSpots.map((r) => (
                            <tr key={r.id} className="hover:bg-zinc-800/30 transition-colors">
                              <td className="px-4 py-3">
                                <div className="font-semibold text-white">{r.name}</div>
                                <div className="text-[11px] text-zinc-500 truncate max-w-xs">{r.address}</div>
                              </td>
                              <td className="px-4 py-3 text-zinc-300">
                                <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px]">
                                  {r.category}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-zinc-300">{r.neighborhood}</td>
                              <td className="px-4 py-3 font-mono text-zinc-400">{r.priceForTwo}</td>
                              <td className="px-4 py-3 font-mono text-[10px] text-zinc-500">
                                {r.lat.toFixed(4)}, {r.lng.toFixed(4)}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => setEditingSpot(r)}
                                    className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-orange-400 transition-colors"
                                    title="Edit Spot"
                                  >
                                    <Edit2 className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSpot(r.id, r.name)}
                                    className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
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
                </div>
              )}

              {/* ================= TAB: SUBMISSIONS ================= */}
              {activeTab === 'submissions' && (
                <div>
                  {submissionError && (
                    <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                      {submissionError}
                    </div>
                  )}

                  {loadingSubmissions ? (
                    <div className="py-12 text-center text-xs text-zinc-500 flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                      <span>Loading Firestore submissions…</span>
                    </div>
                  ) : submissions.length === 0 ? (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-12 text-center">
                      <Inbox className="mx-auto h-8 w-8 text-zinc-600 mb-3" />
                      <h3 className="text-sm font-bold text-zinc-300">No pending submissions</h3>
                      <p className="text-xs text-zinc-500 mt-1">
                        Community recommendations submitted via the public modal will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {submissions.map((sub) => (
                        <div
                          key={sub.id}
                          className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 flex flex-col justify-between shadow-lg"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="text-base font-bold text-white">{sub.name}</h3>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-mono uppercase ${
                                  sub.status === 'reviewed'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                }`}
                              >
                                {sub.status || 'pending'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                              {sub.neighborhood && (
                                <span className="rounded bg-zinc-800 px-2 py-0.5">{sub.neighborhood}</span>
                              )}
                              {sub.category && (
                                <span className="rounded bg-zinc-800 px-2 py-0.5">{sub.category}</span>
                              )}
                            </div>

                            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                              {sub.whyRecommend}
                            </p>

                            {sub.googleMapsUrl && (
                              <div className="mb-4">
                                <a
                                  href={sub.googleMapsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-orange-400 hover:underline font-mono"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  <span>View Google Maps Link</span>
                                </a>
                              </div>
                            )}

                            <div className="text-[11px] text-zinc-500">
                              Submitted by: <span className="text-zinc-400">{sub.submittedBy}</span>
                            </div>
                          </div>

                          <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center justify-between">
                            <button
                              onClick={() => handleDeleteSubmission(sub.id)}
                              className="text-xs text-red-400 hover:text-red-300 font-semibold"
                            >
                              Delete
                            </button>

                            {sub.status !== 'reviewed' && (
                              <button
                                onClick={() => handleMarkReviewed(sub.id)}
                                className="rounded-xl bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition-colors"
                              >
                                Mark Reviewed
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ================= TAB: EXPORT TYPESCRIPT ================= */}
              {activeTab === 'export' && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white">Master Dataset TypeScript Export</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Copy and paste this output into <code className="text-orange-400 font-mono">src/data/restaurants.ts</code> to persist edits.
                      </p>
                    </div>

                    <button
                      onClick={handleCopyTypeScript}
                      className="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-orange-500 transition-all active:scale-98 shadow-md"
                    >
                      {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span>{copiedCode ? 'Copied Code!' : 'Copy TypeScript Code'}</span>
                    </button>
                  </div>

                  <pre className="max-h-[500px] overflow-auto rounded-xl bg-zinc-950 p-4 font-mono text-[11px] text-zinc-300 border border-zinc-800/80">
                    {`import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(
                      restaurants,
                      null,
                      2
                    )};\n`}
                  </pre>
                </div>
              )}
            </div>
          </main>

          {/* Edit Spot Modal */}
          {editingSpot && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
              <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
                <button
                  onClick={() => setEditingSpot(null)}
                  className="absolute right-5 top-5 rounded-full p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>

                <h2 className="text-lg font-bold text-white mb-4">Edit: {editingSpot.name}</h2>

                <form onSubmit={handleSaveSpot} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">Name</label>
                    <input
                      type="text"
                      value={editingSpot.name}
                      onChange={(e) => setEditingSpot({ ...editingSpot, name: e.target.value })}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 mb-1">Neighborhood</label>
                      <select
                        value={editingSpot.neighborhood}
                        onChange={(e) =>
                          setEditingSpot({ ...editingSpot, neighborhood: e.target.value as Neighborhood })
                        }
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-white"
                      >
                        {ALL_NEIGHBORHOODS.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1">Category</label>
                      <select
                        value={editingSpot.category}
                        onChange={(e) =>
                          setEditingSpot({ ...editingSpot, category: e.target.value as Category })
                        }
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-white"
                      >
                        {ALL_CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Address</label>
                    <input
                      type="text"
                      value={editingSpot.address}
                      onChange={(e) => setEditingSpot({ ...editingSpot, address: e.target.value })}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 mb-1">Latitude</label>
                      <input
                        type="number"
                        step="any"
                        value={editingSpot.lat}
                        onChange={(e) =>
                          setEditingSpot({ ...editingSpot, lat: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Longitude</label>
                      <input
                        type="number"
                        step="any"
                        value={editingSpot.lng}
                        onChange={(e) =>
                          setEditingSpot({ ...editingSpot, lng: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingSpot(null)}
                      className="rounded-xl px-4 py-2 text-zinc-400 hover:bg-zinc-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-orange-600 px-5 py-2 text-white font-semibold hover:bg-orange-500"
                    >
                      Save Changes
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
