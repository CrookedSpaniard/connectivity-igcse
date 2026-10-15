// Shared namespace, helpers, icons, the sections and the saved progress.
window.FD = (() => {
  'use strict';
  const FD = { scenes: [], speed: 1 };

  FD.add = (scene) => FD.scenes.push(scene);

  // Build one element from an HTML string.
  FD.h = (html) => {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };

  // Durations are divided by the playback speed.
  FD.dur = (ms) => ms / FD.speed;
  FD.wait = (ms) => new Promise((r) => setTimeout(r, FD.dur(ms)));
  FD.fmt = (n) => Math.round(n).toLocaleString('en-GB');
  FD.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  FD.shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
  FD.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  FD.today = () => new Date().toLocaleDateString('en-GB');

  FD.shake = (el) => {
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
  };
  FD.pulse = (el) => {
    if (!el) return;
    el.classList.remove('pulse');
    void el.offsetWidth;
    el.classList.add('pulse');
  };

  // Segmented control: buttons with data-v, one is .on.
  FD.segSet = (root, v) => {
    root.querySelectorAll('button[data-v]').forEach((b) => {
      const on = b.dataset.v === String(v);
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on);
    });
  };

  // Highlight one zone of a mock: root gets .focusing, matching [data-zone] gets .focus.
  FD.focus = (root, zones) => {
    const list = zones ? [].concat(zones) : [];
    root.classList.toggle('focusing', list.length > 0);
    const zs = [...root.querySelectorAll('[data-zone]')];
    zs.forEach((z) => { z.classList.toggle('focus', list.includes(z.dataset.zone)); z.classList.remove('focus-in'); });
    zs.filter((z) => z.classList.contains('focus')).forEach((z) => {
      for (let p = z.parentElement?.closest('[data-zone]'); p && root.contains(p); p = p.parentElement?.closest('[data-zone]')) p.classList.add('focus-in');
    });
  };

  // Small toast inside a mock.
  FD.toast = (host, html, ms = 2600) => {
    const t = FD.h(`<div class="toast">${html}</div>`);
    host.appendChild(t);
    setTimeout(() => t.classList.add('out'), FD.dur(ms));
    setTimeout(() => t.remove(), FD.dur(ms) + 400);
  };

  // Panels inside a stage: buttons [data-p] switch the visible [data-panel].
  FD.panels = (root, onShow) => {
    const show = (p) => {
      root.querySelectorAll('[data-panel]').forEach((x) => { x.hidden = x.dataset.panel !== p; });
      root.querySelectorAll('.ptabs button[data-p]').forEach((b) => {
        const on = b.dataset.p === p;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on);
      });
      root.dataset.panel = p;
      if (onShow) onShow(p);
    };
    root.querySelectorAll('.ptabs button[data-p]').forEach((b) => b.addEventListener('click', () => show(b.dataset.p)));
    return show;
  };

  // Copy text to the clipboard, with a fallback for older browsers.
  FD.copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      ta.remove();
      return ok;
    }
  };

  FD.download = (name, text, type = 'text/plain') => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  FD.slug = (s) => String(s || 'student').trim().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'student';

  // ---------- the two parts and their sections ----------
  FD.PARTS = {
    A: { name: 'Digital communication', ch: 'Chapter 4', pages: 'pages 66–78' },
    B: { name: 'Networks', ch: 'Chapter 5', pages: 'pages 79–93' },
  };
  FD.SECTIONS = [
    { id: 'speed', part: 'A', name: 'Bandwidth, buffer and latency', short: 'Speed', color: '--c4', line: 'How fast data moves, and why videos buffer and games lag.' },
    { id: 'factors', part: 'A', name: 'Factors that affect speed', short: 'Factors', color: '--c2', line: 'Transfer method, interference, blockages and distance.' },
    { id: 'networks', part: 'A', name: 'Device to device and networks', short: 'LAN · WAN · PAN', color: '--c1', line: 'Direct connections, LANs, WANs, PANs and tethering.' },
    { id: 'methods', part: 'A', name: 'How digital devices communicate', short: 'Satellite · broadcast · wired', color: '--c3', line: 'Satellite, broadcast and wired communication.' },
    { id: 'wireless', part: 'A', name: 'Wireless communication', short: 'Wireless', color: '--c5', line: 'Wi-Fi, Bluetooth, 3G and 4G, infra-red and NFC.' },
    { id: 'wiredwl', part: 'A', name: 'Wired vs wireless and broadband', short: 'Wired vs wireless', color: '--c7', line: 'Benefits and drawbacks, broadband and cellular networks.' },
    { id: 'identify', part: 'B', name: 'Identifying devices on a network', short: 'IP · MAC', color: '--c6', line: 'Network operating systems, IP and MAC addresses, device names.' },
    { id: 'components', part: 'B', name: 'Components of a network', short: 'Components', color: '--c8', line: 'Cables, access points, switches, routers, boosters and servers.' },
    { id: 'internet', part: 'B', name: 'Connecting to the internet', short: 'Internet', color: '--c4', line: 'ISPs, web browsers, search engines and filter software.' },
    { id: 'lans', part: 'B', name: 'Peer-to-peer and client-server', short: 'LAN models', color: '--c1', line: 'Two ways to build a LAN and the benefits of each.' },
    { id: 'security', part: 'B', name: 'Securing data on networks', short: 'Security', color: '--c9', line: 'Logins, firewalls, encryption, WEP/WPA, VPNs and more.' },
  ];
  FD.section = (id) => FD.SECTIONS.find((s) => s.id === id);

  // ---------- saved progress (this browser, plus a progress code to move it) ----------
  const KEY = 'cn-progress-v1';
  const blank = () => ({ v: 1, name: '', cls: '', seen: {}, last: '', step: 0, checks: {}, acts: {}, tests: {}, started: FD.today(), updated: '' });
  FD.state = blank();
  FD.canSave = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) FD.state = Object.assign(blank(), JSON.parse(raw));
  } catch (e) { FD.canSave = false; }
  FD.results = FD.state.checks;

  let saveTimer = null;
  FD.save = (now) => {
    FD.state.updated = new Date().toISOString();
    clearTimeout(saveTimer);
    const write = () => { try { localStorage.setItem(KEY, JSON.stringify(FD.state)); FD.canSave = true; } catch (e) { FD.canSave = false; } };
    if (now) write(); else saveTimer = setTimeout(write, 250);
    if (FD.onChange) FD.onChange();
  };
  FD.replaceState = (s) => {
    FD.state = Object.assign(blank(), s);
    FD.results = FD.state.checks;
    FD.save(true);
  };
  FD.resetState = () => FD.replaceState(blank());
  FD.hasProgress = () => !!(Object.keys(FD.state.seen).length || Object.keys(FD.state.checks).length || Object.keys(FD.state.acts).length || Object.keys(FD.state.tests).length);

  FD.saveResult = (id, score, total) => {
    const r = FD.state.checks[id] || { tries: 0, best: 0 };
    FD.state.checks[id] = { score, total, tries: r.tries + 1, best: Math.max(r.best || 0, score), date: FD.today() };
    FD.save();
    if (FD.onResult) FD.onResult(id);
  };
  FD.markSeen = (id) => {
    if (FD.state.seen[id]) return;
    FD.state.seen[id] = FD.today();
    FD.save();
    if (FD.onResult) FD.onResult(id);
  };

  // ---------- icons (24×24 line icons) ----------
  const ic = (p) => `<svg viewBox="0 0 24 24" class="ic" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  FD.icon = {
    start: ic('<circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z"/>'),
    speed: ic('<path d="M4.5 17a8.5 8.5 0 1 1 15 0"/><path d="M12 13l4-5"/><circle cx="12" cy="13" r="1.3"/>'),
    factors: ic('<path d="M2.5 9.5a14 14 0 0 1 19 0"/><path d="M6 13a9 9 0 0 1 12 0"/><circle cx="12" cy="17.5" r="1.4"/><path d="M4 4l16 16"/>'),
    networks: ic('<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="2.5" y="16" width="6" height="5" rx="1"/><rect x="15.5" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M5.5 16v-4h13v4"/>'),
    methods: ic('<path d="M7 7l4 4"/><rect x="3" y="2.5" width="5" height="5" rx="1" transform="rotate(45 5.5 5)"/><path d="M13 13l2 2"/><path d="M4.5 19.5a9 9 0 0 0 15-9"/><path d="M8 18a5 5 0 0 0 8-5"/>'),
    wireless: ic('<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.8 12.5a9 9 0 0 1 12.4 0"/><path d="M9 16a4.5 4.5 0 0 1 6 0"/><circle cx="12" cy="19.2" r="1.2"/>'),
    wiredwl: ic('<path d="M12 4v16M5 20h14"/><path d="M4 8h16"/><path d="M4 8l-2 6h4zM20 8l-2 6h4z"/>'),
    identify: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2.2"/><path d="M5.5 16.5a3.5 3.5 0 0 1 6 0M14 10h4.5M14 13.5h3"/>'),
    components: ic('<rect x="3" y="12" width="18" height="7" rx="2"/><path d="M7 15.5h.01M10.5 15.5h.01"/><path d="M17 12V6.5"/><path d="M14 6a4.2 4.2 0 0 1 6 0"/>'),
    internet: ic('<rect x="2.5" y="4" width="19" height="16" rx="2"/><path d="M2.5 8.5h19"/><circle cx="5.3" cy="6.3" r=".5"/><circle cx="7.3" cy="6.3" r=".5"/><circle cx="12" cy="14" r="3.5"/><path d="M8.5 14h7M12 10.5a5.5 5.5 0 0 1 0 7a5.5 5.5 0 0 1 0-7"/>'),
    lans: ic('<rect x="9" y="2.5" width="6" height="8" rx="1"/><path d="M11 5.5h2M11 7.5h2"/><rect x="2.5" y="15.5" width="5" height="4" rx="1"/><rect x="9.5" y="15.5" width="5" height="4" rx="1"/><rect x="16.5" y="15.5" width="5" height="4" rx="1"/><path d="M12 10.5v5M5 15.5v-2.5h14v2.5"/>'),
    security: ic('<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><path d="M12 14.5v2.5"/>'),
    terms: ic('<path d="M3.5 5h6a2.5 2.5 0 0 1 2.5 2.5V20a2 2 0 0 0-2-2H3.5z"/><path d="M20.5 5h-6A2.5 2.5 0 0 0 12 7.5V20a2 2 0 0 1 2-2h6.5z"/>'),
    final: ic('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M8.5 11l1.6 1.6 3-3M8.5 16.5h7"/>'),
    check: ic('<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.8 2.8L16.2 9.6"/>'),
    activity: ic('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),
    progress: ic('<path d="M3.5 3.5v17h17"/><path d="M7.5 15l4-4.5 3 2.5 5-6"/>'),
    help: ic('<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.8"/><circle cx="12" cy="17.2" r=".5"/>'),
    tick: ic('<path d="M4.5 12.5l5 5 10-11"/>'),
    cross: ic('<path d="M6 6l12 12M18 6L6 18"/>'),
    copy: ic('<rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5V5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5v9A1.5 1.5 0 0 0 5 15.5h3.5"/>'),
    download: ic('<path d="M12 4v11M7 10.5l5 5 5-5"/><path d="M4.5 19.5h15"/>'),
    upload: ic('<path d="M12 15.5V4.5M7 9l5-5 5 5"/><path d="M4.5 19.5h15"/>'),
    key: ic('<circle cx="7.5" cy="12" r="3.5"/><path d="M11 12h10M17.5 12v3M20.5 12v2"/>'),
    lock: ic('<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>'),
    unlock: ic('<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7"/>'),
    globe: ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/>'),
    user: ic('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
    play: ic('<path d="M7 4.5v15l12-7.5z"/>'),
    shield: ic('<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/>'),
    search: ic('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>'),
    file: ic('<path d="M6 3h8l4.5 4.5V21H6z"/><path d="M14 3v4.5h4.5"/>'),
    printer: ic('<path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="7.5" rx="1.5"/><path d="M7 14h10v6.5H7z"/>'),
    bt: ic('<path d="M7 7.5l10 9-5 4.5V3l5 4.5-10 9"/>'),
  };

  // ---------- small device drawings used in several scenes (inline SVG <g>) ----------
  // Each returns markup for a 60×46 box with its top-left corner at (x, y).
  FD.dv = {
    laptop: (x, y) => `<g transform="translate(${x} ${y})"><rect class="dv-body" x="8" y="2" width="44" height="30" rx="3"/><rect class="dv-screen" x="12" y="6" width="36" height="22" rx="1"/><path class="dv-body" d="M2 34h56l-4 7H6z"/></g>`,
    desktop: (x, y) => `<g transform="translate(${x} ${y})"><rect class="dv-body" x="6" y="2" width="48" height="32" rx="3"/><rect class="dv-screen" x="10" y="6" width="40" height="24" rx="1"/><rect class="dv-body" x="26" y="34" width="8" height="6"/><rect class="dv-body" x="18" y="40" width="24" height="4" rx="2"/></g>`,
    phone: (x, y) => `<g transform="translate(${x} ${y})"><rect class="dv-body" x="19" y="0" width="22" height="44" rx="4"/><rect class="dv-screen" x="22" y="5" width="16" height="32" rx="1"/><circle class="dv-detail" cx="30" cy="40.5" r="1.6"/></g>`,
    tablet: (x, y) => `<g transform="translate(${x} ${y})"><rect class="dv-body" x="10" y="0" width="40" height="46" rx="4"/><rect class="dv-screen" x="14" y="4" width="32" height="36" rx="1"/><circle class="dv-detail" cx="30" cy="43" r="1.4"/></g>`,
    printer: (x, y) => `<g transform="translate(${x} ${y})"><rect class="dv-paper" x="16" y="2" width="28" height="14"/><rect class="dv-body" x="4" y="14" width="52" height="20" rx="4"/><rect class="dv-paper" x="14" y="30" width="32" height="12"/><circle class="dv-led" cx="48" cy="21" r="2"/></g>`,
    server: (x, y) => `<g transform="translate(${x} ${y})"><rect class="dv-body" x="14" y="0" width="32" height="46" rx="3"/><path class="dv-detail" d="M18 7h24v3H18zM18 15h24v3H18zM18 23h24v3H18z"/><circle class="dv-led" cx="40" cy="38" r="2"/></g>`,
    router: (x, y) => `<g transform="translate(${x} ${y})"><path class="dv-detail" d="M14 22V4h3v18zM43 22V4h3v18z"/><rect class="dv-body" x="4" y="20" width="52" height="18" rx="5"/><circle class="dv-led" cx="14" cy="29" r="2"/><circle class="dv-led" cx="21" cy="29" r="2"/><circle class="dv-led" cx="28" cy="29" r="2"/></g>`,
    switch: (x, y) => `<g transform="translate(${x} ${y})"><rect class="dv-body" x="2" y="14" width="56" height="18" rx="3"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect class="dv-screen" x="${7 + i * 8}" y="19" width="5" height="5" rx="1"/>`).join('')}<circle class="dv-led" cx="52" cy="27" r="1.6"/></g>`,
    tv: (x, y) => `<g transform="translate(${x} ${y})"><rect class="dv-body" x="2" y="2" width="56" height="34" rx="3"/><rect class="dv-screen" x="6" y="6" width="48" height="26" rx="1"/><rect class="dv-body" x="22" y="36" width="16" height="4"/><rect class="dv-body" x="16" y="40" width="28" height="4" rx="2"/></g>`,
    ap: (x, y) => `<g transform="translate(${x} ${y})"><ellipse class="dv-body" cx="30" cy="30" rx="22" ry="9"/><ellipse class="dv-screen" cx="30" cy="27" rx="18" ry="5"/><circle class="dv-led" cx="30" cy="31" r="1.6"/><path class="dv-arc" d="M20 14a14 14 0 0 1 20 0M24 18a8 8 0 0 1 12 0"/></g>`,
    cloud: (x, y) => `<g transform="translate(${x} ${y})"><path class="dv-cloud" d="M16 40h30a10 10 0 0 0 1-20 14 14 0 0 0-27-3 11 11 0 0 0-4 23z"/></g>`,
  };

  return FD;
})();
