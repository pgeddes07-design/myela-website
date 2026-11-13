// Scroll motion for the Myela site. Everything here is decoration:
// with reduced motion switched on, nothing moves and everything is simply shown.

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

const revealables = document.querySelectorAll<HTMLElement | SVGElement>('[data-reveal], [data-draw]');

if (reduce || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('is-in'));
} else {
  root.classList.add('motion');

  // 1. Reveal things as they scroll into view.
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revealables.forEach((el) => io.observe(el));

  // 2. Fly things in and out with the scroll.
  type Flyer = { el: HTMLElement; anchor: HTMLElement; mode: string; x: number; y: number; r: number; visible: boolean };
  const flyers: Flyer[] = [...document.querySelectorAll<HTMLElement>('[data-fly]')].map((el) => ({
    el,
    anchor: el.parentElement as HTMLElement,
    mode: el.dataset.fly || 'pass',
    x: Number(el.dataset.x || 0),
    y: Number(el.dataset.y || 0),
    r: Number(el.dataset.r || 0),
    visible: true,
  }));

  const near = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const f = flyers.find((f) => f.anchor === e.target);
        if (f) f.visible = e.isIntersecting;
      }
    },
    { rootMargin: '50% 0px 50% 0px' },
  );
  flyers.forEach((f) => near.observe(f.anchor));

  let queued = false;
  const update = () => {
    queued = false;
    const vh = window.innerHeight;
    for (const f of flyers) {
      if (!f.visible && f.mode !== 'exit') continue;
      let p: number;
      if (f.mode === 'exit') {
        p = -Math.min(window.scrollY / vh, 1.5);
      } else {
        const r = f.anchor.getBoundingClientRect();
        p = Math.max(-1.4, Math.min(1.4, (r.top + r.height / 2 - vh / 2) / vh));
      }
      f.el.style.transform = `translate3d(${(f.x * p).toFixed(1)}px, ${(f.y * p).toFixed(1)}px, 0) rotate(${(f.r * p).toFixed(2)}deg)`;
    }
  };
  const queue = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  update();
}
