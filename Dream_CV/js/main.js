/* =========================================================
   VINENDDER — DREAM CV
   1. Helpers   2. Theme   3. Render pages from data.js
   4. Page router (slide directions)   5. Skill goals (ticks)
   ========================================================= */
(() => {
  'use strict';

  /* ---------- 1. Helpers ---------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE = 'cubic-bezier(.77, 0, .18, 1)';
  const SLIDE_MS = reduceMotion ? 1 : 950;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode: ignore */ } }
  };

  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2200);
  }

  /* ---------- 2. Theme (light / dark) ---------- */
  const themeBtn = $('#themeBtn');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    store.set('theme', theme);
  }

  themeBtn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.classList.add('theme-switching');                 // pauses other transitions while we switch

    // Browsers with View Transitions get a circle that grows out of the button.
    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      setTimeout(() => root.classList.remove('theme-switching'), 60);
      return;
    }
    const r = themeBtn.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const vt = document.startViewTransition(() => applyTheme(next));
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 900, easing: EASE, pseudoElement: '::view-transition-new(root)' }
      );
    });
    vt.finished.finally(() => root.classList.remove('theme-switching'));
  });

  /* ---------- Render: every page is built from CV (js/data.js) ---------- */
  const CV = window.CV;
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const swash = (text, cls) => {
    const [cap, ...rest] = [...text];
    return `<span class="swash__cap" aria-hidden="true">${esc(cap)}</span><span class="swash__rest" aria-hidden="true"><span class="swash__txt">${esc(rest.join(''))}</span></span>`;
  };
  const backBtn = `<button class="nav-btn nav-btn--ghost" data-back type="button"><span class="nav-btn__idx"><i>[</i> ← <i>]</i></span><span class="nav-btn__label">Back</span></button>`;
  const navBtn = (key, zone) => {
    const p = CV.pages[key];
    const dir = { side: 'right', foot: 'bottom', top: 'top' }[zone];
    return `<button class="nav-btn${zone === 'top' ? ' nav-btn--ghost' : ''}" data-go="${key}" data-dir="${dir}" type="button"><span class="nav-btn__idx"><i>[</i> ${pad(p.n)} <i>]</i></span><span class="nav-btn__label">${esc(p.button)}</span></button>`;
  };
  const row = (r, i, small) => `<li class="row rv" style="--i:${i + 4}"><span class="idx">[ ${pad(i + 1)} ]</span><h3>${esc(r.title)}</h3><p>${esc(r.text)}${r[small] ? `<small>${esc(r[small])}</small>` : ''}</p></li>`;

  const bodies = {
    companies:   () => `<ul class="rows rows--big">${CV.companies.map((r, i) => row(r, i)).join('')}</ul>`,
    skills:      () => `<ul class="rows">${CV.skills.map((r, i) => row(r, i)).join('')}</ul>`,
    chasing:     () => `<ul class="goals">${CV.chasing.map((g, i) => `<li class="rv" style="--i:${i + 4}"><button class="goal" aria-pressed="false" type="button"><span class="goal__box"></span><span class="goal__body"><span class="goal__text">${esc(g.title)}</span><span class="goal__sub">${esc(g.text)}</span></span></button></li>`).join('')}</ul>`,
    projects:    () => `<ul class="rows">${CV.projects.map((r, i) => row(r, i, 'stack')).join('')}</ul>`,
    plan:        () => `<ol class="timeline">${CV.plan.map((s, i) => `<li class="rv" style="--i:${i + 3}"><span class="timeline__when">${esc(s.when)}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('')}</ol>`,
    internships: () => `<ul class="rows rows--big">${CV.internships.map((r, i) => row(r, i)).join('')}</ul>`,
    company:     () => `<ul class="rows">${CV.company.rows.map((r, i) => row(r, i)).join('')}</ul>`
  };

  const H = CV.home;
  const home = `
    <section class="page is-active" id="home" aria-label="Home">
      <header class="bar">${H.nav.top.map(k => navBtn(k, 'top')).join('')}
        <p class="bar__mid"><span class="spark">✦</span> ${esc(H.name)} <em>${esc(H.tagline)}</em> <span class="spark">✦</span></p>
      </header>
      <div class="home__body">
        <figure class="portrait rv" style="--i:1">
          ${H.photo ? `<img src="${esc(H.photo)}" alt="${esc(H.name)}">` : `<div class="monogram" aria-hidden="true">${esc(H.monogram)}</div>`}
          <figcaption><span>[ 00 ]</span> ${esc(H.caption)}</figcaption>
        </figure>
        <div class="home__text">
          <p class="meta rv" style="--i:2">[ ${esc(H.metaLabel)} ] <em>${esc(H.date)}</em></p>
          <h1 class="swash swash--xl" aria-label="${esc(H.title)} by ${esc(H.name)}">${swash(H.title, '')}<em class="swash__by rv" style="--i:5" aria-hidden="true">by ${esc(H.name)}</em></h1>
          <div class="about">
            ${H.about.map((t, i) => `<p class="rv" style="--i:${i + 6}">${esc(t)}</p>`).join('')}
            <ul class="socials rv" style="--i:8; margin-top:1.2rem">${H.links.map(l => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`).join('')}</ul>
          </div>
          <nav class="side-nav rv" style="--i:8" aria-label="Pages">${H.nav.side.map(k => navBtn(k, 'side')).join('')}</nav>
        </div>
      </div>
      <nav class="foot-nav rv" style="--i:9" aria-label="More pages">${H.nav.foot.map(k => navBtn(k, 'foot')).join('')}</nav>
    </section>`;

  const inner = Object.keys(bodies).map(key => {
    const p = CV.pages[key];
    const intro = key === 'company' ? CV.company.tagline : p.intro;
    return `<section class="page" id="${key}" aria-label="${esc(p.title)}">
      <header class="bar">${backBtn}<p class="bar__mid">[ ${pad(p.n)} ] <em>${esc(p.eyebrow)}</em></p></header>
      <div class="wrap wrap--narrow"><h2 class="swash swash--lg" aria-label="${esc(p.title)}">${swash(p.title, '')}</h2>
        ${intro ? `<p class="intro rv" style="--i:3">${esc(intro)}</p>` : ''}${bodies[key]()}</div></section>`;
  }).join('');

  $('#stage').innerHTML = home + inner;
  document.title = `${H.name} — ${H.title}`;

  /* ---------- 4. Page router ----------
     Going FORWARD: the new page enters from the side the button sits on
       data-dir="right"  -> slides in from the right
       data-dir="bottom" -> slides in from the bottom
       data-dir="top"    -> slides in from the top (top / left buttons)
     Going BACK: the previous page always slides in from the left. */
  const pages = Object.fromEntries($$('.page').map(p => [p.id, p]));
  const START = { right: ['100%', '0'], bottom: ['0', '100%'], top: ['0', '-100%'], left: ['-100%', '0'] };
  const entryDir = {};          // remembers which side each page arrived from, so Back can retrace it
  let current = 'home';
  let busy = false;
  let queued = null;

  const dirFor = id => ($(`[data-go="${id}"]`) || {}).dataset?.dir || 'right';
  const drift = v => (v === '0' ? '0' : v.startsWith('-') ? '22%' : '-22%');   // how far home slips away behind a page

  function showText(page) {                    // re-triggers the heading + reveal animations
    page.classList.remove('is-in');
    void page.offsetWidth;                     // force reflow so the CSS transitions replay
    page.classList.add('is-in');
  }

  /* Forward: new page slides in over home while home drifts a little the other way.
     Back:    the exact reverse. The page slides out the way it came, and home eases back
              from its drift. Home is never re-animated, so nothing flashes or rebuilds. */
  function go(id, dir, push = true, back = false) {
    if (!pages[id] || id === current) return;
    if (busy) { queued = [id, dir, push, back]; return; }
    busy = true;

    const from = pages[current];
    const to = pages[id];
    const opts = { duration: SLIDE_MS, easing: EASE, fill: 'both' };
    let inAnim, outAnim, lead;

    if (!back) {
      entryDir[id] = dir;
      const [x, y] = START[dir] || START.right;
      to.scrollTop = 0;
      to.style.zIndex = 3;
      to.classList.add('is-active');
      inAnim  = to.animate([{ transform: `translate(${x}, ${y})` }, { transform: 'translate(0, 0)' }], opts);
      outAnim = from.animate([{ transform: 'translate(0, 0)', opacity: 1 }, { transform: `translate(${drift(x)}, ${drift(y)})`, opacity: .35 }], opts);
      lead = inAnim;
    } else {
      const [x, y] = START[entryDir[current] || 'right'];
      from.style.zIndex = 3;
      to.style.zIndex = 2;
      to.classList.add('is-active');
      outAnim = from.animate([{ transform: 'translate(0, 0)' }, { transform: `translate(${x}, ${y})` }], opts);
      inAnim  = to.animate([{ transform: `translate(${drift(x)}, ${drift(y)})`, opacity: .35 }, { transform: 'translate(0, 0)', opacity: 1 }], opts);
      lead = outAnim;
    }

    if (!to.classList.contains('is-in')) setTimeout(() => showText(to), SLIDE_MS * 0.3);
    if (push) history.pushState({ id }, '', '#' + id);

    lead.onfinish = () => {
      inAnim.cancel(); outAnim.cancel();
      from.classList.remove('is-active');
      if (from.id !== 'home') from.classList.remove('is-in');   // home keeps its content so coming back is instant
      from.style.zIndex = to.style.zIndex = '';
      current = id;
      busy = false;
      if (queued) { const q = queued; queued = null; go(...q); }
    };
  }

  function goBack() {
    if (current === 'home') return;
    if (history.state && history.state.id !== 'home') history.back();   // popstate does the sliding
    else { history.replaceState({ id: 'home' }, '', location.pathname); go('home', null, false, true); }
  }

  window.addEventListener('popstate', e => {                // browser back / forward buttons
    const id = (e.state && e.state.id) || 'home';
    if (id === 'home') go('home', null, false, true);
    else go(id, dirFor(id), false);
  });

  document.addEventListener('click', e => {
    const forward = e.target.closest('[data-go]');
    if (forward) return go(forward.dataset.go, forward.dataset.dir);
    if (e.target.closest('[data-back]')) goBack();
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    goBack();
  });

  // First load: open a page directly if the URL has #projects etc., then play the home animation.
  history.replaceState({ id: 'home' }, '', location.pathname);
  const startHash = location.hash.slice(1);
  const begin = () => {
    if (pages[startHash] && startHash !== 'home') {
      pages.home.classList.remove('is-active');
      pages[startHash].classList.add('is-active');
      current = startHash;
      entryDir[startHash] = dirFor(startHash);
      history.pushState({ id: startHash }, '', '#' + startHash);
    }
    showText(pages[current]);
  };
  // wait until the three fonts are really loaded, otherwise the swash letter swaps in mid-animation
  const fontsReady = Promise.all([
    document.fonts.load('1em "Pinyon Script"', 'P'),
    document.fonts.load('1em "Playfair Display"', 'ortfolio'),
    document.fonts.load('300 1em Poppins')
  ]).catch(() => {});
  Promise.race([fontsReady, new Promise(r => setTimeout(r, 2500))]).then(() => requestAnimationFrame(begin));

  /* ---------- 5. Skill goals (ticks are remembered) ---------- */
  const goalBtns = $$('.goal');
  const saved = (store.get('cvGoals') || '').split(',');
  goalBtns.forEach((btn, i) => {
    if (saved.includes(String(i))) btn.setAttribute('aria-pressed', 'true');
    btn.addEventListener('click', () => {
      btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') !== 'true');
      store.set('cvGoals', goalBtns.map((b, n) => b.getAttribute('aria-pressed') === 'true' ? n : '').filter(v => v !== '').join(','));
    });
  });
})();
