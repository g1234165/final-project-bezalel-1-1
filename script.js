// ════════════════════════════════════════
// 1.  Scale — fit 2048×1070 canvas to screen
// ════════════════════════════════════════
// transform-origin: top right keeps panel 0
// (rightmost) anchored in RTL layout.

function fitToScreen() {
  const wrapper = document.querySelector('.accordion-wrapper');
  const scale = Math.min(
    window.innerWidth  / 2048,
    window.innerHeight / 1070
  );
  wrapper.style.transform       = `scale(${scale})`;
  wrapper.style.transformOrigin = 'top right';
}

fitToScreen();
window.addEventListener('resize', fitToScreen);

// ════════════════════════════════════════
// 2.  Star SVG  (from עיגול רופאים.svg)
// ════════════════════════════════════════

const STAR_PATH =
  'M28.4237 54.439C28.3176 53.949 28.1833 53.3843 28.0114 52.7589C27.3868 50.4866 ' +
  '26.2797 47.4021 24.3454 44.15C20.6933 38.0099 14.1034 31.292 2.32148 28.3023C14.3631 ' +
  '25.4361 20.9632 18.7048 24.556 12.5188C26.4561 9.24706 27.5114 6.13475 28.0922 3.83943C' +
  '28.2389 3.25975 28.3556 2.73144 28.4478 2.2657C28.6385 2.83587 28.8729 3.50413 29.1577 ' +
  '4.24754C30.1075 6.72651 31.6047 10.0601 33.7946 13.4751C37.8259 19.7615 44.2388 26.3723 ' +
  '53.9423 28.372C44.1216 31.0167 37.703 37.607 33.6938 43.715C31.5211 47.0251 30.0491 ' +
  '50.2022 29.1204 52.5518C28.8396 53.2622 28.6099 53.898 28.4237 54.439Z';

function makeStar(filled) {
  const attr = filled
    ? 'fill="#F8F4EE"'
    : 'fill="none" stroke="#F8F4EE" stroke-width="0.8"';
  return `<svg viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="${STAR_PATH}" ${attr}/>
  </svg>`;
}

// ════════════════════════════════════════
// 3.  Doctor quotes (hover swap)
// ════════════════════════════════════════

const QUOTES = [
  '"כנראה שאת פשוט לא שומרת על היגיינה"',
  '"זה יעבור אם תורידי קצת במשקל"',
  '"זה קשור למצב הנפשי שלך, תירגעי"',
  '"אני רושם אנטיביוטיקה לחודשיים ונראה"',
  '"זו רק דלקת זקיק שערה, שום דבר רציני"',
  '"הגזמת קצת, זה כולה פצע קטן"',
  '"אין לי מושג מה זה, ננסה משחה"',
  '"את בטח לא שותה מספיק מים"',
  '"תנסי לשנות סבון"',
  '"הגוף שלך פשוט כזה"',
];

const DEFAULT_QUOTE = '"ציטוט"';

// ════════════════════════════════════════
// 4.  Build doctors grid
// ════════════════════════════════════════

const grid    = document.getElementById('doctors-grid');
const quoteEl = document.getElementById('quote-text');

// Build flex-column structure: 6 rows (.doctors-row) × 10 cells (.doctor-cell)
// Matches Figma's .div2 (column) → .div3 (row) → .icon structure
if (grid && quoteEl) {
  let doctorIndex = 0;
  for (let row = 0; row < 6; row++) {
    const rowEl = document.createElement('div');
    rowEl.className = 'doctors-row';

    for (let col = 0; col < 10; col++) {
      const cell = document.createElement('div');
      cell.className = 'doctor-cell';
      cell.innerHTML = makeStar(true);

      const q = QUOTES[doctorIndex % QUOTES.length];
      cell.addEventListener('mouseenter', () => { quoteEl.textContent = q; });
      cell.addEventListener('mouseleave', () => { quoteEl.textContent = DEFAULT_QUOTE; });

      rowEl.appendChild(cell);
      doctorIndex++;
    }

    grid.appendChild(rowEl);
  }
}

// ════════════════════════════════════════
// 5.  Accordion — all panels clickable
// ════════════════════════════════════════
// Panel 1 is active by default (set in HTML).
// Clicking any tab opens that panel and closes all others.

const panels = Array.from(document.querySelectorAll('.panel'));

panels.forEach(panel => {
  const tab = panel.querySelector('.panel-tab');
  if (!tab) return;

  tab.addEventListener('click', () => {
    if (panel.classList.contains('active')) return;
    panels.forEach(p => p.classList.remove('active'));
    panel.classList.add('active');
  });
});
