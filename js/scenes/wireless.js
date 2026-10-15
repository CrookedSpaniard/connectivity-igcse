FD.add({
  id: 'wireless',
  title: 'Wireless communication',
  tab: 'Wireless',
  icon: 'wireless',
  color: '--c5',
  section: true,
  interactive: true,
  vocab: [
    ['Wi-Fi', 'wireless technology used to connect devices to a network (IEEE 802.11)'],
    ['pair', 'connect two devices (usually only with each other)'],
    ['mobile broadband', '3G and 4G: internet access for mobile devices through the mobile phone network'],
    ['infra-red', 'a type of electromagnetic radiation with a longer wavelength than visible light'],
    ['NFC', 'near-field communication: uses close-proximity RFID chips'],
  ],
  mount(el) {
    const TECH = {
      wifi: { n: 'Wi-Fi', e: '📶', r: 150, range: 4, bw: 5, pw: 4, use: 'Home and office networks; Wi-Fi access in towns and cities.', more: 'Uses the <b>IEEE 802.11</b> standards. Each revision (802.11a was the first) is faster and reaches further. Wi-Fi connects you to a <b>network</b>; that network may or may not be connected to the internet.' },
      bt: { n: 'Bluetooth', e: 'ᛒ', r: 70, range: 2, bw: 2, pw: 1, use: 'Peripherals: speakers, headphones, earphones, keyboards, mice. Sending small files.', more: 'Short distances. Cannot carry as much data as Wi-Fi. Devices must be <b>paired</b> before they can communicate.' },
      cell: { n: '3G / 4G', e: '📡', r: 230, range: 5, bw: 4, pw: 3, use: 'Internet access on smartphones and tablets when there is no Wi-Fi signal.', more: 'Also called <b>mobile broadband</b>. Provided by <b>mobile phone companies</b>. The G means “generation”: 4G is the fourth generation. 3G/4G is <b>not</b> Wi-Fi.' },
      ir: { n: 'Infra-red', e: '🔴', r: 90, range: 1, bw: 1, pw: 1, use: 'Remote controls, e.g. for televisions.', more: 'Cannot carry much data and has a short range. Needs a clear <b>line of sight</b>: it is blocked by walls and affected by <b>sunlight</b>.' },
      nfc: { n: 'NFC', e: '💳', r: 18, range: 0.4, bw: 1, pw: 0.5, use: 'Smartphones, contactless payment cards and travel cards.', more: 'Near-field communication uses close-proximity <b>RFID</b> (Radio Frequency Identification) chips. Works only a few centimetres away.' },
    };
    const bars = (v) => `<span class="bar"><i style="--v:${Math.min(100, v * 20)}%"></i></span>`;
    el.innerHTML = `
      <div class="sim wl">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="cmp">📶 Compare</button><button data-p="bt">ᛒ Bluetooth pairing</button><button data-p="ir">🔴 Infra-red</button><button data-p="nfc">💳 NFC</button>
        </div>

        <div data-panel="cmp" class="sim">
          <div class="techs" id="techs">${Object.entries(TECH).map(([k, t]) => `<button data-v="${k}"><span>${t.e}</span>${t.n}</button>`).join('')}</div>
          <div class="wl-grid">
            <div class="sim-box">
              <svg viewBox="0 0 300 260" aria-label="Range of the wireless connection">
                <circle class="rng-ring" id="ring" cx="150" cy="130" r="80"/>
                <circle class="rng-ring r2" id="ring2" cx="150" cy="130" r="80"/>
                <text x="150" y="142" class="emo big">📱</text>
                <text class="svg-sm" x="150" y="252" id="ringLbl"></text>
              </svg>
            </div>
            <div class="wl-info">
              <h4 id="tName"></h4>
              <div class="meter"><span class="meter-l">Range</span><span id="mR"></span></div>
              <div class="meter"><span class="meter-l">Bandwidth</span><span id="mB"></span></div>
              <div class="meter"><span class="meter-l">Power used</span><span id="mP"></span></div>
              <p class="small"><b>Used for:</b> <span id="tUse"></span></p>
              <p class="small" id="tMore"></p>
            </div>
          </div>
        </div>

        <div data-panel="bt" class="sim" hidden>
          <div class="bt-stage sim-box">
            <div class="bt-dev"><span>📱</span><b>Phone</b><small id="btCode1"></small></div>
            <div class="bt-link" id="btLink"><i></i><b id="btState">Not paired</b></div>
            <div class="bt-dev"><span>🎧</span><b>Headphones</b><small id="btCode2"></small></div>
          </div>
          <div class="ctrls"><button class="btn primary small-btn" id="btPair">ᛒ Pair</button><button class="btn small-btn" id="btOk" hidden>✓ The codes match</button><button class="mini-btn" id="btReset">↺ Reset</button></div>
          <div class="tbl-wrap"><table class="tbl cmp4"><thead><tr><th></th><th>Wi-Fi</th><th>Bluetooth</th></tr></thead><tbody>
            <tr><th>Range</th><td class="y">Long ✓</td><td class="n">Short ✗</td></tr>
            <tr><th>Bandwidth</th><td class="y">High ✓</td><td class="n">Low ✗</td></tr>
            <tr><th>Power</th><td class="n">High ✗</td><td class="y">Low ✓</td></tr>
            <tr><th>Security</th><td class="y">High ✓</td><td class="n">Low ✗</td></tr>
            <tr><th>Connect many devices at once</th><td class="y">Yes ✓</td><td class="n">Limited ✗ (usually have to be paired)</td></tr>
          </tbody></table></div>
        </div>

        <div data-panel="ir" class="sim" hidden>
          <div class="sim-box ir-box" id="irBox">
            <span class="remote">📱<small>remote</small></span>
            <span class="beam-ir" id="irBeam"></span>
            <span class="cushion" id="cushion">🛋️</span>
            <span class="sun" id="sun">☀️</span>
            <div class="tv-ir"><b id="ch">CH 1</b><small>TV</small></div>
          </div>
          <div class="ctrls">
            <button class="btn primary small-btn" id="irPress">▲ Channel up</button>
            <label class="tgl"><input type="checkbox" id="irBlock"> Something in the way</label>
            <label class="tgl"><input type="checkbox" id="irSun"> Bright sunlight</label>
          </div>
          <p class="small" id="irMsg">Press the button on the remote.</p>
        </div>

        <div data-panel="nfc" class="sim" hidden>
          <div class="sim-box nfc-box">
            <div class="reader"><b>🚇 Ticket gate</b><span id="nfcLight"></span></div>
            <span class="card-nfc" id="card">💳</span>
          </div>
          <label class="rng"><span>Distance from the reader <output id="nfcOut"></output></span><input type="range" id="nfcD" min="0" max="20" value="12"></label>
          <div class="readout"><span class="ro" id="nfcRo"><small>Reader</small><b id="nfcState"></b></span></div>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s), root = el.querySelector('.wl');

    let cur = 'wifi';
    function tech(k) {
      cur = k;
      const t = TECH[k];
      FD.segSet($('#techs'), k);
      $('#ring').setAttribute('r', t.r / 2);
      $('#ring2').setAttribute('r', t.r / 2);
      root.querySelector('.wl-grid').dataset.t = k;
      $('#ringLbl').textContent = { wifi: 'tens of metres', bt: 'about 10 metres', cell: 'kilometres (to the nearest mast)', ir: 'a few metres, in a straight line', nfc: 'a few centimetres' }[k];
      $('#tName').innerHTML = `${t.e} ${t.n}`;
      $('#mR').innerHTML = bars(t.range);
      $('#mB').innerHTML = bars(t.bw);
      $('#mP').innerHTML = bars(t.pw);
      $('#tUse').textContent = t.use;
      $('#tMore').innerHTML = t.more;
    }
    $('#techs').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) tech(b.dataset.v); });

    let code = '';
    const btReset = () => {
      $('#btState').textContent = 'Not paired'; $('#btCode1').textContent = ''; $('#btCode2').textContent = '';
      $('#btLink').className = 'bt-link'; $('#btOk').hidden = true; $('#btPair').hidden = false;
    };
    const btPair = () => {
      code = String(100000 + Math.floor(Math.random() * 899999)).replace(/(\d{3})(\d{3})/, '$1 $2');
      $('#btCode1').textContent = 'Code ' + code; $('#btCode2').textContent = 'Code ' + code;
      $('#btState').textContent = 'Pairing… check the codes';
      $('#btLink').className = 'bt-link wait'; $('#btPair').hidden = true; $('#btOk').hidden = false;
    };
    const btOk = () => {
      $('#btState').textContent = 'Paired ✓ ♪ ♫ playing music';
      $('#btLink').className = 'bt-link on'; $('#btOk').hidden = true;
    };
    $('#btPair').addEventListener('click', btPair);
    $('#btOk').addEventListener('click', btOk);
    $('#btReset').addEventListener('click', btReset);

    let ch = 1;
    function irPress() {
      const blocked = $('#irBlock').checked, sun = $('#irSun').checked;
      const ok = !blocked && (!sun || Math.random() > 0.6);
      const beam = $('#irBeam');
      beam.className = 'beam-ir go ' + (blocked ? 'stop' : ok ? '' : 'fade');
      setTimeout(() => { beam.className = 'beam-ir'; }, FD.dur(900));
      setTimeout(() => {
        if (ok) { ch++; $('#ch').textContent = 'CH ' + ch; FD.pulse($('#ch')); }
        $('#irMsg').innerHTML = ok ? '✓ The TV received the signal.' : blocked ? '✗ The signal is blocked: infra-red needs a clear <b>line of sight</b>.' : '✗ The TV missed it: <b>sunlight</b> affects infra-red signals. Try again.';
      }, FD.dur(700));
    }
    $('#irPress').addEventListener('click', irPress);
    const irDraw = () => { $('#cushion').classList.toggle('on', $('#irBlock').checked); $('#sun').classList.toggle('on', $('#irSun').checked); };
    $('#irBlock').addEventListener('change', irDraw);
    $('#irSun').addEventListener('change', irDraw);

    function nfc() {
      const d = +$('#nfcD').value, ok = d <= 4;
      $('#nfcOut').textContent = d + ' cm';
      $('#card').style.left = `calc(18% + ${d * 3.2}%)`;
      $('#nfcState').textContent = ok ? 'Paid ✓ gate open' : 'Waiting… move closer';
      $('#nfcRo').className = 'ro ' + (ok ? 'good' : '');
      $('#nfcLight').className = ok ? 'ok' : '';
    }
    $('#nfcD').addEventListener('input', nfc);

    const show = FD.panels(root);
    tech('wifi'); btReset(); irDraw(); nfc(); show('cmp');
    return {
      show, tech, btReset, btPair, btOk, irPress,
      ir(o) { $('#irBlock').checked = !!o.block; $('#irSun').checked = !!o.sun; irDraw(); },
      async tapCard(ctx) { for (let d = 16; d >= 1; d -= 1) { $('#nfcD').value = d; nfc(); if (!(await ctx.sleep(140))) return; } },
    };
  },
  steps: [
    {
      title: 'Wireless connections',
      text: `<p>Devices can also use <strong>wireless</strong> connectivity to communicate. As with wired communication, there are many types.</p>
             <p>We will compare five: <strong>Wi-Fi</strong>, <strong>Bluetooth</strong>, <strong>3G/4G</strong>, <strong>infra-red</strong> and <strong>NFC</strong>.</p>`,
      on: (a) => { a.show('cmp'); a.tech('wifi'); },
    },
    {
      title: 'Wi-Fi',
      text: `<p><strong>Wi-Fi</strong> is used in home and office networks, and some companies provide Wi-Fi in towns and cities. It connects devices to a <strong>network</strong>, which can then be connected to the internet.</p>
             <p>Wi-Fi uses the <strong>IEEE 802.11</strong> standards. Each revision gets a new letter (the first was 802.11<strong>a</strong>) and is faster, with a longer range.</p>`,
      tip: '“Wi-Fi” and “internet access” are not the same thing! Wi-Fi connects you to a network. That network may or may not be connected to the internet.',
      on: (a) => { a.show('cmp'); a.tech('wifi'); },
    },
    {
      title: 'Bluetooth',
      text: `<p><strong>Bluetooth</strong> connects devices over <strong>short distances</strong>. It cannot carry as much data as Wi-Fi.</p>
             <p>Bluetooth devices must be <strong>paired</strong> before they can communicate. It is used for small files and peripherals: speakers, headphones, keyboards and mice.</p>`,
      tip: 'Try it: pair the phone with the headphones.',
      async on(a, ctx) { a.show('bt'); a.btReset(); if (!(await ctx.sleep(1200))) return; a.btPair(); if (!(await ctx.sleep(2200))) return; a.btOk(); },
    },
    {
      title: 'Wi-Fi vs Bluetooth',
      text: `<p>Wi-Fi has a longer range, more bandwidth and better security, and it can connect many devices at once.</p>
             <p>Bluetooth uses much <strong>less power</strong>, which is why it is good for small battery devices.</p>`,
      tip: 'Did you know? <strong>Wi-Fi Direct</strong> is an alternative to Bluetooth: a low-power version of Wi-Fi that connects two devices directly over a short range.',
      on: (a) => a.show('bt'),
    },
    {
      title: '3G and 4G',
      text: `<p><strong>3G</strong> and <strong>4G</strong> are called <strong>mobile broadband</strong>. They give internet access to smartphones and tablets when there is no Wi-Fi signal.</p>
             <p>The G stands for <strong>generation</strong>: 4G is the fourth generation. Future generations will improve speed and availability.</p>`,
      tip: '3G or 4G is <strong>not</strong> Wi-Fi. It is provided by mobile phone companies. People who say they “have Wi-Fi” on the bus usually mean mobile broadband.',
      on: (a) => { a.show('cmp'); a.tech('cell'); },
    },
    {
      title: 'Infra-red (IR)',
      text: `<p><strong>Infra-red</strong> signals cannot carry much data and have a short range.</p>
             <p>The transmitter needs a clear <strong>line of sight</strong> to the receiver, because the signal travels in a straight line and is blocked by solid objects. It is also affected by <strong>sunlight</strong>. It is often used in TV <strong>remote controls</strong>.</p>`,
      tip: 'Try it: put something in the way and press the button.',
      async on(a, ctx) { a.show('ir'); a.ir({}); if (!(await ctx.sleep(900))) return; a.irPress(); if (!(await ctx.sleep(2200))) return; a.ir({ block: true }); if (!(await ctx.sleep(600))) return; a.irPress(); },
    },
    {
      title: 'Near-field communication (NFC)',
      text: `<p><strong>NFC</strong> uses close-proximity <strong>RFID</strong> chips. It is used in smartphones, <strong>payment cards</strong> and <strong>travel cards</strong>.</p>
             <p>It only works when the devices are a few centimetres apart.</p>`,
      tip: 'Try it: move the card closer to the ticket gate.',
      async on(a, ctx) { a.show('nfc'); await a.tapCard(ctx); },
    },
  ],
});

FD.activities({
  section: 'wireless',
  items: [
    {
      id: 'wifirev',
      title: 'Different revisions of Wi-Fi',
      task: '<p>Research and compare the different revisions of Wi-Fi (IEEE 802.11a, b, g, n, ac, ax…). <b>How do their speeds and range differ?</b></p>',
      lines: 6,
      hint: 'Revision – year – maximum speed – range…',
    },
    {
      id: 'g34',
      title: '3G and 4G',
      task: '<ol><li>Compare the speeds, costs and availability of 3G and 4G where you live.</li><li>Research the next generation of this technology.</li></ol>',
      fields: ['1. 3G vs 4G where I live', '2. The next generation'],
      lines: 3,
      hint: 'Anything else you found out…',
    },
    {
      id: 'wltable',
      type: 'table',
      title: 'Comparing wireless connections (Table 4.5)',
      task: '<p>Complete the table: choose the <b>technology</b> used by each type of wireless connection and a common <b>use</b>. Then press <b>Check my table</b>.</p>',
      head: ['Method', 'Technology', 'Use'],
      opts: [
        ['Radio waves', 'Infra-red radiation (needs line of sight)', 'Radio waves from RFID chips, very close range', 'Electrical signal in a cable'],
        ['Home and office networks', 'Connecting peripherals like headphones and keyboards', 'Internet on mobile devices when there is no Wi-Fi', 'TV remote controls', 'Contactless payment and travel cards'],
      ],
      rows: [['Wi-Fi', [0, 0]], ['Bluetooth', [0, 1]], ['3G and 4G', [0, 2]], ['Infra-red', [1, 3]], ['NFC', [2, 4]]],
      why: 'Wi-Fi, Bluetooth and 3G/4G all use radio waves; infra-red uses infra-red radiation; NFC uses close-proximity RFID chips.',
    },
  ],
});

FD.check({
  section: 'wireless',
  items: [
    {
      type: 'sort',
      q: 'Wi-Fi or Bluetooth? (Table 4.4)',
      bins: ['Wi-Fi', 'Bluetooth'],
      rows: [['Longer range', 0], ['Uses less power', 1], ['Higher bandwidth', 0], ['Devices usually have to be paired', 1], ['Can connect many devices at the same time', 0]],
      why: 'Wi-Fi: long range, high bandwidth, high security, many devices. Bluetooth: short range, low power, pairing.',
    },
    { type: 'mcq', q: 'Explain one reason why some games console controllers use Bluetooth rather than infra-red.', opts: ['Bluetooth does not need a clear line of sight to the console', 'Bluetooth uses more power', 'Infra-red has a longer range', 'Bluetooth can only connect one device'], why: 'Infra-red is blocked by objects (and affected by sunlight); Bluetooth radio waves do not need line of sight.' },
    { type: 'tf', q: '3G and 4G are types of Wi-Fi.', a: false, why: '3G and 4G are mobile broadband, provided by mobile phone companies.' },
    { type: 'mcq', q: 'Which technology is used in contactless payment cards and travel cards?', opts: ['NFC', 'Infra-red', 'Ethernet', 'DAB'], why: 'NFC uses close-proximity RFID chips.' },
    { type: 'mcq', q: 'What do Bluetooth devices need to do before they can communicate?', opts: ['Be paired', 'Be connected to the internet', 'Be in the same room as a router', 'Use the same IP address'], why: 'Pair = connect two devices, usually only with each other.' },
    { type: 'multi', q: 'Which statements about infra-red are true?', need: 2, opts: [['It needs a clear line of sight', true], ['It is affected by sunlight', true], ['It has a very long range', false], ['It carries more data than Wi-Fi', false]], why: 'IR has a short range, little bandwidth, needs line of sight and is affected by sunlight.' },
  ],
});
