FD.add({
  id: 'methods',
  title: 'The ways in which digital devices communicate',
  tab: 'Satellite, broadcast & wired',
  icon: 'methods',
  color: '--c3',
  section: true,
  interactive: true,
  vocab: [
    ['GPS', 'Global Positioning System: uses signals from satellites to calculate the exact location of a device'],
    ['DVB', 'Digital Video Broadcasting: the international standard way of broadcasting digital television'],
    ['set-top box', 'a box that decodes the TV signal so that it is ready to be sent to a television'],
    ['terrestrial', 'on the Earth'],
    ['DAB', 'Digital Audio Broadcasting: digital radio'],
    ['Ethernet', 'a network connectivity standard that provides a way for computers to communicate'],
  ],
  mount(el) {
    const WIRED = [
      ['HDMI', 'Digital video connections', '📺', 'Carries high-definition video and audio, e.g. from a games console to a TV.'],
      ['S/PDIF', 'Digital audio connections', '🔊', 'Sends digital audio, e.g. from a TV to a sound system.'],
      ['Minijack', 'Personal headphones', '🎧', 'A small plug and socket for analogue audio in portable devices.'],
      ['USB', 'Storage transfer', '💽', 'Used for many purposes. Each new revision of USB allows faster data transfer.'],
      ['Ethernet', 'Networking', '🌐', 'Connects devices to wired networks. Cables can be about 100 m long before the signal loses quality.'],
    ];
    const JOBS = [['Plug a games console into a TV', 0], ['Back up photos to a memory stick', 3], ['Connect a desktop PC to the school network', 4], ['Listen to music on wired headphones', 2], ['Send digital sound from a TV to a sound bar', 1]];
    const SATS = [[150, 40], [270, 25], [390, 25], [510, 40], [620, 70]];
    el.innerHTML = `
      <div class="sim meth">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="all">📋 Overview</button><button data-p="gps">🛰️ GPS</button><button data-p="tv">📡 Satellite TV</button><button data-p="bc">🗼 Broadcast</button><button data-p="wired">🔌 Wired</button>
        </div>

        <div data-panel="all" class="sim">
          <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Method</th><th>Technology</th><th>Use</th></tr></thead><tbody>
            <tr data-zone="sat"><th>🛰️ Satellite</th><td>Radio waves</td><td>GPS, television, telephone, military</td></tr>
            <tr data-zone="bc"><th>🗼 Broadcast</th><td>Radio waves</td><td>Television shows, radio shows</td></tr>
            <tr data-zone="wired"><th>🔌 Wired</th><td>Electrical signal</td><td>Networking, connecting peripherals</td></tr>
            <tr data-zone="wl"><th>📶 Wireless</th><td>Radio waves</td><td>Networking, connecting peripherals</td></tr>
          </tbody></table></div>
          <div class="cards3">
            <div class="mini" style="--c:var(--good)"><h5>✓ Satellite: benefits</h5><p>So many satellites that the system is <b>always available</b>. Not affected by <b>power cuts</b> on the ground.</p></div>
            <div class="mini" style="--c:var(--bad)"><h5>✗ Satellite: drawbacks</h5><p>Signals do not pass through <b>solid objects</b> (tall buildings, tunnels) and can be affected by <b>heavy snow or rain</b>.</p></div>
          </div>
        </div>

        <div data-panel="gps" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 700 250" aria-label="Satellites sending GPS signals to a person">
              <path class="ground-arc" d="M0 250 Q350 160 700 250Z"/>
              ${SATS.map(([x, y], i) => `<g class="gsat" id="gs${i}"><path class="beam" d="M${x} ${y + 12} L350 185"/><text x="${x}" y="${y + 10}" class="emo big">🛰️</text></g>`).join('')}
              <g id="city" class="city-b"><rect x="285" y="110" width="30" height="95"/><rect x="390" y="95" width="34" height="110"/><rect x="250" y="140" width="22" height="65"/></g>
              <g id="tunnel" class="tunnel"><path d="M240 210 Q350 90 460 210Z"/></g>
              <g id="snow" class="snowfall">${Array.from({ length: 24 }, (_, i) => `<text x="${(i * 29) % 700}" y="${60 + ((i * 37) % 120)}" style="--d:${(i % 6) * 0.3}s">❄</text>`).join('')}</g>
              <text x="350" y="205" class="emo big">🧍</text>
            </svg>
          </div>
          <div class="ctrls">
            <div class="seg" id="place"><span class="seg-l">Where is the device?</span><button data-v="open">🌳 Open field</button><button data-v="city">🏙️ Between tall buildings</button><button data-v="tunnel">🚇 In a tunnel</button></div>
            <label class="tgl"><input type="checkbox" id="snowOn"> Heavy snow</label>
          </div>
          <div class="readout"><span class="ro"><small>Satellites in view</small><b id="inView"></b></span><span class="ro" id="locRo"><small>Location</small><b id="loc"></b></span></div>
          <p class="note">GPS uses a network of 24 satellites. A device can usually see about 12 of them, but only <b>four</b> are needed to calculate an accurate location.</p>
        </div>

        <div data-panel="tv" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 700 240" aria-label="Satellite television: DVB-S">
              <path class="ground-arc" d="M0 240 Q350 170 700 240Z"/>
              <path class="up" d="M110 150 L340 40"/><path class="down" d="M360 40 L560 140"/>
              <g class="tower"><path d="M90 205 L110 120 L130 205 M97 175h26M103 150h14"/><text class="svg-sm" x="110" y="225">Broadcaster</text></g>
              <text x="350" y="50" class="emo big">🛰️</text>
              <g><text x="565" y="160" class="emo big">📡</text><text class="svg-sm" x="565" y="178">Antenna (dish)</text></g>
              <g id="stb"><rect class="stb" x="575" y="190" width="56" height="16" rx="3"/><text class="svg-sm" x="603" y="222">Set-top box</text></g>
              ${FD.dv.tv(630, 150).replace('<g ', '<g id="tvSet" ')}
              <path class="sig" id="sig" d="M110 150 L350 40 L565 150 L603 198 L660 175"/>
              <circle r="7" class="sig-dot"><animateMotion dur="3s" repeatCount="indefinite" path="M110 150 L350 40 L565 150 L603 198 L660 175"/></circle>
            </svg>
          </div>
          <label class="tgl"><input type="checkbox" id="dec"> The TV has a decoder built in</label>
          <div class="cards3">
            <div class="mini"><h5>📺 DVB-S</h5><p>Digital Video Broadcasting – <b>Satellite</b>. DVB-S2 and DVB-S2X are newer: HDTV, interactive services and internet access.</p></div>
            <div class="mini"><h5>☎️ Telephone</h5><p><b>Satellite phones</b> let people in remote areas (mountains, deserts, the poles) make voice calls.</p></div>
            <div class="mini"><h5>🎖️ Military</h5><p>The military in many countries use satellites for communication, e.g. the <b>Global Command and Control System</b>.</p></div>
          </div>
        </div>

        <div data-panel="bc" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 700 220" aria-label="A broadcast transmitter sending a signal to an antenna">
              <g class="tower"><path d="M70 205 L100 60 L130 205 M80 160h40M88 120h24M94 90h12"/><circle cx="100" cy="55" r="5" class="tip"/><text class="svg-sm" x="100" y="218">Broadcast station transmitter</text></g>
              <path id="ana" class="ana" d="M120 70 q15 -20 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0"/>
              <text id="digi" class="digi" x="270" y="72">0000 1111 0000 1111 0000 1111</text>
              <g class="uhf"><path d="M420 70 h70 M430 60 v20 M445 60 v20 M460 60 v20 M475 60 v20 M490 70 v120"/><text class="svg-sm" x="455" y="50">UHF antenna</text></g>
              <path class="wire on" d="M490 190 H540 V160"/><path class="wire on" id="radioWire" d="M490 190 H560"/>
              ${FD.dv.tv(520, 115)}
              <g id="radio"><rect class="radio" x="560" y="170" width="90" height="40" rx="6"/><rect class="dab" x="600" y="178" width="44" height="14" rx="2"/><circle cx="578" cy="190" r="10" class="spk"/><text id="dabTxt" class="dab-t" x="602" y="188"></text></g>
            </svg>
          </div>
          <div class="seg" id="bcMode"><span class="seg-l">Signal</span><button data-v="ana">〰️ Analogue TV &amp; radio</button><button data-v="dvbt">📺 Digital TV (DVB-T)</button><button data-v="dab">📻 Digital radio (DAB)</button></div>
          <p class="note" id="bcNote"></p>
        </div>

        <div data-panel="wired" class="sim" hidden>
          <div class="plugs">${WIRED.map(([n, u, e], i) => `<button class="plug" data-i="${i}"><span>${e}</span><b>${n}</b><small>${u}</small></button>`).join('')}</div>
          <p class="sim-box small" id="plugInfo">Click a connection type.</p>
          <h5 class="mt0">Which connection would you use?</h5>
          <div class="jobs">${JOBS.map(([j], i) => `<div class="job" data-i="${i}"><span>${j}</span><select aria-label="${j}"><option value="">Choose…</option>${WIRED.map(([n], k) => `<option value="${k}">${n}</option>`).join('')}</select><i></i></div>`).join('')}</div>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s), root = el.querySelector('.meth');

    const G = { place: 'open', snow: false };
    function gps() {
      FD.segSet($('#place'), G.place);
      const vis = G.place === 'tunnel' ? 0 : G.place === 'city' ? 2 : 5;
      SATS.forEach((_, i) => $('#gs' + i).classList.toggle('lost', i >= vis || (G.place === 'city' && (i === 0 || i === 4))));
      const n = G.place === 'city' ? Math.min(vis, 3) - 1 : vis;
      $('#city').classList.toggle('on', G.place === 'city');
      $('#tunnel').classList.toggle('on', G.place === 'tunnel');
      $('#snow').classList.toggle('on', G.snow);
      const ok = n >= 4;
      $('#inView').textContent = n;
      $('#loc').textContent = ok ? (G.snow ? 'Found, signal weaker' : 'Found ✓') : 'Cannot calculate';
      $('#locRo').className = 'ro ' + (ok ? (G.snow ? '' : 'good') : 'bad');
      root.classList.toggle('weak', G.snow);
    }
    $('#place').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { G.place = b.dataset.v; gps(); } });
    $('#snowOn').addEventListener('change', (e) => { G.snow = e.target.checked; gps(); });

    const dec = () => { const on = $('#dec').checked; $('#stb').classList.toggle('gone', on); root.querySelector('[data-panel="tv"]').classList.toggle('no-stb', on); };
    $('#dec').addEventListener('change', dec);

    const NOTES = {
      ana: 'Transmitters broadcast <b>analogue</b> TV and radio signals. The antenna sends the signal through a wire to the TV or radio, which converts it into images and audio. In some countries analogue signals have been switched off: in January 2017 <b>Norway</b> began switching off its national FM radio stations.',
      dvbt: '<b>DVB-T</b> (Digital Video Broadcasting – <b>Terrestrial</b>): the transmitters are on Earth, not in orbit. Viewers use the <b>same antenna</b> as for analogue broadcasts. Some TVs have a decoder built in. <b>DVB-T2</b> is newer: HDTV and interactive services.',
      dab: '<b>DAB</b> (Digital Audio Broadcasting) is used in Europe and the Asia Pacific region. It is broadcast in the same way as DVB, gives <b>more radio stations</b> and can carry <b>text data</b>: the time, the station name and details of the music.',
    };
    let bcm = 'ana', dabT = 0;
    function bc(m = bcm) {
      bcm = m;
      FD.segSet($('#bcMode'), m);
      const p = root.querySelector('[data-panel="bc"]');
      p.dataset.mode = m;
      $('#bcNote').innerHTML = NOTES[m];
      clearInterval(dabT);
      const msgs = ['Radio Sol 98.2', '18:42', 'Now: “Blue Sky” – The Kites', 'Next: news at 19:00'];
      let k = 0;
      $('#dabTxt').textContent = m === 'dab' ? msgs[0] : '';
      if (m === 'dab') dabT = setInterval(() => { $('#dabTxt').textContent = msgs[++k % msgs.length]; }, FD.dur(1400));
    }
    $('#bcMode').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) bc(b.dataset.v); });

    function plug(i) {
      el.querySelectorAll('.plug').forEach((b) => b.classList.toggle('on', +b.dataset.i === i));
      const [n, u, e, info] = WIRED[i];
      $('#plugInfo').innerHTML = `<b>${e} ${n}</b> · ${u}. ${info}`;
    }
    el.querySelectorAll('.plug').forEach((b) => b.addEventListener('click', () => plug(+b.dataset.i)));
    el.querySelectorAll('.job').forEach((j) => j.querySelector('select').addEventListener('change', (e) => {
      const ok = e.target.value !== '' && +e.target.value === JOBS[j.dataset.i][1];
      j.classList.toggle('ok', ok);
      j.classList.toggle('no', e.target.value !== '' && !ok);
      j.querySelector('i').textContent = e.target.value === '' ? '' : ok ? '✓' : '✗';
    }));

    const show = FD.panels(root);
    gps(); dec(); bc('ana'); show('all');
    return {
      show,
      zone: (z) => FD.focus(root.querySelector('[data-panel="all"]'), z),
      gps(o) { Object.assign(G, o); $('#snowOn').checked = G.snow; gps(); },
      dec(on) { $('#dec').checked = on; dec(); },
      bc,
      plug,
      destroy() { clearInterval(dabT); },
    };
  },
  steps: [
    {
      title: 'Four ways to communicate',
      text: `<p>Digital devices share data using four main methods: <strong>satellite</strong>, <strong>broadcast</strong>, <strong>wired</strong> and <strong>wireless</strong>.</p>
             <p>Satellite, broadcast and wireless all use <strong>radio waves</strong>. Wired methods use an <strong>electrical signal</strong>.</p>`,
      on: (a) => { a.show('all'); a.zone(null); },
    },
    {
      title: 'Satellite communication',
      text: `<p>Satellites transmit data to, and receive data from, digital devices. Devices use <strong>antennae</strong> to receive the radio signals.</p>
             <p><strong>Benefit:</strong> there are so many satellites that the system is always available, and it is not affected by power cuts.</p>
             <p><strong>Drawback:</strong> signals do not pass through solid objects, and heavy snow or rain can affect them.</p>`,
      on: (a) => { a.show('all'); a.zone('sat'); },
    },
    {
      title: 'GPS',
      text: `<p>Navigation aids use <strong>GPS</strong> signals to calculate the exact location of a device.</p>
             <p>GPS signals come from a network of <strong>24 satellites</strong>. A device can usually see about 12 of them, but only <strong>four</strong> are needed for an accurate location.</p>`,
      tip: 'Try it: move the device between tall buildings and into a tunnel.',
      async on(a, ctx) { a.show('gps'); a.gps({ place: 'open', snow: false }); if (!(await ctx.sleep(2200))) return; a.gps({ place: 'city' }); if (!(await ctx.sleep(2200))) return; a.gps({ place: 'tunnel' }); },
    },
    {
      title: 'Satellite television (DVB-S)',
      text: `<p>A video signal from the broadcaster is sent by a large antenna on Earth to a <strong>satellite</strong>, which broadcasts it back down to Earth.</p>
             <p>The viewer’s antenna (a dish) receives the signal and sends it to a <strong>set-top box</strong>, which <strong>decodes</strong> it for the television. Some TVs have a decoder built in, so they do not need a set-top box.</p>`,
      tip: 'Try it: tick “The TV has a decoder built in”.',
      async on(a, ctx) { a.show('tv'); a.dec(false); if (!(await ctx.sleep(3000))) return; a.dec(true); },
    },
    {
      title: 'Satellite phones and the military',
      text: `<p><strong>Satellite telephones</strong> let people in remote areas make voice calls.</p>
             <p>The <strong>military</strong> in many countries use satellites for their communication systems.</p>`,
      on: (a) => { a.show('tv'); a.dec(false); },
    },
    {
      title: 'Broadcast: analogue',
      text: `<p>Transmitters <strong>broadcast</strong> television and radio signals that are received by a viewer’s <strong>antenna</strong>.</p>
             <p>The antenna sends the signal through a wire to the TV or radio, which converts it into images and audio.</p>`,
      on: (a) => { a.show('bc'); a.bc('ana'); },
    },
    {
      title: 'Broadcast: digital TV and radio',
      text: `<p><strong>DVB-T</strong> (Terrestrial) uses transmitters on Earth. Viewers can use the same antenna as for analogue. <strong>DVB-T2</strong> adds HDTV and interactive services.</p>
             <p><strong>DAB</strong> digital radio gives more stations and can show text: the time, the station name and the music playing.</p>`,
      async on(a, ctx) { a.show('bc'); a.bc('dvbt'); if (!(await ctx.sleep(3000))) return; a.bc('dab'); },
    },
    {
      title: 'Wired communication',
      text: `<p>Devices can use <strong>cables</strong> to communicate. Some connections, like <strong>USB</strong>, are used for many purposes. Others meet one particular need, like <strong>Ethernet</strong> for networking.</p>
             <p>USB has had many revisions; each one allows faster data transfer. Ethernet cables can be about <strong>100 metres</strong> long before the signal loses quality.</p>`,
      tip: 'Try it: click each connection, then choose the right one for each job.',
      on: (a) => { a.show('wired'); a.plug(4); },
    },
  ],
});

FD.check({
  section: 'methods',
  items: [
    {
      type: 'sort',
      q: 'Which technology does each method use?',
      bins: ['Radio waves', 'Electrical signal'],
      rows: [['Satellite', 0], ['Broadcast', 0], ['Wired', 1], ['Wireless', 0]],
      why: 'Table 4.2: only wired communication uses an electrical signal.',
    },
    { type: 'mcq', q: 'How many GPS satellites must a device be able to “see” to calculate an accurate location?', opts: ['4', '1', '12', '24'], why: 'There are 24 GPS satellites and a device sees about 12, but only four are needed.' },
    { type: 'multi', q: 'Which are drawbacks of satellite communication?', need: 2, opts: [['Signals do not pass through solid objects like tall buildings', true], ['Heavy snow or rain can affect the signal', true], ['It stops working in a power cut', false], ['There are too few satellites', false]], why: 'Satellite signals are blocked by solid objects and affected by weather. Power cuts do not affect them.' },
    { type: 'mcq', q: 'What does a set-top box do in satellite TV?', opts: ['It decodes the signal so it is ready for the television', 'It sends the signal up to the satellite', 'It records the programme on a DVD', 'It amplifies the Wi-Fi signal'], why: 'The set-top box decodes the signal. Some TVs have the decoder built in.' },
    {
      type: 'sort',
      q: 'Match each wired connection to its use (Table 4.3).',
      bins: ['HDMI', 'S/PDIF', 'Minijack', 'USB', 'Ethernet'],
      rows: [['Networking', 4], ['Digital video connections', 0], ['Personal headphones', 2], ['Storage transfer', 3], ['Digital audio connections', 1]],
      why: 'HDMI = video, S/PDIF = digital audio, minijack = headphones, USB = storage, Ethernet = networking.',
    },
    { type: 'tf', q: 'DVB-T uses transmitters based on Earth, so viewers can use the same antenna as for analogue TV.', a: true, why: 'Terrestrial means “on the Earth”.' },
  ],
});
