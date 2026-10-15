FD.add({
  id: 'terms',
  title: 'Key terms',
  tab: 'Key terms',
  icon: 'terms',
  color: '--accent',
  page: true,
  mount(el) {
    const T = [
      ['speed', 'Bandwidth', 'The number of bits that can be carried by a connection in one second.'],
      ['speed', 'Buffer', 'An area of memory used to temporarily store data, especially when streaming video.'],
      ['speed', 'Latency', 'The amount of time it takes to send data between devices. Measured by pinging a domain.'],
      ['speed', 'Domain', 'The name used to identify a web server.'],
      ['speed', 'Lag', 'Move slowly or fail to keep up, e.g. in an online game with high latency.'],
      ['factors', 'Frequency', 'The waveband at which a radio signal is transmitted.'],
      ['factors', 'Interference', 'Other electromagnetic signals that disrupt wired and wireless signals.'],
      ['factors', 'Shielded', 'Protected: wires wrapped in a thin layer of metal.'],
      ['networks', 'Minijack', 'A plug and socket widely used for analogue audio signals in portable devices.'],
      ['networks', 'HDMI', 'High-Definition Multimedia Interface: used to transmit video and audio data.'],
      ['networks', 'LAN', 'Local area network: connects devices in a small geographical area, like a building.'],
      ['networks', 'WAN', 'Wide area network: spread over a large geographical area. The internet is the largest WAN.'],
      ['networks', 'PAN / WPAN', 'Personal area network: devices near one user. Only wireless = WPAN.'],
      ['networks', 'Tethering', 'Sharing the mobile broadband connection of a host device with other devices.'],
      ['methods', 'GPS', 'Uses signals from at least four of 24 satellites to calculate the exact location of a device.'],
      ['methods', 'DVB-S / DVB-T', 'Digital Video Broadcasting by Satellite / Terrestrial (on Earth) transmitters.'],
      ['methods', 'DAB', 'Digital Audio Broadcasting: digital radio that can also carry text data.'],
      ['methods', 'Ethernet', 'A network connectivity standard that provides a way for computers to communicate.'],
      ['wireless', 'Wi-Fi', 'Wireless technology (IEEE 802.11) used to connect devices to a network.'],
      ['wireless', 'Bluetooth / pair', 'Short-range, low-power wireless. Devices must be paired (connected to each other) first.'],
      ['wireless', 'Mobile broadband (3G/4G)', 'Internet access for mobile devices through the mobile phone network. Not Wi-Fi.'],
      ['wireless', 'Infra-red', 'Electromagnetic radiation used by remote controls. Needs a clear line of sight.'],
      ['wireless', 'NFC', 'Near-field communication: close-proximity RFID chips in phones, payment and travel cards.'],
      ['wiredwl', 'ISP', 'Internet Service Provider: a company that provides customers with access to the internet.'],
      ['wiredwl', 'Fibre optic / copper cable', 'Fibre sends data using light signals; copper uses electrical signals.'],
      ['wiredwl', 'Cellular network', 'Another name for a mobile phone network.'],
      ['identify', 'Protocols', 'Rules that allow the exchange and transmission of data between devices.'],
      ['identify', 'Packet', 'A unit of data packaged together so that it can travel across a network.'],
      ['identify', 'Network operating system', 'Lets a computer communicate on a network: logins, separate accounts, shared storage and printers.'],
      ['identify', 'IP address', 'A unique address that networked devices use to send data to each other (IPv4 and IPv6).'],
      ['identify', 'DHCP server', 'Automatically assigns an IP address to computers when they join the network.'],
      ['identify', 'MAC address', 'A universally unique identifier given to a NIC by its manufacturer. Six pairs of characters.'],
      ['identify', 'Hexadecimal', 'A base-16 number system that uses 0–9 and the letters A–F.'],
      ['components', 'NIC', 'Network interface card: lets a computer exchange data with other networked computers.'],
      ['components', 'Wireless access point', 'Lets Wi-Fi devices connect to a wired network.'],
      ['components', 'Switch', 'Connects devices on a network and sends data to the correct device.'],
      ['components', 'Gateway', 'Connects two different types of network, e.g. a LAN to a WAN.'],
      ['components', 'Router', 'Forwards network traffic by the quickest route. Home routers include a switch and an access point.'],
      ['components', 'Booster', 'Amplifies a signal so its range can be extended.'],
      ['components', 'Server / client', 'A server shares its resources with connected computers, called clients.'],
      ['components', 'HTTP', 'Hypertext Transfer Protocol: used by web servers to process requests for data.'],
      ['internet', 'Web browser', 'Software that requests and displays information stored on web servers.'],
      ['internet', 'Search engine', 'Finds web pages by comparing keywords with its database.'],
      ['internet', 'URL', 'Uniform resource locator: a website address.'],
      ['internet', 'Blacklist / whitelist', 'Lists of unacceptable / acceptable URLs used by filter software.'],
      ['lans', 'Peer-to-peer', 'Computers share resources with each other but do not access servers.'],
      ['lans', 'Client-server', 'A network that uses servers and clients.'],
      ['lans', 'Roaming profile', 'Log in to any computer in the network and see your own settings and files (hotdesking).'],
      ['security', 'Authenticate', 'Confirm that the user is who they say they are.'],
      ['security', 'Firewall', 'Controls the network traffic to and from a network, at the gateway.'],
      ['security', 'Encryption', 'Encoding, scrambling or jumbling data so that unauthorised users cannot understand it.'],
      ['security', 'Cipher / key', 'A cipher is a code. The key is the number of places the letters are shifted (Caesar cipher).'],
      ['security', 'Symmetric / public key', 'Symmetric: same key to encrypt and decrypt. Public key: a public key encrypts, a private key decrypts.'],
      ['security', 'WEP / WPA', 'Wireless encryption. WEP uses the same key for everything; WPA uses new keys for each device and packet.'],
      ['security', 'Eavesdropper', 'An unauthorised person or software that intercepts data from a private communication.'],
      ['security', 'VPN', 'Virtual private network: access to a private LAN from a remote location, with encrypted data.'],
      ['security', 'Transaction log', 'A record of network activity, used to spot unusual activity.'],
    ];
    const colorOf = (id) => (FD.section(id) || { color: '--accent' }).color;
    el.innerHTML = `
      <h2>Key terms</h2>
      <div class="terms-tools"><input type="search" id="tq" placeholder="Search a term…" aria-label="Search terms">
        <span class="seg" id="tp"><button data-v="all">All</button><button data-v="A">Part A</button><button data-v="B">Part B</button></span>
        <span class="small muted" id="tn"></span></div>
      <div class="terms" id="terms">${T.map(([f, t, d]) => `
        <article class="term" data-part="${FD.section(f).part}" style="--c:var(${colorOf(f)})"><h3>${t}</h3><p>${d}</p><button class="link-btn" data-go="${f}">${FD.icon[f]} See it</button></article>`).join('')}</div>`;
    const cards = [...el.querySelectorAll('.term')];
    const q = el.querySelector('#tq'), n = el.querySelector('#tn');
    let part = 'all';
    const filter = () => {
      const s = q.value.trim().toLowerCase();
      let k = 0;
      cards.forEach((c) => { const show = (!s || c.textContent.toLowerCase().includes(s)) && (part === 'all' || c.dataset.part === part); c.hidden = !show; k += show; });
      n.textContent = `${k} of ${cards.length} terms`;
      FD.segSet(el.querySelector('#tp'), part);
    };
    q.addEventListener('input', filter);
    el.querySelector('#tp').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { part = b.dataset.v; filter(); } });
    filter();
    el.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => FD.goto(b.dataset.go)));
  },
});
