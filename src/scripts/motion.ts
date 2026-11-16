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
  type Flyer = { el: HTMLElement; anchor: HTMLElement; mode: string; x: number; y: number; r: number; mx: number | null; visible: boolean };
  // On phones the hero stacks: cups sit between the headline and the buttons, so they only slide sideways there.
  const phone = window.matchMedia('(max-width: 760px)');
  const flyers: Flyer[] = [...document.querySelectorAll<HTMLElement>('[data-fly]')].map((el) => ({
    el,
    anchor: el.parentElement as HTMLElement,
    mode: el.dataset.fly || 'pass',
    x: Number(el.dataset.x || 0),
    y: Number(el.dataset.y || 0),
    r: Number(el.dataset.r || 0),
    mx: el.dataset.mx !== undefined && el.dataset.mx !== '' ? Number(el.dataset.mx) : null,
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
      const side = phone.matches && f.mx !== null;
      const x = side ? (f.mx as number) : f.x;
      const y = side ? 0 : f.y;
      const r = side ? f.r * 0.5 : f.r;
      f.el.style.transform = `translate3d(${(x * p).toFixed(1)}px, ${(y * p).toFixed(1)}px, 0) rotate(${(r * p).toFixed(2)}deg)`;
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

export {};
