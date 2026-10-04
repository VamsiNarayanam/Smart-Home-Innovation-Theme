const shell = document.querySelector(".shell");
const toggle = document.querySelector(".dash-toggle");
const backdrop = document.querySelector(".backdrop");

(function applySignedInUser() {
  let auth = null;
  try {
    auth = JSON.parse(localStorage.getItem("stacklyAuth") || "null");
  } catch (_) {
    auth = null;
  }

  const nameEl = document.getElementById("dash-name");
  const avatarEl = document.getElementById("dash-avatar");
  const roleEl = document.getElementById("dash-role");
  const signOut = document.getElementById("dash-signout");

  if (auth && auth.name && nameEl) {
    nameEl.textContent = auth.name;
    if (avatarEl) avatarEl.textContent = auth.initials || auth.name.slice(0, 2).toUpperCase();
    if (roleEl) {
      roleEl.textContent = auth.role === "admin" ? "Studio lead" : "Homeowner";
    }
  }

  if (signOut) {
    signOut.addEventListener("click", () => {
      try {
        localStorage.removeItem("stacklyAuth");
      } catch (_) {
        /* ignore */
      }
    });
  }
})();

function closeNav() {
  shell.classList.remove("is-nav-open");
  toggle.setAttribute("aria-expanded", "false");
}

toggle.addEventListener("click", () => {
  const open = shell.classList.toggle("is-nav-open");
  toggle.setAttribute("aria-expanded", String(open));
});

backdrop.addEventListener("click", closeNav);

document.querySelectorAll(".side-nav button").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.panel;
    document.querySelectorAll(".side-nav button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll(".panel").forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === id);
    });
    const title = document.querySelector(".topbar h1");
    const sub = document.querySelector(".topbar p");
    title.textContent = button.dataset.title;
    sub.textContent = button.dataset.sub;
    if (window.matchMedia("(max-width: 980px)").matches) closeNav();
  });
});

document.querySelectorAll(".scene").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".scene").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
    const live = document.getElementById("scene-live");
    if (live) live.textContent = button.dataset.live;
  });
});

document.querySelectorAll(".filters").forEach((group) => {
  const table = document.getElementById(group.dataset.table);
  group.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      group.querySelectorAll("button").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      const value = button.dataset.filter;
      table.querySelectorAll("tbody tr").forEach((row) => {
        row.hidden = value !== "all" && row.dataset.status !== value;
      });
    });
  });
});

const search = document.getElementById("client-search");
if (search) {
  search.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();
    document.querySelectorAll("#client-table tbody tr").forEach((row) => {
      row.hidden = query.length > 0 && !row.textContent.toLowerCase().includes(query);
    });
  });
}

const supportForm = document.getElementById("support-form");
if (supportForm) {
  supportForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = document.getElementById("support-note");
    const field = document.getElementById("support-message");
    if (!field.value.trim()) {
      note.textContent = "Describe the request before sending.";
      note.style.color = "#8a3b32";
      field.focus();
      return;
    }
    supportForm.reset();
    note.textContent = "";
    window.location.href = "404.html";
  });
}
