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
import strawberry120 from '../assets/cups/strawberry-120g.webp';
import cutCherry from '../assets/cutouts/cherry.webp';
import cutToffee from '../assets/cutouts/english-toffee.webp';
import cutForest from '../assets/cutouts/fruits-of-the-forest.webp';
import cutMango from '../assets/cutouts/mango.webp';
import cutBerry from '../assets/cutouts/mixed-berry.webp';
import cutPassion from '../assets/cutouts/passion-fruit.webp';
import cutStrawberry from '../assets/cutouts/strawberry.webp';
// Open 120g cups with a swirl, one per flavour (used on the flavour cards).
import swirlCherry from '../assets/cups120/cherry-120g-swirl.jpg';
import swirlEnglishToffee from '../assets/cups120/english-toffee-120g-swirl.jpg';
import swirlFruitsOfTheForest from '../assets/cups120/fruits-of-the-forest-120g-swirl.jpg';
import swirlLitchi from '../assets/cups120/litchi-120g-swirl.jpg';
import swirlMango from '../assets/cups120/mango-120g-swirl.jpg';
import swirlMixedBerry from '../assets/cups120/mixed-berry-120g-swirl.jpg';
import swirlPassionFruit from '../assets/cups120/passion-fruit-120g-swirl.jpg';
import swirlStrawberry from '../assets/cups120/strawberry-120g-swirl.jpg';
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
// 064 557 8945 becomes 27645578945.
export const WHATSAPP_NUMBER = '27645578945';
// How the number is written on the page.
export const WHATSAPP_DISPLAY = '064 557 8945';

// The one WhatsApp message the site sends (from the button in the header).
export const MESSAGES = {
  customer:
    "Hi Myela! I'd like to order some frozen yoghurt.\n\nFlavours:\nHow many cups (120g or 200g):\nIt's for (school, tuckshop, event or just me):",
};

/** Builds a wa.me link, or null if the number isn't a valid international number. */
export function whatsappLink(message: string, number: string = WHATSAPP_NUMBER): string | null {
  const digits = (number || '').replace(/\D/g, '');
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const SITE = {
  name: 'Myela',
  title: 'Myela Frozen Yoghurt | For school tuckshops and events in Johannesburg',
  description:
    'Sealed, frozen yoghurt cups for school tuckshops, school events and coffee trucks in Randburg, Fourways, Sandton and the West Rand. Eight flavours, bulk pricing on WhatsApp.',
  // Where Myela is based and the areas it supplies (used on the page and for Google).
  base: 'Randpark Ridge',
  city: 'Johannesburg',
  areas: ['Randburg', 'Fourways', 'Sandton', 'the West Rand'],
  instagram: '', // add the full Instagram URL once it's confirmed
};

export interface Flavour {
  name: string;
  image: ImageMetadata;
  /** Open 120g cup with a swirl, shown on the flavour cards. */
  swirl?: ImageMetadata;
  /** Screen colour (hex), used by the pour animation. */
  colour: string;
  /** Print colour from the Myela colour library (C/M/Y/K). Approximate until proofed. */
  cmyk?: string;
  /** Leave empty until confirmed per flavour. The button under the grid covers availability. */
  sizes?: string[];
}

// Order here is the order on the page.
// Colour library: flavours with a cmyk value are confirmed from Myela's own library.
// The rest are still picked from the product photos. Update them here as the library grows.
export const FLAVOURS: Flavour[] = [
  { name: 'Cherry', image: cherry, swirl: swirlCherry, colour: '#e2435c', cmyk: '0/82/64/4' },
  { name: 'English Toffee', image: englishToffee, swirl: swirlEnglishToffee, colour: '#e6b07a' },
  { name: 'Fruits of the Forest', image: fruitsOfTheForest, swirl: swirlFruitsOfTheForest, colour: '#ed286a' },
  { name: 'Litchi', image: litchi, swirl: swirlLitchi, colour: '#f7eacb' },
  { name: 'Mango', image: mango, swirl: swirlMango, colour: '#fe890c' },
  { name: 'Mixed Berry', image: mixedBerry, swirl: swirlMixedBerry, colour: '#c64c82' },
  { name: 'Passion Fruit', image: passionFruit, swirl: swirlPassionFruit, colour: '#feb432' },
  { name: 'Strawberry', image: strawberry, swirl: swirlStrawberry, colour: '#e9a89f', cmyk: '0/33/36/4' },
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
    price: 'R30',
    body: 'Our tuckshop size. Just right for break time, or that sneaky, slightly healthier something sweet after supper.',
    note: 'The tuckshop favourite',
    image: strawberry120,
    imageAlt: 'Strawberry Myela frozen yoghurt in a 120g cup with a flat lid',
  },
  {
    grams: 200,
    price: 'R45',
    body: 'A bigger scoop of Myela happiness, with a dome lid. Great for school events and coffee trucks.',
    image: strawberry,
    imageAlt: 'Strawberry Myela frozen yoghurt in a 200g cup with a dome lid',
  },
];

export const OUTLETS = [
  {
    label: 'Schools',
    title: 'Primary-school tuckshops',
    body: 'Most of our cups go to school tuckshops. Look out for 120g Myela cups at participating primary schools.',
  },
  {
    label: 'Events',
    title: 'School events and coffee trucks',
    body: 'Find Myela at selected school events, through participating coffee trucks.',
  },
  {
    label: 'Small orders',
    title: 'Collect in Randpark Ridge',
    body: 'Just want a few cups? Order on WhatsApp and collect from Kate Geddes Aesthetics in Randpark Ridge.',
  },
];

// Typical nutritional information from our dairy supplier, per 100g.
// Per-cup columns are worked out from these figures (120g = x1.2, 200g = x2).
export const NUTRITION = {
  source: 'Typical values for our frozen yoghurt, supplied by our dairy.',
  rows: [
    { label: 'Energy', unit: 'kJ', per100: 588, decimals: 0 },
    { label: 'Protein', unit: 'g', per100: 2.86, decimals: 2 },
    { label: 'Carbohydrate', unit: 'g', per100: 20.6, decimals: 1 },
    { label: 'Total fat', unit: 'g', per100: 5.1, decimals: 1 },
    { label: 'Dietary fibre', unit: 'g', per100: 0.1, decimals: 1 },
    { label: 'Total sodium', unit: 'mg', per100: 81.8, decimals: 1 },
  ],
  servings: [100, 120, 200],
};

export const FAQS = [
  {
    q: 'Do you supply schools and tuckshops?',
    a: "Yes, that's what we do most. We supply primary-school tuckshops, school events and coffee trucks with sealed, frozen cups. Message us on WhatsApp for bulk pricing.",
  },
  { q: 'Which sizes do you offer?', a: 'Myela frozen yoghurt comes in 120g and 200g cups.' },
  {
    q: "What's the nutritional information?",
    a: 'Per 100g: 588 kJ, 2.86g protein, 20.6g carbohydrate, 5.1g fat. The full table, per 120g and 200g cup too, is on our Nutrition page (link at the bottom of the site).',
  },
  {
    q: 'How much is it?',
    a: 'Bulk and tuckshop pricing depends on the order, so message us for a quote. Single cups are R30 (120g) and R45 (200g).',
  },
  {
    q: 'Can I order just a few cups?',
    a: 'Yes. Order on WhatsApp and collect from Kate Geddes Aesthetics in Randpark Ridge.',
  },
  {
    q: 'Which areas do you cover?',
    a: "We're based in Randpark Ridge, Johannesburg, and supply schools and tuckshops in Randburg, Fourways, Sandton and the West Rand.",
  },
];
