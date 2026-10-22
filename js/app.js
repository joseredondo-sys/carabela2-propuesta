/*! © 2026 Ad2Place Digital (Inversiones Azteca Mataró S.L.). Código propiedad de Ad2Place. Prohibida su copia o uso sin autorización escrita. */
/* Carabela II · maqueta navegable (Ad2Place) */
(() => {
  'use strict';

  const LANGS = ['de', 'en', 'es', 'fr'];
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HAS_GSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const app = document.getElementById('app');
  const footerEl = document.getElementById('footer');
  let lang = 'es';
  let T = window.I18N.es;
  let lenis = null;
  let firstRender = true;

  /* ---------- Iconos ---------- */
  const I = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="7.5" cy="8.5" r="1.3"/></svg>',
    towel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M6 4h12v16H6z"/><path d="M6 8h12M9 12h6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
    wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 9c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/></svg>',
    dot: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.5" stroke-linecap="round"/></svg>',
    flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/></svg>'
  };
  const PERK_ICONS = [I.tag, I.towel, I.clock, I.chat];

  /* Rosa de los vientos (logo de su página de Facebook, redibujado) */
  function rose(cls = '') {
    const long = (r) => `<g transform="rotate(${r} 50 50)"><path d="M50 3 L56.5 43.5 L50 50Z" fill="currentColor"/><path d="M50 3 L43.5 43.5 L50 50Z" fill="currentColor" opacity=".45"/></g>`;
    const short = (r) => `<g transform="rotate(${r} 50 50)"><path d="M50 17 L54 46 L50 50Z" fill="currentColor" opacity=".8"/><path d="M50 17 L46 46 L50 50Z" fill="currentColor" opacity=".35"/></g>`;
    return `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="31" fill="none" stroke="currentColor" stroke-width=".8" opacity=".6"/><circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" stroke-width=".6" stroke-dasharray="1 3" opacity=".6"/><g class="rose">${[45, 135, 225, 315].map(short).join('')}${[0, 90, 180, 270].map(long).join('')}<circle cx="50" cy="50" r="2.4" fill="currentColor"/></g></svg>`;
  }

  /* ---------- Datos ---------- */
  const TYPES = {
    estudio: { max: 2, units: 5, base: [68, 89, 118], hero: 'img/ia/estudio-1-estancia.webp', imgs: ['img/ia/estudio-1-estancia.webp', 'img/ia/estudio-2-balcon.webp', 'img/ia/bano.webp', 'img/ia/exterior-piscina-manana.webp'], feats: ['kitchenette', 'balcony', 'ac', 'tv', 'safe', 'wifi', 'hairdryer', 'shower'] },
    apartamento: { max: 3, units: 5, base: [84, 109, 142], hero: 'img/ia/apartamento-1-salon.webp', imgs: ['img/ia/apartamento-1-salon.webp', 'img/ia/apartamento-2-dormitorio.webp', 'img/ia/bano.webp', 'img/ia/exterior-piscina-golden.webp'], feats: ['bedroom', 'sofabed', 'kitchenette', 'balcony', 'ac', 'tv', 'safe', 'wifi'] },
    duplex: { max: 3, units: 4, base: [96, 125, 162], hero: 'img/ia/duplex-1-salon.webp', imgs: ['img/ia/duplex-1-salon.webp', 'img/ia/duplex-2-altillo.webp', 'img/ia/duplex-3-terraza-bali.webp', 'img/ia/bano.webp', 'img/real/duplex-real.webp'], feats: ['mezzanine', 'balibed', 'sofabed', 'kitchenette', 'ac', 'tv', 'safe', 'wifi'] }
  };
  const TYPE_KEYS = Object.keys(TYPES);

  /* ---------- Utilidades ---------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const L = (path) => `#/${lang}${path ? '/' + path : '/'}`;
  const money = (n) => new Intl.NumberFormat(T.locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  const money2 = (n) => new Intl.NumberFormat(T.locale, { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  const fmtDate = (d, opts = { day: 'numeric', month: 'short' }) => d ? new Intl.DateTimeFormat(T.locale, opts).format(d) : '—';
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parseIso = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const nightsBetween = (a, b) => Math.round((b - a) / 864e5);
  const TODAY = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
  const splitLines = (lines) => lines.map(l => `<span class="line"><span>${l}</span></span>`).join('');

  /* Datos reales de Beds24 (data/beds24.json, copia que actualiza GitHub Actions).
     Si no cargan, la maqueta usa la temporada y los precios simulados. */
  let LIVE = null;
  const liveDay = (d) => LIVE && LIVE.days[iso(d)];
  const liveCell = (type, d) => { const r = liveDay(d); return r ? r[LIVE.order.indexOf(type)] : null; };

  /* Temporada de abril a octubre */
  const isOpen = (d) => {
    if (LIVE) { const r = liveDay(d); return !!(r && r.some(c => c && c[0])); }
    return d.getMonth() >= 3 && d.getMonth() <= 9;
  };
  const tier = (d) => { const m = d.getMonth(); return (m === 6 || m === 7) ? 2 : (m === 4 || m === 5 || m === 8) ? 1 : 0; };
  const nightPrice = (type, d) => { const c = liveCell(type, d); if (LIVE) return c && c[0] ? c[0] : 0; const b = TYPES[type].base[tier(d)]; const wk = d.getDay() === 5 || d.getDay() === 6; return Math.round(b * (wk ? 1.08 : 1)); };
  const availOn = (type, d) => {
    if (LIVE) { const c = liveCell(type, d); return c && c[0] ? Math.max(0, c[1]) : 0; }
    const idx = TYPE_KEYS.indexOf(type);
    const h = (d.getFullYear() * 373 + (d.getMonth() + 1) * 131 + d.getDate() * 17 + idx * 101 + d.getDate() * d.getDate()) % 100;
    const occ = [0.15, 0.45, 0.72][tier(d)] + (h / 100) * 0.35 + (type === 'duplex' ? 0.06 : 0);
    return Math.max(0, TYPES[type].units - Math.round(TYPES[type].units * occ));
  };
  const quote = (type, a, b, adults) => {
    let total = 0, min = 99, tax = 0;
    for (let i = 0, d = new Date(a); d < b; i++, d = addDays(d, 1)) {
      total += nightPrice(type, d);
      min = Math.min(min, availOn(type, d));
      const rate = (d.getMonth() >= 10 || d.getMonth() <= 3) ? 0.55 : 2.2;
      tax += rate * adults * (i >= 8 ? 0.5 : 1);
    }
    const first = liveCell(type, a), minStay = LIVE && first ? first[2] || 1 : 1;
    const nights = nightsBetween(a, b);
    return { total, left: nights < minStay ? 0 : Math.max(0, min), minStay: nights < minStay ? minStay : 0, tax, other: Math.round(total * 1.15 / 5) * 5 };
  };

  /* Estado compartido de la reserva */
  const nextJuneSat = (() => { let y = TODAY.getFullYear() + (TODAY.getMonth() > 5 ? 1 : 0); let d = new Date(y, 5, 1); while (d.getDay() !== 6) d = addDays(d, 1); return d; })();
  const BK = { in: nextJuneSat, out: addDays(nextJuneSat, 7), adults: 2, type: null, step: 1, offset: 0, data: {} };
  const monthOffsetFor = (d) => (d.getFullYear() - TODAY.getFullYear()) * 12 + d.getMonth() - TODAY.getMonth();

  /* ---------- Plantillas compartidas ---------- */
  function header() {
    const n = T.nav;
    return `
      <div class="container header__inner">
        <a href="${L('')}" class="logo" aria-label="Carabela II">
          <span class="logo__mark">${rose()}</span>
          <span class="logo__text"><span class="logo__name">Carabela II</span><span class="logo__sub">Apartamentos · Paguera</span></span>
        </a>
        <nav class="nav" aria-label="Principal">
          <a class="nav__link" data-r="" href="${L('')}">${n.home}</a>
          <a class="nav__link" data-r="apartamentos" href="${L('apartamentos')}">${n.apartments}</a>
          <a class="nav__link" data-r="complejo" href="${L('complejo')}">${n.complex}</a>
          <a class="nav__link" data-r="paguera" href="${L('paguera')}">${n.area}</a>
          <a class="nav__link" data-r="contacto" href="${L('contacto')}">${n.contact}</a>
        </nav>
        <div class="header__right">
          <div class="lang">
            <button class="lang__btn" aria-haspopup="true" aria-expanded="false">${I.globe}${lang.toUpperCase()}</button>
            <div class="lang__menu" role="menu">
              ${[['de', 'Deutsch'], ['en', 'English'], ['es', 'Español'], ['fr', 'Français']].map(([c, nm]) => `<a role="menuitem" href="#" data-lang="${c}" aria-current="${c === lang}">${nm}<span>${c.toUpperCase()}</span></a>`).join('')}
            </div>
          </div>
          <a href="${L('reservar')}" class="btn btn--sea btn--sm btn-book" data-magnetic>${n.book}</a>
          <button class="burger" aria-label="${n.menu}"><span></span><span></span></button>
        </div>
      </div>`;
  }
  function mobileNav() {
    const n = T.nav;
    return `<button class="mnav__close" aria-label="${n.close}">${I.close}</button>
      <a href="${L('')}">${n.home}</a><a href="${L('apartamentos')}">${n.apartments}</a><a href="${L('complejo')}">${n.complex}</a>
      <a href="${L('paguera')}">${n.area}</a><a href="${L('contacto')}">${n.contact}</a><a href="${L('reservar')}" style="color:var(--sea-light)">${n.book} →</a>`;
  }
  function footer() {
    const f = T.footer, n = T.nav;
    return `
      <div class="container">
        <div class="footer__big" aria-hidden="true"><span>Carabela II</span></div>
        <div class="footer__grid">
          <div>
            <h4>Carabela II</h4>
            <p>${f.address}</p>
            <p style="margin-top:.5rem"><a href="tel:+34971685732">+34 971 68 57 32</a><br><a href="mailto:aptocarabela2@hotmail.com">aptocarabela2@hotmail.com</a></p>
            <p class="tiny" style="color:rgba(255,255,255,.5);margin-top:1rem">${f.reg}</p>
          </div>
          <div><h4>${n.menu}</h4><ul><li><a href="${L('apartamentos')}">${n.apartments}</a></li><li><a href="${L('complejo')}">${n.complex}</a></li><li><a href="${L('paguera')}">${n.area}</a></li><li><a href="${L('reservar')}">${n.book}</a></li></ul></div>
          <div><h4>${f.langs}</h4><ul>${[['de', 'Deutsch'], ['en', 'English'], ['es', 'Español'], ['fr', 'Français']].map(([c, nm]) => `<li><a href="#" data-lang="${c}">${nm}</a></li>`).join('')}</ul></div>
          <div><h4>Legal</h4><ul>${f.legal.map(x => `<li><a href="#" data-demo>${x}</a></li>`).join('')}</ul></div>
        </div>
        <div class="footer__bottom"><span>© ${new Date().getFullYear()} Apartamentos Carabela II</span><span>${f.made}</span></div>
      </div>`;
  }
  function aptCard(key, i, opts = {}) {
    const t = T.types[key], d = TYPES[key];
    const chips = d.feats.slice(0, 3).map(f => `<span class="chip">${T.feat[f]}</span>`).join('');
    return `
      <a class="apt-card" href="${L('apartamentos/' + key)}" data-cursor="${T.apts.discover}">
        <div class="apt-card__img"><img src="${d.hero}" alt="${t.name}" loading="lazy"></div>
        <span class="apt-card__num">0${i + 1}</span>
        <span class="apt-card__ai">Foto no real · IA</span>
        <span class="apt-card__price"><small>${T.apts.from}</small><b>${money(d.base[0])}</b><small>${T.apts.night.replace('/', '')} · ${T.apts.example}</small></span>
        <div class="apt-card__body">
          <h3 class="apt-card__name">${t.name}</h3>
          <p class="apt-card__tag">${t.tagline}</p>
          ${opts.noChips ? '' : `<div class="apt-card__chips">${chips}<span class="chip">${t.cap}</span></div>`}
        </div>
        <span class="apt-card__go">${I.arrow}</span>
      </a>`;
  }
  const finalCta = () => `
    <section class="final">
      <div class="final__bg" data-parallax="15"><img src="img/ia/exterior-piscina-golden.webp" alt="" loading="lazy"></div>
      <div class="container">
        <h2 class="final__title">${T.cta.title.replace('Paguera', '<em>Paguera</em>')}</h2>
        <a href="${L('reservar')}" class="btn btn--light" data-magnetic>${T.cta.btn} ${I.arrow}</a>
      </div>
    </section>`;

  /* ---------- Páginas ---------- */
  function pageHome() {
    const h = T.hero, s = T.search;
    const nights = nightsBetween(BK.in, BK.out);
    const mq = [...T.marquee, ...T.marquee].map(w => `<span class="marquee__item">${w}${rose()}</span>`).join('');
    const words = T.intro.text.split(' ').map(w => `<span class="w">${w} </span>`).join('');
    const scores = [['lastminute.de', 9.2, 62], ['weg.de', 9.1, 58], ['Trip.com', 8.9, null], ['check24', 8.7, 40]];
    return `
      <section class="hero" id="top">
        <div class="hero__media"><video class="hero__video" autoplay muted loop playsinline preload="auto" poster="video/hero-poster.jpg"></video></div>
        <span class="hero__note">${h.videoNote}</span>
        <div class="container hero__content">
          <p class="hero__eyebrow js-hero-fade">${h.eyebrow}</p>
          <h1 class="h1">${splitLines(h.title)}</h1>
          <p class="hero__sub js-hero-fade">${h.sub}</p>
        </div>
        <div class="hero__scroll"><span>${h.scroll}</span><i></i></div>
        <form class="search js-hero-fade" onsubmit="return false">
          <span class="search__best">${I.shield}${s.best}</span>
          <a class="search__field" href="${L('reservar')}" data-step="1"><span class="search__label">${s.arrival}</span><span class="search__value">${fmtDate(BK.in, { weekday: 'short', day: 'numeric', month: 'short' })}</span></a>
          <a class="search__field" href="${L('reservar')}" data-step="1"><span class="search__label">${s.departure}</span><span class="search__value">${fmtDate(BK.out, { weekday: 'short', day: 'numeric', month: 'short' })} · ${nights} ${nights === 1 ? T.booking.night1 : T.booking.nights}</span></a>
          <div class="search__field search__field--g"><span class="search__label">${s.guests}</span><span class="search__guests"><button type="button" data-g="-1" aria-label="-">−</button><span class="search__value js-g">${BK.adults} ${BK.adults === 1 ? s.adult : s.adults}</span><button type="button" data-g="1" aria-label="+">+</button></span></div>
          <a class="btn" href="${L('reservar')}" data-step="2" data-magnetic>${s.cta} ${I.arrow}</a>
        </form>
      </section>

      <div class="marquee" aria-hidden="true"><div class="marquee__track">${mq}</div></div>

      <section class="intro">
        ${rose('rose-deco')}
        <div class="container">
          <div class="intro__grid">
            <p class="kicker reveal">${T.intro.kicker}</p>
            <p class="intro__text">${words}</p>
          </div>
          <div class="stats">
            ${T.intro.stats.map(([n, u, l]) => `<div class="stat reveal"><div class="stat__num"><span class="js-count" data-to="${n}">${n}</span><small>${u}</small></div><p class="stat__label">${l}</p></div>`).join('')}
          </div>
        </div>
      </section>

      <section class="apts">
        <div class="container apts__head">
          <div><p class="kicker reveal">${T.apts.kicker}</p><h2 class="h2 reveal">${T.apts.title}</h2></div>
          <p class="lead reveal">${T.apts.sub}</p>
        </div>
        <div class="apts__pin">
          <div class="apts__track">
            ${TYPE_KEYS.map((k, i) => aptCard(k, i)).join('')}
            <div class="apts__end">
              <p class="serif">${T.booking.title}</p>
              <a href="${L('reservar')}" class="btn btn--sea" data-magnetic>${T.search.cta} ${I.arrow}</a>
              <p class="tiny">${T.booking.priceNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="complex">
        <div class="container">
          <div class="complex__head">
            <div><p class="kicker reveal">${T.complex.kicker}</p><h2 class="h2 reveal">${T.complex.title}</h2></div>
            <div><p class="lead reveal">${T.complex.text}</p><p class="reveal" style="margin-top:1.5rem"><a class="link-arrow" href="${L('complejo')}">${T.complex.more} ${I.arrow}</a></p></div>
          </div>
          <div class="bento">
            <div class="tile tile--a clip"><img src="img/ia/exterior-piscina-golden.webp" alt="${T.complex.items[0]}" data-parallax="8" loading="lazy"></div>
            <div class="tile tile--b clip"><img src="img/real/piscina-solarium.webp" alt="${T.complex.items[1]}" data-parallax="8" loading="lazy"><span class="tile__tag">${T.complex.realPhoto}</span></div>
            <div class="tile tile--c clip"><img src="img/real/piscina-panoramica-2.webp" alt="${T.complex.items[0]}" data-parallax="8" loading="lazy"><span class="tile__tag">${T.complex.realPhoto}</span></div>
            <div class="tile tile--d clip"><img src="img/real/jardin-piscina.webp" alt="${T.complex.items[2]}" data-parallax="8" loading="lazy"><span class="tile__tag">${T.complex.realPhoto}</span></div>
            <div class="tile tile--e clip"><img src="img/ia/exterior-piscina-manana.webp" alt="${T.complex.items[0]}" data-parallax="8" loading="lazy"></div>
            <div class="tile tile--f clip">
              ${rose('')}
              <ul class="amen">${T.complex.items.map(x => `<li>${I.check}${x}</li>`).join('')}</ul>
            </div>
          </div>
          <p class="tiny complex__note">${T.complex.aiNote}</p>
        </div>
      </section>

      <section class="direct on-dark">
        ${rose('direct__rose')}
        <div class="container direct__grid">
          <div>
            <p class="kicker reveal">${T.direct.kicker}</p>
            <h2 class="h2 reveal">${T.direct.title}</h2>
            <p class="lead reveal" style="margin-top:1.25rem">${T.direct.sub}</p>
            <div class="perks">
              ${T.direct.perks.map(([h3, p], i) => `<div class="perk reveal"><span class="perk__icon">${PERK_ICONS[i]}</span><h3>${h3}</h3><p>${p}</p></div>`).join('')}
            </div>
            <p class="tiny" style="color:rgba(255,255,255,.5);margin-top:1rem">${T.direct.note}</p>
          </div>
          <div class="compare reveal">
            <div class="compare__top"><span class="badge">${T.direct.compareNote}</span><span class="tiny">${T.direct.perStay}</span></div>
            <div class="compare__row"><span>${T.direct.other}</span><s>${money(1080)}</s></div>
            <div class="compare__row"><span>${T.direct.official}</span><b class="js-count-money" data-to="940">${money(940)}</b></div>
            <div class="compare__save"><span>${T.direct.save}</span><b>${money(140)}</b></div>
            <a href="${L('reservar')}" class="btn btn--sea" style="width:100%;margin-top:1.25rem" data-magnetic>${T.cta.btn} ${I.arrow}</a>
          </div>
        </div>
      </section>

      <section class="reviews">
        <div class="container">
          <p class="kicker reveal">${T.reviews.kicker}</p>
          <h2 class="h2 reveal">${T.reviews.title}</h2>
          <div class="reviews__grid">
            ${scores.map(([src, v, c]) => `<div class="score reveal"><div class="score__num"><span class="js-count" data-to="${String(v).replace('.', lang === 'en' ? '.' : ',')}">${String(v).replace('.', lang === 'en' ? '.' : ',')}</span><small>/10</small></div><div class="score__bar"><i style="--v:${v / 10}"></i></div><p class="score__src">${src}</p><p class="score__count">${c ? c + ' ' + T.reviews.reviews : '&nbsp;'}</p></div>`).join('')}
          </div>
          <p class="tiny" style="margin-top:1.25rem">${T.reviews.note}</p>
        </div>
      </section>

      <section class="area">
        <div class="container area__grid">
          <div class="area__media clip">
            <img src="img/real/delfin-peguera.webp" alt="${T.area.dolphin}" data-parallax="10" loading="lazy">
            <span class="badge area__caption">${T.area.dolphin}</span>
            <div class="area__float"><img src="img/real/cala-vista.webp" alt="Paguera" loading="lazy"></div>
          </div>
          <div>
            <p class="kicker reveal">${T.area.kicker}</p>
            <h2 class="h2 reveal">${T.area.title}</h2>
            <p class="lead reveal" style="margin-top:1.25rem">${T.area.text}</p>
            <ul class="dist">${T.area.dist.map(([a, b]) => `<li class="reveal"><b>${a}</b><span>${b}</span></li>`).join('')}</ul>
            <p class="reveal" style="margin-top:2rem"><a class="link-arrow" href="${L('paguera')}">${T.area.more} ${I.arrow}</a></p>
          </div>
        </div>
      </section>
      ${finalCta()}`;
  }

  function pageHero(img, kicker, lines, lead, back) {
    return `
      <section class="page-hero">
        <div class="page-hero__bg" data-parallax="12"><img src="${img}" alt=""></div>
        <div class="container">
          ${back ? `<a class="back" href="${back[0]}">${I.arrow}${back[1]}</a><br>` : ''}
          <p class="kicker js-hero-fade">${kicker}</p>
          <h1>${splitLines(lines)}</h1>
          ${lead ? `<p class="lead js-hero-fade">${lead}</p>` : ''}
        </div>
      </section>`;
  }

  function pageApartments() {
    return pageHero('img/ia/duplex-3-terraza-bali.webp', T.apts.kicker, [T.apts.title], T.apts.sub) + `
      <section class="detail"><div class="container">
        <div class="others others--tall">${TYPE_KEYS.map((k, i) => aptCard(k, i)).join('')}</div>
        <p class="tiny" style="margin-top:1.25rem">${T.detail.aiNote} ${T.booking.priceNote}</p>
      </div></section>` + finalCta();
  }

  function pageDetail(key) {
    const t = T.types[key], d = TYPES[key], dt = T.detail;
    const idx = TYPE_KEYS.indexOf(key);
    return pageHero(d.hero, `0${idx + 1} · ${T.apts.kicker}`, [t.name], t.tagline, [L('apartamentos'), dt.back]) + `
      <section class="detail"><div class="container detail__grid">
        <div>
          <div class="specs reveal">
            <div class="spec"><small>${dt.cap}</small><b>${t.cap}*</b></div>
            <div class="spec"><small>${dt.beds}</small><b>${t.beds}*</b></div>
            <div class="spec"><small>${dt.size}</small><b>${t.size}*</b></div>
          </div>
          <p class="lead reveal" style="margin-top:2rem">${t.desc}</p>
          <div class="gallery">${d.imgs.map((src, i) => `<button class="clip" data-lb="${i}" data-cursor="+"><img src="${src}" alt="${t.name} ${i + 1}" loading="lazy"></button>`).join('')}</div>
          <p class="tiny" style="margin-top:.75rem">${dt.aiNote}</p>
          <h2 class="block-title reveal">${dt.incl}</h2>
          <ul class="feat-list">${d.feats.map(f => `<li class="reveal">${I.check}${T.feat[f]}</li>`).join('')}</ul>
          <h2 class="block-title reveal">${dt.good}</h2>
          <ul class="policies" style="margin-top:1rem">${dt.policies.map(p => `<li class="reveal">${I.info}${p}</li>`).join('')}</ul>
          <p class="tiny" style="margin-top:1rem">${dt.confirm}</p>
        </div>
        <aside class="sticky-card reveal">
          <span class="badge">${T.apts.example}</span>
          <p class="price" style="margin-top:1rem"><small>${T.apts.from}</small> ${money(d.base[0])}<small>${T.apts.night}</small></p>
          <div class="sum-row" style="margin-top:1rem"><span>${T.search.arrival}</span><b>${fmtDate(BK.in, { day: 'numeric', month: 'short', year: 'numeric' })}</b></div>
          <div class="sum-row"><span>${T.search.departure}</span><b>${fmtDate(BK.out, { day: 'numeric', month: 'short', year: 'numeric' })}</b></div>
          <div class="sum-row"><span>${T.search.guests}</span><b>${BK.adults} ${T.search.adults}</b></div>
          <a class="btn btn--sea" style="width:100%;margin-top:1.25rem" href="${L('reservar')}" data-type="${key}" data-magnetic>${dt.reserve} ${I.arrow}</a>
          <p class="tiny" style="margin-top:1rem;display:flex;gap:.4rem;align-items:center"><span style="width:16px;color:var(--sea)">${I.shield}</span>${T.search.best}</p>
        </aside>
      </div>
      <div class="container">
        <h2 class="block-title reveal">${dt.other}</h2>
        <div class="others">${TYPE_KEYS.filter(k => k !== key).map(k => aptCard(k, TYPE_KEYS.indexOf(k), { noChips: true })).join('')}</div>
      </div></section>`;
  }

  function pageComplex() {
    const c = T.complex;
    const strip = ['img/real/piscina-solarium.webp', 'img/real/piscina-fuente.webp', 'img/real/piscina-tumbonas.webp', 'img/real/jardin-piscina.webp', 'img/real/piscina-panoramica.webp', 'img/real/duplex-real.webp'];
    return pageHero('img/ia/exterior-piscina-manana.webp', c.kicker, [c.title], c.text) + `
      <div class="container">
        <div class="split">
          <div class="split__img clip"><img src="img/ia/exterior-piscina-golden.webp" alt="${c.items[0]}" data-parallax="10" loading="lazy"></div>
          <div>
            <p class="kicker reveal">${c.kicker}</p>
            <h2 class="h2 reveal">${c.items[0]} · ${c.items[1]}</h2>
            <ul class="amen" style="margin-top:2rem">${c.items.map(x => `<li class="reveal" style="font-size:var(--t-base)"><span style="color:var(--sea)">${I.check}</span>${x}</li>`).join('')}</ul>
            <p class="tiny" style="margin-top:1.5rem">${c.aiNote}</p>
          </div>
        </div>
        <p class="kicker reveal">${c.realPhoto}</p>
        <div class="gallery-strip">${strip.map(s => `<figure><img src="${s}" alt="Carabela II" loading="lazy"><figcaption class="tile__tag">${c.realPhoto}</figcaption></figure>`).join('')}</div>
        <div class="cards4" style="padding-bottom:var(--section)">
          ${T.direct.perks.map(([h, p], i) => `<div class="card reveal"><span class="card__n">0${i + 1}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}
        </div>
      </div>` + finalCta();
  }

  function pageArea() {
    const a = T.area;
    const strip = ['img/real/playa-paguera.webp', 'img/real/bahia-paguera.webp', 'img/real/cala-turquesa.webp', 'img/real/bulevar-paguera.webp', 'img/real/cala-vista.webp'];
    return pageHero('video/hero-poster.jpg', a.kicker, [a.title], a.text) + `
      <div class="container">
        <div class="split">
          <div>
            <p class="kicker reveal">${a.kicker}</p>
            <h2 class="h2 reveal">${a.beachesTitle}</h2>
            <ul class="dist">${a.dist.map(([x, y]) => `<li class="reveal"><b>${x}</b><span>${y}</span></li>`).join('')}</ul>
          </div>
          <div class="split__img clip"><img src="img/real/delfin-peguera.webp" alt="${a.dolphin}" data-parallax="10" loading="lazy"></div>
        </div>
        <div class="cards4">${a.beaches.map(([h, p], i) => `<div class="card reveal"><span class="card__n">0${i + 1}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
        <div class="gallery-strip">${strip.map(s => `<figure><img src="${s}" alt="Paguera" loading="lazy"></figure>`).join('')}</div>
        <h2 class="h2 reveal" style="margin-top:var(--section)">${a.doTitle}</h2>
        <div class="cards4">${a.do.map(([h, p], i) => `<div class="card reveal"><span class="card__n">0${i + 1}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
        <div class="split">
          <div><p class="kicker reveal">${a.how}</p><h2 class="h2 reveal">C/ Eucaliptus, 4</h2><p class="lead reveal" style="margin-top:1.25rem">${a.howText}</p></div>
          <div class="map reveal"><iframe title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=Apartamentos%20Carabela%20II%2C%20Paguera&z=15&output=embed"></iframe></div>
        </div>
      </div>` + finalCta();
  }

  function pageContact() {
    const c = T.contact;
    return `
      <section class="contact"><div class="container">
        <p class="kicker reveal">${c.kicker}</p>
        <h1 class="h2 reveal" style="font-size:var(--t-3xl)">${c.title}</h1>
        <p class="lead reveal" style="margin-top:1.25rem">${c.sub}</p>
        <div class="contact__grid">
          <div>
            <ul class="contact__info">
              <li class="reveal"><small>${c.phone}</small><b><a href="tel:+34971685732">+34 971 68 57 32</a></b></li>
              <li class="reveal"><small>${c.mail}</small><b><a href="mailto:aptocarabela2@hotmail.com">aptocarabela2@hotmail.com</a></b></li>
              <li class="reveal"><small>${c.where}</small><b>${T.footer.address}</b></li>
            </ul>
            <div class="map reveal"><iframe title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=Apartamentos%20Carabela%20II%2C%20Paguera&z=16&output=embed"></iframe></div>
          </div>
          <form class="panel reveal js-contact" novalidate>
            <div class="form-grid">
              <div class="field field--full"><label for="cn">${c.name}</label><input id="cn" autocomplete="off"></div>
              <div class="field field--full"><label for="ce">${c.email}</label><input id="ce" type="email" autocomplete="off"></div>
              <div class="field field--full"><label for="cm">${c.msg}</label><textarea id="cm" rows="6"></textarea></div>
            </div>
            <button class="btn btn--sea" style="margin-top:1.25rem" data-magnetic>${c.send} ${I.arrow}</button>
            <p class="err js-contact-msg" aria-live="polite"></p>
          </form>
        </div>
      </div></section>`;
  }

  /* ---------- Motor de reservas (demo) ---------- */
  function pageBooking() {
    return `<section class="booking"><div class="container">
      <div class="notice reveal">${I.flask}<div><b>${T.booking.noticeTitle}</b><p>${T.booking.notice}</p></div></div>
      ${LIVE ? `<div class="notice notice--live reveal">${I.check}<div><b>Beds24</b><p>${T.booking.liveNote.replace('{t}', fmtDate(new Date(LIVE.updated.replace('Z', ':00Z')), { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }))}</p></div></div>` : ''}
      <h1 class="h2 reveal" style="margin-top:2rem">${T.booking.title}</h1>
      <div class="steps js-steps"></div>
      <div class="bk-grid"><div class="js-bk-main"></div><aside class="panel summary js-bk-sum"></aside></div>
    </div></section>`;
  }

  function bkSteps() {
    $('.js-steps').innerHTML = T.booking.steps.map((s, i) => `<span class="step ${i + 1 === BK.step ? 'is-current' : ''} ${i + 1 < BK.step ? 'is-done' : ''}"><i>${i + 1 < BK.step ? '✓' : i + 1}</i>${s}</span>`).join('');
  }

  function bkCalendar() {
    const b = T.booking;
    const months = [0, 1].map(k => {
      const first = new Date(TODAY.getFullYear(), TODAY.getMonth() + BK.offset + k, 1);
      const lbl = new Intl.DateTimeFormat(T.locale, { month: 'long', year: 'numeric' }).format(first); const label = lbl.charAt(0).toUpperCase() + lbl.slice(1);
      const startDow = (first.getDay() + 6) % 7;
      const daysIn = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
      const dows = [...Array(7)].map((_, i) => new Intl.DateTimeFormat(T.locale, { weekday: 'narrow' }).format(new Date(2024, 0, 1 + i)));
      let cells = dows.map(x => `<span class="cal__dow">${x}</span>`).join('') + '<span></span>'.repeat(startDow);
      for (let dd = 1; dd <= daysIn; dd++) {
        const d = new Date(first.getFullYear(), first.getMonth(), dd);
        const past = d < TODAY, open = isOpen(d);
        const dis = past || !open;
        const s = iso(d);
        let cls = 'day';
        if (!open && !past) cls += ' is-closed';
        if (BK.in && iso(BK.in) === s) cls += ' is-start';
        if (BK.out && iso(BK.out) === s) cls += ' is-end';
        if (BK.in && BK.out && d > BK.in && d < BK.out) cls += ' in-range';
        cells += `<button class="${cls}" data-d="${s}" ${dis ? 'disabled' : ''} aria-label="${fmtDate(d, { day: 'numeric', month: 'long', year: 'numeric' })}${!open ? ' · ' + b.closed : ''}">${dd}${!dis ? `<small>${nightPrice('estudio', d)}</small>` : ''}</button>`;
      }
      return `<div class="cal"><p class="cal__month">${label}</p><div class="cal__grid">${cells}</div></div>`;
    }).join('');
    const hint = !BK.in || (BK.in && BK.out) ? b.selectIn : b.selectOut;
    $('.js-bk-main').innerHTML = `
      <div class="panel">
        <div class="cal-head"><h2>${hint}</h2><div class="cal-nav"><button class="js-prev" aria-label="prev" ${BK.offset <= 0 ? 'disabled' : ''}>${I.arrow}</button><button class="js-next" aria-label="next" ${BK.offset >= 18 ? 'disabled' : ''}>${I.arrow}</button></div></div>
        <div class="cals">${months}</div>
        <div class="cal-legend"><span><i></i>${b.closed}</span><span><b style="color:var(--sea);font-size:.7rem">68</b>${T.apts.from} · ${T.types.estudio.name} · ${T.apts.example}</span></div>
        <div class="guests-row"><b>${T.search.guests}</b><div class="stepper"><button class="js-ad" data-v="-1" aria-label="-">−</button><b>${BK.adults}</b><button class="js-ad" data-v="1" aria-label="+">+</button><span class="muted">${T.search.adults} · 16+</span></div></div>
      </div>`;
    $('.js-prev').onclick = () => { BK.offset--; bkCalendar(); };
    $('.js-next').onclick = () => { BK.offset++; bkCalendar(); };
    $$('.day[data-d]').forEach(btn => btn.addEventListener('click', () => {
      const d = parseIso(btn.dataset.d);
      if (!BK.in || BK.out || d <= BK.in) { BK.in = d; BK.out = null; }
      else {
        let ok = true; for (let x = addDays(BK.in, 1); x < d; x = addDays(x, 1)) if (!isOpen(x)) ok = false;
        if (ok) BK.out = d; else { BK.in = d; BK.out = null; }
      }
      bkCalendar(); bkSummary();
    }));
    $$('.js-ad').forEach(b2 => b2.onclick = () => { BK.adults = Math.min(4, Math.max(1, BK.adults + +b2.dataset.v)); bkCalendar(); bkSummary(); });
  }

  function bkResults() {
    const b = T.booking, n = nightsBetween(BK.in, BK.out);
    $('.js-bk-main').innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1.25rem">
        <h2 class="serif" style="font-size:var(--t-xl)">${b.available}</h2>
        <button class="link-arrow js-change">${b.change}</button>
      </div>
      <div class="results">${TYPE_KEYS.map(k => {
        const q = quote(k, BK.in, BK.out, BK.adults), t = T.types[k];
        const capOk = BK.adults <= TYPES[k].max;
        const sold = q.left === 0 || !capOk;
        return `<article class="result reveal ${BK.type === k ? 'is-selected' : ''} ${sold ? 'is-sold' : ''}">
          <div class="result__img"><img src="${TYPES[k].hero}" alt="${t.name}"></div>
          <div>
            <h3>${t.name}</h3>
            <p class="result__meta">${t.cap} · ${t.beds}</p>
            <p class="result__meta">${TYPES[k].feats.slice(0, 3).map(f => T.feat[f]).join(' · ')}</p>
            ${sold ? `<span class="result__left">${!capOk ? t.cap : q.minStay ? b.minStay.replace('{n}', q.minStay) : b.soldOut}</span>` : (q.left <= 2 ? `<span class="result__left">${q.left === 1 ? b.left1 : b.left.replace('{n}', q.left)}</span>` : '')}
          </div>
          <div class="result__price">
            <div><s>${money(q.other)}</s><b>${money(q.total)}</b><small>${n} ${n === 1 ? b.night1 : b.nights} · ${T.apts.example}</small></div>
            <button class="btn ${BK.type === k ? 'btn--sea' : ''} btn--sm js-pick" data-k="${k}" ${sold ? 'disabled' : ''}>${BK.type === k ? '✓ ' : ''}${b.choose}</button>
          </div>
        </article>`;
      }).join('')}</div>
      <p class="tiny" style="margin-top:1rem">${b.priceNote}</p>`;
    $('.js-change').onclick = () => { BK.step = 1; bkRender(); };
    $$('.js-pick').forEach(x => x.onclick = () => { BK.type = x.dataset.k; bkResults(); bkSummary(); animateIn($('.js-bk-main')); });
  }

  function bkForm() {
    const f = T.booking.form;
    const regions = ['DE', 'AT', 'CH', 'GB', 'IE', 'FR', 'BE', 'NL', 'IT', 'ES', 'SE', 'DK', 'US'];
    let dn = null; try { dn = new Intl.DisplayNames([T.locale], { type: 'region' }); } catch (e) { /* navegador antiguo */ }
    const def = { de: 'DE', en: 'GB', es: 'ES', fr: 'FR' }[lang];
    const times = ['14:00–17:00', '17:00–20:00', '20:00–23:00', '> 23:00'];
    const v = BK.data;
    $('.js-bk-main').innerHTML = `
      <form class="panel js-bkf" novalidate>
        <div class="form-grid">
          <div class="field field--full"><label for="bn">${f.name} *</label><input id="bn" name="name" required value="${v.name || ''}" autocomplete="off"></div>
          <div class="field"><label for="be">${f.email} *</label><input id="be" name="email" type="email" required value="${v.email || ''}" autocomplete="off"></div>
          <div class="field"><label for="bp">${f.phone} *</label><input id="bp" name="phone" type="tel" required value="${v.phone || ''}" autocomplete="off"></div>
          <div class="field"><label for="bc">${f.country}</label><select id="bc" name="country">${regions.map(r => `<option value="${r}" ${(v.country || def) === r ? 'selected' : ''}>${dn ? dn.of(r) : r}</option>`).join('')}</select></div>
          <div class="field"><label for="bt">${f.time}</label><select id="bt" name="time">${times.map(x => `<option>${x}</option>`).join('')}</select></div>
          <div class="field field--full"><label for="bx">${f.notes}</label><textarea id="bx" name="notes" rows="3">${v.notes || ''}</textarea></div>
          <label class="check"><input type="checkbox" name="accept" required ${v.accept ? 'checked' : ''}>${f.accept}</label>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-top:1.5rem;flex-wrap:wrap">
          <button type="button" class="link-arrow js-back">${T.booking.backBtn}</button>
          <button class="btn btn--sea" data-magnetic>${f.confirm} ${I.arrow}</button>
        </div>
        <p class="err js-ferr" aria-live="polite"></p>
      </form>`;
    $('.js-back').onclick = () => { BK.step = 2; bkRender(); };
    $('.js-bkf').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      BK.data = Object.fromEntries(fd.entries()); BK.data.accept = fd.get('accept') === 'on';
      if (!BK.data.name || !BK.data.email || !BK.data.phone || !BK.data.accept) { $('.js-ferr').textContent = T.booking.needAll; return; }
      BK.step = 4; BK.locator = 'DEMO-' + Math.random().toString(36).slice(2, 7).toUpperCase(); bkRender();
    });
  }

  function bkDone() {
    const b = T.booking;
    $('.js-bk-main').innerHTML = `
      <div class="panel done">
        <div class="done__icon">${I.check}</div>
        <h2>${b.done}</h2>
        <p class="lead">${b.doneText}</p>
        <p class="tiny" style="margin-top:2rem">${b.locator}</p>
        <span class="locator" style="margin-top:.5rem">${BK.locator}</span>
        <p style="margin-top:2rem"><button class="btn js-new">${b.newSearch} ${I.arrow}</button></p>
      </div>`;
    $('.js-new').onclick = () => { BK.step = 1; BK.type = null; BK.data = {}; bkRender(); };
    burst();
  }

  function bkSummary() {
    const b = T.booking, el = $('.js-bk-sum'); if (!el) return;
    const n = BK.in && BK.out ? nightsBetween(BK.in, BK.out) : 0;
    const q = BK.type && n ? quote(BK.type, BK.in, BK.out, BK.adults) : null;
    const cta = { 1: b.next, 2: b.next, 3: null, 4: null }[BK.step];
    el.innerHTML = `
      <h3>${b.summary}</h3>
      <div class="sum-row" style="margin-top:1rem"><span>${b.dates}</span><b>${fmtDate(BK.in)} → ${fmtDate(BK.out)}</b></div>
      <div class="sum-row"><span>${n ? `${n} ${n === 1 ? b.night1 : b.nights}` : '—'}</span><b>${BK.adults} ${BK.adults === 1 ? T.search.adult : T.search.adults}</b></div>
      ${BK.type ? `<div class="sum-row"><span>${T.apts.kicker}</span><b>${T.types[BK.type].name}</b></div>` : ''}
      ${q ? `<div class="sum-row"><span>${b.other}</span><s>${money(q.other)}</s></div>
             <div class="sum-total"><span>${b.total}</span><b>${money(q.total)}</b></div>
             <p class="tiny" style="color:var(--terra);font-weight:700">${b.save.replace('{x}', money(q.other - q.total))}</p>
             <p class="tiny" style="margin-top:.5rem">${b.tax.replace('{x}', money2(q.tax))}</p>` : ''}
      ${cta ? `<button class="btn btn--sea js-next-step" data-magnetic>${cta} ${I.arrow}</button>` : ''}
      <p class="err js-serr" aria-live="polite"></p>
      <p class="tiny" style="margin-top:.5rem;display:flex;gap:.4rem;align-items:flex-start"><span style="width:16px;flex:none;color:var(--sea)">${I.shield}</span>${T.search.best}</p>`;
    const nx = $('.js-next-step');
    if (nx) nx.onclick = () => {
      if (BK.step === 1) { if (!BK.in || !BK.out) { $('.js-serr').textContent = b.needDates; return; } BK.step = 2; }
      else if (BK.step === 2) { if (!BK.type) { BK.type = TYPE_KEYS.find(k => quote(k, BK.in, BK.out, BK.adults).left > 0 && BK.adults <= TYPES[k].max) || null; if (!BK.type) return; } BK.step = 3; }
      bkRender();
    };
  }

  function bkRender() {
    if (BK.step === 2 && (!BK.in || !BK.out)) BK.step = 1;
    bkSteps();
    ({ 1: bkCalendar, 2: bkResults, 3: bkForm, 4: bkDone })[BK.step]();
    bkSummary();
    animateIn($('.js-bk-main'));
    if (lenis && !firstRender) lenis.scrollTo(0, { duration: .8 });
  }

  /* Confeti de colores marinos al confirmar */
  function burst() {
    if (REDUCED || !HAS_GSAP) return;
    const host = $('.done__icon'); if (!host) return;
    const r = host.getBoundingClientRect();
    const colors = ['#0d6b75', '#7fd3d2', '#d2ae67', '#a94e2a', '#10222e'];
    for (let i = 0; i < 46; i++) {
      const p = document.createElement('i');
      Object.assign(p.style, { position: 'fixed', left: r.left + r.width / 2 + 'px', top: r.top + r.height / 2 + 'px', width: '8px', height: '12px', background: colors[i % 5], borderRadius: '2px', zIndex: 260, pointerEvents: 'none' });
      document.body.appendChild(p);
      gsap.to(p, { x: (Math.random() - .5) * 700, y: (Math.random() - .8) * 500, rotation: Math.random() * 720, opacity: 0, duration: 1.6 + Math.random(), ease: 'power3.out', onComplete: () => p.remove() });
    }
  }

  /* ---------- Router ---------- */
  function parseRoute() {
    const h = location.hash.replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);
    let l = parts[0];
    if (!LANGS.includes(l)) { l = null; }
    else parts.shift();
    return { lang: l, path: parts };
  }

  function render() {
    const { lang: l, path } = parseRoute();
    if (!l) { location.replace(`#/${lang}/${path.join('/')}`); return; }
    lang = l; T = window.I18N[lang];
    document.documentElement.lang = lang;
    document.title = T.meta.title;
    const desc = $('meta[name="description"]'); if (desc) desc.content = T.meta.desc;
    $('.ribbon span').textContent = T.ribbon;
    $('.skip-link').textContent = T.skip;
    $('#header').innerHTML = header();
    $('#mnav').innerHTML = mobileNav();
    footerEl.innerHTML = footer();

    const [p0, p1] = path;
    let html, dark = true;
    if (!p0) html = pageHome();
    else if (p0 === 'apartamentos' && p1 && TYPES[p1]) html = pageDetail(p1);
    else if (p0 === 'apartamentos') html = pageApartments();
    else if (p0 === 'complejo') html = pageComplex();
    else if (p0 === 'paguera') html = pageArea();
    else if (p0 === 'contacto') { html = pageContact(); dark = false; }
    else if (p0 === 'reservar') { html = pageBooking(); dark = false; }
    else html = pageHome();
    app.innerHTML = html;
    document.body.classList.toggle('is-light-top', !dark);
    $$('.nav__link').forEach(a => a.classList.toggle('is-active', a.dataset.r === (p0 || '')));
    bindCommon();
    if (p0 === 'reservar') bkRender();
    if (p0 === 'contacto') bindContact();
    if (!p0) bindHome();
    if (p0 === 'apartamentos' && p1) bindLightbox(TYPES[p1].imgs, T.types[p1].name);
    initAnimations(!p0);
    headerState();
  }

  /* Transición entre páginas con la cortina y la rosa */
  let navigating = false;
  function go() {
    if (firstRender || REDUCED || !HAS_GSAP) { render(); afterRender(); return; }
    if (navigating) return;
    navigating = true;
    const c = $('.curtain');
    gsap.timeline()
      .set(c, { y: 0, yPercent: 100, visibility: 'visible' })
      .to(c, { yPercent: 0, duration: .55, ease: 'power3.inOut' })
      .to(c.querySelector('svg'), { rotation: '+=90', duration: .55, ease: 'power2.out' }, '<')
      .add(() => { killScroll(); render(); window.scrollTo(0, 0); if (lenis) lenis.scrollTo(0, { immediate: true }); afterRender(); })
      .to(c, { yPercent: -100, duration: .7, ease: 'power3.inOut', delay: .05 })
      .set(c, { visibility: 'hidden' })
      .add(() => { navigating = false; });
  }
  function afterRender() { if (HAS_GSAP) ScrollTrigger.refresh(); firstRender = false; }
  function killScroll() { if (HAS_GSAP) ScrollTrigger.getAll().forEach(t => t.kill()); }

  /* ---------- Interacciones ---------- */
  function bindCommon() {
    const lg = $('.lang');
    $('.lang__btn').onclick = (e) => { e.stopPropagation(); lg.classList.toggle('is-open'); $('.lang__btn').setAttribute('aria-expanded', lg.classList.contains('is-open')); };
    document.onclick = () => lg.classList.remove('is-open');
    $$('[data-lang]').forEach(a => a.onclick = (e) => {
      e.preventDefault();
      const { path } = parseRoute();
      location.hash = `#/${a.dataset.lang}/${path.join('/')}`;
    });
    const mn = $('#mnav');
    $('.burger').onclick = () => { mn.classList.add('is-open'); document.body.classList.add('is-locked'); };
    const closeM = () => { mn.classList.remove('is-open'); document.body.classList.remove('is-locked'); };
    $('.mnav__close').onclick = closeM;
    $$('#mnav a').forEach(a => a.addEventListener('click', closeM));
    $$('[data-demo]').forEach(a => a.onclick = (e) => e.preventDefault());
    $$('[data-type]').forEach(a => a.addEventListener('click', () => { BK.type = a.dataset.type; BK.step = BK.in && BK.out ? 2 : 1; if (BK.in) BK.offset = Math.max(0, monthOffsetFor(BK.in)); }));
    $$('a[href$="/reservar"]:not([data-type]):not([data-step])').forEach(a => a.addEventListener('click', () => { BK.step = 1; if (BK.in) BK.offset = Math.max(0, monthOffsetFor(BK.in)); }));
    $$('[data-step]').forEach(a => a.addEventListener('click', () => { BK.step = +a.dataset.step; BK.offset = Math.max(0, monthOffsetFor(BK.in)); }));
    magnetic(); cursorTargets();
  }

  function bindHome() {
    const v = $('.hero__video');
    if (v) {
      v.src = window.innerWidth <= 720 ? 'video/hero-mallorca-720.mp4' : 'video/hero-mallorca-1080.mp4';
      if (REDUCED) { v.removeAttribute('autoplay'); v.pause(); } else v.play().catch(() => {});
    }
    $$('[data-g]').forEach(b => b.onclick = () => {
      BK.adults = Math.min(4, Math.max(1, BK.adults + +b.dataset.g));
      $('.js-g').textContent = `${BK.adults} ${BK.adults === 1 ? T.search.adult : T.search.adults}`;
    });
  }

  function bindContact() {
    $('.js-contact').addEventListener('submit', (e) => { e.preventDefault(); $('.js-contact-msg').textContent = T.contact.sent; });
  }

  function bindLightbox(imgs, name) {
    const lb = $('#lightbox'); let idx = 0;
    const show = () => { $('#lightbox img').src = imgs[idx]; $('#lightbox img').alt = `${name} ${idx + 1}`; };
    $$('[data-lb]').forEach(b => b.onclick = () => { idx = +b.dataset.lb; show(); lb.classList.add('is-open'); lenis && lenis.stop(); });
    const close = () => { lb.classList.remove('is-open'); lenis && lenis.start(); };
    $('.lightbox__close').onclick = close;
    $('.lightbox__nav--prev').onclick = () => { idx = (idx - 1 + imgs.length) % imgs.length; show(); };
    $('.lightbox__nav--next').onclick = () => { idx = (idx + 1) % imgs.length; show(); };
    document.onkeydown = (e) => { if (!lb.classList.contains('is-open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') $('.lightbox__nav--prev').click(); if (e.key === 'ArrowRight') $('.lightbox__nav--next').click(); };
  }

  function magnetic() {
    if (REDUCED || !HAS_GSAP || window.matchMedia('(pointer: coarse)').matches) return;
    $$('[data-magnetic]').forEach(el => {
      const xTo = gsap.quickTo(el, 'x', { duration: .6, ease: 'elastic.out(1, .4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: .6, ease: 'elastic.out(1, .4)' });
      el.addEventListener('mousemove', (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * .3); yTo((e.clientY - r.top - r.height / 2) * .3); });
      el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
  }

  const cursor = $('.cursor');
  function cursorTargets() {
    if (!cursor) return;
    $$('[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('is-big'); cursor.querySelector('span').textContent = el.dataset.cursor; });
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-big'));
    });
  }
  if (cursor && HAS_GSAP && !window.matchMedia('(pointer: coarse)').matches) {
    const cx = gsap.quickTo(cursor, 'x', { duration: .35, ease: 'power3' }), cy = gsap.quickTo(cursor, 'y', { duration: .35, ease: 'power3' });
    window.addEventListener('mousemove', (e) => { cx(e.clientX); cy(e.clientY); });
  }

  /* Cabecera: sólida al hacer scroll, se oculta al bajar */
  let lastY = 0;
  function headerState() {
    const y = window.scrollY, hd = $('#header');
    const light = document.body.classList.contains('is-light-top');
    hd.classList.toggle('is-solid', y > 40 || light);
    hd.classList.toggle('is-hidden', y > 400 && y > lastY && !$('#mnav').classList.contains('is-open'));
    lastY = y;
  }
  window.addEventListener('scroll', headerState, { passive: true });

  /* ---------- Animaciones ---------- */
  function animateIn(el) {
    if (!el || REDUCED || !HAS_GSAP) { $$('.reveal', el || document).forEach(x => { x.style.opacity = 1; x.style.transform = 'none'; }); return; }
    gsap.fromTo(el.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .06, overwrite: true });
    $$('.reveal', el).forEach(x => gsap.to(x, { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }));
  }

  function initAnimations(isHome) {
    if (REDUCED || !HAS_GSAP) {
      $$('.reveal').forEach(x => { x.style.opacity = 1; x.style.transform = 'none'; });
      $$('.clip').forEach(x => x.style.clipPath = 'none');
      $$('.intro__text .w').forEach(w => w.style.opacity = 1);
      $$('.h1 .line > span, .page-hero h1 .line > span').forEach(x => x.style.transform = 'none');
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const delay = isHome && firstLoad ? 1.9 : (firstLoad ? 1.6 : .35);

    // Titulares del hero
    gsap.from('.h1 .line > span, .page-hero h1 .line > span', { yPercent: 115, rotate: 3, duration: 1.4, ease: 'expo.out', stagger: .12, delay });
    gsap.from('.js-hero-fade', { opacity: 0, y: 30, duration: 1.1, ease: 'power3.out', stagger: .12, delay: delay + .35 });
    gsap.from('.hero__note, .hero__scroll', { opacity: 0, duration: 1, delay: delay + .8 });

    // Vídeo: zoom de entrada y efecto «ventana» al hacer scroll
    const media = $('.hero__media');
    if (media) {
      gsap.to('.hero__media video', { scale: 1, duration: 2.6, ease: 'power2.out', delay: delay - .4 });
      gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
        .fromTo(media, { clipPath: 'inset(0% 0% 0% 0% round 0px)' }, { clipPath: 'inset(7% 5% 14% 5% round 28px)', ease: 'none' }, 0)
        .to('.hero__content', { yPercent: -30, opacity: 0, ease: 'none' }, 0)
        .to('.search', { y: -80, opacity: 0, ease: 'none' }, 0)
        .to('.hero__media video', { yPercent: 12, ease: 'none' }, 0);
    }
    // Fondo de cabecera interior
    $$('.page-hero__bg img').forEach(img => gsap.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 2.2, ease: 'power2.out', delay: .2 }));

    // Texto de intro palabra a palabra
    const words = $$('.intro__text .w');
    if (words.length) gsap.to(words, { opacity: 1, stagger: .05, ease: 'none', scrollTrigger: { trigger: '.intro__text', start: 'top 80%', end: 'bottom 50%', scrub: .6 } });
    if ($('.rose-deco')) gsap.to('.rose-deco', { rotation: 180, ease: 'none', scrollTrigger: { trigger: '.intro', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    if ($('.direct__rose')) gsap.to('.direct__rose', { rotation: -120, ease: 'none', scrollTrigger: { trigger: '.direct', start: 'top bottom', end: 'bottom top', scrub: 1 } });

    // Contadores
    $$('.js-count').forEach(el => {
      const raw = el.dataset.to, dec = raw.includes(',') || raw.includes('.') ? 1 : 0;
      const target = parseFloat(raw.replace(',', '.')); const o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: target, duration: 1.8, ease: 'power3.out', onUpdate: () => { el.textContent = dec ? o.v.toFixed(1).replace('.', lang === 'en' ? '.' : ',') : Math.round(o.v); } }) });
    });
    $$('.score').forEach(el => ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => el.classList.add('is-in') }));

    // Apariciones genéricas
    ScrollTrigger.batch('.reveal', { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: .08 }) });
    ScrollTrigger.batch('.clip', { start: 'top 88%', once: true, onEnter: (els) => gsap.to(els, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'expo.out', stagger: .1 }) });

    // Parallax en imágenes
    $$('[data-parallax]').forEach(el => {
      const amt = +el.dataset.parallax || 10;
      gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt * .3, ease: 'none', scrollTrigger: { trigger: el.closest('section, .tile, .split__img, .area__media') || el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // Tarjetas de apartamentos en horizontal (escritorio)
    const track = $('.apts__track');
    if (track && window.innerWidth > 720) {
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.apts__pin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
    }
    // Comparador flotante
    if ($('.compare')) gsap.to('.compare', { y: -40, rotate: 1.5, ease: 'none', scrollTrigger: { trigger: '.direct', start: 'top bottom', end: 'bottom top', scrub: true } });
    if ($('.area__float')) gsap.fromTo('.area__float', { y: 80 }, { y: -40, ease: 'none', scrollTrigger: { trigger: '.area', start: 'top bottom', end: 'bottom top', scrub: true } });
    // Título final
    if ($('.final__title')) gsap.from('.final__title', { y: 80, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.final', start: 'top 70%' } });
    // Footer gigante
    gsap.from('.footer__big span', { yPercent: 100, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.footer', start: 'top 85%' } });
    firstLoad = false;
  }
  let firstLoad = true;

  /* ---------- Arranque ---------- */
  function boot() {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    if (HAS_GSAP) {
      gsap.registerPlugin(ScrollTrigger);
      if (!REDUCED && typeof window.Lenis !== 'undefined') {
        lenis = new Lenis({ lerp: .09, smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      }
    }
    const pref = (navigator.language || 'es').slice(0, 2);
    if (!parseRoute().lang) lang = LANGS.includes(pref) && location.search.includes('auto') ? pref : 'es';
    window.addEventListener('hashchange', go);
    const load = fetch('data/beds24.json?v=' + Date.now(), { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(j => { if (j && j.days && j.order) LIVE = j; })
      .catch(() => {});
    Promise.race([load, new Promise(r => setTimeout(r, 2500))]).then(go);
    const loader = $('.loader');
    if (REDUCED || !HAS_GSAP) { loader.remove(); return; }
    gsap.to(loader, { yPercent: -100, duration: 1, ease: 'expo.inOut', delay: 1.5, onComplete: () => loader.remove() });
  }
  boot();
})();
