FD.add({
  id: 'internet',
  title: 'Connecting to and using the internet',
  tab: 'Internet',
  icon: 'internet',
  color: '--c4',
  section: true,
  interactive: true,
  vocab: [
    ['telecommunications infrastructure', 'the networks of hardware owned by private and public organisations that are used to transfer data'],
    ['web browser', 'software used to request and display information stored on web servers'],
    ['search engine', 'a way to find information in web pages by entering keywords'],
    ['URL', 'uniform resource locator: a website address'],
    ['blacklist', 'a list of unacceptable URLs'],
    ['whitelist', 'a list of acceptable URLs'],
  ],
  mount(el) {
    // made-up pages for the search engine
    const PAGES = [
      ['www.cycle-routes.example/valencia', 'Cycle routes around Valencia', 'cycle bike routes valencia cycling map'],
      ['www.fixmybike.example/puncture', 'How to fix a bike puncture', 'bike puncture fix tyre repair cycling'],
      ['www.ict-revision.example/networks', 'IGCSE ICT revision: networks', 'ict revision networks lan wan router switch'],
      ['www.ict-revision.example/wifi', 'Wi-Fi and Bluetooth compared', 'wifi bluetooth wireless compare range'],
      ['www.weather-now.example/gandia', 'Weather in Gandia today', 'weather gandia forecast rain sun'],
      ['www.recipes.example/paella', 'Easy paella recipe', 'paella recipe rice cooking valencia'],
      ['www.space-facts.example/satellites', 'How GPS satellites work', 'gps satellites space navigation location'],
    ];
    const SITES = ['www.ict-revision.example', 'www.casino-games.example', 'www.school-vle.example', 'www.free-movies-download.example', 'www.news-today.example', 'www.violent-videos.example'];
    const F = { black: ['www.casino-games.example', 'www.violent-videos.example'], white: ['www.school-vle.example'], words: ['download'] };
    el.innerHTML = `
      <div class="sim inet">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="isp">🏢 ISP</button><button data-p="br">🌐 Browser &amp; search</button><button data-p="flt">🛡️ Filter software</button>
        </div>

        <div data-panel="isp" class="sim">
          <div class="sim-box">
            <svg viewBox="0 0 680 200" aria-label="Homes connect to the internet through an ISP">
              <path class="house" d="M20 110 L70 70 L120 110 V180 H20Z"/><text class="emo" x="70" y="150">🏠</text>
              <path class="house" d="M20 20 h100 v40 h-100z"/><text class="svg-sm" x="70" y="45">📱 mobile network</text>
              <path class="wire on" d="M120 140 H240"/><path class="wire on" d="M120 40 H200 V120 H240"/>
              <g class="isp"><rect x="240" y="80" width="140" height="80" rx="12"/><text class="svg-lbl" x="310" y="115">ISP</text><text class="svg-sm" x="310" y="135">subscription</text></g>
              <path class="wire on" d="M380 120 H450"/>
              <g class="infra"><rect x="450" y="40" width="210" height="150" rx="14"/><text class="svg-lbl" x="555" y="70">Telecommunications</text><text class="svg-lbl" x="555" y="86">infrastructure</text>
                ${FD.dv.server(470, 100)}${FD.dv.server(530, 100)}${FD.dv.server(590, 100)}</g>
            </svg>
          </div>
          <div class="cards3">
            <div class="mini"><h5>💷 Commercial ISPs</h5><p>Charge <b>subscription fees</b> for internet access, through mobile or landline telephone networks.</p></div>
            <div class="mini"><h5>🤝 Community schemes</h5><p>Some ISPs give <b>free</b> access to groups of residents who do not have, or do not want, a commercial ISP.</p></div>
          </div>
        </div>

        <div data-panel="br" class="sim" hidden>
          <div class="browser">
            <div class="br-bar"><span class="br-dots">● ● ●</span><span class="br-url" data-zone="url">🔒 <span id="url">www.seekly.example</span></span></div>
            <div class="br-page" id="brPage">
              <div class="seek-home" data-zone="engine">
                <p class="seek-logo">Seekly</p>
                <form id="sForm" class="seek-form"><input id="q" placeholder="Type keywords, e.g. bike puncture" aria-label="Keywords" autocomplete="off"><button class="btn primary small-btn">${FD.icon.search} Search</button></form>
                <p class="small muted">A made-up search engine with a tiny database of 7 made-up web pages.</p>
              </div>
              <ol class="results" id="results"></ol>
            </div>
          </div>
          <div class="cards3">
            <div class="mini" data-zone="b"><h5>🌐 Web browser</h5><p>An <b>application</b> that requests and displays information from web servers, e.g. Firefox, Chrome, Edge, Opera, Safari.</p></div>
            <div class="mini" data-zone="s"><h5>🔎 Search engine</h5><p>A <b>website</b> that finds web pages: it compares your <b>keywords</b> with its database of pages and returns the closest matches.</p></div>
          </div>
        </div>

        <div data-panel="flt" class="sim" hidden>
          <div class="flt-grid">
            <div class="sim-box">
              <p class="strong">Try to visit a website</p>
              <div class="sites">${SITES.map((s) => `<button class="mini-btn" data-site="${s}">${s}</button>`).join('')}</div>
              <div class="verdict" id="verdict"><span>👆</span><p>Choose a website.</p></div>
            </div>
            <div class="lists">
              <div class="lst black"><h5>⛔ Blacklist</h5><ul id="lBlack"></ul></div>
              <div class="lst white"><h5>✅ Whitelist</h5><ul id="lWhite"></ul></div>
              <div class="lst words"><h5>🔤 Blocked keywords</h5><ul id="lWords"></ul></div>
              <form class="addf" id="addF"><input id="addV" placeholder="Administrator: add a URL or word" aria-label="URL or keyword"><select id="addL" aria-label="List"><option value="black">Blacklist</option><option value="white">Whitelist</option><option value="words">Keyword</option></select><button class="mini-btn">Add</button></form>
            </div>
          </div>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s), root = el.querySelector('.inet');

    function search(q) {
      const words = q.toLowerCase().split(/\W+/).filter((w) => w.length > 1);
      $('#q').value = q;
      const hits = PAGES.map((p) => [p, words.filter((w) => p[2].includes(w)).length]).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
      $('#results').innerHTML = !words.length ? '' : hits.length ? hits.map(([p, n]) => `<li><a>${p[1]}</a><small>${p[0]}</small><span class="pill">${n} keyword${n > 1 ? 's' : ''} matched</span></li>`).join('') : '<li class="muted">No pages in the database match those keywords.</li>';
    }
    $('#sForm').addEventListener('submit', (e) => { e.preventDefault(); search($('#q').value); });

    function lists() {
      const li = (k) => F[k].map((v, i) => `<li><span>${v}</span><button class="x" data-k="${k}" data-i="${i}" aria-label="Remove">×</button></li>`).join('') || '<li class="muted">empty</li>';
      $('#lBlack').innerHTML = li('black'); $('#lWhite').innerHTML = li('white'); $('#lWords').innerHTML = li('words');
    }
    root.querySelector('.lists').addEventListener('click', (e) => { const x = e.target.closest('.x'); if (x) { F[x.dataset.k].splice(+x.dataset.i, 1); lists(); } });
    $('#addF').addEventListener('submit', (e) => { e.preventDefault(); const v = $('#addV').value.trim().toLowerCase(); if (v) { F[$('#addL').value].push(v); $('#addV').value = ''; lists(); } });

    function visit(s) {
      el.querySelectorAll('[data-site]').forEach((b) => b.classList.toggle('ok', b.dataset.site === s));
      const word = F.words.find((w) => s.includes(w));
      let ok, why;
      if (F.black.includes(s)) { ok = false; why = 'The URL matches the <b>blacklist</b>, so the page is blocked.'; }
      else if (word) { ok = false; why = `The address contains the blocked keyword “<b>${word}</b>”, so the page is blocked.`; }
      else if (F.white.includes(s)) { ok = true; why = 'The URL matches the <b>whitelist</b>, so the page is allowed.'; }
      else { ok = true; why = 'It is <b>not in either list</b>, so the page is allowed.'; }
      $('#verdict').className = 'verdict ' + (ok ? 'ok' : 'no');
      $('#verdict').innerHTML = `<span>${ok ? '✅' : '⛔'}</span><p><b>${ok ? 'Allowed' : 'Blocked'}:</b> ${s}<br>${why}</p>`;
    }
    el.querySelectorAll('[data-site]').forEach((b) => b.addEventListener('click', () => visit(b.dataset.site)));

    const show = FD.panels(root);
    lists(); show('isp');
    return {
      show, visit,
      zone: (z) => FD.focus(root.querySelector('[data-panel="br"]'), z),
      async type(ctx, q) { $('#q').value = ''; $('#results').innerHTML = ''; for (let i = 1; i <= q.length; i++) { $('#q').value = q.slice(0, i); if (!(await ctx.sleep(70))) return; } search(q); },
    };
  },
  steps: [
    {
      title: 'Getting online',
      text: `<p>To use online services from servers and data centres, users need a <strong>connection</strong> to the internet, and <strong>software</strong> to use the services effectively and safely.</p>`,
      on: (a) => a.show('isp'),
    },
    {
      title: 'Internet Service Provider (ISP)',
      text: `<p>Users <strong>subscribe</strong> to an <strong>ISP</strong>. ISPs connect them to the <strong>telecommunications infrastructure</strong> that forms the framework of the internet, through mobile or landline telephone networks.</p>
             <p>Commercial ISPs charge subscription fees. Some ISPs give <strong>free</strong> access as part of community schemes.</p>`,
      on: (a) => a.show('isp'),
    },
    {
      title: 'Web browsers',
      text: `<p>A <strong>web browser</strong> is a software application used to <strong>request and display</strong> information stored on web servers.</p>
             <p>Examples: Mozilla Firefox, Google Chrome, Microsoft Edge, Opera and Safari. They have versions for mobile devices too.</p>`,
      on: (a) => { a.show('br'); a.zone(['url', 'b']); },
    },
    {
      title: 'Search engines',
      text: `<p>A <strong>search engine</strong> helps users find information in web pages. Users enter <strong>keywords</strong>; the search engine compares them with its <strong>database</strong> of web pages and returns the closest matches.</p>`,
      tip: 'Try it: search for <strong>bike puncture</strong>, then <strong>wifi range</strong>.',
      async on(a, ctx) { a.show('br'); a.zone(['engine', 's']); await a.type(ctx, 'bike puncture'); },
    },
    {
      title: 'Browser ≠ search engine',
      text: `<p>People often confuse them. A <strong>web browser</strong> is an <strong>application</strong> for viewing online content. A <strong>search engine</strong> finds information using keywords.</p>
             <p>You use a web browser to <strong>access</strong> a search engine.</p>`,
      tip: 'Did you know? Some search engines let you search with an <strong>image</strong>: they compare it with a database of pages that contain similar images.',
      on: (a) => { a.show('br'); a.zone(null); },
    },
    {
      title: 'Filter software',
      text: `<p><strong>Filter software</strong> stops users accessing inappropriate information. The <strong>URL</strong> and/or the contents of a page are compared with two lists:</p>
             <ul><li>matches the <strong>blacklist</strong> → blocked</li><li>matches the <strong>whitelist</strong> → allowed</li><li>in <strong>neither</strong> list → allowed.</li></ul>`,
      tip: 'Try it: visit each website. Then add a URL to the blacklist as the administrator.',
      async on(a, ctx) { a.show('flt'); if (!(await ctx.sleep(900))) return; a.visit('www.casino-games.example'); if (!(await ctx.sleep(2200))) return; a.visit('www.school-vle.example'); if (!(await ctx.sleep(2200))) return; a.visit('www.news-today.example'); },
    },
    {
      title: 'Who uses filters?',
      text: `<p><strong>Administrators</strong> can add URLs to the blacklist and the whitelist. The blacklist can also be updated by software updates.</p>
             <p>Filter software helps <strong>schools and parents</strong> protect children from disturbing or age-inappropriate content.</p>`,
      on: (a) => a.show('flt'),
    },
  ],
});

FD.check({
  section: 'internet',
  items: [
    { type: 'mcq', q: 'What do users need to subscribe to in order to connect to the internet?', opts: ['An ISP', 'A search engine', 'A blacklist', 'A DHCP server'], why: 'ISPs provide connections to the telecommunications infrastructure.' },
    { type: 'sort', q: 'Web browser or search engine?', bins: ['Web browser', 'Search engine'], rows: [['An application used to display web pages', 0], ['Compares keywords with a database of web pages', 1], ['Firefox, Chrome, Edge, Safari', 0], ['Returns the closest matches to your keywords', 1]], why: 'You use a web browser to access a search engine.' },
    {
      type: 'sort',
      q: 'What does filter software do with each page?',
      bins: ['Allowed', 'Blocked'],
      rows: [['The URL matches the blacklist', 1], ['The URL matches the whitelist', 0], ['The URL is not in either list', 0]],
      why: 'Only pages matching the blacklist are blocked.',
    },
    { type: 'mcq', q: 'What is a whitelist?', opts: ['A list of acceptable URLs', 'A list of unacceptable URLs', 'A list of IP addresses', 'A list of users who can log in'], why: 'Blacklist = unacceptable URLs; whitelist = acceptable URLs.' },
    { type: 'tf', q: 'Some ISPs provide free internet access as part of community schemes.', a: true, why: 'Commercial ISPs charge fees, but community schemes can be free.' },
  ],
});
