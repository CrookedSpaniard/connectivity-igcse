FD.add({
  id: 'networks',
  title: 'Device-to-device and network communication',
  tab: 'LAN, WAN & PAN',
  icon: 'networks',
  color: '--c1',
  section: true,
  interactive: true,
  vocab: [
    ['minijack', 'a plug and socket widely used for analogue audio signals in portable devices'],
    ['HDMI', 'High-Definition Multimedia Interface: used to transmit video and audio data'],
    ['LAN', 'local area network: connects devices in a small geographical area, such as a building'],
    ['WAN', 'wide area network: a network spread over a large geographical area'],
    ['PAN', 'personal area network: connected devices that are all near one user'],
    ['tethering', 'connecting a host device that uses a mobile broadband connection with other devices so that they can use the host’s broadband connection'],
    ['service agreement', 'contract'],
  ],
  mount(el) {
    const D2D = [
      ['🌡️', 'Temperature sensor', '❄️', 'Air conditioner', 'Wired', 'To turn on the air conditioning when the temperature is too high'],
      ['📱', 'Smartphone', '🎧', 'Headphones', 'Minijack', 'To play music from the smartphone on the headphones'],
      ['💻', 'Laptop', '💽', 'External hard drive', 'USB', 'To transfer files'],
      ['📹', 'Camcorder', '🖥️', 'Monitor', 'HDMI', 'To operate as a security camera'],
      ['🎮', 'Games controller', '🕹️', 'Games console', 'Bluetooth', 'To control a game'],
    ];
    const CITIES = [['London', 300, 70], ['Madrid', 258, 115], ['New York', 160, 95], ['Mumbai', 440, 130], ['Sydney', 560, 200], ['São Paulo', 215, 185]];
    const QUIZ = [
      ['A school connects all the computers in its building.', 'LAN'],
      ['A bank connects its offices in 40 different countries.', 'WAN'],
      ['Your smartwatch, phone and wireless earbuds work together.', 'PAN'],
      ['The internet.', 'WAN'],
      ['A family’s laptops and printer share one home network.', 'LAN'],
      ['A police force links stations all over the country.', 'WAN'],
    ];
    el.innerHTML = `
      <div class="sim nets">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="d2d">🔗 Device to device</button><button data-p="lan">🏢 LAN</button><button data-p="wan">🌍 WAN</button><button data-p="pan">🧍 PAN</button><button data-p="tether">📱 Tethering</button><button data-p="quiz">❓ Which network?</button>
        </div>

        <div data-panel="d2d" class="sim">
          <div class="sim-box d2d-show" id="d2dShow"></div>
          <div class="tbl-wrap"><table class="tbl d2d-tbl"><thead><tr><th>Device 1</th><th>Device 2</th><th>Connection</th><th>Use</th></tr></thead>
            <tbody>${D2D.map((r, i) => `<tr data-i="${i}" tabindex="0"><td>${r[0]} ${r[1]}</td><td>${r[2]} ${r[3]}</td><td><b>${r[4]}</b></td><td>${r[5]}</td></tr>`).join('')}</tbody></table></div>
          <p class="note">Click a row to see the connection. Table 4.1 in the book.</p>
        </div>

        <div data-panel="lan" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 640 260" aria-label="Floor plan of an office with connected devices">
              <path class="room" d="M20 20h250v110H20zM270 20h170v110H270zM440 20h180v230H440zM20 130h150v120H20zM170 130h270v120H170z"/>
              <path class="lan-line" id="lanLine" d="M560 240 V150 H450 M450 150 V70 H360 V40 M360 70 H190 V50 M190 70 H80 V100 M450 150 H350 V200 M350 200 H230 V170 M230 200 H90 V180 M560 150 V60"/>
              ${[[80, 100, '💻'], [190, 50, '🖥️'], [360, 40, '🖨️'], [560, 60, '🖥️'], [350, 200, '💻'], [230, 170, '🖥️'], [90, 180, '💻'], [560, 240, '🗄️']].map(([x, y, e], i) => `<g class="lan-n" style="--d:${i * 120}ms"><circle cx="${x}" cy="${y}" r="15"/><text x="${x}" y="${y + 6}" class="emo">${e}</text></g>`).join('')}
              <text class="svg-lbl" x="530" y="210">Server room</text>
            </svg>
          </div>
          <div class="readout"><span class="ro"><small>Area</small><b>One building</b></span><span class="ro good"><small>Speed</small><b>Fast</b></span><span class="ro"><small>Found in</small><b>Homes, schools, offices</b></span></div>
        </div>

        <div data-panel="wan" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 640 250" aria-label="LANs in cities around the world linked into a WAN">
              <ellipse class="earth" cx="320" cy="135" rx="300" ry="115"/>
              ${CITIES.map(([, x, y], i) => CITIES.slice(i + 1).filter((_, k) => (i + k) % 2 === 0).map(([, x2, y2]) => `<path class="wan-link" d="M${x} ${y} Q${(x + x2) / 2} ${Math.min(y, y2) - 40} ${x2} ${y2}"/>`).join('')).join('')}
              ${CITIES.map(([n, x, y]) => `<g class="city"><rect x="${x - 15}" y="${y - 11}" width="30" height="22" rx="5"/><text x="${x}" y="${y + 4}" class="lan-t">LAN</text><text class="svg-sm" x="${x}" y="${y + 24}">${n}</text></g>`).join('')}
              <g class="sat"><text x="420" y="40" class="emo big">🛰️</text></g>
            </svg>
          </div>
          <div class="readout"><span class="ro"><small>Area</small><b>Countries, the world</b></span><span class="ro bad"><small>Speed</small><b>Slower than a LAN</b></span><span class="ro"><small>Largest example</small><b>The internet</b></span></div>
        </div>

        <div data-panel="pan" class="sim" hidden>
          <div class="sim-box pan-box">
            <svg viewBox="0 0 640 250" aria-label="A personal area network around one user">
              <circle class="pan-ring" cx="320" cy="125" r="110"/>
              <text x="320" y="145" class="emo huge">🧍</text>
              ${[['⌚', 'Smartwatch', 230, 70], ['📱', 'Smartphone', 420, 75], ['💻', 'Laptop', 210, 195], ['🔊', 'Speakers', 435, 190]].map(([e, n, x, y]) => `<g class="pan-d"><path class="pan-l" d="M320 125 L${x} ${y}"/><circle cx="${x}" cy="${y}" r="24"/><text x="${x}" y="${y + 9}" class="emo">${e}</text><text class="svg-sm" x="${x}" y="${y + 38}">${n}</text></g>`).join('')}
            </svg>
          </div>
          <label class="tgl"><input type="checkbox" id="wpan"> All the connections are wireless</label>
          <p class="note" id="panNote"></p>
        </div>

        <div data-panel="tether" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 640 220" aria-label="A laptop tethered to a smartphone">
              <g class="mast"><path d="M560 200 L585 60 L610 200 M567 160h36M574 120h22" /><text class="svg-sm" x="585" y="215">Mobile network</text></g>
              <path class="g4" d="M470 70 l15 -10 l15 10 l15 -10 l15 10 l15 -10 l15 10 l15 -10"/><text class="svg-lbl" x="520" y="45">4G</text>
              ${FD.dv.phone(410, 80)}<text class="svg-lbl" x="492" y="150">Host device</text>
              ${FD.dv.laptop(60, 85)}<text class="svg-lbl" x="90" y="150">Laptop</text>
              <path class="teth wifi" d="M150 100 H415"/><path class="teth bt" d="M150 115 H415"/><path class="teth usb" d="M140 128 C 250 190, 330 190, 440 128"/>
              <text class="svg-lbl" x="285" y="80" id="tLbl"></text>
            </svg>
          </div>
          <div class="ctrls">
            <div class="seg" id="tLink"><span class="seg-l">Connect the laptop with</span><button data-v="wifi">📶 Wi-Fi</button><button data-v="bt">ᛒ Bluetooth</button><button data-v="usb">🔌 USB cable</button></div>
            <label class="tgl"><input type="checkbox" id="tAllow" checked> The service agreement allows tethering</label>
          </div>
          <div class="readout"><span class="ro" id="tRo"><small>Laptop</small><b id="tState"></b></span></div>
        </div>

        <div data-panel="quiz" class="sim" hidden>
          <ol class="nq">${QUIZ.map(([q], i) => `<li class="card" data-i="${i}"><p>${q}</p><div class="sc-btns">${['LAN', 'WAN', 'PAN'].map((t) => `<button class="opt small-btn" data-t="${t}">${t}</button>`).join('')}</div></li>`).join('')}</ol>
          <p class="small" id="nqScore"></p>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s), root = el.querySelector('.nets');

    function d2d(i) {
      const r = D2D[i], wl = r[4] === 'Bluetooth';
      $('#d2dShow').innerHTML = `
        <div class="d2d-dev"><span>${r[0]}</span><b>${r[1]}</b></div>
        <div class="d2d-link ${wl ? 'wl' : ''}"><i></i><b>${r[4]}</b><small>${r[5]}</small></div>
        <div class="d2d-dev"><span>${r[2]}</span><b>${r[3]}</b></div>`;
      el.querySelectorAll('.d2d-tbl tr[data-i]').forEach((tr) => tr.classList.toggle('on', +tr.dataset.i === i));
    }
    el.querySelectorAll('.d2d-tbl tr[data-i]').forEach((tr) => {
      tr.addEventListener('click', () => d2d(+tr.dataset.i));
      tr.addEventListener('keydown', (e) => { if (e.key === 'Enter') d2d(+tr.dataset.i); });
    });

    const panNote = () => {
      const w = $('#wpan').checked;
      root.querySelector('.pan-box').classList.toggle('wl', w);
      $('#panNote').innerHTML = w ? 'Only wireless connections: this PAN can also be called a <b>WPAN</b> (Wireless Personal Area Network).' : 'Some devices are connected directly with cables, others through an access point. It is a <b>PAN</b>.';
    };
    $('#wpan').addEventListener('change', panNote);

    const T = { link: 'wifi' };
    function tether() {
      const ok = $('#tAllow').checked;
      FD.segSet($('#tLink'), T.link);
      root.querySelectorAll('.teth').forEach((p) => p.classList.toggle('on', p.classList.contains(T.link)));
      root.querySelector('[data-panel="tether"]').classList.toggle('blocked', !ok);
      $('#tLbl').textContent = { wifi: 'Wi-Fi hotspot', bt: 'Bluetooth', usb: 'USB cable' }[T.link];
      $('#tState').textContent = ok ? 'Online through the phone’s 4G ✓' : 'No internet: tethering not allowed';
      $('#tRo').className = 'ro ' + (ok ? 'good' : 'bad');
    }
    $('#tLink').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { T.link = b.dataset.v; tether(); } });
    $('#tAllow').addEventListener('change', tether);

    let got = 0, done = 0;
    el.querySelectorAll('.nq li').forEach((li) => li.addEventListener('click', (e) => {
      const b = e.target.closest('.opt');
      if (!b || li.dataset.done) return;
      li.dataset.done = 1;
      const want = QUIZ[li.dataset.i][1], ok = b.dataset.t === want;
      b.classList.add(ok ? 'right' : 'wrong');
      li.querySelector(`[data-t="${want}"]`).classList.add('right');
      got += ok; done++;
      $('#nqScore').innerHTML = `<b>${got} / ${done}</b> correct${done === QUIZ.length ? (got === QUIZ.length ? ' 🎉' : '. Read the LAN, WAN and PAN steps again.') : ''}`;
    }));

    const show = FD.panels(root);
    d2d(0); panNote(); tether(); show('d2d');
    return {
      show, d2d,
      async tour(ctx) { for (let i = 0; i < D2D.length; i++) { d2d(i); if (!(await ctx.sleep(1500))) return; } },
      wpan(on) { $('#wpan').checked = on; panNote(); },
      tether(o) { if (o.link) T.link = o.link; if (o.allow != null) $('#tAllow').checked = o.allow; tether(); },
      async links(ctx) { for (const l of ['wifi', 'bt', 'usb']) { this.tether({ link: l }); if (!(await ctx.sleep(1300))) return; } },
    };
  },
  steps: [
    {
      title: 'Device-to-device communication',
      text: `<p>Devices can connect <strong>directly to each other</strong> using wired or wireless methods. This is called <strong>device-to-device communication</strong>.</p>
             <p>For example, a laptop connects to an external hard drive with a <strong>USB</strong> cable to transfer files.</p>`,
      on: (a) => { a.show('d2d'); a.d2d(2); },
    },
    {
      title: 'Examples',
      text: `<p>Look at the examples: a sensor wired to an air conditioner, headphones on a <strong>minijack</strong>, a camcorder sending video to a monitor through <strong>HDMI</strong>, and a games controller using <strong>Bluetooth</strong>.</p>`,
      tip: 'Try it: click each row of the table.',
      async on(a, ctx) { a.show('d2d'); await a.tour(ctx); },
    },
    {
      title: 'Networks: local area network (LAN)',
      text: `<p>When two or more computers are connected, a <strong>network</strong> is created.</p>
             <p>A <strong>LAN</strong> connects digital devices in a <strong>small geographical area</strong>, like a building or a group of buildings close to each other. LANs are found in homes, schools and offices.</p>`,
      on: (a) => a.show('lan'),
    },
    {
      title: 'Wide area network (WAN)',
      text: `<p>A <strong>WAN</strong> is spread over a <strong>large geographical area</strong>. WANs connect buildings of national and international businesses, police, health and education organisations and governments.</p>
             <p>WANs often use connections provided by a <strong>third-party telecommunications company</strong>, often linking LANs together through the internet. Some organisations even launch their own satellites.</p>`,
      on: (a) => a.show('wan'),
    },
    {
      title: 'The largest WAN',
      text: `<p>The <strong>internet</strong> is the largest example of a WAN.</p>
             <p>Because of their wider reach, WANs often have <strong>slower transfer speeds</strong> than LANs.</p>`,
      on: (a) => a.show('wan'),
    },
    {
      title: 'Personal area network (PAN)',
      text: `<p>A <strong>PAN</strong> is a group of connected devices that are all <strong>near one user</strong>: for example, a smartwatch connected to a smartphone, which is connected to a laptop and a home cinema speaker system.</p>
             <p>Devices in a PAN can be connected directly or through access points. A PAN that only uses wireless connections can be called a <strong>WPAN</strong>.</p>`,
      tip: 'Try it: tick “All the connections are wireless”.',
      async on(a, ctx) { a.show('pan'); a.wpan(false); if (!(await ctx.sleep(2500))) return; a.wpan(true); },
    },
    {
      title: 'Tethering',
      text: `<p><strong>Tethering</strong> connects a <strong>host device</strong> (a smartphone or tablet with a mobile broadband connection) with other devices, so they can <strong>share</strong> the host’s broadband connection.</p>
             <p>Devices can be tethered with <strong>Wi-Fi</strong>, <strong>Bluetooth</strong> or a <strong>USB</strong> cable.</p>`,
      async on(a, ctx) { a.show('tether'); a.tether({ allow: true }); await a.links(ctx); },
    },
    {
      title: 'The service agreement',
      text: `<p>Mobile phone network providers can <strong>enable or disable</strong> tethering as part of the <strong>service agreement</strong> (the contract).</p>
             <p>Some providers charge more for this feature.</p>`,
      on: (a) => { a.show('tether'); a.tether({ allow: false, link: 'wifi' }); },
    },
    {
      title: 'LAN, WAN or PAN?',
      text: `<p>Now test yourself: decide which type of network each example is.</p>`,
      tip: 'Look at the size of the area: one person (PAN), one building or site (LAN), or a large area (WAN).',
      on: (a) => a.show('quiz'),
    },
  ],
});

FD.check({
  section: 'networks',
  items: [
    { type: 'mcq', q: 'Which one of these best describes the internet?', opts: ['WAN', 'LAN', 'PAN', 'VLAN'], why: 'The internet is the largest example of a WAN.' },
    {
      type: 'sort',
      q: 'Choose the connection for each pair of devices (Table 4.1).',
      bins: ['USB', 'HDMI', 'Minijack', 'Bluetooth'],
      rows: [['Laptop → external hard drive', 0], ['Camcorder → monitor', 1], ['Smartphone → headphones', 2], ['Games controller → games console', 3]],
      why: 'USB transfers files, HDMI carries video and audio, minijack carries analogue audio and Bluetooth connects wireless controllers.',
    },
    { type: 'mcq', q: 'A smartwatch, a smartphone and wireless earbuds all connected near one person form a…', opts: ['PAN', 'LAN', 'WAN', 'ISP'], why: 'A personal area network is a group of devices near one user. All wireless = WPAN.' },
    { type: 'tf', q: 'WANs usually have faster transfer speeds than LANs.', a: false, why: 'Because of their wider reach, WANs often have slower transfer speeds than LANs.' },
    { type: 'mcq', q: 'What is tethering?', opts: ['Sharing the mobile broadband connection of a host device with other devices', 'Connecting two LANs with a satellite', 'Using a cable longer than 100 metres', 'Pairing two Bluetooth devices'], why: 'The host (a smartphone or tablet) shares its mobile broadband connection by Wi-Fi, Bluetooth or USB.' },
    { type: 'multi', q: 'Which methods can be used to tether a laptop to a smartphone?', need: 3, opts: [['Wi-Fi', true], ['Bluetooth', true], ['USB cable', true], ['HDMI', false], ['Infra-red', false]], why: 'Figure 4.6 shows Wi-Fi, Bluetooth and USB.' },
  ],
});
