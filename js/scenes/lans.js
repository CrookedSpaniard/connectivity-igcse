FD.add({
  id: 'lans',
  title: 'Local area networks: peer-to-peer and client-server',
  tab: 'Peer-to-peer & client-server',
  icon: 'lans',
  color: '--c1',
  section: true,
  interactive: true,
  vocab: [
    ['peer-to-peer network', 'computers share their resources with each other, but do not access servers'],
    ['client-server network', 'a network that uses servers and clients'],
    ['access rights', 'what each user, or group of users, is allowed to access'],
    ['roaming profile', 'logging in to any computer in the network and seeing your own settings and files (hotdesking)'],
  ],
  mount(el) {
    const BEN = [
      ['🖨️', 'Shared peripherals', 'One printer or scanner for everybody.'],
      ['🗄️', 'Shared storage and data', 'Files are stored in one place.'],
      ['💻', 'Flexible access', 'Use peripherals, storage and data from any connected device.'],
      ['🎬', 'Media streaming', 'Movies, music and gaming across the network.'],
      ['💬', 'Communication', 'Send messages and files to others on the network.'],
      ['🌐', 'Shared internet access', 'One internet connection for every device.'],
    ];
    const USERS = { ana: ['Ana (student)', '#1c7ed6', '🐬'], tom: ['Tom (student)', '#e8590c', '🦊'], mrs: ['Ms Ortiz (teacher)', '#2f9e44', '🌿'] };
    const FOLDERS = [
      ['📁 My documents', { ana: 'rw', tom: 'rw', mrs: 'rw' }],
      ['📁 Shared – Year 10', { ana: 'r', tom: 'r', mrs: 'rw' }],
      ['📁 Homework drop box', { ana: 'w', tom: 'w', mrs: 'rw' }],
      ['🔒 Staff only – exam papers', { ana: '-', tom: '-', mrs: 'rw' }],
    ];
    const RIGHTS = { rw: ['Read and write', 'good'], r: ['Read only', 'warn'], w: ['Write only (hand in)', 'warn'], '-': ['Access denied', 'bad'] };
    el.innerHTML = `
      <div class="sim lans">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="mod">🔀 Two models</button><button data-p="ben">✅ Benefits of LANs</button><button data-p="cs">🏫 Client-server in action</button>
        </div>

        <div data-panel="mod" class="sim">
          <div class="seg" id="model"><span class="seg-l">Model</span><button data-v="p2p">Peer-to-peer</button><button data-v="cs">Client-server</button></div>
          <div class="sim-box">
            <svg viewBox="0 0 600 260" class="mods" aria-label="Peer-to-peer and client-server networks">
              <g class="m-p2p">
                ${[[300, 40], [480, 130], [300, 215], [120, 130]].map(([x, y], i, a) => a.slice(i + 1).map(([x2, y2]) => `<path class="lk2" d="M${x} ${y} L${x2} ${y2}"/>`).join('')).join('')}
                ${[[300, 40], [480, 130], [300, 215], [120, 130]].map(([x, y]) => `${FD.dv.laptop(x - 30, y - 22)}<text class="svg-lbl" x="${x}" y="${y + 36}">Peer</text>`).join('')}
              </g>
              <g class="m-cs">
                ${[[150, 205], [300, 205], [450, 205]].map(([x, y]) => `<path class="lk2" d="M300 120 L${x} ${y}"/>`).join('')}<path class="lk2" d="M300 100 L300 50"/>
                <circle cx="300" cy="115" r="38" class="srv-ring"/>${FD.dv.server(270, 92)}<text class="svg-lbl" x="300" y="170">Server</text>
                ${FD.dv.printer(270, 5)}<text class="svg-sm" x="352" y="30">Printer</text>
                ${[[150, 205], [300, 205], [450, 205]].map(([x, y]) => `${FD.dv.desktop(x - 30, y - 22)}<text class="svg-lbl" x="${x}" y="${y + 40}">Client</text>`).join('')}
              </g>
            </svg>
          </div>
          <p class="note" id="modNote"></p>
        </div>

        <div data-panel="ben" class="sim" hidden>
          <div class="cards3 bens">${BEN.map(([e, n, d], i) => `<div class="mini" data-b="${i}"><h5>${e} ${n}</h5><p>${d}</p></div>`).join('')}</div>
          <p class="note">A LAN connects computers in a small area, such as a home or an office.</p>
        </div>

        <div data-panel="cs" class="sim" hidden>
          <div class="cs-top">
            <div class="seg" id="who"><span class="seg-l">Log in as</span>${Object.entries(USERS).map(([k, [n]]) => `<button data-v="${k}">${n}</button>`).join('')}</div>
            <div class="seg" id="pc"><span class="seg-l">At computer (hotdesking)</span>${['Room 4 · PC 2', 'Library · PC 9', 'Lab · PC 15'].map((n, i) => `<button data-v="${i}">${n}</button>`).join('')}</div>
          </div>
          <div class="desk" id="desk">
            <div class="desk-bar"><b id="deskWho"></b><small id="deskPc"></small></div>
            <div class="desk-body">
              <ul class="folders" id="folders">${FOLDERS.map(([n], i) => `<li><button class="fold" data-f="${i}">${n}</button><span class="right-tag" id="rt${i}"></span></li>`).join('')}</ul>
              <div class="desk-side">
                <button class="mini-btn" id="bk">💾 Run the backup (administrator)</button>
                <button class="mini-btn" id="sw">🧩 Install a new app for everybody</button>
                <p class="small" id="deskMsg"></p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s), root = el.querySelector('.lans');

    function model(m) {
      FD.segSet($('#model'), m);
      root.querySelector('.mods').dataset.m = m;
      $('#modNote').innerHTML = m === 'p2p'
        ? '<b>Peer-to-peer:</b> each computer shares its resources with the others. There are <b>no servers</b>.'
        : '<b>Client-server:</b> the server shares resources (printers, storage, applications) with the <b>clients</b> connected to it.';
    }
    $('#model').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) model(b.dataset.v); });

    const C = { u: 'ana', pc: 0 };
    function desk() {
      const [n, col, e] = USERS[C.u];
      FD.segSet($('#who'), C.u); FD.segSet($('#pc'), C.pc);
      $('#desk').style.setProperty('--wall', col);
      $('#deskWho').textContent = `${e} ${n}`;
      $('#deskPc').textContent = `${['Room 4 · PC 2', 'Library · PC 9', 'Lab · PC 15'][C.pc]} · same desktop, same files: roaming profile`;
      FOLDERS.forEach(([, r], i) => { const [t, c] = RIGHTS[r[C.u]]; $('#rt' + i).textContent = t; $('#rt' + i).className = 'right-tag ' + c; });
      $('#deskMsg').textContent = 'Open a folder.';
      FD.pulse($('#desk'));
    }
    $('#who').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { C.u = b.dataset.v; desk(); } });
    $('#pc').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { C.pc = +b.dataset.v; desk(); } });
    el.querySelectorAll('.fold').forEach((b) => b.addEventListener('click', () => {
      const [n, r] = FOLDERS[b.dataset.f], v = r[C.u];
      $('#deskMsg').innerHTML = v === '-' ? `⛔ <b>${n.replace(/^\S+ /, '')}</b>: access denied. Your access rights do not allow this.` : v === 'r' ? `👀 You can open the files but not change them (read only).` : v === 'w' ? '📥 You can hand in files, but you cannot see other students’ work.' : '✏️ You can open, change and save files here.';
      if (v === '-') FD.shake(b);
    }));
    $('#bk').addEventListener('click', () => { $('#deskMsg').innerHTML = '💾 Backup done for <b>all 1,240 users</b> at once. Nobody had to remember to back up their own files: <b>centralised backup</b>.'; });
    $('#sw').addEventListener('click', () => { $('#deskMsg').innerHTML = '🧩 Installed once on the <b>application server</b>; every client can use it now: <b>shared software</b> and <b>centralised administration</b>.'; });

    const show = FD.panels(root);
    model('p2p'); desk(); show('mod');
    return {
      show, model,
      who(u, pc) { if (u) C.u = u; if (pc != null) C.pc = pc; desk(); },
      hot(list) { el.querySelectorAll('.bens .mini').forEach((m) => m.classList.toggle('hot', list.includes(+m.dataset.b))); },
      async allBen(ctx) { for (let i = 0; i < BEN.length; i++) { this.hot([i]); if (!(await ctx.sleep(700))) return; } this.hot([]); },
      open(i) { el.querySelector(`.fold[data-f="${i}"]`).click(); },
      backup() { $('#bk').click(); },
      soft() { $('#sw').click(); },
    };
  },
  steps: [
    {
      title: 'Two ways to build a LAN',
      text: `<p>A <strong>LAN</strong> is a network in a small area, such as a home or an office. Computers in a LAN can be connected using one of two models:</p>
             <ul><li><strong>peer-to-peer</strong></li><li><strong>client-server</strong>.</li></ul>`,
      on: (a) => { a.show('mod'); a.model('p2p'); },
    },
    {
      title: 'Peer-to-peer networks',
      text: `<p>In a <strong>peer-to-peer</strong> network, the computers share their resources with the other computers in the network, but they do <strong>not</strong> access servers.</p>`,
      on: (a) => { a.show('mod'); a.model('p2p'); },
    },
    {
      title: 'Client-server networks',
      text: `<p>A network that uses <strong>servers</strong> and <strong>clients</strong> is a <strong>client-server</strong> network. The clients use the resources that the servers share.</p>`,
      on: (a) => { a.show('mod'); a.model('cs'); },
    },
    {
      title: 'Benefits of using LANs',
      text: `<p>Connecting computers in a LAN gives access to <strong>shared peripherals</strong>, <strong>shared storage and data</strong>, <strong>flexible access</strong> (from any connected device), <strong>media streaming</strong>, <strong>communication</strong> and <strong>shared internet access</strong>.</p>`,
      async on(a, ctx) { a.show('ben'); await a.allBen(ctx); },
    },
    {
      title: 'Client-server: access rights',
      text: `<p>Client-server networks have extra benefits that peer-to-peer networks do not have.</p>
             <p><strong>Control of user access rights:</strong> users, or groups of users, can be given access to some resources and restricted from others.</p>`,
      tip: 'Try it: log in as Ana, then as the teacher, and open the “Staff only” folder.',
      async on(a, ctx) { a.show('cs'); a.who('ana', 0); if (!(await ctx.sleep(1000))) return; a.open(3); },
    },
    {
      title: 'Centralised administration and backup',
      text: `<p><strong>Centralised administration:</strong> resources and user accounts are managed by administrators who have an overview of the network, so inexperienced users do not create problems.</p>
             <p><strong>Centralised backup:</strong> backups can be automated for all users, so they are more likely to happen.</p>`,
      async on(a, ctx) { a.show('cs'); if (!(await ctx.sleep(600))) return; a.backup(); },
    },
    {
      title: 'Shared software and storage',
      text: `<p><strong>Shared software:</strong> application servers give access to software (and even operating systems).</p>
             <p><strong>Shared storage and file access:</strong> storage is managed centrally and <strong>file permissions</strong> can be set for files, folders or drives: <strong>read only</strong> or <strong>read and write</strong>.</p>`,
      async on(a, ctx) { a.show('cs'); a.soft(); if (!(await ctx.sleep(2200))) return; a.open(1); },
    },
    {
      title: 'Roaming profiles (hotdesking)',
      text: `<p>A <strong>roaming profile</strong> lets you log in to <strong>any</strong> computer in the network and see your own settings and files: your data, applications, mail and printers.</p>
             <p>You can work anywhere there is a client.</p>`,
      tip: 'Try it: stay logged in as the same user and change computer.',
      async on(a, ctx) { a.show('cs'); a.who('tom', 0); for (const pc of [1, 2]) { if (!(await ctx.sleep(1500))) return; a.who(null, pc); } },
    },
  ],
});

FD.activities({
  section: 'lans',
  items: [
    { id: 'lanparty', title: 'LAN parties', task: '<p>What is a “<b>LAN party</b>”? Use the internet to find out and write your own definition of the term.</p>', lines: 4, hint: 'A LAN party is…' },
  ],
});

FD.check({
  section: 'lans',
  items: [
    { type: 'mcq', q: 'In which type of network do computers share resources with each other without accessing servers?', opts: ['Peer-to-peer', 'Client-server', 'WAN', 'VPN'], why: 'Peers share with each other; there is no server.' },
    { type: 'multi', q: 'State three benefits to users of using a local area network.', need: 3, opts: [['Shared peripherals, e.g. printers', true], ['Shared internet access', true], ['Communication: sending messages and files', true], ['Faster than any WAN in the world', false], ['No need for any cables or devices', false]], why: 'Also: shared storage and data, flexible access, media streaming.' },
    {
      type: 'sort',
      q: 'Which client-server benefit is it?',
      bins: ['Access rights', 'Central backup', 'Roaming profile', 'Shared software'],
      rows: [['Students cannot open the staff folder', 0], ['All users’ files are copied automatically every night', 1], ['You see your own desktop on any computer', 2], ['An app installed once on a server works on every client', 3]],
      why: 'These are benefits of client-server networks that peer-to-peer networks do not have.',
    },
    { type: 'tf', q: 'File permissions can be set so that users can only read a file, or read and write to it.', a: true, why: 'Permissions can be set for individual files, folders or drives.' },
  ],
});
