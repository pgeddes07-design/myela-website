// Version B order builder. Works alongside pour.ts: pour.ts swaps the flavour,
// this keeps the order list and writes the WhatsApp message.
import { WHATSAPP_NUMBER, whatsappLink } from '../data/site';

type Line = { flavour: string; size: string; qty: number };
const STEP = 10; // tuckshops order in tens

function init(root: HTMLElement) {
  const nameEl = root.querySelector<HTMLElement>('.me-pour__name');
  const addBtn = root.querySelector<HTMLButtonElement>('[data-add]');
  const addName = root.querySelector<HTMLElement>('[data-add-name]');
  const list = root.querySelector<HTMLUListElement>('[data-lines]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const total = root.querySelector<HTMLElement>('[data-total]');
  const send = root.querySelector<HTMLAnchorElement>('[data-send]');
  if (!nameEl || !addBtn || !list || !send) return;

  const lines: Line[] = [];
  const size = () => root.querySelector<HTMLInputElement>('input[name="me-size"]:checked')?.value ?? '120g';
  const use = () => root.querySelector<HTMLInputElement>('input[name="me-for"]:checked')?.value ?? '';

  // Keep the "Add ..." button in step with the flavour on the stage.
  new MutationObserver(() => { if (addName) addName.textContent = nameEl.textContent; }).observe(nameEl, { childList: true, characterData: true, subtree: true });

  function message() {
    if (!lines.length) {
      return "Hi Myela! I'd like to order some frozen yoghurt.\n\nFlavours:\nHow many cups (120g or 200g):\nIt's for:";
    }
    const rows = lines.map((l) => `- ${l.flavour} ${l.size} x ${l.qty}`).join('\n');
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const forLine = use() ? `\nIt's for: ${use()}` : '';
    return `Hi Myela! I'd like to order:\n\n${rows}\n\nTotal: ${count} cups${forLine}\n\nPlease send me pricing. Thanks!`;
  }

  function render() {
    list!.replaceChildren(
      ...lines.map((l, i) => {
        const li = document.createElement('li');
        li.className = 'me-builder__line';
        li.innerHTML = `
          <span class="me-builder__flav"></span>
          <span class="me-builder__qty">
            <button type="button" class="me-builder__step" data-dec aria-label="Fewer">−</button>
            <input type="number" inputmode="numeric" min="0" step="1" aria-label="Number of cups" />
            <button type="button" class="me-builder__step" data-inc aria-label="More">+</button>
          </span>`;
        li.querySelector('.me-builder__flav')!.textContent = `${l.flavour} ${l.size}`;
        const input = li.querySelector('input')!;
        input.value = String(l.qty);
        input.setAttribute('aria-label', `Cups of ${l.flavour} ${l.size}`);
        li.querySelector('[data-dec]')!.setAttribute('aria-label', `${STEP} fewer ${l.flavour}`);
        li.querySelector('[data-inc]')!.setAttribute('aria-label', `${STEP} more ${l.flavour}`);
        const set = (q: number) => {
          if (q <= 0) lines.splice(i, 1);
          else l.qty = q;
          render();
        };
        li.querySelector('[data-dec]')!.addEventListener('click', () => set(l.qty - STEP));
        li.querySelector('[data-inc]')!.addEventListener('click', () => set(l.qty + STEP));
        input.addEventListener('change', () => set(Math.max(0, Math.round(Number(input.value) || 0))));
        return li;
      }),
    );
    const count = lines.reduce((n, l) => n + l.qty, 0);
    if (empty) empty.hidden = lines.length > 0;
    if (total) {
      total.hidden = !lines.length;
      total.textContent = `${count} cups`;
    }
    const href = whatsappLink(message(), WHATSAPP_NUMBER);
    if (href) send!.href = href;
  }

  addBtn.addEventListener('click', () => {
    // Pressing the current flavour's button stops the pour machine cycling on its own.
    root.querySelector<HTMLButtonElement>('.me-pour__btn[aria-pressed="true"]')?.click();
    const flavour = nameEl.textContent?.trim() ?? '';
    if (!flavour) return;
    const s = size();
    const existing = lines.find((l) => l.flavour === flavour && l.size === s);
    if (existing) existing.qty += STEP;
    else lines.push({ flavour, size: s, qty: STEP });
    render();
  });
  root.querySelectorAll('input[name="me-for"]').forEach((r) => r.addEventListener('change', render));

  render();
}

document.querySelectorAll<HTMLElement>('.me-builder').forEach(init);

export {};
