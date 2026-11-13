// The Myela pour: a hand-drawn soft-serve nozzle pipes a swirl into a clear cup,
// the dome lid drops on, and picking another flavour knocks the cup off the stage.
// Written for this site; plain SVG + requestAnimationFrame, no libraries.

type Flavour = { name: string; colour: string; href: string };

const NS = 'http://www.w3.org/2000/svg';
const CX = 180;

// Swirl coils from the bottom of the cup up to the tip: centre y and half-width.
const COILS: [number, number][] = [
  [392, 60], [369, 66], [346, 71], [323, 76], [300, 80], [277, 84],
  [252, 82], [229, 70], [208, 56], [190, 42], [175, 28],
];
const RIM_INDEX = 6; // coils from here up sit above the rim
const COIL_H = 30;

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, parent?: Element) {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
  parent?.appendChild(n);
  return n;
}

function mix(hex: string, to: [number, number, number], t: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v, i) => Math.round(v + (to[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
const darker = (h: string) => mix(h, [53, 33, 71], 0.32);
const lighter = (h: string) => mix(h, [255, 255, 255], 0.55);

const ease = {
  in: (t: number) => t * t * t,
  out: (t: number) => 1 - Math.pow(1 - t, 3),
  inOut: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  back: (t: number) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2),
  bounce: (t: number) => {
    const n = 7.5625, d = 2.75;
    if (t < 1 / d) return n * t * t;
    if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;
    if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;
    return n * (t -= 2.625 / d) * t + 0.984375;
  },
};

function tween(ms: number, fn: (p: number) => void, e: (t: number) => number = ease.inOut) {
  return new Promise<void>((resolve) => {
    if (reduce || ms <= 0) { fn(1); resolve(); return; }
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      fn(e(p));
      if (p < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, reduce ? 0 : ms));

function coilPath(y: number, rx: number) {
  const h = COIL_H, s = 9; // s = spiral slant
  return `M${CX - rx} ${y + s} C ${CX - rx} ${y - h * 0.95 + s}, ${CX + rx} ${y - h * 0.95 - s}, ${CX + rx} ${y - s} C ${CX + rx} ${y + h * 0.55 - s}, ${CX - rx} ${y + h * 0.55 + s}, ${CX - rx} ${y + s} Z`;
}

type Cup = {
  g: SVGGElement;
  stream: SVGGElement;
  streamBody: SVGRectElement;
  streamLines: SVGRectElement[];
  coils: SVGGElement[];
  tip: SVGGElement;
  lid: SVGGElement;
};

function buildCup(svg: SVGSVGElement, colour: string): Cup {
  const g = el('g', { class: 'pour-cup' }, svg);
  const dark = darker(colour), light = lighter(colour);

  el('ellipse', { cx: CX, cy: 414, rx: 92, ry: 10, fill: 'rgba(53,33,71,0.16)' }, g);
  // back of the rim
  el('path', { d: `M${CX - 88} 250 A 88 14 0 0 1 ${CX + 88} 250`, fill: 'none', stroke: '#fff', 'stroke-width': 2.5, opacity: 0.7 }, g);

  const stream = el('g', { opacity: 0 }, g);
  const streamBody = el('rect', { x: CX - 9, y: 68, width: 18, height: 0, rx: 9, fill: colour }, stream);
  const streamLines = [-4, 4].map((dx) => el('rect', { x: CX + dx - 1, y: 68, width: 2, height: 0, rx: 1, fill: light, opacity: 0.8 }, stream));

  const inside = el('g', {}, g);
  const coils: SVGGElement[] = [];
  const addCoil = (i: number, parent: SVGGElement) => {
    const [y, rx] = COILS[i];
    const dx = i % 2 ? 3 : -3;
    const c = el('g', { opacity: 0, style: `transform-origin:${CX}px ${y}px`, transform: `translate(${dx} 0)` }, parent);
    el('path', { d: coilPath(y, rx), fill: colour, stroke: dark, 'stroke-width': 2.4, 'stroke-linejoin': 'round' }, c);
    el('path', { d: `M${CX - rx * 0.55} ${y - COIL_H * 0.36 + 3} C ${CX - rx * 0.2} ${y - COIL_H * 0.62 + 2}, ${CX + rx * 0.25} ${y - COIL_H * 0.64}, ${CX + rx * 0.55} ${y - COIL_H * 0.44 - 3}`, fill: 'none', stroke: light, 'stroke-width': 3.2, 'stroke-linecap': 'round', opacity: 0.75 }, c);
    coils[i] = c;
  };
  for (let i = 0; i < RIM_INDEX; i++) addCoil(i, inside);

  // clear cup body, front rim and rings
  el('path', { d: `M${CX - 88} 250 L ${CX - 66} 404 Q ${CX} 420 ${CX + 66} 404 L ${CX + 88} 250`, fill: 'rgba(255,255,255,0.22)', stroke: '#fff', 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
  el('path', { d: `M${CX - 88} 250 A 88 14 0 0 0 ${CX + 88} 250`, fill: 'none', stroke: '#fff', 'stroke-width': 3 }, g);
  el('path', { d: `M${CX - 70} 268 L ${CX - 56} 390`, stroke: 'rgba(255,255,255,0.7)', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);

  const above = el('g', {}, g);
  for (let i = RIM_INDEX; i < COILS.length; i++) addCoil(i, above);

  const tipY = COILS[COILS.length - 1][0] - 14;
  const tip = el('g', { opacity: 0, style: `transform-origin:${CX}px ${tipY + 6}px` }, g);
  el('path', {
    d: `M${CX - 22} ${tipY + 6} C ${CX - 22} ${tipY - 12}, ${CX - 8} ${tipY - 20}, ${CX} ${tipY - 30} C ${CX + 4} ${tipY - 36}, ${CX + 12} ${tipY - 38}, ${CX + 13} ${tipY - 31} C ${CX + 18} ${tipY - 20}, ${CX + 22} ${tipY - 8}, ${CX + 22} ${tipY + 6} Z`,
    fill: colour, stroke: dark, 'stroke-width': 2.4, 'stroke-linejoin': 'round',
  }, tip);
  el('path', { d: `M${CX + 13} ${tipY - 31} C ${CX + 14} ${tipY - 40}, ${CX + 6} ${tipY - 44}, ${CX + 1} ${tipY - 39}`, fill: 'none', stroke: dark, 'stroke-width': 8, 'stroke-linecap': 'round' }, tip);
  el('path', { d: `M${CX + 13} ${tipY - 31} C ${CX + 14} ${tipY - 40}, ${CX + 6} ${tipY - 44}, ${CX + 1} ${tipY - 39}`, fill: 'none', stroke: colour, 'stroke-width': 4.5, 'stroke-linecap': 'round' }, tip);
  el('path', { d: `M${CX - 12} ${tipY - 2} C ${CX - 10} ${tipY - 12}, ${CX - 4} ${tipY - 18}, ${CX + 1} ${tipY - 24}`, fill: 'none', stroke: light, 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.8 }, tip);

  const lid = el('g', { opacity: 0 }, g);
  el('path', { d: `M${CX - 90} 246 C ${CX - 92} 66, ${CX + 92} 66, ${CX + 90} 246`, fill: 'rgba(255,255,255,0.2)', stroke: '#fff', 'stroke-width': 3 }, lid);
  el('ellipse', { cx: CX, cy: 248, rx: 96, ry: 15, fill: 'rgba(255,255,255,0.35)', stroke: '#fff', 'stroke-width': 3 }, lid);
  el('path', { d: `M${CX - 62} 196 C ${CX - 60} 146, ${CX - 32} 118, ${CX + 2} 114`, fill: 'none', stroke: 'rgba(255,255,255,0.85)', 'stroke-width': 5, 'stroke-linecap': 'round' }, lid);
  el('ellipse', { cx: CX, cy: 112, rx: 14, ry: 4, fill: 'none', stroke: '#fff', 'stroke-width': 2.5 }, lid);

  return { g, stream, streamBody, streamLines, coils, tip, lid };
}

function setStream(c: Cup, top: number, bottom: number) {
  const h = Math.max(0, bottom - top);
  for (const r of [c.streamBody, ...c.streamLines]) {
    r.setAttribute('y', String(top));
    r.setAttribute('height', String(h));
  }
}

function init(root: HTMLElement) {
  const svg = root.querySelector<SVGSVGElement>('.me-pour__svg');
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-flavour]')];
  const nameEl = root.querySelector<HTMLElement>('.me-pour__name');
  const order = root.querySelector<HTMLAnchorElement>('.me-pour__order');
  if (!svg || !buttons.length) return;

  const flavours: Flavour[] = buttons.map((b) => ({ name: b.dataset.flavour!, colour: b.dataset.colour!, href: b.dataset.href || '' }));
  let current: Cup | null = null;
  let run = 0;
  let index = -1;
  let auto = !reduce;
  let visible = false;
  let autoTimer = 0;

  async function pour(c: Cup, token: number) {
    const alive = () => token === run;
    const coilTop = (i: number) => COILS[i][0] - COIL_H * 0.7;
    c.stream.setAttribute('opacity', '1');
    await tween(300, (p) => setStream(c, 68, 68 + (coilTop(0) - 68) * p), ease.in);
    for (let i = 0; i < COILS.length; i++) {
      if (!alive()) return;
      const coil = c.coils[i];
      coil.setAttribute('opacity', '1');
      await tween(150, (p) => {
        coil.style.transform = `scale(${0.2 + 0.8 * p}, ${0.7 + 0.3 * p})`;
        setStream(c, 68, coilTop(i) + 4);
      }, ease.out);
    }
    if (!alive()) return;
    c.tip.setAttribute('opacity', '1');
    const tipTop = COILS[COILS.length - 1][0] - 58;
    await tween(220, (p) => { c.tip.style.transform = `scale(${0.3 + 0.7 * p})`; setStream(c, 68 + (tipTop - 68) * p, tipTop + 6); }, ease.out);
    c.stream.setAttribute('opacity', '0');
    if (!alive()) return;
    await wait(150);
    c.lid.setAttribute('opacity', '1');
    await tween(650, (p) => c.lid.setAttribute('transform', `translate(0 ${(-340 * (1 - p)).toFixed(1)})`), ease.bounce);
  }

  async function select(i: number) {
    if (i === index) return;
    const token = ++run;
    index = i;
    const f = flavours[i];
    buttons.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
    if (nameEl) nameEl.textContent = f.name;
    if (order && f.href) order.href = f.href;
    root.style.setProperty('--pour-colour', f.colour);

    const old = current;
    const next = buildCup(svg!, f.colour);
    current = next;
    if (old) {
      const g = old.g;
      tween(480, (p) => g.setAttribute('transform', `translate(${(-460 * p).toFixed(1)} ${(30 * p * p).toFixed(1)}) rotate(${(-32 * p).toFixed(1)} ${CX} 414)`), ease.in).then(() => g.remove());
    }
    await tween(620, (p) => next.g.setAttribute('transform', `translate(${(460 * (1 - p)).toFixed(1)} 0) rotate(${(14 * (1 - p)).toFixed(1)} ${CX} 414)`), ease.back);
    if (token !== run) return;
    await pour(next, token);
    if (token === run) scheduleAuto();
  }

  function scheduleAuto() {
    clearTimeout(autoTimer);
    if (!auto) return;
    autoTimer = window.setTimeout(() => {
      if (auto && visible && !document.hidden) select((index + 1) % flavours.length);
      else scheduleAuto();
    }, 2600);
  }

  buttons.forEach((b, i) =>
    b.addEventListener('click', () => {
      auto = false;
      clearTimeout(autoTimer);
      select(i);
    }),
  );

  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible && index < 0) select(0);
  }, { threshold: 0.35 });
  io.observe(root);
}

document.querySelectorAll<HTMLElement>('.me-pour').forEach(init);

export {};
