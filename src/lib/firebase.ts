import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'blr-food-map-2026',
  appId: '1:198641112509:web:f48a93e40f79be5eae2ed4',
  storageBucket: 'blr-food-map-2026.firebasestorage.app',
  apiKey: 'AIzaSyBIYYhQXeZhTA9jtvbuXWCdpLpzrIv9QKE',
  authDomain: 'blr-food-map-2026.firebaseapp.com',
  messagingSenderId: '198641112509',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
