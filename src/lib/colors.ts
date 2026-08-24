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
    color: '#C87D18', // Warm Turmeric Ochre
    bg: '#FEF8E7', // Pale Turmeric Cream
    border: '#F5E5BE',
    text: '#7A4807',
    icon: '🥞',
    badge: 'bg-[#FEF8E7] text-[#7A4807] border-[#F5E5BE]',
  },
  'Microbrewery': {
    color: '#9E4A20', // Roasted Copper Malt
    bg: '#FDF2E9', // Pale Amber Ale
    border: '#F7DAC3',
    text: '#6A2F11',
    icon: '🍺',
    badge: 'bg-[#FDF2E9] text-[#6A2F11] border-[#F7DAC3]',
  },
  'Specialty Coffee & Cafe': {
    color: '#2E7363', // Botanical Eucalyptus Sage
    bg: '#E8F4F0', // Pale Mint Linen
    border: '#C2E2D7',
    text: '#17473C',
    icon: '☕',
    badge: 'bg-[#E8F4F0] text-[#17473C] border-[#C2E2D7]',
  },
  'Pan-Asian & Japanese': {
    color: '#BF3348', // Crimson Coral
    bg: '#FDF0F2', // Pale Sakura Cream
    border: '#F8CDD4',
    text: '#7D1C2B',
    icon: '🥢',
    badge: 'bg-[#FDF0F2] text-[#7D1C2B] border-[#F8CDD4]',
  },
  'Bakeries & Desserts': {
    color: '#A83B6C', // Plum Raspberry
    bg: '#FDF1F6', // Pale Patisserie Linen
    border: '#F7CFE2',
    text: '#6D1E43',
    icon: '🥐',
    badge: 'bg-[#FDF1F6] text-[#6D1E43] border-[#F7CFE2]',
  },
  'Cocktails & Rooftops': {
    color: '#5F4586', // Twilight Fig Velvet
    bg: '#F3EEF9', // Pale Wisteria
    border: '#DDCFED',
    text: '#3D2A5A',
    icon: '🍸',
    badge: 'bg-[#F3EEF9] text-[#3D2A5A] border-[#DDCFED]',
  },
  'Regional & Coastal': {
    color: '#BC5434', // Baked Mangalorean Terracotta
    bg: '#FDF3EE', // Pale Coconut Shell
    border: '#F7D6C6',
    text: '#78301B',
    icon: '🍛',
    badge: 'bg-[#FDF3EE] text-[#78301B] border-[#F7D6C6]',
  },
  'Modern Indian & Dining': {
    color: '#2C5F8A', // Aegean Lapis Blue
    bg: '#EDF4F9', // Pale Silk Aqua
    border: '#C8DEEC',
    text: '#163D5C',
    icon: '🍽️',
    badge: 'bg-[#EDF4F9] text-[#163D5C] border-[#C8DEEC]',
  },
  'Street Food & Chaat': {
    color: '#2D7D46', // Fresh Coriander Leaf
    bg: '#EEF7F1', // Pale Pistachio
    border: '#C7E8D1',
    text: '#17522B',
    icon: '🌶️',
    badge: 'bg-[#EEF7F1] text-[#17522B] border-[#C7E8D1]',
  },
};
