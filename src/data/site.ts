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
import cutCherry from '../assets/cutouts/cherry.webp';
import cutToffee from '../assets/cutouts/english-toffee.webp';
import cutForest from '../assets/cutouts/fruits-of-the-forest.webp';
import cutMango from '../assets/cutouts/mango.webp';
import cutBerry from '../assets/cutouts/mixed-berry.webp';
import cutPassion from '../assets/cutouts/passion-fruit.webp';
import cutStrawberry from '../assets/cutouts/strawberry.webp';
import type { ImageMetadata } from 'astro';

// Cups cut out of their backgrounds, used for the flying cups.
export const CUTOUTS = {
  cherry: cutCherry,
  englishToffee: cutToffee,
  fruitsOfTheForest: cutForest,
  mango: cutMango,
  mixedBerry: cutBerry,
  passionFruit: cutPassion,
  strawberry: cutStrawberry,
};

// WhatsApp number in international digits: no "+", no leading 0.
// 072 968 8080 becomes 27729688080.
export const WHATSAPP_NUMBER = '27729688080';

/** Customer message for one flavour (used by the pour animation's order button). */
export const flavourMessage = (flavour: string) =>
  `Hi Myela! I'd like to order some ${flavour} frozen yoghurt. Could you let me know which cup sizes are available, and how ordering works?`;

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
  title: 'Myela Frozen Yoghurt Johannesburg | Little cups. Big smiles.',
  description:
    'Frozen yoghurt in 120g and 200g cups from Randpark Ridge, Johannesburg. Eight flavours for Randburg, Fourways, Sandton and the West Rand. Order on WhatsApp.',
  // Where Myela is based and the areas it supplies (used on the page and for Google).
  base: 'Randpark Ridge',
  city: 'Johannesburg',
  areas: ['Randburg', 'Fourways', 'Sandton', 'the West Rand'],
  instagram: '', // add the full Instagram URL once it's confirmed
};

export interface Flavour {
  name: string;
  image: ImageMetadata;
  /** Yoghurt colour for the pour animation. */
  colour: string;
  /** Leave empty until confirmed per flavour. Shows "Ask about availability" instead. */
  sizes?: string[];
}

// Order here is the order on the page.
export const FLAVOURS: Flavour[] = [
  { name: 'Cherry', image: cherry, colour: '#e92440' },
  { name: 'English Toffee', image: englishToffee, colour: '#e6b07a' },
  { name: 'Fruits of the Forest', image: fruitsOfTheForest, colour: '#ed286a' },
  { name: 'Litchi', image: litchi, colour: '#f7eacb' },
  { name: 'Mango', image: mango, colour: '#fe890c' },
  { name: 'Mixed Berry', image: mixedBerry, colour: '#c64c82' },
  { name: 'Passion Fruit', image: passionFruit, colour: '#feb432' },
  { name: 'Strawberry', image: strawberry, colour: '#f59aa5' },
];

// The story section. Swap in real photos as they arrive.
export const STORY = {
  heading: 'Meet Miya & Ella.',
  paragraphs: [
    'Myela is a family business. Kate started it with her daughters, Miya and Ella, so the girls could have a business of their own to start, grow and earn their pocket money from.',
    'So every cup you buy backs two young entrepreneurs. Thank you for being part of it.',
  ],
  note: 'Miya + Ella = Myela',
};

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
    q: 'Which areas do you cover?',
    a: "We're based in Randpark Ridge, Johannesburg, and supply Randburg, Fourways, Sandton and the West Rand. A bit further out? Message us and we'll see what we can do.",
  },
  {
    q: 'Can my business stock Myela?',
    a: 'Yes! Message us on WhatsApp to chat about tuckshop, coffee-truck and event supply.',
  },
];
