FD.add({
  id: 'speed',
  title: 'Speed and volume of data transfer',
  tab: 'Bandwidth & latency',
  icon: 'speed',
  color: '--c4',
  section: true,
  interactive: true,
  vocab: [
    ['bandwidth', 'the number of bits that can be carried by a connection in one second'],
    ['buffer', 'an area of memory used to temporarily store data, especially when streaming video'],
    ['latency', 'the amount of time it takes to send data between devices'],
    ['domain', 'the name used to identify a web server'],
    ['lag', 'move slowly or fail to keep up'],
  ],
  mount(el) {
    const BW = [1, 2, 5, 10, 20, 50, 100, 300, 1000];
    const FILES = [['A song (5 MB)', 5], ['A photo album (100 MB)', 100], ['An HD film (4 GB)', 4000], ['A big game (50 GB)', 50000]];
    const SERVERS = [
      { d: 'gov.uk', where: 'London, UK', km: 1300, x: 330, y: 45 },
      { d: 'newsfirst.lk', where: 'Colombo, Sri Lanka', km: 8100, x: 470, y: 140 },
      { d: 'gov.au', where: 'Canberra, Australia', km: 17300, x: 575, y: 215 },
    ];
    el.innerHTML = `
      <div class="sim spd">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="pipe">💧 Bandwidth</button><button data-p="buf">🎬 Streaming &amp; buffer</button><button data-p="ping">📡 Ping</button><button data-p="lag">🎮 Lag</button>
        </div>

        <div data-panel="pipe" class="sim">
          <div class="sim-box pipe-box">
            <svg viewBox="0 0 640 170" aria-label="A data connection drawn as a water pipe">
              ${FD.dv.server(10, 55)}
              <text class="svg-sm" x="40" y="118">Server</text>
              ${FD.dv.laptop(570, 60)}
              <text class="svg-sm" x="600" y="118">Your device</text>
              <rect class="pipe-wall" id="pipeWall" x="80" y="45" width="480" height="70" rx="12"/>
              <g id="bits"></g>
            </svg>
          </div>
          <div class="ctrls">
            <label class="rng"><span>Bandwidth <output id="bwOut"></output></span><input type="range" id="bw" min="0" max="${BW.length - 1}" step="1" value="3"></label>
            <label class="rng"><span>Download</span><select id="file">${FILES.map(([n], i) => `<option value="${i}" ${i === 2 ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
          </div>
          <div class="readout"><span class="ro"><small>Time to download</small><b id="dlTime"></b></span><span class="ro"><small>Bits every second</small><b id="bps"></b></span></div>
          <p class="note">1 byte = 8 bits. 1 Mbit/s = 1 million bits per second. Real downloads are a little slower than this.</p>
        </div>

        <div data-panel="buf" class="sim" hidden>
          <div class="player" data-zone="player">
            <div class="screen" id="scr"><span class="scene-emoji" id="scrE">🦒</span><span class="spin" id="spin" hidden><i></i>Buffering…</span><span class="big-play" id="bigPlay">▶</span></div>
            <div class="seek"><i class="sk-buf" id="skBuf"></i><i class="sk-play" id="skPlay"></i></div>
            <div class="pl-row"><button class="mini-btn" id="plBtn">▶ Play</button><span class="small muted" id="plTime">0:00 / 1:00</span><button class="mini-btn" id="plReset">↺ Reset</button></div>
          </div>
          <div class="buf-side">
            <svg viewBox="0 0 220 150" class="glass-svg" aria-label="A bottle filling a glass: the bottle is the video file, the glass is the buffer">
              <g id="bottle" class="bottle"><path d="M30 20h50v20l10 12v60H20V52l10-12z" class="bt"/><rect x="40" y="10" width="30" height="12" rx="3" class="bt"/></g>
              <path id="pour" class="pour" d="M100 70 Q130 70 140 95" />
              <path d="M125 95h70l-8 50h-54z" class="glass"/>
              <clipPath id="gl"><path d="M125 95h70l-8 50h-54z"/></clipPath>
              <rect id="water" clip-path="url(#gl)" x="120" y="145" width="80" height="0" class="water"/>
              <text class="svg-sm" x="55" y="135">video file</text><text class="svg-sm" x="160" y="90">buffer</text>
            </svg>
            <label class="rng"><span>Download speed <output id="dsOut"></output></span><input type="range" id="ds" min="1" max="12" step="1" value="8"></label>
            <div class="readout"><span class="ro"><small>Video needs</small><b>5 Mbit/s</b></span><span class="ro" id="roBuf"><small>In the buffer</small><b id="bufS">0 s</b></span></div>
          </div>
        </div>

        <div data-panel="ping" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 640 250" aria-label="Pinging three web servers from Spain">
              <path class="map" d="M40 40h560v190H40z"/>
              <circle class="you" cx="250" cy="90" r="9"/><text class="svg-lbl" x="250" y="114">You (Spain)</text>
              ${SERVERS.map((s, i) => `<path class="route" id="rt${i}" d="M250 90 Q${(250 + s.x) / 2} ${Math.min(90, s.y) - 50} ${s.x} ${s.y}"/><g class="srv"><circle cx="${s.x}" cy="${s.y}" r="8"/><text class="svg-lbl" x="${s.x}" y="${s.y + 24}">${s.d}</text></g>`).join('')}
              <g id="pkt" hidden><rect class="pkt" x="-14" y="-8" width="28" height="16" rx="3"/><text class="pkt-t" y="3">data</text></g>
            </svg>
          </div>
          <div class="ctrls">${SERVERS.map((s, i) => `<button class="btn small-btn" data-ping="${i}">ping ${s.d}</button>`).join('')}<button class="mini-btn" id="cliClear">Clear</button></div>
          <pre class="cli" id="cli" aria-live="polite"><span class="p">$</span> </pre>
          <p class="note">Ping times in this simulation are realistic for a computer in Spain. Real times depend on where you are and how busy the network is.</p>
        </div>

        <div data-panel="lag" class="sim" hidden>
          <div class="game-box" data-zone="game">
            <div class="ground"></div>
            <span class="runner" id="runner">🏃</span>
            <span class="rock" id="rock">🪨</span>
            <span class="g-msg" id="gMsg">Press <b>Jump</b> when the rock is close!</span>
          </div>
          <div class="ctrls">
            <button class="btn primary small-btn" id="jump">⤒ Jump</button>
            <label class="rng"><span>Latency <output id="latOut"></output></span><input type="range" id="lat" min="20" max="600" step="20" value="40"></label>
          </div>
          <div class="readout"><span class="ro" id="roLat"><small>Delay you feel</small><b id="latFeel">–</b></span><span class="ro"><small>Jumps cleared</small><b id="score">0 / 0</b></span></div>
        </div>
      </div>`;

    const $ = (s) => el.querySelector(s), root = el.querySelector('.spd');
    const timers = [];
    let raf = 0;

    // ---------- bandwidth pipe ----------
    function drawPipe() {
      const bw = BW[$('#bw').value], f = FILES[$('#file').value][1];
      $('#bwOut').textContent = bw >= 1000 ? '1 Gbit/s' : bw + ' Mbit/s';
      $('#bps').textContent = FD.fmt(bw * 1e6);
      const secs = (f * 8) / bw;
      $('#dlTime').textContent = secs < 60 ? `${secs < 10 ? secs.toFixed(1) : Math.round(secs)} s` : secs < 3600 ? `${Math.round(secs / 60)} min` : `${(secs / 3600).toFixed(1)} h`;
      const h = 14 + Math.log10(bw) * 30, y = 80 - h / 2;
      $('#pipeWall').setAttribute('y', y);
      $('#pipeWall').setAttribute('height', h);
      const rows = Math.max(1, Math.round(h / 15)), per = 10;
      const speed = 3.5 - Math.log10(bw) * 0.6;
      $('#bits').innerHTML = Array.from({ length: rows }, (_, r) => Array.from({ length: per }, (_, k) =>
        `<text class="bit" x="90" y="${y + 12 + r * ((h - 10) / rows)}" style="--d:${(-k * speed) / per}s;--t:${speed}s">${(r + k) % 2}</text>`).join('')).join('');
    }
    $('#bw').addEventListener('input', drawPipe);
    $('#file').addEventListener('change', drawPipe);

    // ---------- streaming buffer ----------
    const V = { len: 60, got: 0, at: 0, playing: false, waiting: false, last: 0 };
    function bufDraw() {
      const buf = Math.max(0, V.got - V.at);
      $('#skBuf').style.width = (100 * V.got) / V.len + '%';
      $('#skPlay').style.width = (100 * V.at) / V.len + '%';
      const m = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
      $('#plTime').textContent = `${m(V.at)} / ${m(V.len)}`;
      $('#bufS').textContent = buf.toFixed(1) + ' s';
      $('#roBuf').className = 'ro ' + (buf < 1 && V.got < V.len ? 'bad' : 'good');
      $('#spin').hidden = !(V.playing && V.waiting);
      $('#bigPlay').hidden = V.playing;
      $('#plBtn').textContent = V.playing ? '❚❚ Pause' : '▶ Play';
      $('#water').setAttribute('height', Math.min(50, buf * 6));
      $('#water').setAttribute('y', 145 - Math.min(50, buf * 6));
      root.querySelector('.glass-svg').classList.toggle('pouring', V.got < V.len && V.on);
      $('#scrE').style.transform = `translateX(${((V.at * 9) % 120) - 60}px)`;
    }
    function bufTick(t) {
      const dt = V.last ? Math.min(0.1, (t - V.last) / 1000) * FD.speed : 0;
      V.last = t;
      if (V.on) {
        const rate = +$('#ds').value / 5;          // seconds of video downloaded per second
        V.got = Math.min(V.len, V.got + rate * dt);
        if (V.playing) {
          const buf = V.got - V.at;
          if (V.waiting && (buf >= 2 || V.got >= V.len)) V.waiting = false;
          if (!V.waiting) {
            V.at = Math.min(V.got, V.at + dt);
            if (V.got - V.at <= 0.02 && V.got < V.len) V.waiting = true;
            if (V.at >= V.len) V.playing = false;
          }
        }
      }
      bufDraw();
      raf = requestAnimationFrame(bufTick);
    }
    const bufPlay = (on = !V.playing) => {
      if (V.at >= V.len) { V.at = 0; }
      V.on = true;
      V.playing = on;
      if (on && V.got - V.at < 2 && V.got < V.len) V.waiting = true;
    };
    const bufReset = () => Object.assign(V, { got: 0, at: 0, playing: false, waiting: false, on: false });
    $('#plBtn').addEventListener('click', () => bufPlay());
    $('#bigPlay').addEventListener('click', () => bufPlay(true));
    $('#plReset').addEventListener('click', bufReset);
    const dsOut = () => { $('#dsOut').textContent = $('#ds').value + ' Mbit/s'; };
    $('#ds').addEventListener('input', dsOut);

    // ---------- ping ----------
    const cli = $('#cli');
    const say = (html) => { cli.insertAdjacentHTML('beforeend', html + '\n'); cli.scrollTop = cli.scrollHeight; };
    let pinging = false;
    async function ping(i, ctx) {
      if (pinging) return;
      pinging = true;
      const s = SERVERS[i], path = $('#rt' + i), pkt = $('#pkt'), L = path.getTotalLength();
      const base = ((2 * s.km) / 200) * 1.6 + 8;
      say(`ping ${s.d}`);
      say(`PING ${s.d} (${s.where}): 56 data bytes`);
      const times = [];
      for (let k = 0; k < 3; k++) {
        const ms = base * (0.95 + Math.random() * 0.12);
        times.push(ms);
        const trip = 500 + ms * 2.2;
        pkt.hidden = false;
        await new Promise((res) => {
          const t0 = performance.now();
          const step = (t) => {
            const p = Math.min(1, (t - t0) / FD.dur(trip));
            const d = p < 0.5 ? p * 2 * L : (2 - p * 2) * L;
            const pt = path.getPointAtLength(d);
            pkt.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
            if (p < 1 && (!ctx || ctx.alive())) requestAnimationFrame(step); else res();
          };
          requestAnimationFrame(step);
        });
        if (ctx && !ctx.alive()) break;
        say(`64 bytes from ${s.d}: time=${ms.toFixed(1)} ms`);
      }
      pkt.hidden = true;
      if (times.length) say(`<span class="p">average ${(times.reduce((a, b) => a + b, 0) / times.length).toFixed(1)} ms</span>`);
      say('<span class="p">$</span> ');
      pinging = false;
    }
    el.querySelectorAll('[data-ping]').forEach((b) => b.addEventListener('click', () => ping(+b.dataset.ping)));
    $('#cliClear').addEventListener('click', () => { cli.innerHTML = '<span class="p">$</span> '; });

    // ---------- lag ----------
    let tries = 0, cleared = 0, rockT = 0, jumpAt = 0, jumping = false;
    const latOut = () => { $('#latOut').textContent = $('#lat').value + ' ms'; };
    $('#lat').addEventListener('input', latOut);
    function rockLoop(t) {
      if (!rockT) rockT = t;
      const p = (((t - rockT) * FD.speed) / 2600) % 1;
      $('#rock').style.left = (100 - p * 110) + '%';
      const hit = p > 0.79 && p < 0.86;
      if (hit && !jumping && !$('#rock').dataset.hit) {
        $('#rock').dataset.hit = 1;
        tries++;
        $('#gMsg').innerHTML = '💥 Ouch! The jump came too late.';
        $('#runner').classList.add('hurt');
        setTimeout(() => $('#runner').classList.remove('hurt'), 400);
        $('#score').textContent = `${cleared} / ${tries}`;
      }
      if (hit && jumping && !$('#rock').dataset.hit) {
        $('#rock').dataset.hit = 1;
        tries++; cleared++;
        $('#gMsg').innerHTML = '✓ Cleared!';
        $('#score').textContent = `${cleared} / ${tries}`;
      }
      if (p < 0.2) delete $('#rock').dataset.hit;
      raf2 = requestAnimationFrame(rockLoop);
    }
    let raf2 = 0;
    function jump() {
      jumpAt = performance.now();
      const lat = +$('#lat').value;
      $('#latFeel').textContent = lat + ' ms';
      $('#roLat').className = 'ro ' + (lat > 150 ? 'bad' : 'good');
      timers.push(setTimeout(() => {
        jumping = true;
        $('#runner').classList.add('up');
        timers.push(setTimeout(() => { jumping = false; $('#runner').classList.remove('up'); }, 450));
      }, lat));
    }
    $('#jump').addEventListener('click', jump);

    const show = FD.panels(root, (p) => {
      cancelAnimationFrame(raf); cancelAnimationFrame(raf2);
      if (p === 'buf') { V.last = 0; raf = requestAnimationFrame(bufTick); }
      if (p === 'lag') { rockT = 0; raf2 = requestAnimationFrame(rockLoop); }
    });
    drawPipe(); dsOut(); latOut(); bufDraw();
    show('pipe');

    return {
      show,
      async grow(ctx) {
        for (let i = 0; i <= 6; i++) {
          $('#bw').value = i; drawPipe();
          if (!(await ctx.sleep(550))) return;
        }
      },
      set(o) {
        if (o.bw != null) { $('#bw').value = o.bw; drawPipe(); }
        if (o.file != null) { $('#file').value = o.file; drawPipe(); }
        if (o.ds != null) { $('#ds').value = o.ds; dsOut(); }
        if (o.lat != null) { $('#lat').value = o.lat; latOut(); }
      },
      bufReset, bufPlay,
      ping,
      jump,
      destroy() { cancelAnimationFrame(raf); cancelAnimationFrame(raf2); timers.forEach(clearTimeout); },
    };
  },
  steps: [
    {
      title: 'Why speed matters',
      text: `<p>We transfer more and more data every day: messages, photos, videos, games.</p>
             <p>The more data we transfer, the more important it is to understand <strong>how to increase the speed</strong> of the transfer. If we do not, transfer times will keep increasing.</p>`,
      on: (a) => { a.show('pipe'); a.set({ bw: 3, file: 2 }); },
    },
    {
      title: 'Bandwidth',
      text: `<p>The speed at which devices can transfer data depends on the <strong>bandwidth</strong> of the connection: the <strong>number of bits</strong> that can be carried in <strong>one second</strong>.</p>
             <p>Think of a <strong>water pipe</strong>: a large pipe carries a lot of water. A connection with a large bandwidth carries a lot of data.</p>`,
      tip: 'Try it: move the <strong>Bandwidth</strong> slider and watch the pipe and the download time change.',
      async on(a, ctx) { a.show('pipe'); a.set({ bw: 0, file: 2 }); await a.grow(ctx); },
    },
    {
      title: 'Impact on the user experience',
      text: `<p>A higher bandwidth means that <strong>more data is transferred every second</strong>, so uploads and downloads are faster.</p>
             <p>It also makes it possible to do things that need lots of data in a short time, like <strong>multiplayer online gaming</strong> or <strong>high-definition video streaming</strong>.</p>`,
      on: (a) => { a.show('pipe'); a.set({ bw: 6, file: 3 }); },
    },
    {
      title: 'Streaming video and the buffer',
      text: `<p>When you stream a video, you do <strong>not</strong> download all of it before it starts.</p>
             <p>Part of the video is stored temporarily in an area of memory called a <strong>buffer</strong>. The video starts when there is enough data in the buffer to play <strong>a few seconds</strong>. While those seconds play, more data is downloaded to fill the buffer up again.</p>`,
      tip: 'Try it: press <strong>Play</strong> and watch the light grey part of the bar (the buffer) stay ahead of the playhead.',
      async on(a, ctx) { a.show('buf'); a.bufReset(); a.set({ ds: 9 }); if (!(await ctx.sleep(600))) return; a.bufPlay(true); },
    },
    {
      title: 'When the buffer is empty',
      text: `<p>If the buffer becomes <strong>empty</strong>, there is no more video to play, so the video <strong>pauses</strong> until more data is downloaded.</p>
             <p>To avoid this, data must be downloaded into the buffer <strong>faster than it is played</strong>. This video needs 5 Mbit/s: with a slower connection it keeps stopping.</p>
             <p>Imagine a glass filled from a big bottle: the <strong>bottle</strong> is the full video file and the <strong>glass</strong> is the buffer.</p>`,
      tip: 'Try it: set the download speed to <strong>3 Mbit/s</strong> and press Play. Then try 7 Mbit/s.',
      async on(a, ctx) { a.show('buf'); a.bufReset(); a.set({ ds: 3 }); if (!(await ctx.sleep(600))) return; a.bufPlay(true); },
    },
    {
      title: 'Latency',
      text: `<p>As well as bandwidth, the speed of data transfer also depends on <strong>latency</strong>: the <strong>delay</strong> in the time it takes to send data between devices.</p>
             <p>In the water pipe, latency is the average time it takes for <strong>one drop</strong> of water to flow through the pipe.</p>`,
      on: (a) => a.show('ping'),
    },
    {
      title: 'Pinging a domain',
      text: `<p>You can measure latency by <strong>pinging</strong> a <strong>domain</strong> (the name of a web server).</p>
             <p>A packet of data is sent to the server, and the server sends it straight back. The <strong>ping time</strong> is how long the return trip takes.</p>
             <p>The further away the server, the longer the ping time.</p>`,
      tip: 'Try it: ping all three domains. Which one is fastest? Why?',
      async on(a, ctx) { a.show('ping'); if (!(await ctx.sleep(500))) return; await a.ping(0, ctx); if (!ctx.alive()) return; await a.ping(2, ctx); },
    },
    {
      title: 'Lag in games and live TV',
      text: `<p>In online gaming, the game plays smoothly if the bandwidth is adequate. But if the <strong>latency is high</strong>, events in the game will <strong>lag</strong>: the game does not seem to respond to the player’s commands.</p>
             <p>When watching <strong>live television</strong> online, high latency causes a delay between the real-time events and the video you see.</p>`,
      tip: 'Try it: jump over the rocks with 40 ms latency, then with 500 ms.',
      on: (a) => { a.show('lag'); a.set({ lat: 500 }); },
    },
    {
      title: 'Remember',
      text: `<ul>
               <li><strong>Bandwidth</strong> = how much data per second (the width of the pipe).</li>
               <li><strong>Latency</strong> = how long the data takes to arrive (the delay).</li>
               <li>Streaming uses a <strong>buffer</strong> so the video can play while it downloads.</li>
             </ul>`,
      tip: 'Exam tip: a fast download needs high bandwidth. A responsive game needs low latency.',
      on: (a) => { a.show('pipe'); a.set({ bw: 5, file: 2 }); },
    },
  ],
});

FD.activities({
  section: 'speed',
  items: [
    {
      id: 'ping',
      title: 'Pinging domains',
      task: `<p>Open a command line interface (<b>Terminal</b> on macOS and Linux, <b>Command Prompt</b> on Windows) and type <code>ping gov.au</code>. Then ping <code>newsfirst.lk</code> and <code>gov.uk</code>.</p>
             <p>Note the ping time for each domain. <b>Why are they different?</b></p>
             <p class="small muted">No command line at school? Use the ping simulator in the section instead.</p>`,
      sim: ['speed', 'Open the ping simulator'],
      fields: ['gov.au ping time (ms)', 'newsfirst.lk ping time (ms)', 'gov.uk ping time (ms)'],
      hint: 'The times are different because…',
    },
    {
      id: 'speedtest',
      title: 'Speed testing',
      task: `<p>Carry out a speed test on the internet connection of a <b>fixed-line broadband</b> device (a laptop or PC) and of a <b>mobile broadband</b> device (a smartphone). Search for “speed test” to find one.</p>
             <p>Write the results and compare them.</p>`,
      fields: ['Laptop/PC: download (Mbit/s)', 'Laptop/PC: upload (Mbit/s)', 'Laptop/PC: ping (ms)', 'Smartphone: download (Mbit/s)', 'Smartphone: upload (Mbit/s)', 'Smartphone: ping (ms)'],
      hint: 'Which connection was faster? Why do you think so?',
    },
  ],
});

FD.check({
  section: 'speed',
  items: [
    { type: 'mcq', q: 'What is bandwidth?', opts: ['The number of bits that can be carried by a connection in one second', 'The delay in sending data between devices', 'An area of memory that stores video data', 'The name used to identify a web server'], why: 'Bandwidth is like the width of a water pipe: how much data can flow every second.' },
    { type: 'mcq', q: 'What is latency?', opts: ['The amount of time it takes to send data between devices', 'The number of bits sent in one second', 'The size of a video file', 'The number of devices on a network'], why: 'Latency is the delay. You can measure it by pinging a domain.' },
    {
      type: 'sort',
      q: 'Match each description to the right term.',
      bins: ['Bandwidth', 'Latency', 'Buffer'],
      rows: [['Like the width of a water pipe', 0], ['Measured by pinging a domain', 1], ['Memory that temporarily stores part of a video', 2], ['Bits carried per second', 0], ['High values make online games lag', 1]],
      why: 'Bandwidth = how much per second; latency = the delay; buffer = temporary memory for streaming.',
    },
    { type: 'tf', q: 'A streamed video starts playing as soon as the first bit of data arrives.', a: false, why: 'It only starts when there is enough data in the buffer to play a few seconds of video.' },
    { type: 'multi', q: 'Why might a streamed video keep pausing?', need: 2, opts: [['The buffer becomes empty', true], ['Data is downloaded more slowly than it is played', true], ['The video file is too short', false], ['The screen is too small', false]], why: 'If data arrives more slowly than the video plays, the buffer empties and the video stops until more data arrives.' },
    { type: 'mcq', q: 'An online game has enough bandwidth but high latency. What will the player notice?', opts: ['The game lags: it does not respond quickly to their commands', 'The game will not download at all', 'The graphics change colour', 'Nothing: only bandwidth matters'], why: 'High latency means a delay between the player’s command and the response.' },
  ],
});
