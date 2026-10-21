FD.add({
  id: 'wiredwl',
  title: 'Wired vs wireless, broadband and cellular networks',
  tab: 'Wired vs wireless',
  icon: 'wiredwl',
  color: '--c7',
  section: true,
  interactive: true,
  vocab: [
    ['carcinogen', 'a substance that can cause cancer'],
    ['Internet Service Provider (ISP)', 'a company that provides customers with access to the internet'],
    ['fibre optic cable', 'a cable that sends data using light signals'],
    ['copper cable', 'a cable that sends data using electrical signals, which are conducted through copper wires'],
    ['cellular network', 'another name for a mobile phone network'],
  ],
  mount(el) {
    // [factor, wired, wireless, winner: 0 wired · 1 wireless · 2 it depends]
    const F = [
      ['Cost', 'Cables are cheap if you buy them for a small number of devices.', 'No need to buy cables, but you may need a wireless access point for many connections.', 2],
      ['Safety', 'Risk of tripping over cables.', 'None (though some people worry about the effects of radiation).', 1],
      ['Speed', 'Faster than wireless.', 'Slower than wired.', 0],
      ['Stability', 'Less affected by interference than wireless.', 'Affected by interference and obstacles.', 0],
      ['Portability', 'Not portable: limited by the cables. May need a signal booster for more than 100 metres.', 'Portable within the signal range.', 1],
      ['Mess', 'Can look untidy if lots of cables are used.', 'Tidy.', 1],
      ['Security', 'Most secure.', 'Less secure: it is easier to intercept a wireless signal.', 0],
      ['Maintenance', 'Using cables and ports for a long time may damage them.', 'None.', 1],
    ];
    el.innerHTML = `
      <div class="sim wwl">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="cmp">⚖️ Which is better?</button><button data-p="bb">🏠 Broadband</button>
        </div>

        <div data-panel="cmp" class="sim">
          <div class="sim-box bal-box">
            <svg viewBox="0 0 400 150" aria-label="A balance between wired and wireless">
              <path class="bal-post" d="M200 140 V40 M170 140h60"/>
              <g id="beam" class="bal-beam">
                <path d="M70 40 H330"/>
                <path class="bal-pan" d="M40 85 h60 l-10 18 h-40 z"/><path d="M70 40 L45 85 M70 40 L95 85" class="bal-str"/>
                <path class="bal-pan" d="M300 85 h60 l-10 18 h-40 z"/><path d="M330 40 L305 85 M330 40 L355 85" class="bal-str"/>
                <text class="svg-lbl" x="70" y="125">🔌 Wired <tspan id="sW">0</tspan></text>
                <text class="svg-lbl" x="330" y="125">📶 Wireless <tspan id="sL">0</tspan></text>
              </g>
              <circle cx="200" cy="40" r="6" class="bal-pin"/>
            </svg>
          </div>
          <ol class="facs">${F.map(([n, w, l], i) => `
            <li class="fac-row" data-i="${i}">
              <b class="fac-n">${n}</b>
              <span class="fac-c fw">${w}</span>
              <span class="fac-c fl">${l}</span>
              <span class="sc-btns"><button class="opt small-btn" data-v="0">Wired</button><button class="opt small-btn" data-v="1">Wireless</button><button class="opt small-btn" data-v="2">It depends</button></span>
            </li>`).join('')}</ol>
          <p class="small" id="facMsg">For each factor, decide which is better. Then look at the balance.</p>
        </div>

        <div data-panel="bb" class="sim" hidden>
          <div class="seg" id="bbMode"><span class="seg-l">Connection</span><button data-v="fixed">🏠 Broadband (fixed line)</button><button data-v="mobile">📱 Mobile broadband</button></div>
          <div class="sim-box">
            <svg viewBox="0 0 680 230" aria-label="How broadband reaches the internet">
              <g class="bb-fixed">
                <path class="house" d="M20 120 L80 70 L140 120 V200 H20Z"/>
                ${FD.dv.router(50, 140)}
                <path class="bb-line fibre" d="M140 175 H300"/><text class="svg-sm" x="220" y="165">fibre optic or copper cable</text>
              </g>
              <g class="bb-mobile">
                ${FD.dv.phone(40, 60)}
                <path class="bb-wave" d="M100 80 q10 -10 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"/>
                <g class="mast"><path d="M260 140 L280 50 L300 140 M266 110h28M272 80h16"/></g><text class="svg-sm" x="280" y="40">mobile phone mast (3G/4G)</text>
                <path class="bb-line" d="M300 120 H330"/>
              </g>
              <g class="isp"><rect x="330" y="95" width="130" height="90" rx="12"/><text class="svg-lbl" x="395" y="135" id="ispName">ISP</text><text class="svg-sm" x="395" y="155" id="ispSub" style="font-size: 9.5px">Internet Service Provider</text></g>
              <path class="bb-line on" d="M460 140 H520"/>
              ${FD.dv.cloud(520, 100)}<text class="svg-lbl" x="566" y="160">Internet</text>
              <circle r="7" class="sig-dot" id="bbDot"><animateMotion id="bbAnim" dur="2.4s" repeatCount="indefinite" path="M110 175 H395 V140 H560"/></circle>
            </svg>
          </div>
          <p class="note" id="bbNote"></p>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s), root = el.querySelector('.wwl');
    const picks = {};

    function balance() {
      let w = 0, l = 0;
      F.forEach((f, i) => { if (picks[i] === f[3]) { if (f[3] === 0) w++; if (f[3] === 1) l++; } });
      $('#sW').textContent = w; $('#sL').textContent = l;
      const tilt = FD.clamp((l - w) * 4, -14, 14);
      $('#beam').style.transform = `rotate(${tilt}deg)`;
      const n = Object.keys(picks).length, right = F.filter((f, i) => picks[i] === f[3]).length;
      $('#facMsg').innerHTML = n < F.length ? `${right} / ${n} right so far.` : `<b>${right} / ${F.length} right.</b> Wired wins on speed, stability and security; wireless wins on portability, tidiness, safety and maintenance. Neither is best for everything: it depends on the situation.`;
    }
    el.querySelectorAll('.fac-row').forEach((row) => row.addEventListener('click', (e) => {
      const b = e.target.closest('.opt');
      if (!b || row.dataset.done) return;
      const i = +row.dataset.i, want = F[i][3];
      reveal(row, +b.dataset.v);
      picks[i] = +b.dataset.v;
      if (want !== picks[i]) row.querySelector(`[data-v="${want}"]`).classList.add('right');
      balance();
    }));
    function reveal(row, v) {
      const want = F[row.dataset.i][3];
      row.dataset.done = 1;
      row.classList.add('open');
      const b = row.querySelector(`[data-v="${v}"]`);
      b.classList.add(v === want ? 'right' : 'wrong');
      row.classList.add(want === 0 ? 'w-wins' : want === 1 ? 'l-wins' : 'tie');
    }

    let mode = 'fixed';
    function bb(m = mode) {
      mode = m;
      FD.segSet($('#bbMode'), m);
      root.querySelector('[data-panel="bb"]').dataset.mode = m;
      $('#bbAnim').setAttribute('path', m === 'fixed' ? 'M110 175 H395 V140 H560' : 'M110 80 H280 V120 H395 V140 H560');
      $('#ispName').textContent = m === 'fixed' ? 'ISP' : 'Mobile network';
      $('#ispSub').textContent = m === 'fixed' ? 'Internet Service Provider' : 'acts as the user’s ISP';
      $('#bbNote').innerHTML = m === 'fixed'
        ? '<b>Broadband</b> networks give fast internet access through a connection to an <b>ISP</b>, using the <b>fibre optic</b> cable (light signals) or <b>copper</b> cable (electrical signals) network.'
        : '<b>Mobile broadband</b> gives high-speed wireless access using <b>3G or 4G</b> to connect to the <b>mobile phone network</b> (the cellular network), which acts as the user’s ISP.';
    }
    $('#bbMode').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) bb(b.dataset.v); });

    const show = FD.panels(root);
    balance(); bb('fixed'); show('cmp');
    return {
      show, bb,
      open(list) { list.forEach((i) => { const row = el.querySelector(`.fac-row[data-i="${i}"]`); row.classList.add('hint'); }); el.querySelectorAll('.fac-row').forEach((r) => r.classList.toggle('hint', list.includes(+r.dataset.i))); },
    };
  },
  steps: [
    {
      title: 'Is wireless safe?',
      text: `<p>The <strong>World Health Organization (WHO)</strong> says that current research suggests exposure to wireless signals does <strong>not</strong> cause health issues.</p>
             <p>But it also says more long-term research is needed about children using mobile phones for more than 10 years, because symptoms may take a long time to appear and young people are the most vulnerable to radiation.</p>`,
      tip: 'Key point: the WHO classifies Wi-Fi as a <em>possible</em> carcinogen – the same group as coffee, carpentry, foam cups and pickled vegetables!',
      on: (a) => { a.show('cmp'); a.open([]); },
    },
    {
      title: 'Cost and safety',
      text: `<p><strong>Cost:</strong> cables are cheap for a small number of devices. Wireless needs no cables, but may need a wireless access point for many connections. So… <strong>it depends</strong>.</p>
             <p><strong>Safety:</strong> people can trip over cables.</p>`,
      tip: 'Try it: choose the better option for each factor and watch the balance.',
      on: (a) => { a.show('cmp'); a.open([0, 1]); },
    },
    {
      title: 'Speed and stability',
      text: `<p><strong>Wired</strong> connections are <strong>faster</strong> and <strong>less affected by interference</strong>.</p>
             <p>Wireless connections are affected by interference and obstacles.</p>`,
      on: (a) => { a.show('cmp'); a.open([2, 3]); },
    },
    {
      title: 'Portability and mess',
      text: `<p><strong>Wireless</strong> is portable anywhere within the signal range, and it is tidy.</p>
             <p>Wired devices are limited by their cables (and may need a booster for more than 100 m), and lots of cables look untidy.</p>`,
      on: (a) => { a.show('cmp'); a.open([4, 5]); },
    },
    {
      title: 'Security and maintenance',
      text: `<p><strong>Wired</strong> is the <strong>most secure</strong>: it is easier to intercept a wireless signal.</p>
             <p>But cables and ports can be damaged after a long time of use, while wireless needs no maintenance.</p>`,
      on: (a) => { a.show('cmp'); a.open([6, 7]); },
    },
    {
      title: 'Broadband',
      text: `<p><strong>Broadband</strong> networks give fast access to the internet through a connection to an <strong>Internet Service Provider (ISP)</strong>.</p>
             <p>They use the <strong>fibre optic cable</strong> network (light signals) or the <strong>copper cable</strong> network (electrical signals).</p>`,
      on: (a) => { a.show('bb'); a.bb('fixed'); },
    },
    {
      title: 'Mobile broadband and cellular networks',
      text: `<p><strong>Mobile broadband</strong> gives high-speed wireless access using <strong>3G or 4G</strong> to connect to the mobile phone network, which acts as the user’s ISP.</p>`,
      tip: '<strong>Cellular network</strong> is another name for a mobile phone network.',
      on: (a) => { a.show('bb'); a.bb('mobile'); },
    },
  ],
});

FD.check({
  section: 'wiredwl',
  items: [
    {
      type: 'sort',
      q: 'Which is better for each factor? (Table 4.6)',
      bins: ['Wired', 'Wireless'],
      rows: [['Speed', 0], ['Portability', 1], ['Security', 0], ['Tidiness (mess)', 1], ['Stability', 0], ['Maintenance', 1]],
      why: 'Wired: faster, more stable, more secure. Wireless: portable, tidy, no maintenance.',
    },
    { type: 'mcq', q: 'Why is a wired connection more secure than a wireless one?', opts: ['It is easier to intercept a wireless signal', 'Wired connections use passwords', 'Wireless connections are slower', 'Cables are cheaper'], why: 'Anyone in range can try to intercept a wireless signal; a cable has to be physically accessed.' },
    { type: 'mcq', q: 'What is an ISP?', opts: ['A company that provides customers with access to the internet', 'A cable that sends data using light', 'A type of wireless signal', 'A program that shows web pages'], why: 'ISP = Internet Service Provider.' },
    { type: 'sort', q: 'Which cable does each describe?', bins: ['Fibre optic', 'Copper'], rows: [['Sends data using light signals', 0], ['Sends data using electrical signals', 1]], why: 'Fibre optic = light; copper = electrical signals conducted through copper wires.' },
    { type: 'tf', q: '“Cellular network” is another name for a mobile phone network.', a: true, why: 'Mobile broadband connects to the cellular (mobile phone) network, which acts as the ISP.' },
  ],
});
