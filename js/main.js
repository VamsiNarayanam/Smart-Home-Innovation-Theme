const factIcons = {
  blinds: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3.5" width="16" height="17" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 8h16M4 12.5h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  climate: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4.5h4v8.2a3.2 3.2 0 1 1-4 0V4.5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 4.5v-1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  audio: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18.5V5.2l10-2v13.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="6.5" cy="18.5" r="2.4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16.5" cy="16.4" r="2.4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
};

const rooms = {
  morning: {
    image: "Images/living-room.webp",
    alt: "Sunlit bedroom with floor-to-ceiling glass and a low platform bed",
    caption: "Scheduled: 06:45 AM Mon–Fri",
    kicker: "Scene 01 — Dawn Transition",
    title: "Good Morning",
    copy: "Automatically open blinds to natural sunrise, adjust floor temperature to 72°F, illuminate hallways with warm non-glare pathways, and cue your curated acoustic morning brief.",
    facts: [
      ["blinds", "Motorized Blinds", "Rising to 100%"],
      ["climate", "Climate Gradient", "72°F Radiant Floor"],
      ["audio", "Master Suite Audio", "Acoustic Ambient Jazz"]
    ]
  },
  movie: {
    image: "Images/movie-night.webp",
    alt: "Dark living room set for a film, with closed blinds and a large screen",
    caption: "Scheduled: 08:30 PM Fri–Sat",
    kicker: "Scene 02 — Evening Cinema",
    title: "Movie Night",
    copy: "Black out the glass, drop the room to a calibrated dark, and hold the picture, the sound, and the temperature as one screening scene.",
    facts: [
      ["blinds", "Motorized Blinds", "Closed for blackout"],
      ["climate", "Climate Gradient", "68°F Cinema Hold"],
      ["audio", "Master Suite Audio", "Reference Film Mix"]
    ]
  },
  away: {
    image: "Images/leaving-home.webp",
    alt: "Timber front door ajar on a stone entry with a quiet garden path",
    caption: "Scheduled: 09:15 AM Mon–Fri",
    kicker: "Scene 03 — Departure",
    title: "Leaving Home",
    copy: "The house closes as you leave. Shades settle for privacy, climate steps down, and the entry locks to a single armed state.",
    facts: [
      ["blinds", "Motorized Blinds", "Privacy at 40%"],
      ["climate", "Climate Gradient", "Away Setback"],
      ["audio", "Master Suite Audio", "Silenced"]
    ]
  },
  night: {
    image: "Images/Hillside-villa.webp",
    alt: "Night view of a glass hillside villa with warm interior lighting",
    caption: "Scheduled: 10:30 PM Daily",
    kicker: "Scene 04 — Night Settle",
    title: "Good Night",
    copy: "The house fades after the last room. Shades close, the floor cools, and the audio drops to silence until dawn.",
    facts: [
      ["blinds", "Motorized Blinds", "Fully Closed"],
      ["climate", "Climate Gradient", "66°F Sleep"],
      ["audio", "Master Suite Audio", "Off"]
    ]
  }
};

const header = document.querySelector(".header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}, { passive: true });

const menuLabel = toggle.querySelector(".sr-only");

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  if (menuLabel) menuLabel.textContent = open ? "Close" : "Menu";
}

toggle.addEventListener("click", () => {
  setMenu(!nav.classList.contains("is-open"));
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.querySelectorAll(".rooms__tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    const room = rooms[button.dataset.room];
    document.querySelectorAll(".rooms__tabs button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    const image = document.getElementById("room-image");
    image.src = room.image;
    image.alt = room.alt;
    document.getElementById("room-caption").textContent = room.caption;
    document.getElementById("room-kicker").textContent = room.kicker;
    document.getElementById("room-title").textContent = room.title;
    document.getElementById("room-copy").textContent = room.copy;
    document.getElementById("room-facts").innerHTML = room.facts
      .map(([icon, label, value]) => `<li><span class="rooms__fact-label">${factIcons[icon]}${label}</span><span class="rooms__fact-value">${value}</span></li>`)
      .join("");
  });
});

document.getElementById("year").textContent = String(new Date().getFullYear());

const marquee = document.querySelector(".marquee");
const track = document.querySelector(".marquee__track");
const partnerList = track?.querySelector("ul");
if (marquee && track && partnerList && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const names = [...partnerList.children];
  while (partnerList.scrollWidth < marquee.clientWidth) {
    names.forEach((name) => {
      const copy = name.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      partnerList.appendChild(copy);
    });
  }
  const twin = partnerList.cloneNode(true);
  twin.setAttribute("aria-hidden", "true");
  track.appendChild(twin);
}

document.getElementById("newsletter").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("email");
  const note = document.getElementById("form-note");
  if (!input.checkValidity()) {
    note.textContent = "Enter a valid email address.";
    note.style.color = "#8a3b32";
    input.focus();
    return;
  }
  note.style.color = "#128f7c";
  note.textContent = "You are on the list. The next monograph will arrive by email.";
  input.value = "";
  setTimeout(() => {
    window.location.href = "404.html";
  }, 1200);
});

(function initCountUp() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(
    ".stats li > strong, .abt-stats li > strong, .svc-stat > strong, .approach__meta dd"
  );
  if (!targets.length) return;

  function parseTarget(text) {
    const match = String(text || "").trim().match(/^([^A-Za-z]*?)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return null;
    const value = Number(match[2]);
    if (!Number.isFinite(value)) return null;
    return {
      prefix: match[1],
      value,
      suffix: match[3],
      decimals: (match[2].split(".")[1] || "").length
    };
  }

  function formatValue(n, decimals) {
    return decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));
  }

  function animate(el, meta) {
    const duration = 1400;
    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = meta.prefix + formatValue(meta.value * eased, meta.decimals) + meta.suffix;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = meta.prefix + formatValue(meta.value, meta.decimals) + meta.suffix;
    }
    requestAnimationFrame(frame);
  }

  const items = [];
  targets.forEach((el) => {
    const meta = parseTarget(el.textContent);
    if (!meta) return;
    el.textContent = meta.prefix + formatValue(0, meta.decimals) + meta.suffix;
    items.push({ el, meta });
  });
  if (!items.length) return;

  if (reduced) {
    items.forEach(({ el, meta }) => {
      el.textContent = meta.prefix + formatValue(meta.value, meta.decimals) + meta.suffix;
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const item = items.find((row) => row.el === entry.target);
        if (!item || item.el.dataset.countDone) return;
        item.el.dataset.countDone = "1";
        io.unobserve(item.el);
        animate(item.el, item.meta);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
  );

  items.forEach(({ el }) => io.observe(el));
})();
