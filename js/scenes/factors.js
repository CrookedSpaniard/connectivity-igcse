FD.add({
  id: 'factors',
  title: 'Factors that affect speed and volume of data transfer',
  tab: 'Factors',
  icon: 'factors',
  color: '--c2',
  section: true,
  interactive: true,
  vocab: [
    ['frequency', 'the waveband at which a radio signal is transmitted'],
    ['shielded', 'protected'],
    ['interference', 'other electromagnetic signals that disrupt wired and wireless signals'],
  ],
  mount(el) {
    const WALLS = [230, 350, 470];
    el.innerHTML = `
      <div class="sim fac">
        <div class="sim-box">
          <svg viewBox="0 0 640 230" aria-label="A router sending data to a laptop in a house">
            <rect class="floor" x="10" y="10" width="620" height="200" rx="10"/>
            ${WALLS.map((x, i) => `<g class="wall" id="w${i}"><rect x="${x - 7}" y="12" width="14" height="196"/><text class="svg-sm" x="${x}" y="225">wall</text></g>`).join('')}
            <g id="micro" class="micro" transform="translate(130 -5)"><rect x="150" y="150" width="54" height="36" rx="4" class="mw"/><rect x="155" y="155" width="34" height="26" rx="2" class="mw-door"/><circle cx="196" cy="162" r="2.5" class="mw-k"/><path class="emi" d="M180 140 q8 -10 16 0 t16 0 M176 128 q10 -12 20 0 t20 0"/><text class="svg-sm" x="177" y="200">microwave</text></g>
            ${FD.dv.router(30, 80)}
            <text class="svg-lbl" x="60" y="140">Router</text>
            <path class="cable" id="cable" d=""/>
            <g id="waves" class="waves"><path d="M95 95 a24 24 0 0 1 0 30"/><path d="M107 85 a38 38 0 0 1 0 50"/><path d="M119 75 a52 52 0 0 1 0 70"/></g>
            <g id="lap">${FD.dv.laptop(-30, -30)}<text class="svg-lbl" y="32">Laptop</text></g>
            <g id="dots"></g>
          </svg>
        </div>
        <div class="ctrls">
          <div class="seg" id="meth"><span class="seg-l">Transfer method</span><button data-v="wifi">📶 Wireless</button><button data-v="cable">🔌 Cable</button></div>
          <label class="rng"><span>Distance <output id="dOut"></output></span><input type="range" id="dist" min="2" max="120" value="10"></label>
        </div>
        <div class="ctrls">
          <label class="tgl"><input type="checkbox" id="mwOn"> Microwave oven on (interference)</label>
          <label class="tgl" id="shWrap"><input type="checkbox" id="shield"> Shielded cable</label>
          <label class="tgl"><input type="checkbox" id="furn"> Furniture in the way</label>
        </div>
        <div class="readout">
          <span class="ro" id="roSig"><small>Signal strength</small><b id="sig"></b></span>
          <span class="ro" id="roBw"><small>Bandwidth</small><b id="bwv"></b></span>
          <span class="ro" id="roLost"><small>Bits sent again</small><b id="lost"></b></span>
        </div>
        <p class="note" id="why"></p>
      </div>`;
    const $ = (s) => el.querySelector(s), root = el.querySelector('.fac');
    const st = { m: 'wifi', d: 10, mw: false, sh: false, furn: false };

    function calc() {
      let q = 1, why = [];
      if (st.m === 'wifi') {
        const crossed = WALLS.filter((x) => x < xOf(st.d)).length;
        q *= Math.max(0, 1 - st.d / 70);
        if (st.d > 20) why.push('the signal gets weaker with distance');
        q *= Math.pow(0.68, crossed);
        if (crossed) why.push(`${crossed} wall${crossed > 1 ? 's' : ''} in the way`);
        if (st.furn) { q *= 0.8; why.push('furniture blocks the signal'); }
        if (st.mw) { q *= 0.55; why.push('the microwave interferes with the radio signal'); }
        return { sig: q, bw: 300 * q, lost: Math.min(0.9, (1 - q) * 0.6), why };
      }
      if (st.d > 100) { q *= 0.35; why.push('the cable is longer than 100 m, so the signal loses quality'); }
      if (st.mw && !st.sh) { q *= 0.85; why.push('interference reaches the unshielded cable'); }
      const good = st.mw && st.sh ? 'the microwave is on, but the shielded cable is protected from interference' : '';
      return { sig: q, bw: 1000 * q, lost: Math.min(0.9, (1 - q) * 0.5), why, good };
    }
    const xOf = (d) => 150 + Math.min(d, 120) * 3.8;

    function draw() {
      const x = xOf(st.d), y = 110;
      $('#lap').setAttribute('transform', `translate(${x} ${y})`);
      $('#dOut').textContent = st.d + ' m';
      $('#cable').setAttribute('d', `M90 110 C ${(90 + x) / 2} 175, ${(90 + x) / 2} 175, ${x - 30} ${y + 8}`);
      $('#cable').classList.toggle('shielded', st.sh);
      root.classList.toggle('is-cable', st.m === 'cable');
      root.classList.toggle('mw-on', st.mw);
      $('#shWrap').hidden = st.m !== 'cable';
      FD.segSet($('#meth'), st.m);
      WALLS.forEach((wx, i) => $('#w' + i).classList.toggle('hit', st.m === 'wifi' && wx < x));
      const r = calc();
      $('#sig').textContent = Math.round(r.sig * 100) + '%';
      $('#bwv').textContent = r.bw >= 1 ? FD.fmt(r.bw) + ' Mbit/s' : 'no signal';
      $('#lost').textContent = Math.round(r.lost * 100) + '%';
      $('#roSig').className = 'ro ' + (r.sig > 0.6 ? 'good' : r.sig < 0.3 ? 'bad' : '');
      $('#roBw').className = $('#roSig').className;
      $('#roLost').className = 'ro ' + (r.lost > 0.2 ? 'bad' : 'good');
      $('#why').innerHTML = r.why.length ? '⚠️ Slower because ' + r.why.join('; ') + '.' : r.good ? `✓ Full speed: ${r.good}.` : '✓ Nothing is slowing this connection down.';
      // the moving bits: some are lost (red) and have to be sent again
      const n = 8, lostN = Math.round(r.lost * n);
      const bads = new Set(Array.from({ length: lostN }, (_, k) => Math.floor((k * n) / Math.max(lostN, 1))));
      $('#dots').innerHTML = r.sig <= 0 ? '' : Array.from({ length: n }, (_, k) =>
        `<circle r="5" class="dot ${bads.has(k) ? 'bad' : ''}" style="--x1:95px;--x2:${x - 34}px;--y:${y}px;animation-delay:${(-k * 1.6) / n}s"/>`).join('');
    }
    $('#meth').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { st.m = b.dataset.v; draw(); } });
    $('#dist').addEventListener('input', (e) => { st.d = +e.target.value; draw(); });
    $('#mwOn').addEventListener('change', (e) => { st.mw = e.target.checked; draw(); });
    $('#shield').addEventListener('change', (e) => { st.sh = e.target.checked; draw(); });
    $('#furn').addEventListener('change', (e) => { st.furn = e.target.checked; draw(); });
    draw();

    return {
      set(o) {
        Object.assign(st, o);
        $('#dist').value = st.d; $('#mwOn').checked = st.mw; $('#shield').checked = st.sh; $('#furn').checked = st.furn;
        draw();
      },
      async walk(ctx, from, to) {
        for (let d = from; d <= to; d += 4) {
          this.set({ d });
          if (!(await ctx.sleep(120))) return;
        }
      },
    };
  },
  steps: [
    {
      title: 'Bits that do not arrive',
      text: `<p>When devices transfer data, many things can stop <strong>bits</strong> from reaching their destination.</p>
             <p>Those bits then have to be <strong>sent again</strong>, which slows down the overall data transfer rate.</p>
             <p>There are four main factors: the <strong>transfer method</strong>, <strong>interference</strong>, <strong>blockages</strong> and <strong>distance</strong>.</p>`,
      on: (a) => a.set({ m: 'wifi', d: 10, mw: false, sh: false, furn: false }),
    },
    {
      title: 'Transfer method',
      text: `<p>Wireless methods have to work on a <strong>limited number of frequencies</strong>.</p>
             <p>Copper cable can carry <strong>more frequencies</strong> than wireless methods, so cabled methods can have <strong>more bandwidth</strong> available to them.</p>`,
      tip: 'Hint from the book: some <strong>older</strong> wired methods have less bandwidth than <strong>newer</strong> wireless methods.',
      async on(a, ctx) { a.set({ m: 'wifi', d: 10, mw: false, furn: false }); if (!(await ctx.sleep(1500))) return; a.set({ m: 'cable' }); },
    },
    {
      title: 'Interference',
      text: `<p>Other <strong>electromagnetic signals</strong> disrupt, or interfere with, wired and wireless signals.</p>
             <p>Interference can come from other wireless devices, wireless routers and appliances such as <strong>fridges</strong> and <strong>microwave ovens</strong>.</p>`,
      tip: 'Try it: switch the microwave on and off with a wireless connection.',
      on: (a) => a.set({ m: 'wifi', d: 12, mw: true, furn: false }),
    },
    {
      title: 'Shielded cables',
      text: `<p>Cabled connections can be <strong>shielded</strong> (protected) from interference by wrapping the wires in a <strong>thin layer of metal</strong>.</p>`,
      tip: 'Try it: with the microwave on, tick and untick “Shielded cable”.',
      async on(a, ctx) { a.set({ m: 'cable', d: 12, mw: true, sh: false }); if (!(await ctx.sleep(1500))) return; a.set({ sh: true }); },
    },
    {
      title: 'Blockages',
      text: `<p><strong>Walls and furniture</strong> reduce the strength of wireless signals. This reduces the available bandwidth.</p>`,
      tip: 'Try it: move the laptop through the walls with a wireless connection.',
      async on(a, ctx) { a.set({ m: 'wifi', mw: false, furn: true, d: 4 }); await a.walk(ctx, 4, 70); },
    },
    {
      title: 'Distance',
      text: `<p>The strength of a <strong>wired or wireless</strong> signal is reduced as the <strong>distance</strong> it has to travel increases.</p>
             <p>Ethernet cables can be about <strong>100 metres</strong> long before the signals start to lose quality.</p>`,
      tip: 'Try it: choose Cable and move the slider past 100 m.',
      async on(a, ctx) { a.set({ m: 'cable', mw: false, furn: false, d: 60 }); await a.walk(ctx, 60, 120); },
    },
  ],
});

FD.check({
  section: 'factors',
  items: [
    {
      type: 'sort',
      q: 'Which factor is each sentence about?',
      bins: ['Transfer method', 'Interference', 'Blockages', 'Distance'],
      rows: [['A microwave oven disrupts the Wi-Fi signal', 1], ['Copper cable carries more frequencies than wireless', 0], ['The signal is weak in the bedroom behind three walls', 2], ['An Ethernet cable longer than 100 m loses quality', 3]],
      why: 'Transfer method = wired or wireless; interference = other electromagnetic signals; blockages = walls and furniture; distance = how far the signal travels.',
    },
    { type: 'mcq', q: 'Why does interference slow down data transfer?', opts: ['Some bits do not arrive, so they must be sent again', 'It makes the cable longer', 'It changes the file into a bigger file', 'It switches the router off'], why: 'Bits that do not reach their destination have to be sent again, which slows the overall transfer rate.' },
    { type: 'mcq', q: 'Why can cabled methods have more bandwidth than wireless methods?', opts: ['Copper cable can carry more frequencies', 'Cables are always newer', 'Wireless signals cannot carry binary data', 'Cables have no distance limit'], why: 'Wireless methods work on a limited number of frequencies.' },
    { type: 'tf', q: 'A shielded cable has its wires wrapped in a thin layer of metal to protect it from interference.', a: true, why: 'Shielded means protected.' },
    { type: 'tf', q: 'Distance only affects wireless signals, not wired signals.', a: false, why: 'The strength of both wired and wireless signals is reduced as the distance increases.' },
  ],
});
