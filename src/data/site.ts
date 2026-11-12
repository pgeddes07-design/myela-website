// ─────────────────────────────────────────────────────────────
//  Myela website content. Edit this file to change the site.
//  Every flavour, price, outlet and FAQ on the page comes from here.
// ─────────────────────────────────────────────────────────────

import cherry from '../assets/cups/cherry-200g.webp';
import englishToffee from '../assets/cups/english-toffee-200g.webp';
import fruitsOfTheForest from '../assets/cups/fruits-of-the-forest-200g.webp';
import litchi from '../assets/cups/litchi-200g.webp';
import mango from '../assets/cups/mango-200g.webp';
import mixedBerry from '../assets/cups/mixed-berry-200g.webp';
import passionFruit from '../assets/cups/passion-fruit-200g.webp';
import strawberry from '../assets/cups/strawberry-200g.webp';
import type { ImageMetadata } from 'astro';

// WhatsApp number in international digits: no "+", no leading 0.
// 072 968 8080 becomes 27729688080.
export const WHATSAPP_NUMBER = '27729688080';

export const MESSAGES = {
  customer:
    "Hi Myela! I'd like to order some frozen yoghurt. Could you let me know which flavours and cup sizes are available, and how ordering works?",
  stockist:
    "Hi Myela! I'm interested in stocking your frozen yoghurt. My business is [business name], and I'd like to know about your supply options for [tuckshop / coffee truck / event].",
};

/** Builds a wa.me link, or null if the number isn't a valid international number. */
export function whatsappLink(message: string, number: string = WHATSAPP_NUMBER): string | null {
  const digits = (number || '').replace(/\D/g, '');
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const SITE = {
  name: 'Myela',
  title: 'Myela Frozen Yoghurt | Little cups. Big smiles.',
  description:
    'Myela frozen yoghurt in 120g and 200g cups. Eight fun flavours, found at school tuckshops, events and partner outlets. Order or stock Myela on WhatsApp.',
  instagram: '', // add the full Instagram URL once it's confirmed
};

export interface Flavour {
  name: string;
  image: ImageMetadata;
  /** Leave empty until confirmed per flavour. Shows "Ask about availability" instead. */
  sizes?: string[];
}

// Order here is the order on the page.
export const FLAVOURS: Flavour[] = [
  { name: 'Cherry', image: cherry },
  { name: 'English Toffee', image: englishToffee },
  { name: 'Fruits of the Forest', image: fruitsOfTheForest },
  { name: 'Litchi', image: litchi },
  { name: 'Mango', image: mango },
  { name: 'Mixed Berry', image: mixedBerry },
  { name: 'Passion Fruit', image: passionFruit },
  { name: 'Strawberry', image: strawberry },
];

// The three cups shown in the hero: big one in the middle first.
export const HERO_CUPS = [
  { image: mixedBerry, alt: 'Mixed Berry Myela frozen yoghurt in a 200g cup' },
  { image: mango, alt: 'Mango Myela frozen yoghurt in a 200g cup' },
  { image: strawberry, alt: 'Strawberry Myela frozen yoghurt in a 200g cup' },
];

export interface Size {
  grams: 120 | 200;
  price: string;
  body: string;
  note?: string;
  /** Set once the photo exists in src/assets/cups (e.g. cup-120g.webp). */
  image?: ImageMetadata;
  imageAlt?: string;
}

export const SIZES: Size[] = [
  {
    grams: 120,
    price: 'R25',
    body: 'A perfectly sized frozen-yoghurt treat. Our 120g cups are supplied to participating school tuckshops.',
    note: 'In participating tuckshops',
    // image: cup120, imageAlt: '120g Myela cup with a flat lid',
  },
  {
    grams: 200,
    price: 'R45',
    body: 'A bigger scoop of Myela happiness, with a dome lid. Ask us about flavours and availability.',
    image: strawberry,
    imageAlt: 'Strawberry Myela frozen yoghurt in a 200g cup with a dome lid',
  },
];

export const OUTLETS = [
  {
    label: 'Partner outlet',
    title: 'Kate Geddes Aesthetics',
    body: 'Myela has been available through Kate Geddes Aesthetics. Message us to check current availability and how to order or collect.',
  },
  {
    label: 'School tuckshops',
    title: 'Primary-school tuckshops',
    body: 'Look out for 120g Myela cups at participating primary-school tuckshops.',
  },
  {
    label: 'School events',
    title: 'Coffee trucks at events',
    body: 'You may also find Myela through participating coffee trucks at selected school events.',
  },
];

export const FAQS = [
  { q: 'Which sizes do you offer?', a: 'Myela frozen yoghurt comes in 120g and 200g cups.' },
  {
    q: 'How much is it?',
    a: 'R25 for a 120g cup and R45 for a 200g cup. Buying in bulk or for a tuckshop? Message us on WhatsApp for pricing.',
  },
  {
    q: 'Where can I buy Myela?',
    a: 'You can order directly on WhatsApp. We also supply participating primary-school tuckshops and selected school-event vendors.',
  },
  {
    q: 'Can my business stock Myela?',
    a: 'Yes! Message us on WhatsApp to chat about tuckshop, coffee-truck and event supply.',
  },
];
