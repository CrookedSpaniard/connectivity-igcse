FD.add({
  id: 'identify',
  title: 'Requirements for connecting to networks',
  tab: 'IP & MAC addresses',
  icon: 'identify',
  color: '--c6',
  section: true,
  interactive: true,
  vocab: [
    ['protocols', 'rules that allow the exchange and transmission of data between devices'],
    ['packet', 'a unit of data packaged together so that it can travel across a network'],
    ['stand-alone', 'capable of functioning on its own, without being part of a network'],
    ['IP address', 'a unique address that networked devices use to send data to each other'],
    ['hexadecimal', 'a base-16 number system that uses the numbers 0–9 and the letters A–F'],
    ['network administrator', 'a person who manages an organisation’s network'],
    ['DHCP server', 'a networked computer that automatically assigns an IP address to other computers when they join the network'],
    ['MAC address', 'media access control address: a universally unique identifier given to a network interface card (NIC)'],
  ],
  mount(el) {
    const NET = [
      { id: 'lap', n: 'Laptop', ip: '192.168.1.14', x: 70, y: 40, dv: 'laptop' },
      { id: 'pc', n: 'Desktop', ip: '192.168.1.21', x: 70, y: 160, dv: 'desktop' },
      { id: 'prn', n: 'Printer', ip: '192.168.1.30', x: 520, y: 40, dv: 'printer' },
      { id: 'srv', n: 'File server', ip: '192.168.1.2', x: 520, y: 160, dv: 'server' },
    ];
    el.innerHTML = `
      <div class="sim idf">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="nos">🗂️ Network OS</button><button data-p="ip">🔢 IP address</button><button data-p="mac">🏷️ MAC address</button><button data-p="pkt">📦 Sending data</button>
        </div>

        <div data-panel="nos" class="sim">
          <div class="win">
            <div class="win-bar"><span>●</span><span>●</span><span>●</span><b>This PC</b><small id="who">Logged in as <b>ana.r</b> · school.local</small></div>
            <div class="win-body">
              <div data-zone="local"><h6>Devices and drives</h6>
                <div class="drv"><span>💽</span><b>Local Disk (C:)</b><i style="--v:38%"></i></div>
                <div class="drv"><span>📀</span><b>DVD RW Drive (D:)</b></div></div>
              <div data-zone="net"><h6>Network locations</h6>
                <div class="drv net"><span>🗄️</span><b>Shared (S:) <small>\\\\school-fs\\shared</small></b><i style="--v:62%"></i></div>
                <div class="drv net"><span>🗄️</span><b id="homeDrv">ana.r (H:) <small>\\\\school-fs\\users</small></b><i style="--v:21%"></i></div>
                <div class="drv net"><span>🖨️</span><b>Printer – Room 12 <small>on the network</small></b></div></div>
            </div>
          </div>
          <div class="ctrls"><button class="btn small-btn" id="swUser">👤 Log in as another user</button></div>
          <div class="cards3" data-zone="feat">
            <div class="mini"><h5>🔑 Checks logins</h5><p>Passes usernames and passwords to a server for checking when a user logs in.</p></div>
            <div class="mini"><h5>👥 Separate accounts</h5><p>Keeps user accounts apart, so users cannot access each other’s files.</p></div>
            <div class="mini"><h5>🗄️ Shared resources</h5><p>Gives access to network storage and shared resources such as networked printers.</p></div>
          </div>
        </div>

        <div data-panel="ip" class="sim" hidden>
          <div class="ip-grid">
            <div class="sim-box">
              <svg viewBox="0 0 360 200" aria-label="A DHCP server giving an IP address to a new device">
                ${FD.dv.server(20, 70)}<text class="svg-lbl" x="50" y="135">DHCP server</text>
                <path class="wire" d="M80 95 H260"/>
                ${FD.dv.phone(250, 70)}<text class="svg-lbl" x="280" y="135">New phone</text>
                <g id="lease" class="lease"><rect x="95" y="62" width="130" height="24" rx="6"/><text x="160" y="79" id="leaseT">192.168.1.57</text></g>
                <text class="svg-sm" x="180" y="175" id="ipMsg">Press “Join the network”.</text>
              </svg>
            </div>
            <div class="ip-fmt">
              <p class="kick">IPv4 · 4 groups of up to 3 numbers</p>
              <p class="ipv4" id="ipv4"><b>192</b>.<b>168</b>.<b>1</b>.<b>1</b></p>
              <p class="kick">IPv6 · 8 groups of 4 hexadecimal numbers</p>
              <p class="ipv6">2001:0db8:0000:0042:0000:8a2e:0370:7334</p>
            </div>
          </div>
          <div class="ctrls"><button class="btn primary small-btn" id="join">📱 Join the network</button><label class="tgl"><input type="checkbox" id="static"> Set by the network administrator (static)</label></div>
          <div class="sim-box chart-box" data-zone="chart">
            <svg viewBox="0 0 520 210" aria-label="Connected devices grow faster than internet users and pass the IPv4 limit">
              <path class="axis" d="M50 20 V180 H500"/>
              ${[0, 5, 10, 15, 20].map((v) => `<text class="svg-sm" x="38" y="${184 - v * 8}">${v}</text>`).join('')}
              <text class="svg-sm" x="20" y="100" transform="rotate(-90 20 100)">billion</text>
              ${[['2003', 60], ['2011', 290], ['2016', 480]].map(([t, x]) => `<text class="svg-sm" x="${x}" y="198">${t}</text>`).join('')}
              <path class="lim" d="M50 145.6 H500"/><text class="lim-t" x="498" y="140">IPv4 limit (4.3 billion)</text>
              <path class="ln users" d="M60 172 L290 164 L480 140"/><text class="svg-sm lu" x="400" y="168">Internet users</text>
              <path class="ln devs" d="M60 176 C 250 160, 380 120, 480 20"/><text class="svg-sm ld" x="400" y="40">Connected devices</text>
            </svg>
          </div>
        </div>

        <div data-panel="mac" class="sim" hidden>
          <div class="mac">${['00', '16', '01', 'AF', '12', 'F6'].map((p, i) => `<span class="${i < 3 ? 'm1' : 'm2'}">${p}</span>`).join('')}</div>
          <div class="mac-lbl"><span class="m1">Manufacturer’s unique identifier</span><span class="m2">NIC-specific address</span></div>
          <p class="note">Unlike IP addresses, which can change, MAC addresses are given to the network interface card (NIC) by the <b>manufacturer</b> and are generally considered <b>fixed</b>. They are used in LANs with Ethernet, Bluetooth or Wi-Fi.</p>
          <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Use</th><th>Example</th></tr></thead><tbody>
            <tr><th>Restricting or allowing access to a network</th><td>MAC address filtering only lets devices with specified MAC addresses join the network.</td></tr>
            <tr><th>Identifying a device on a network</th><td>Some free Wi-Fi hotspots identify a device by its MAC address to limit how long it can use the hotspot.</td></tr>
            <tr><th>Tracking a device</th><td>Organisations can track devices (and their users) by checking which wireless access points a MAC address has used.</td></tr>
            <tr><th>Assigning “static” IP addresses</th><td>A DHCP server recognises a device (usually by its MAC) and gives it the same IP address as before.</td></tr>
          </tbody></table></div>
        </div>

        <div data-panel="pkt" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 600 220" aria-label="A switch delivering a packet to the right device">
              ${NET.map((d) => `<path class="wire" id="wr-${d.id}" d="M${d.x + 30} ${d.y + 22} L300 110"/>`).join('')}
              ${FD.dv.switch(270, 88)}<text class="svg-lbl" x="300" y="140">Switch</text>
              ${NET.map((d) => `<g class="nd" id="nd-${d.id}">${FD.dv[d.dv](d.x, d.y)}<text class="svg-lbl" x="${d.x + 30}" y="${d.y + 58}">${d.n}</text><text class="svg-sm ipl" x="${d.x + 30}" y="${d.y + 70}">${d.ip}</text></g>`).join('')}
              <g id="pk" class="pk" hidden><rect class="pkt" x="-46" y="-11" width="92" height="22" rx="4"/><text class="pkt-t" y="4" id="pkT"></text></g>
            </svg>
          </div>
          <div class="ctrls">
            <button class="btn primary small-btn" data-send="lap:prn">🖨️ Print from the laptop</button>
            <button class="btn small-btn" data-send="pc:srv">💾 Save from the desktop to the server</button>
            <button class="btn small-btn" data-send="srv:lap">📄 Server sends a file to the laptop</button>
          </div>
          <p class="small" id="pkMsg">Each packet carries the IP address of its destination, so the switch knows where to send it.</p>
          <div class="cards3">
            <div class="mini"><h5>☎️ Like a phone number</h5><p>You dial a number that identifies the telephone you want.</p></div>
            <div class="mini"><h5>✉️ Like a postal address</h5><p>The address on a letter tells every part of the postal system where to send it.</p></div>
            <div class="mini"><h5>🏷️ Device name</h5><p>e.g. <code>ROOM12-PC07</code>. Helps <b>people</b> identify devices, but computers do not use it: names are not always unique.</p></div>
          </div>
        </div>
      </div>`;
    const $ = (s) => el.querySelector(s), root = el.querySelector('.idf');

    let user = 0;
    const USERS = [['ana.r', 'ana.r (H:)'], ['tom.k', 'tom.k (H:)']];
    $('#swUser').addEventListener('click', () => {
      user = 1 - user;
      $('#who').innerHTML = `Logged in as <b>${USERS[user][0]}</b> · school.local`;
      $('#homeDrv').innerHTML = `${USERS[user][1]} <small>\\\\school-fs\\users</small>`;
      FD.pulse($('#homeDrv'));
    });

    let next = 57;
    function join() {
      const st = $('#static').checked;
      const ip = st ? '192.168.1.200' : `192.168.1.${next++}`;
      $('#leaseT').textContent = ip;
      const l = $('#lease');
      l.classList.remove('go'); void l.getBoundingClientRect(); l.classList.add('go');
      $('#ipMsg').textContent = st ? 'The administrator typed in a fixed IP address.' : `The DHCP server gave the phone ${ip} automatically.`;
      $('#ipv4').innerHTML = ip.split('.').map((n) => `<b>${n}</b>`).join('.');
    }
    $('#join').addEventListener('click', join);

    let sending = false;
    async function send(from, to, ctx) {
      if (sending) return;
      sending = true;
      const A = NET.find((d) => d.id === from), B = NET.find((d) => d.id === to), pk = $('#pk');
      $('#pkT').textContent = 'To: ' + B.ip;
      pk.hidden = false;
      root.querySelectorAll('.wire').forEach((w) => w.classList.remove('on'));
      root.querySelectorAll('.nd').forEach((n) => n.classList.remove('hit'));
      const pts = [[A.x + 30, A.y + 22], [300, 110], [B.x + 30, B.y + 22]];
      $('#wr-' + from).classList.add('on');
      $('#pkMsg').innerHTML = `The ${A.n.toLowerCase()} sends a packet addressed to <b>${B.ip}</b>…`;
      for (let s = 0; s < 2; s++) {
        const [x1, y1] = pts[s], [x2, y2] = pts[s + 1];
        await new Promise((res) => {
          const t0 = performance.now();
          const step = (t) => {
            const p = Math.min(1, (t - t0) / FD.dur(1100));
            pk.setAttribute('transform', `translate(${x1 + (x2 - x1) * p} ${y1 + (y2 - y1) * p})`);
            if (p < 1 && (!ctx || ctx.alive())) requestAnimationFrame(step); else res();
          };
          requestAnimationFrame(step);
        });
        if (ctx && !ctx.alive()) break;
        if (s === 0) { $('#pkMsg').innerHTML = `The switch reads the destination IP address <b>${B.ip}</b> and sends it only to the ${B.n.toLowerCase()}.`; $('#wr-' + to).classList.add('on'); await FD.wait(500); }
      }
      $('#nd-' + to).classList.add('hit');
      pk.hidden = true;
      sending = false;
    }
    el.querySelectorAll('[data-send]').forEach((b) => b.addEventListener('click', () => { const [f, t] = b.dataset.send.split(':'); send(f, t); }));

    const show = FD.panels(root);
    show('nos');
    return {
      show, join, send,
      zone: (z) => FD.focus(root.querySelector('[data-panel="nos"]'), z),
      chart: (on) => FD.focus(root.querySelector('[data-panel="ip"]'), on ? 'chart' : null),
      setStatic(on) { $('#static').checked = on; },
    };
  },
  steps: [
    {
      title: 'What is a network?',
      text: `<p>A <strong>network</strong> is created when two or more computers are connected. They can communicate and share hardware, software and data.</p>
             <p>Data is sent in <strong>packets</strong>: units of data packaged together to travel across a network. To connect, computers must all use standard <strong>protocols</strong>: rules for exchanging data.</p>`,
      tip: 'History: the first network (1960) connected two airline computers. ARPANET (1969), linking four US universities, was the predecessor of the internet.',
      on: (a) => { a.show('pkt'); },
    },
    {
      title: 'Network operating systems',
      text: `<p>A <strong>network operating system</strong> lets a computer communicate on a network. It adds functions to a <strong>stand-alone</strong> operating system:</p>
             <ul><li>passing usernames and passwords to a server to check logins</li><li>keeping user accounts separate</li><li>giving access to network storage and shared printers.</li></ul>`,
      tip: 'Try it: log in as another user. The home drive (H:) changes, but the shared drive stays the same.',
      on: (a) => { a.show('nos'); a.zone(['net', 'feat']); },
    },
    {
      title: 'How devices are identified',
      text: `<p>There are <strong>three</strong> methods used to identify devices on a network:</p>
             <ul><li>the <strong>IP address</strong> (Internet Protocol)</li><li>the <strong>MAC address</strong></li><li>the <strong>device name</strong>.</li></ul>`,
      on: (a) => { a.show('pkt'); },
    },
    {
      title: 'IP addresses',
      text: `<p>An <strong>IP address</strong> is a unique address that networked devices use to send data to each other.</p>
             <p>Every piece of data carries the IP address of its <strong>destination</strong>, so every device on the network knows where to send it – just like a phone number or the address on a letter.</p>`,
      tip: 'Try it: send the three packets and watch the switch.',
      async on(a, ctx) { a.show('pkt'); if (!(await ctx.sleep(600))) return; await a.send('lap', 'prn', ctx); },
    },
    {
      title: 'IPv4 and IPv6',
      text: `<p>There are two main versions of IP:</p>
             <ul><li><strong>IPv4</strong>: four groups of up to three numbers separated by full stops, e.g. 192.168.1.1</li>
             <li><strong>IPv6</strong>: eight groups of four <strong>hexadecimal</strong> numbers separated by colons.</li></ul>`,
      on: (a) => { a.show('ip'); a.chart(false); },
    },
    {
      title: 'Who gives out IP addresses?',
      text: `<p>An IP address can be assigned by a <strong>network administrator</strong>, or allocated <strong>dynamically</strong> by a <strong>DHCP server</strong> (Dynamic Host Configuration Protocol) when the device joins the network.</p>`,
      tip: 'Try it: press “Join the network” a few times, then tick the static option.',
      async on(a, ctx) { a.show('ip'); a.chart(false); a.setStatic(false); if (!(await ctx.sleep(700))) return; a.join(); },
    },
    {
      title: 'Why IPv6?',
      text: `<p>IPv4 can hold <strong>4,294,967,296</strong> addresses (over 4 billion).</p>
             <p>IPv6 was developed because of the huge growth in the number of <strong>connected devices</strong>, which has gone far past the IPv4 limit.</p>`,
      on: (a) => { a.show('ip'); a.chart(true); },
    },
    {
      title: 'MAC addresses',
      text: `<p>A <strong>MAC</strong> (media access control) address is a <strong>universally unique identifier</strong> given to the network interface card (NIC) by its manufacturer. It is generally <strong>fixed</strong>.</p>
             <p>It has <strong>six pairs</strong> of characters: the first three identify the <strong>manufacturer</strong>, the last three identify the <strong>device</strong>.</p>`,
      on: (a) => a.show('mac'),
    },
    {
      title: 'Device names',
      text: `<p>A <strong>device name</strong> is a descriptive name that helps <strong>users</strong> identify computers on a network.</p>
             <p>Computers do <strong>not</strong> use device names to communicate, because names are not always unique: data could be sent to more than one device with the same name. You can change a device name in the operating system.</p>`,
      on: (a) => a.show('pkt'),
    },
  ],
});

FD.activities({
  section: 'identify',
  items: [
    { id: 'nos', title: 'Comparing operating systems', task: '<p>Create a table to compare the features of a <b>network operating system</b> with a <b>stand-alone</b> operating system. Write it as a list: feature – network OS – stand-alone OS.</p>', lines: 6, hint: 'Feature | Network OS | Stand-alone OS' },
    { id: 'ipv6', title: 'IP addresses', task: '<ol><li>Research the maximum number of addresses that can be provided by IPv6.</li><li>Discuss why the number of connected devices is growing faster than the number of internet users.</li></ol>', fields: ['1. Maximum number of IPv6 addresses'], lines: 4, hint: '2. Connected devices are growing faster because…' },
    { id: 'macman', title: 'Using MAC addresses', task: '<p>Using the internet, find out which manufacturer made the device with the MAC address <code>00:16:01:AF:12:F6</code>.</p><p class="small muted">Tip: search for a “MAC address lookup” and use the first three pairs.</p>', fields: ['Manufacturer'], lines: 2, hint: 'How did you find it?' },
    { id: 'spoof', title: 'Spoofing', task: '<p>MAC addresses can be changed by <b>spoofing</b>: using the MAC address of another device. Discuss how spoofing would affect each of the four uses of MAC addresses in Table 5.1.</p>', fields: ['Restricting or allowing access', 'Identifying a device', 'Tracking a device', 'Assigning static IP addresses'], lines: 2, hint: 'Anything else…' },
    { id: 'mydev', title: 'Identifying devices on your network', task: '<p>Find the <b>name</b>, an <b>IP address</b> and the <b>MAC address</b> of a device on a network that you use (for example your laptop’s network settings).</p>', fields: ['Device name', 'IP address', 'MAC address'], lines: 2, hint: 'Where did you find them?' },
  ],
});

FD.check({
  section: 'identify',
  items: [
    { type: 'multi', q: 'State two methods by which devices are identified to each other on a network.', need: 2, opts: [['IP address', true], ['MAC address', true], ['URL', false], ['Bandwidth', false]], why: 'IP and MAC addresses. (Device names exist too, but computers do not use them to communicate.)' },
    { type: 'sort', q: 'IPv4 or IPv6?', bins: ['IPv4', 'IPv6'], rows: [['192.168.1.14', 0], ['2001:0db8:0000:0042:0000:8a2e:0370:7334', 1], ['Four groups of up to three numbers', 0], ['Eight groups of four hexadecimal numbers', 1]], why: 'IPv4 uses full stops and decimal numbers; IPv6 uses colons and hexadecimal.' },
    { type: 'mcq', q: 'Why was IPv6 introduced to replace IPv4?', opts: ['IPv4 can only hold about 4.3 billion addresses and there are more connected devices than that', 'IPv4 addresses are too hard to remember', 'IPv6 is the only one that works with Wi-Fi', 'IPv4 does not use numbers'], why: 'The huge growth in connected devices passed the IPv4 limit.' },
    { type: 'mcq', q: 'What does a DHCP server do?', opts: ['Automatically assigns an IP address to a computer when it joins the network', 'Gives each NIC its MAC address', 'Blocks unsafe websites', 'Stores everybody’s files'], why: 'DHCP = Dynamic Host Configuration Protocol.' },
    { type: 'mcq', q: 'In the MAC address 00:16:01:AF:12:F6, what do the first three pairs (00:16:01) identify?', opts: ['The manufacturer', 'The user', 'The network', 'The country'], why: 'The first three pairs identify the manufacturer; the last three identify the NIC.' },
    { type: 'tf', q: 'Computers use device names to send data to each other.', a: false, why: 'Device names help people. They are not always unique, so computers use IP and MAC addresses.' },
  ],
});
