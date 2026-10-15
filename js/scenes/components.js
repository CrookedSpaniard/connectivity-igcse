FD.add({
  id: 'components',
  title: 'Components of wired and wireless systems',
  tab: 'Components',
  icon: 'components',
  color: '--c8',
  section: true,
  interactive: true,
  vocab: [
    ['Mbit/s', 'megabits per second: 1 Mb = 1 million bits'],
    ['Gbit/s', 'gigabits per second: 1 Gb = 1,000,000,000 bits'],
    ['NIC', 'network interface card: lets a computer exchange data with other networked computers'],
    ['port', 'a socket into which cables and devices can be plugged'],
    ['client', 'a computer connected to a server'],
    ['HTTP', 'Hypertext Transfer Protocol: standards that control how documents written in HTML connect to each other'],
  ],
  mount(el) {
    const COMP = {
      ap: ['Wireless access point', 'Lets devices with Wi-Fi connect to a <b>wired</b> network. Often built into routers, or a stand-alone device connected to the network with an Ethernet cable. In <b>repeater mode</b> it acts as a booster.'],
      sw: ['Switch', 'Connects devices on a network. It has <b>ports</b> for cables. It makes sure data from any device gets to the <b>correct device</b>, using the destination IP address.'],
      gw: ['Gateway', 'Connects <b>two different types of network</b>, e.g. a LAN to a WAN.'],
      rt: ['Router', 'Stores the addresses of all the devices connected to it, so it can forward network traffic by the <b>quickest route</b>. Home routers include a <b>switch</b> and a <b>wireless access point</b>, and act as the <b>gateway</b> to the internet. The ISP gives them a dynamic IP address.'],
      bo: ['Booster', 'Amplifies the signal so its <b>range can be extended</b>. Wired Ethernet has a maximum range of about 100 m; wireless range is limited too. Boosters work for both wired and wireless connections.'],
    };
    const SERVERS = [
      ['🔑', 'Authentication server', 'Checks usernames and passwords. After a successful login the client gets an electronic certificate to access resources.'],
      ['🖨️', 'Print server', 'Manages many printers. Puts print jobs in a queue so printers are not overloaded, and can record jobs so departments can be invoiced.'],
      ['🗄️', 'File server', 'Gives users access to shared and private storage.'],
      ['🧩', 'Application server', 'Gives clients access to applications that run directly from the server.'],
      ['🌐', 'Web server', 'Processes requests for data made with HTTP. All the content on all web servers is the World Wide Web.'],
    ];
    const T = {
      internet: ['Internet', 'cloud', 1], router: ['Router', 'router', 0], switch: ['Switch', 'switch', 0], ap: ['Access point', 'ap', 0], booster: ['Booster', 'ap', 0],
      phone: ['Smartphone', 'phone', 0], tablet: ['Tablet', 'tablet', 0], desktop: ['Desktop PC', 'desktop', 0], laptop: ['Laptop', 'laptop', 0], printer: ['Printer', 'printer', 0],
    };
    const WIRELESS = ['phone', 'tablet'];
    const icon = (t) => `<svg viewBox="-2 -4 64 54" aria-hidden="true">${FD.dv[T[t][1]](0, 0)}</svg>`;
    el.innerHTML = `
      <div class="sim cmpn">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="cab">🔌 Cables</button><button data-p="dev">📶 Network devices</button><button data-p="srv">🗄️ Servers</button><button data-p="build">🛠️ Build a network</button>
        </div>

        <div data-panel="cab" class="sim">
          <div class="cards3">
            <div class="mini cab" data-zone="c5"><h5>Cat5e</h5><p><b>10 Mbit/s, 100 Mbit/s or 1 Gbit/s.</b> Ethernet in homes and small businesses. Connects devices through their NICs.</p></div>
            <div class="mini cab" data-zone="c6"><h5>Cat6</h5><p><b>10 Gbit/s.</b> More expensive, so usually only used by businesses.</p></div>
            <div class="mini cab" data-zone="fo"><h5>Fibre optic</h5><p><b>40 Gbit/s</b> over many kilometres. A glass thread bounces <b>light</b>. Expensive: telecoms companies, labs, hospitals, banks, schools and universities.</p></div>
          </div>
          <div class="sim-box" data-zone="slow">
            <p class="strong">The slowest part decides the speed</p>
            <div class="ctrls">
              <label class="rng"><span>Network cables</span><select id="cabSp"><option value="100">Cat5e · 100 Mbit/s</option><option value="1000">Cat5e · 1 Gbit/s</option><option value="10000" selected>Cat6 · 10 Gbit/s</option></select></label>
              <label class="rng"><span>Internet connection</span><select id="netSp"><option value="10">10 Mbit/s</option><option value="100" selected>100 Mbit/s</option><option value="1000">1 Gbit/s</option></select></label>
            </div>
            <div class="slow-bars"><div><small>Cables</small><span class="bar"><i id="bCab"></i></span></div><div><small>Internet</small><span class="bar"><i id="bNet"></i></span></div><div><small>Download speed</small><span class="bar"><i id="bReal"></i></span></div></div>
            <p class="small" id="slowMsg"></p>
          </div>
        </div>

        <div data-panel="dev" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 680 260" class="devmap" aria-label="A small business network with a router, a switch, access points and a booster">
              <path class="wire" d="M80 60 H170"/><path class="wire" d="M230 60 H300"/><path class="wire" d="M360 60 H420 V140"/><path class="wire" d="M360 70 V140"/><path class="wire" d="M330 82 V100 H150 V140"/>
              ${FD.dv.cloud(20, 30)}<text class="svg-sm" x="52" y="95">Internet</text>
              <g class="cp" data-c="gw" tabindex="0">${FD.dv.router(170, 30)}<text class="svg-lbl" x="200" y="88">Router / gateway</text></g>
              <g class="cp" data-c="sw" tabindex="0">${FD.dv.switch(300, 40)}<text class="svg-lbl" x="330" y="30">Switch</text></g>
              <g class="cp" data-c="ap" tabindex="0">${FD.dv.ap(390, 130)}<text class="svg-lbl" x="420" y="200">Access point</text></g>
              <g class="cp" data-c="bo" tabindex="0">${FD.dv.ap(560, 130)}<text class="svg-lbl" x="590" y="200">Booster (repeater)</text></g>
              ${FD.dv.desktop(120, 140)}${FD.dv.printer(230, 140)}
              <path class="wl-wave" d="M465 160 q15 -12 30 0 t30 0 t30 0"/>
              ${FD.dv.tablet(430, 205)}${FD.dv.phone(500, 210)}${FD.dv.tablet(600, 205)}
            </svg>
          </div>
          <div class="cp-btns">${Object.entries(COMP).map(([k, [n]]) => `<button class="mini-btn" data-c="${k}">${n}</button>`).join('')}</div>
          <p class="sim-box small" id="cpInfo">Click a component in the diagram or a button.</p>
        </div>

        <div data-panel="srv" class="sim" hidden>
          <div class="cards3 srvs">${SERVERS.map(([e, n, d], i) => `<div class="mini" data-s="${i}"><h5>${e} ${n}</h5><p>${d}</p></div>`).join('')}</div>
          <div class="sim-box pq">
            <p class="strong">Try the print server</p>
            <div class="pq-row">
              <div class="pq-clients">${['Room 4', 'Office', 'Library'].map((c) => `<button class="mini-btn" data-job="${c}">🖥️ Print from ${c}</button>`).join('')}</div>
              <ol class="pq-queue" id="queue"></ol>
              <div class="pq-printer"><span id="prn">🖨️</span><small id="prnTxt">Ready</small></div>
            </div>
          </div>
        </div>

        <div data-panel="build" class="sim" hidden>
          <p class="small"><b>Task (exam question, 8 marks):</b> build a network for a home with <b>two smartphones</b>, <b>one tablet</b>, <b>two desktop PCs</b> and <b>internet access</b>. Add parts, drag them, then click one part and another to connect them.</p>
          <div class="pal">${Object.entries(T).map(([k, [n]]) => `<button class="pal-b" data-add="${k}">${icon(k)}<span>${n}</span></button>`).join('')}</div>
          <div class="canvas" id="canvas"><svg class="links" id="links" preserveAspectRatio="none"></svg><p class="cv-empty" id="cvEmpty">Your network will appear here.</p></div>
          <div class="ctrls">
            <button class="btn primary small-btn" id="bCheck">✓ Check my network</button>
            <button class="btn small-btn" id="bDel" disabled>🗑 Delete selected</button>
            <button class="btn ghost small-btn" id="bClear">Clear</button>
            <button class="btn ghost small-btn" id="bEx">Show an example</button>
          </div>
          <ul class="bfb" id="bfb"></ul>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s), root = el.querySelector('.cmpn');

    // ---------- slowest part ----------
    function slow() {
      const c = +$('#cabSp').value, n = +$('#netSp').value, r = Math.min(c, n), sc = (v) => (Math.log10(v) / 4) * 100 + '%';
      $('#bCab').style.setProperty('--v', sc(c)); $('#bNet').style.setProperty('--v', sc(n)); $('#bReal').style.setProperty('--v', sc(r));
      const f = (v) => (v >= 1000 ? v / 1000 + ' Gbit/s' : v + ' Mbit/s');
      $('#slowMsg').innerHTML = c > n
        ? `Internet downloads only reach <b>${f(r)}</b>. The internet connection is the slowest part, so the cables are used at <b>1/${c / n}</b> of their maximum.`
        : c < n ? `Downloads reach only <b>${f(r)}</b>: this time the <b>cables</b> are the slowest part.` : `Both parts are ${f(r)}.`;
    }
    $('#cabSp').addEventListener('change', slow);
    $('#netSp').addEventListener('change', slow);

    // ---------- components ----------
    function comp(k) {
      root.querySelectorAll('[data-c]').forEach((x) => x.classList.toggle('on', x.dataset.c === k || (k === 'rt' && x.dataset.c === 'gw')));
      $('#cpInfo').innerHTML = k ? `<b>${COMP[k][0]}</b>: ${COMP[k][1]}` : 'Click a component in the diagram or a button.';
    }
    root.querySelectorAll('[data-c]').forEach((x) => {
      x.addEventListener('click', () => comp(x.dataset.c));
      x.addEventListener('keydown', (e) => { if (e.key === 'Enter') comp(x.dataset.c); });
    });

    // ---------- print queue ----------
    const queue = [];
    let printing = false, pTimer = 0;
    function drawQ() { $('#queue').innerHTML = queue.length ? queue.map((j, i) => `<li>${i === 0 && printing ? '▶ ' : ''}${j}</li>`).join('') : '<li class="muted">Queue empty</li>'; }
    function printNext() {
      if (!queue.length) { printing = false; $('#prnTxt').textContent = 'Ready'; $('#prn').classList.remove('busy'); drawQ(); return; }
      printing = true; $('#prn').classList.add('busy');
      $('#prnTxt').textContent = 'Printing ' + queue[0];
      drawQ();
      pTimer = setTimeout(() => { queue.shift(); printNext(); }, FD.dur(1800));
    }
    let jobN = 1;
    const addJob = (c) => { queue.push(`Job ${jobN++} · ${c}`); if (!printing) printNext(); else drawQ(); };
    el.querySelectorAll('[data-job]').forEach((b) => b.addEventListener('click', () => addJob(b.dataset.job)));
    drawQ();

    // ---------- network builder ----------
    const canvas = $('#canvas'), svg = $('#links');
    let nodes = [], links = [], sel = null, uid = 1;
    const spot = (t) => {
      const col = { internet: 8, router: 30, switch: 52, ap: 52, booster: 72, desktop: 88, laptop: 88, printer: 88, phone: 88, tablet: 72 }[t] || 50;
      const same = nodes.filter((n) => Math.abs(n.x - col) < 6).length;
      return { x: col, y: FD.clamp(14 + same * 20, 12, 88) };
    };
    function add(t, x, y) {
      if (t === 'internet' && nodes.some((n) => n.t === 'internet')) { FD.shake(el.querySelector('[data-add="internet"]')); return null; }
      const p = x == null ? spot(t) : { x, y };
      const n = { id: uid++, t, x: p.x, y: p.y };
      nodes.push(n);
      draw();
      return n;
    }
    const isWl = (a, b) => WIRELESS.includes(a.t) || WIRELESS.includes(b.t);
    function link(a, b) {
      if (a.id === b.id) return;
      const i = links.findIndex(([p, q]) => (p === a.id && q === b.id) || (p === b.id && q === a.id));
      if (i >= 0) links.splice(i, 1); else links.push([a.id, b.id]);
      draw();
    }
    function draw() {
      $('#cvEmpty').hidden = nodes.length > 0;
      canvas.querySelectorAll('.node').forEach((x) => x.remove());
      const W = canvas.clientWidth || 600, H = canvas.clientHeight || 300;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svg.innerHTML = links.map(([p, q]) => {
        const a = nodes.find((n) => n.id === p), b = nodes.find((n) => n.id === q);
        return `<line class="lk ${isWl(a, b) ? 'wl' : ''}" x1="${(a.x * W) / 100}" y1="${(a.y * H) / 100}" x2="${(b.x * W) / 100}" y2="${(b.y * H) / 100}"/>`;
      }).join('');
      nodes.forEach((n) => {
        const d = FD.h(`<button class="node ${sel === n.id ? 'sel' : ''}" style="left:${n.x}%;top:${n.y}%" data-id="${n.id}" aria-label="${T[n.t][0]}">${icon(n.t)}<span>${T[n.t][0]}</span></button>`);
        canvas.appendChild(d);
        drag(d, n);
      });
      $('#bDel').disabled = sel == null;
    }
    function drag(d, n) {
      let sx, sy, moved = false;
      d.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sx = e.clientX; sy = e.clientY; moved = false;
        d.setPointerCapture(e.pointerId);
        const r = canvas.getBoundingClientRect();
        const mv = (ev) => {
          if (Math.hypot(ev.clientX - sx, ev.clientY - sy) > 5) moved = true;
          if (!moved) return;
          n.x = FD.clamp(((ev.clientX - r.left) / r.width) * 100, 5, 95);
          n.y = FD.clamp(((ev.clientY - r.top) / r.height) * 100, 8, 92);
          d.style.left = n.x + '%'; d.style.top = n.y + '%';
        };
        const up = () => {
          d.removeEventListener('pointermove', mv); d.removeEventListener('pointerup', up);
          if (moved) { draw(); return; }
          if (sel != null && sel !== n.id) { link(nodes.find((x) => x.id === sel), n); sel = null; draw(); }
          else { sel = sel === n.id ? null : n.id; draw(); }
        };
        d.addEventListener('pointermove', mv);
        d.addEventListener('pointerup', up);
      });
    }
    el.querySelectorAll('[data-add]').forEach((b) => b.addEventListener('click', () => add(b.dataset.add)));
    $('#bDel').addEventListener('click', () => { nodes = nodes.filter((n) => n.id !== sel); links = links.filter(([p, q]) => p !== sel && q !== sel); sel = null; draw(); });
    $('#bClear').addEventListener('click', () => { nodes = []; links = []; sel = null; $('#bfb').innerHTML = ''; draw(); });
    function example() {
      nodes = []; links = []; sel = null; uid = 1;
      const net = add('internet', 8, 50), rt = add('router', 30, 50), sw = add('switch', 55, 75);
      const p1 = add('phone', 60, 14), p2 = add('phone', 78, 22), tb = add('tablet', 70, 42), d1 = add('desktop', 80, 64), d2 = add('desktop', 88, 86);
      [[net, rt], [rt, sw], [rt, p1], [rt, p2], [rt, tb], [sw, d1], [sw, d2]].forEach(([a, b]) => links.push([a.id, b.id]));
      draw();
    }
    $('#bEx').addEventListener('click', () => { example(); check(); });

    function check() {
      const by = (t) => nodes.filter((n) => n.t === t);
      const nb = (n) => links.filter(([p, q]) => p === n.id || q === n.id).map(([p, q]) => nodes.find((x) => x.id === (p === n.id ? q : p)));
      const net = by('internet')[0];
      const reach = new Set();
      if (net) { const st = [net]; while (st.length) { const c = st.pop(); if (reach.has(c.id)) continue; reach.add(c.id); if (WIRELESS.includes(c.t) && c !== net) continue; nb(c).forEach((x) => st.push(x)); } }
      const wlOK = (n) => nb(n).some((x) => ['router', 'ap', 'booster'].includes(x.t));
      const cabOK = (n) => nb(n).some((x) => ['router', 'switch'].includes(x.t));
      const R = [
        [by('phone').length >= 2 && by('tablet').length >= 1 && by('desktop').length >= 2, 'Two smartphones, one tablet and two desktop PCs', 'Add the devices from the task: 2 smartphones, 1 tablet, 2 desktop PCs.'],
        [!!net, 'Internet access shown', 'Add the Internet.'],
        [!!net && nb(net).some((x) => x.t === 'router'), 'A router (gateway) connects the home network to the internet', 'Connect a router to the Internet: it is the gateway between the LAN and the WAN.'],
        [by('router').length > 0 || by('ap').length > 0, 'A wireless access point (or a router with one built in)', 'The phones and the tablet need a wireless access point (most home routers have one).'],
        [by('phone').length + by('tablet').length > 0 && [...by('phone'), ...by('tablet')].every(wlOK), 'Smartphones and tablet connected wirelessly', 'Connect each smartphone and the tablet to the router or an access point.'],
        [by('desktop').length > 0 && by('desktop').every(cabOK), 'Desktop PCs connected by cable to the router or a switch', 'Connect each desktop PC with a cable to the router or a switch.'],
        [nodes.filter((n) => n.t !== 'internet').length > 0 && nodes.filter((n) => n.t !== 'internet').every((n) => reach.has(n.id)), 'Every device can reach the internet', 'Some devices are not connected to the rest of the network.'],
        [links.length > 0 && links.every(([p, q]) => { const a = nodes.find((x) => x.id === p), b = nodes.find((x) => x.id === q); return !(WIRELESS.includes(a.t) && WIRELESS.includes(b.t)); }), 'Sensible connections (no phone-to-phone links)', 'Phones and tablets should connect to an access point, not to each other.'],
      ];
      const got = R.filter((r) => r[0]).length;
      $('#bfb').innerHTML = R.map(([ok, good, bad]) => `<li class="${ok ? 'good' : 'bad'}">${ok ? '✓ ' + good : '✗ ' + bad}</li>`).join('') + `<li class="bscore"><b>${got} / 8</b> ${got === 8 ? '🎉 Excellent! In the exam, remember to label every part.' : ''}</li>`;
      return got;
    }
    $('#bCheck').addEventListener('click', check);
    const ro = new ResizeObserver(() => { if (root.dataset.panel === 'build') draw(); });
    ro.observe(canvas);

    const show = FD.panels(root, (p) => { if (p === 'build') requestAnimationFrame(draw); });
    slow(); comp(null); show('cab');
    return {
      show, comp, example, check, addJob,
      zone: (z) => FD.focus(root.querySelector('[data-panel="cab"]'), z),
      speeds(c, n) { $('#cabSp').value = c; $('#netSp').value = n; slow(); },
      destroy() { clearTimeout(pTimer); ro.disconnect(); },
    };
  },
  steps: [
    {
      title: 'Cables',
      text: `<p>Cables connect devices in a wired network. In homes and small businesses, <strong>Cat5e</strong> cables are used for Ethernet: <strong>10 Mbit/s, 100 Mbit/s or 1 Gbit/s</strong>.</p>
             <p>They connect devices through their <strong>NICs</strong> (network interface cards). <strong>Cat6</strong> cables reach <strong>10 Gbit/s</strong>, but cost more, so they are mainly used by businesses.</p>`,
      on: (a) => { a.show('cab'); a.zone(['c5', 'c6']); },
    },
    {
      title: 'Fibre optic cables',
      text: `<p><strong>Fibre optic</strong> cables contain a glass thread that bounces <strong>light</strong> signals between two devices – faster and further than wire cables: <strong>40 Gbit/s</strong> over many kilometres.</p>
             <p>They are expensive, so they are used by telecoms companies and organisations that need very fast transfer: laboratories, hospitals, banks, schools and universities.</p>`,
      on: (a) => { a.show('cab'); a.zone('fo'); },
    },
    {
      title: 'The slowest part',
      text: `<p>The speed of a network is limited by its <strong>slowest part</strong>.</p>
             <p>If a network uses 10 Gbit/s cables but the internet connection is 100 Mbit/s, the cables will <strong>not</strong> make downloads faster: they only work at 1/100 of their maximum.</p>`,
      tip: 'Try it: change the two speeds.',
      on: (a) => { a.show('cab'); a.zone('slow'); a.speeds(10000, 100); },
    },
    {
      title: 'Wireless access points',
      text: `<p>A <strong>wireless access point</strong> lets Wi-Fi devices connect to a <strong>wired</strong> network. It is often built into a router, or it is a stand-alone device connected with an Ethernet cable.</p>`,
      tip: 'Try it: click each part of the diagram.',
      on: (a) => { a.show('dev'); a.comp('ap'); },
    },
    {
      title: 'Switches',
      text: `<p>A <strong>switch</strong> connects devices on a network. It has <strong>ports</strong> for cables.</p>
             <p>It makes sure data from any device gets to the <strong>correct</strong> device: a laptop sends a document with the printer’s IP address to the switch, and the switch sends it to the printer.</p>`,
      on: (a) => { a.show('dev'); a.comp('sw'); },
    },
    {
      title: 'Gateways and routers',
      text: `<p>A <strong>gateway</strong> connects two <strong>different types</strong> of network, e.g. a LAN to a WAN.</p>
             <p>A <strong>router</strong> stores the addresses of all the devices connected to it, so it can forward traffic by the <strong>quickest route</strong>. Most home routers include a switch and a wireless access point, and they are the gateway to the internet.</p>`,
      on: (a) => { a.show('dev'); a.comp('rt'); },
    },
    {
      title: 'Boosters',
      text: `<p>A <strong>booster</strong> amplifies the signal so that its <strong>range</strong> can be extended. Ethernet has a maximum range of about 100 m, and wireless range is limited too.</p>
             <p>Access points can be set to <strong>repeater mode</strong> to act as Wi-Fi boosters.</p>`,
      on: (a) => { a.show('dev'); a.comp('bo'); },
    },
    {
      title: 'Servers',
      text: `<p>A <strong>server</strong> is a computer that shares its resources (printers, storage, applications) with connected devices, called <strong>clients</strong>.</p>
             <p>Types: <strong>authentication</strong>, <strong>print</strong>, <strong>file</strong>, <strong>application</strong> and <strong>web</strong> servers.</p>`,
      tip: 'One computer can do several server jobs, but this affects its performance: it depends on its memory and processor.',
      async on(a, ctx) { a.show('srv'); if (!(await ctx.sleep(800))) return; a.addJob('Room 4'); if (!(await ctx.sleep(400))) return; a.addJob('Office'); a.addJob('Library'); },
    },
    {
      title: 'Web servers and HTTP',
      text: `<p><strong>Web servers</strong> process requests for data made with <strong>HTTP</strong>. All the content on all web servers is the <strong>World Wide Web</strong>.</p>`,
      tip: 'Did you know? HTTP was developed in 1989 by Sir Tim Berners-Lee to share information with colleagues.',
      on: (a) => a.show('srv'),
    },
    {
      title: 'Build a home network',
      text: `<p>Now design a network for a home with <strong>two smartphones</strong>, <strong>one tablet</strong>, <strong>two desktop PCs</strong> and <strong>internet access</strong>.</p>
             <p>Add the parts, connect them and press <strong>Check my network</strong>.</p>`,
      tip: 'Stuck? Press “Show an example”, then clear it and build your own.',
      on: (a) => a.show('build'),
    },
  ],
});

FD.check({
  section: 'components',
  items: [
    { type: 'mcq', q: 'Which one of these connects a LAN to a WAN?', opts: ['Gateway', 'Switch', 'Booster', 'Printer'], why: 'A gateway connects two different types of network. Home routers act as the gateway.' },
    {
      type: 'sort',
      q: 'Match each component to its job.',
      bins: ['Switch', 'Access point', 'Router', 'Booster'],
      rows: [['Sends data to the correct device on the network', 0], ['Lets Wi-Fi devices join a wired network', 1], ['Forwards traffic by the quickest route', 2], ['Amplifies the signal to extend its range', 3]],
      why: 'Switch = right device; access point = Wi-Fi; router = quickest route; booster = range.',
    },
    { type: 'mcq', q: 'State the reason why a booster is used in a network.', opts: ['To amplify the signal so the range can be extended', 'To encrypt the data', 'To store the users’ files', 'To block unauthorised users'], why: 'Boosters extend the range of wired and wireless signals.' },
    { type: 'mcq', q: 'A network has 10 Gbit/s cables and a 100 Mbit/s internet connection. How fast are internet downloads?', opts: ['About 100 Mbit/s', '10 Gbit/s', '10.1 Gbit/s', '1 Gbit/s'], why: 'The speed of a network is limited by its slowest part.' },
    { type: 'sort', q: 'Which server is it?', bins: ['Authentication', 'Print', 'File', 'Web'], rows: [['Checks usernames and passwords', 0], ['Puts jobs in a queue for printers', 1], ['Gives access to shared and private storage', 2], ['Processes HTTP requests', 3]], why: 'Each type of server shares a different resource with its clients.' },
  ],
});
