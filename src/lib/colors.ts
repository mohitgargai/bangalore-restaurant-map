import { Category } from '@/types';

export interface CategoryMeta {
  color: string;
  bg: string;
  border: string;
  text: string;
  icon: string;
  badge: string;
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  'Iconic Heritage': {
    color: '#d97706', // amber-600
    bg: '#fef3c7',
    border: '#fde68a',
    text: '#92400e',
    icon: '🥞',
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'Microbrewery': {
    color: '#b45309', // amber-700
    bg: '#ffedd5',
    border: '#fed7aa',
    text: '#9a3412',
    icon: '🍺',
    badge: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  'Specialty Coffee & Cafe': {
    color: '#0d9488', // teal-600
    bg: '#ccfbf1',
    border: '#99f6e4',
    text: '#115e59',
    icon: '☕',
    badge: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  'Pan-Asian & Japanese': {
    color: '#e11d48', // rose-600
    bg: '#ffe4e6',
    border: '#fecdd3',
    text: '#9f1239',
    icon: '🥢',
    badge: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  'Bakeries & Desserts': {
    color: '#db2777', // pink-600
    bg: '#fce7f3',
    border: '#fbcfe8',
    text: '#9d174d',
    icon: '🥐',
    badge: 'bg-pink-50 text-pink-800 border-pink-200',
  },
  'Cocktails & Rooftops': {
    color: '#7c3aed', // violet-600
    bg: '#ede9fe',
    border: '#ddd6fe',
    text: '#5b21b6',
    icon: '🍸',
    badge: 'bg-violet-50 text-violet-800 border-violet-200',
  },
  'Regional & Coastal': {
    color: '#ea580c', // orange-600
    bg: '#ffedd5',
    border: '#fed7aa',
    text: '#9a3412',
    icon: '🍛',
    badge: 'bg-amber-50 text-amber-900 border-amber-200',
  },
  'Modern Indian & Dining': {
    color: '#2563eb', // blue-600
    bg: '#dbeafe',
    border: '#bfdbfe',
    text: '#1e40af',
    icon: '🍽️',
    badge: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'Street Food & Chaat': {
    color: '#16a34a', // green-600
    bg: '#dcfce7',
    border: '#bbf7d0',
    text: '#166534',
    icon: '🌶️',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
};
