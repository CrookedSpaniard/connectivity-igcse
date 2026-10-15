FD.add({
  id: 'security',
  title: 'Securing data on networks',
  tab: 'Security',
  icon: 'security',
  color: '--c9',
  section: true,
  interactive: true,
  vocab: [
    ['login', 'user or account information, such as a user name or account name'],
    ['authenticate', 'confirm that the user is who they say they are'],
    ['firewall', 'controls the network traffic to and from a network, particularly from the internet'],
    ['encryption', 'encoding, scrambling or jumbling data so that unauthorised users cannot understand it'],
    ['cipher', 'a code'],
    ['eavesdropper', 'an unauthorised person or piece of software that intercepts data from a private communication'],
    ['VPN', 'virtual private network: access to a private LAN from a remote location, with encrypted data'],
    ['geolocation rights management', 'using a user’s location to block access to services online'],
    ['log', 'a record of events'],
    ['transaction', 'the exchange of data'],
  ],
  mount(el) {
    const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const PKTS = [
      ['📄 Web page you asked for', 1], ['📧 Email from a teacher', 1], ['🕵️ Login attempt from an unknown computer', 0],
      ['🎵 Music stream', 1], ['🦠 Hidden malware download', 0], ['🔍 Scan looking for open ports', 0],
    ];
    const LOG = [
      ['08:02', 'ana.r', 'PC-ROOM4-02', 'Logged in', 0], ['08:05', 'ana.r', 'PC-ROOM4-02', 'Opened Shared – Year 10', 0],
      ['08:40', 'mrs.ortiz', 'LAPTOP-STAFF-7', 'Printed 30 pages', 0], ['10:15', 'tom.k', 'PC-LIB-09', 'Logged in', 0],
      ['03:12', 'admin', 'UNKNOWN-DEVICE', 'Copied Staff only – exam papers', 1], ['11:30', 'tom.k', 'PC-LIB-09', 'Saved Homework.docx', 0],
    ];
    el.innerHTML = `
      <div class="sim sec">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="login">🔑 Login</button><button data-p="fw">🧱 Firewall</button><button data-p="caesar">🔤 Caesar cipher</button><button data-p="keys">🗝️ Public key</button><button data-p="wifi">📶 WEP &amp; WPA</button><button data-p="vpn">🛡️ VPN</button><button data-p="more">📜 Rights, logs, backups</button>
        </div>

        <div data-panel="login" class="sim">
          <div class="login-grid">
            <form class="login-box" id="lgForm">
              <p class="strong">🏫 school.local · Sign in</p>
              <label>User name<input id="lgU" autocomplete="off" placeholder="ana.r"></label>
              <label>Password<input id="lgP" type="password" autocomplete="off" placeholder="••••••••"></label>
              <button class="btn primary small-btn">Sign in</button>
              <p class="small muted">Demo account: <code>ana.r</code> / <code>Blue-Kite-42</code> (made up).</p>
            </form>
            <div class="sim-box auth">
              <svg viewBox="0 0 300 150" aria-label="The client asks the authentication server">
                ${FD.dv.desktop(10, 50)}<text class="svg-sm" x="40" y="112">Client</text>
                ${FD.dv.server(220, 45)}<text class="svg-sm" x="250" y="108">Authentication</text><text class="svg-sm" x="250" y="120">server</text>
                <path class="wire" d="M70 75 H230"/>
                <g id="cred" class="cred"><rect x="-34" y="-11" width="68" height="22" rx="5"/><text y="4" id="credT">ana.r ••••</text></g>
              </svg>
              <div class="res-row" id="resRow">${['🗄️ Storage', '🧩 Apps', '🖨️ Printers', '📧 Email'].map((r) => `<span class="res">${r}</span>`).join('')}</div>
              <p class="small" id="lgMsg">Sign in to use the network’s resources.</p>
            </div>
          </div>
        </div>

        <div data-panel="fw" class="sim" hidden>
          <div class="sim-box fw-box">
            <div class="fw-net">🌐<small>Internet</small></div>
            <div class="fw-wall" id="wall"><span>🧱</span><small id="fwState">Firewall ON</small></div>
            <div class="fw-lan">🏢<small>School network</small></div>
            <div class="fw-lane" id="lane"></div>
          </div>
          <div class="ctrls"><button class="btn primary small-btn" id="fwGo">▶ Send traffic</button><label class="tgl"><input type="checkbox" id="fwOn" checked> Firewall switched on</label></div>
          <ul class="fw-log" id="fwLog"></ul>
        </div>

        <div data-panel="caesar" class="sim" hidden>
          <div class="sim-box">
            <div class="abc" id="abc"></div>
          </div>
          <div class="ctrls">
            <div class="seg" id="cMode"><span class="seg-l">I want to</span><button data-v="enc">🔒 Encrypt</button><button data-v="dec">🔓 Decrypt</button></div>
            <label class="rng"><span>Key (shift) <output id="kOut"></output></span><input type="range" id="key" min="1" max="25" value="4"></label>
            <div class="seg" id="cDir"><span class="seg-l">Shift the letters</span><button data-v="L">◀ Left (Figure 5.18)</button><button data-v="R">Right ▶</button></div>
          </div>
          <div class="cz-io">
            <label>Text<input id="czIn" value="MEET AT NOON" autocomplete="off" spellcheck="false"></label>
            <p class="cz-out" id="czOut" aria-live="polite"></p>
          </div>
          <div class="ctrls"><button class="mini-btn" id="czBook">Try the book’s message: WHWJ PQNEJC</button></div>
        </div>

        <div data-panel="keys" class="sim" hidden>
          <div class="seg" id="kType"><span class="seg-l">Type of encryption</span><button data-v="pub">Public key</button><button data-v="sym">Symmetric key</button></div>
          <div class="sim-box keys-box">
            <div class="person" id="pF"><span>🧔🏽</span><b>Farooq</b><small id="kF"></small></div>
            <div class="msg-lane"><div class="envelope" id="env">✉️ <span id="envT">Hello Iyabode</span></div><div class="eve" id="eve">🕵️ <small id="eveT">Eve listens…</small></div></div>
            <div class="person" id="pI"><span>👩🏾</span><b>Iyabode</b><small id="kI"></small></div>
          </div>
          <div class="ctrls"><button class="btn primary small-btn" id="kNext">▶ Next step</button><button class="mini-btn" id="kReset">↺ Start again</button></div>
          <p class="small" id="kMsg"></p>
        </div>

        <div data-panel="wifi" class="sim" hidden>
          <div class="seg" id="wType"><span class="seg-l">Wireless security</span><button data-v="wep">WEP</button><button data-v="wpa">WPA</button></div>
          <div class="sim-box wifi-box">
            <div class="wf-col"><span>📶</span><small>Wireless network</small></div>
            <div class="wf-pkts" id="wfPkts"></div>
            <div class="wf-col"><span>🕵️</span><small>Eavesdropper</small><b id="wfCount">0 packets</b></div>
          </div>
          <div class="ctrls"><button class="btn primary small-btn" id="wfGo">▶ Start eavesdropping</button></div>
          <p class="small" id="wfMsg"></p>
        </div>

        <div data-panel="vpn" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 640 190" aria-label="A VPN tunnel from home to the office network">
              ${FD.dv.laptop(20, 70)}<text class="svg-lbl" x="50" y="135">Working from home</text>
              ${FD.dv.cloud(270, 40)}<text class="svg-lbl" x="316" y="110">Internet (public)</text>
              <path class="tunnel-v" id="tun" d="M85 95 C 200 30, 430 30, 545 95"/>
              <path class="wire" d="M85 95 C 200 60, 430 60, 545 95"/>
              <g class="office"><rect x="545" y="55" width="80" height="80" rx="10"/><text class="svg-lbl" x="585" y="90">Office</text><text class="svg-lbl" x="585" y="106">LAN</text></g>
              <text class="emo" x="320" y="165" id="spy">🕵️</text><text class="svg-sm" x="320" y="183" id="spyT"></text>
              <g id="vpk"><rect class="pkt" x="-40" y="-11" width="80" height="22" rx="4"/><text class="pkt-t" y="4" id="vpkT"></text><animateMotion dur="3s" repeatCount="indefinite" path="M85 85 C 200 40, 430 40, 545 85"/></g>
            </svg>
          </div>
          <label class="tgl"><input type="checkbox" id="vpnOn"> Connect with a VPN</label>
          <ul class="vpn-uses"><li>💼 Access the employer’s network when working from home</li><li>🌍 Access computers in another location, e.g. to avoid censorship or <b>geolocation rights management</b></li><li>💳 Make secure payments</li><li>👁️ Prevent surveillance of their web activity</li></ul>
        </div>

        <div data-panel="more" class="sim" hidden>
          <div class="cards3">
            <div class="mini"><h5>📂 File access rights</h5><p>Also called <b>file permissions</b>. Set for files, folders or drives: <b>read only</b> or <b>read and write</b>.</p></div>
            <div class="mini"><h5>💾 Backups</h5><p>A copy of one or more files, usually stored on a <b>different storage device</b> from the original.</p></div>
          </div>
          <p class="strong">📜 Transaction log: click the activity that looks unusual</p>
          <div class="tbl-wrap"><table class="tbl log-tbl"><thead><tr><th>Time</th><th>User</th><th>Device</th><th>Action</th></tr></thead><tbody>
            ${LOG.map(([t, u, d, a, bad], i) => `<tr data-i="${i}" data-bad="${bad}" tabindex="0"><td>${t}</td><td>${u}</td><td>${d}</td><td>${a}</td></tr>`).join('')}
          </tbody></table></div>
          <p class="small" id="logMsg">A log does not secure data by itself, but it helps administrators spot activity that might be a threat.</p>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s), root = el.querySelector('.sec');
    const timers = [];
    const later = (f, ms) => timers.push(setTimeout(f, FD.dur(ms)));

    // ---------- login ----------
    function signIn(u, p) {
      const ok = u.trim().toLowerCase() === 'ana.r' && p === 'Blue-Kite-42';
      $('#credT').textContent = `${u || '?'} ••••`;
      const c = $('#cred');
      c.classList.remove('go', 'back'); void c.getBoundingClientRect(); c.classList.add('go');
      $('#lgMsg').textContent = 'Checking with the authentication server…';
      later(() => {
        c.classList.remove('go'); void c.getBoundingClientRect(); c.classList.add('back');
        $('#credT').textContent = ok ? '📜 certificate' : '✗ denied';
        root.querySelector('.auth').classList.toggle('ok', ok);
        $('#lgMsg').innerHTML = ok ? '✓ <b>Authenticated.</b> The client received an electronic certificate, so Ana can use every resource without logging in again.' : '✗ <b>Wrong user name or password.</b> Without the correct login details you cannot access the network.';
      }, 1200);
    }
    $('#lgForm').addEventListener('submit', (e) => { e.preventDefault(); signIn($('#lgU').value, $('#lgP').value); });

    // ---------- firewall ----------
    function fw() {
      const on = $('#fwOn').checked;
      $('#wall').classList.toggle('off', !on);
      $('#fwState').textContent = on ? 'Firewall ON' : 'Firewall OFF';
      $('#fwLog').innerHTML = '';
      $('#lane').innerHTML = '';
      PKTS.forEach(([n, good], i) => later(() => {
        const blocked = on && !good;
        const p = FD.h(`<span class="fw-p ${blocked ? 'stop' : 'pass'}">${n.split(' ')[0]}</span>`);
        $('#lane').appendChild(p);
        later(() => {
          p.remove();
          $('#fwLog').insertAdjacentHTML('beforeend', `<li class="${blocked ? 'bad' : good ? 'good' : 'warn'}">${blocked ? '⛔ Blocked' : good ? '✓ Allowed' : '⚠️ Got in!'} · ${n}</li>`);
        }, 1600);
      }, i * 650));
    }
    $('#fwGo').addEventListener('click', fw);
    $('#fwOn').addEventListener('change', () => { $('#wall').classList.toggle('off', !$('#fwOn').checked); $('#fwState').textContent = $('#fwOn').checked ? 'Firewall ON' : 'Firewall OFF'; });

    // ---------- Caesar ----------
    const C = { mode: 'enc', dir: 'L' };
    const shiftCh = (ch, k) => { const i = A.indexOf(ch); return i < 0 ? ch : A[(i + k + 26 * 2) % 26]; };
    function caesar() {
      const k = +$('#key').value;
      $('#kOut').textContent = k;
      FD.segSet($('#cMode'), C.mode); FD.segSet($('#cDir'), C.dir);
      const enc = C.dir === 'L' ? -k : k;               // how a plain letter moves when encrypting
      $('#abc').innerHTML = `<div class="abc-row">${[...A].map((c) => `<span>${c}</span>`).join('')}</div><div class="abc-row cip">${[...A].map((c) => `<span>${shiftCh(c, enc)}</span>`).join('')}</div>
        <p class="small muted">Top: original letter · Bottom: encrypted letter (key ${k}, shifted ${C.dir === 'L' ? 'left' : 'right'}).</p>`;
      const t = $('#czIn').value.toUpperCase();
      const out = [...t].map((c) => shiftCh(c, C.mode === 'enc' ? enc : -enc)).join('');
      $('#czOut').innerHTML = `${C.mode === 'enc' ? '🔒 Encrypted' : '🔓 Decrypted'}: <b>${FD.esc(out)}</b>`;
    }
    $('#key').addEventListener('input', caesar);
    $('#czIn').addEventListener('input', caesar);
    $('#cMode').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { C.mode = b.dataset.v; caesar(); } });
    $('#cDir').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { C.dir = b.dataset.v; caesar(); } });
    const czSet = (o) => { Object.assign(C, o); if (o.k) $('#key').value = o.k; if (o.t != null) $('#czIn').value = o.t; caesar(); };
    $('#czBook').addEventListener('click', () => czSet({ mode: 'dec', dir: 'L', k: 4, t: 'WHWJ PQNEJC' }));

    // ---------- public / symmetric key ----------
    const K = { type: 'pub', step: 0 };
    const KSTEPS = {
      pub: [
        ['', '', 'Hello Iyabode', 'Eve listens…', 'Farooq wants to send Iyabode a secret message.'],
        ['', '🔑🗝️ key pair', 'Hello Iyabode', 'Eve listens…', 'Farooq asks Iyabode for a secure message. Iyabode has a <b>key pair</b>: a <b>public key</b> 🔑 and a <b>private key</b> 🗝️.'],
        ['🔑 Iyabode’s public key', '🔑🗝️ key pair', 'Hello Iyabode', 'Eve copies the public key 🔑', 'Iyabode <b>shares her public key</b> with Farooq. It is public, so Eve can copy it too.'],
        ['🔑 Iyabode’s public key', '🔑🗝️ key pair', '🔒 Q7#x!pz@L2', 'Eve copies the message: 🔒 Q7#x!pz@L2', 'Farooq <b>encrypts</b> the message with Iyabode’s <b>public</b> key and sends it.'],
        ['🔑 Iyabode’s public key', '🗝️ private key used', '🔓 Hello Iyabode', 'Eve cannot decrypt it ✗ (no private key)', 'Iyabode <b>decrypts</b> it with her <b>private key</b>, which is never shared. Eve has the public key, but it cannot decrypt the message.'],
      ],
      sym: [
        ['🔑 secret key', '', 'Hello Iyabode', 'Eve listens…', '<b>Symmetric key</b> encryption uses the <b>same key</b> to encrypt and decrypt.'],
        ['🔑 secret key', '🔑 same key (sent to her)', 'Hello Iyabode', 'Eve copies the key 🔑', 'Farooq has to give Iyabode the same key. If the key is intercepted on the way…'],
        ['🔑 secret key', '🔑 same key', '🔒 Q7#x!pz@L2', 'Eve copies the message', 'Farooq encrypts the message with the key and sends it.'],
        ['🔑 secret key', '🔓 decrypted', '🔓 Hello Iyabode', 'Eve decrypts it too! 😱', 'Iyabode decrypts it… but so can Eve, because she has the same key. This is why <b>public key encryption is more secure</b>.'],
      ],
    };
    function keys() {
      FD.segSet($('#kType'), K.type);
      const S = KSTEPS[K.type], [f, i, m, e, msg] = S[K.step];
      $('#kF').textContent = f; $('#kI').textContent = i; $('#envT').textContent = m; $('#eveT').textContent = e;
      $('#kMsg').innerHTML = `<b>Step ${K.step + 1} of ${S.length}.</b> ${msg}`;
      $('#env').className = 'envelope s' + K.step + ' ' + K.type;
      $('#eve').className = 'eve ' + (/cannot/.test(e) ? 'fail' : /too|copies/.test(e) ? 'got' : '');
      $('#kNext').disabled = K.step >= S.length - 1;
    }
    $('#kType').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { K.type = b.dataset.v; K.step = 0; keys(); } });
    $('#kNext').addEventListener('click', () => { K.step++; keys(); });
    $('#kReset').addEventListener('click', () => { K.step = 0; keys(); });

    // ---------- WEP / WPA ----------
    let wf = 'wep', wfT = 0;
    function wifiType(t) { wf = t; FD.segSet($('#wType'), t); clearInterval(wfT); $('#wfCount').textContent = '0 packets'; $('#wfPkts').innerHTML = ''; $('#wfMsg').innerHTML = t === 'wep' ? '<b>WEP</b> (Wired Equivalent Privacy): every device uses the <b>same key</b> for every transfer.' : '<b>WPA</b> (Wi-Fi Protected Access): a <b>new key for each device</b>, and new keys for <b>each packet</b>.'; }
    function wfGo() {
      clearInterval(wfT);
      let n = 0;
      const t0 = performance.now();
      wfT = setInterval(() => {
        n = Math.min(10000, Math.round(((performance.now() - t0) * FD.speed) / 3000 * 10000));
        $('#wfCount').textContent = FD.fmt(n) + ' packets';
        const k = wf === 'wep' ? 'K1' : 'K' + (100 + Math.floor(Math.random() * 900));
        $('#wfPkts').insertAdjacentHTML('beforeend', `<span class="wf-p">📦<small>${k}</small></span>`);
        if ($('#wfPkts').children.length > 7) $('#wfPkts').firstElementChild.remove();
        if (n >= 10000) {
          clearInterval(wfT);
          $('#wfMsg').innerHTML = wf === 'wep'
            ? '⚠️ <b>Key found!</b> Every packet used the same key, so after studying enough packets the eavesdropper identified it – and can now read <b>all</b> data from every device. (Experts did this with 10,000 packets in under a minute, then found the key in less than 3 seconds.)'
            : '✓ <b>No key found.</b> Every packet had a different key, so collecting packets does not help the eavesdropper.';
        }
      }, 120);
    }
    $('#wType').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) wifiType(b.dataset.v); });
    $('#wfGo').addEventListener('click', wfGo);

    // ---------- VPN ----------
    const vpn = () => {
      const on = $('#vpnOn').checked;
      root.querySelector('[data-panel="vpn"]').classList.toggle('on', on);
      $('#vpkT').textContent = on ? '🔒 x8$Lq2!' : 'pay slip.pdf';
      $('#spyT').textContent = on ? 'sees only encrypted data' : 'can read the data';
    };
    $('#vpnOn').addEventListener('change', vpn);

    // ---------- log ----------
    el.querySelectorAll('.log-tbl tr[data-i]').forEach((tr) => {
      const pick = () => {
        const bad = tr.dataset.bad === '1';
        tr.classList.add(bad ? 'hit' : 'miss');
        $('#logMsg').innerHTML = bad ? '✓ <b>Well spotted!</b> An unknown device copied the exam papers at 03:12 in the morning. The log lets the administrator see which computer accessed what, and investigate.' : 'That looks like normal activity. Look for an odd time, user or device.';
      };
      tr.addEventListener('click', pick);
      tr.addEventListener('keydown', (e) => { if (e.key === 'Enter') pick(); });
    });

    const show = FD.panels(root, () => { clearInterval(wfT); });
    caesar(); keys(); wifiType('wep'); vpn(); show('login');
    return {
      show, signIn, fw, czSet, wfGo, wifiType,
      fill(u, p) { $('#lgU').value = u; $('#lgP').value = p; },
      keys(o) { Object.assign(K, o); keys(); },
      async keyRun(ctx, type) { K.type = type; K.step = 0; keys(); for (let s = 1; s < KSTEPS[type].length; s++) { if (!(await ctx.sleep(2200))) return; K.step = s; keys(); } },
      vpn(on) { $('#vpnOn').checked = on; vpn(); },
      fwOn(on) { $('#fwOn').checked = on; $('#wall').classList.toggle('off', !on); $('#fwState').textContent = on ? 'Firewall ON' : 'Firewall OFF'; },
      destroy() { timers.forEach(clearTimeout); clearInterval(wfT); },
    };
  },
  steps: [
    {
      title: 'Why security?',
      text: `<p><strong>Security</strong> prevents <strong>unauthorised users</strong> from accessing network resources and data.</p>
             <p>We will look at logins and passwords, firewalls, encryption, WEP and WPA, VPNs, file access rights, transaction logs and backups.</p>`,
      on: (a) => a.show('login'),
    },
    {
      title: 'Logins and passwords',
      text: `<p>Users <strong>log in</strong> to access centrally managed resources. Without the correct <strong>login</strong> details, they cannot access the network.</p>
             <p>Passwords <strong>authenticate</strong> the user. An <strong>authentication server</strong> can check them; once authenticated, the user does not have to log in again for each resource.</p>`,
      tip: 'Try it: sign in with the demo account, then with a wrong password. A key is <strong>not</strong> the same as a password!',
      async on(a, ctx) { a.show('login'); a.fill('ana.r', 'Blue-Kite-42'); if (!(await ctx.sleep(900))) return; a.signIn('ana.r', 'Blue-Kite-42'); },
    },
    {
      title: 'Firewalls',
      text: `<p>A <strong>firewall</strong> is used at the <strong>gateway</strong> to a network. It controls the traffic to and from the network, particularly from the internet, and stops unauthorised users reaching devices and storage.</p>
             <p>Firewalls can be <strong>hardware</strong> or <strong>software</strong>. Software firewalls on computers also stop attacks from <strong>inside</strong> a network.</p>`,
      tip: 'Try it: send the traffic with the firewall on, then off.',
      async on(a, ctx) { a.show('fw'); a.fwOn(true); if (!(await ctx.sleep(600))) return; a.fw(); },
    },
    {
      title: 'Encryption and the Caesar cipher',
      text: `<p><strong>Encryption</strong> encodes, scrambles or jumbles data so that unauthorised users cannot understand it.</p>
             <p>A <strong>Caesar cipher</strong> shifts every letter by a set number of places. The number of places is the <strong>key</strong>. In Figure 5.18 the key is 4 and the letters move left: F becomes B.</p>`,
      tip: 'Try it: decrypt the book’s message WHWJ PQNEJC. Whose name is it?',
      on: (a) => { a.show('caesar'); a.czSet({ mode: 'enc', dir: 'L', k: 4, t: 'FARM' }); },
    },
    {
      title: 'Symmetric key encryption',
      text: `<p>A Caesar cipher is easy to crack, but modern encryption is much more secure. There are two types.</p>
             <p><strong>Symmetric key</strong> encryption uses the <strong>same key</strong> at both ends: the same key encrypts and decrypts the data.</p>`,
      async on(a, ctx) { a.show('keys'); await a.keyRun(ctx, 'sym'); },
    },
    {
      title: 'Public key encryption',
      text: `<p><strong>Public key</strong> encryption uses two mathematically related keys: a <strong>key pair</strong>. One key encrypts the data; a different key decrypts it.</p>
             <p>Iyabode shares her <strong>public key</strong>. Farooq encrypts with it. Only Iyabode’s <strong>private key</strong>, which is never shared, can decrypt the message.</p>`,
      tip: 'Try it: press <strong>Next step</strong> and watch what Eve, the eavesdropper, can do.',
      async on(a, ctx) { a.show('keys'); await a.keyRun(ctx, 'pub'); },
    },
    {
      title: 'Wi-Fi security: WEP',
      text: `<p>It is easier to intercept data in a wireless network than in a wired one.</p>
             <p><strong>WEP</strong> is the <strong>least secure</strong> wireless encryption: every device uses the same key for every transfer. An <strong>eavesdropper</strong> who studies enough <strong>packets</strong> can find the key and read all the data.</p>`,
      async on(a, ctx) { a.show('wifi'); a.wifiType('wep'); if (!(await ctx.sleep(600))) return; a.wfGo(); },
    },
    {
      title: 'Wi-Fi security: WPA',
      text: `<p><strong>WPA</strong> (Wi-Fi Protected Access) gives better encryption than WEP. It generates a <strong>new key for each device</strong>, and new keys for <strong>each packet</strong> of data.</p>`,
      async on(a, ctx) { a.show('wifi'); a.wifiType('wpa'); if (!(await ctx.sleep(600))) return; a.wfGo(); },
    },
    {
      title: 'Virtual private networks (VPN)',
      text: `<p>A <strong>VPN</strong> gives access to a private LAN from a remote location, using a public network like the internet. The data is <strong>encrypted</strong>, so it is secure if it is intercepted.</p>`,
      tip: 'Try it: tick “Connect with a VPN” and look at what the spy sees.',
      async on(a, ctx) { a.show('vpn'); a.vpn(false); if (!(await ctx.sleep(2500))) return; a.vpn(true); },
    },
    {
      title: 'Rights, logs and backups',
      text: `<p><strong>File access rights</strong> (file permissions) allow users to read only, or to read and write, files, folders or drives.</p>
             <p>A <strong>transaction log</strong> records all network activity. It helps administrators spot unusual activity. A <strong>backup</strong> is a copy of files, usually on a different storage device.</p>`,
      tip: 'Try it: find the suspicious line in the log.',
      on: (a) => a.show('more'),
    },
  ],
});

FD.activities({
  section: 'security',
  items: [
    { id: 'scytale', title: 'Ancient encryption', task: '<p>Research how a tool called a <b>scytale</b> was used by the Spartans to encrypt messages. Create your own scytale (a pencil and a strip of paper work well) and use it to produce an encrypted message.</p>', fields: ['My encrypted message'], lines: 4, hint: 'How a scytale works…' },
    { id: 'decrypt', title: 'Decrypting a message', task: '<p>Using Figure 5.18 (key 4), decrypt this message: <code>WHWJ PQNEJC</code>. It is a person’s name. Research the importance of this person’s work during the Second World War.</p>', sim: ['security', 'Open the Caesar cipher'], fields: ['The decrypted name'], lines: 4, hint: 'Why was their work important?' },
    { id: 'encrypt', title: 'Encrypting a message', task: '<ol><li>This message was encrypted with a Caesar cipher with a shift of 16: <code>CEIJBO XQHCBUII</code>. Decipher it.</li><li>Use a new Caesar key to create an encoded message for a classmate. Do not include spaces. Can they decrypt it and tell you the key?</li></ol><p class="small muted">Tip: if the result does not make sense, try shifting the other way.</p>', sim: ['security', 'Open the Caesar cipher'], fields: ['1. The original text', '2. My encrypted message', '2. My key'], lines: 2, hint: 'Did your classmate crack it?' },
  ],
});

FD.check({
  section: 'security',
  items: [
    { type: 'mcq', q: 'State which security device controls the traffic entering a network.', opts: ['Firewall', 'Switch', 'Booster', 'Access point'], why: 'A firewall at the gateway controls traffic to and from the network.' },
    { type: 'mcq', q: 'Why is public key encryption more secure than symmetric key encryption?', opts: ['The private key used to decrypt is never shared', 'It uses a longer password', 'It shifts the letters further', 'It only works on wired networks'], why: 'With symmetric keys the same key must be shared, so it can be intercepted.' },
    { type: 'mcq', q: 'Using a Caesar cipher with key 4, shifting left as in Figure 5.18, what does “F” become?', opts: ['B', 'J', 'E', 'W'], why: 'F moves 4 places left: E, D, C, B.' },
    { type: 'tf', q: 'WEP is more secure than WPA.', a: false, why: 'WEP uses the same key for everything; WPA uses new keys for each device and each packet.' },
    { type: 'multi', q: 'State two uses for a VPN.', need: 2, opts: [['Access an employer’s network when working from home', true], ['Make secure payments', true], ['Make the Wi-Fi signal reach further', false], ['Print documents faster', false]], why: 'Also: access computers in another location and prevent surveillance of web activity.' },
    {
      type: 'sort',
      q: 'Which method of securing data is it?',
      bins: ['Login', 'Encryption', 'Transaction log', 'Backup'],
      rows: [['Confirms the user is who they say they are', 0], ['Scrambles data so it cannot be understood', 1], ['A record of all network activity', 2], ['A copy of files on a different storage device', 3]],
      why: 'Other methods: firewalls, WEP/WPA, VPNs and file access rights.',
    },
  ],
});
