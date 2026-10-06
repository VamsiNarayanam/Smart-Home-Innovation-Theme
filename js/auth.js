(function () {
  const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());

  function cleanName(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
  }

  function initialsFromName(name) {
    const parts = String(name || "User").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "U";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function showSuccessToast(message, destination) {
    const toast = document.createElement("div");
    toast.className = "auth-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = message;
    document.body.append(toast);
    requestAnimationFrame(() => toast.classList.add("is-visible"));
    window.setTimeout(() => {
      toast.classList.remove("is-visible");
      window.setTimeout(() => {
        window.location.href = destination;
      }, 200);
    }, 1400);
  }

  function setSession(name, email, role) {
    const displayName = cleanName(name);
    const payload = {
      name: displayName,
      initials: initialsFromName(displayName),
      email: String(email).trim().toLowerCase(),
      role,
      signedInAt: Date.now()
    };
    try {
      localStorage.setItem("stacklyAuth", JSON.stringify(payload));
    } catch (_) {
      /* ignore quota / private mode */
    }
    return payload;
  }

  document.querySelectorAll(".auth-eye").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.target);
      if (!input) return;
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      button.setAttribute("aria-label", show ? "Hide password" : "Show password");
      button.classList.toggle("is-on", show);
    });
  });

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("login-name");
      const email = document.getElementById("login-email");
      const password = document.getElementById("login-password");
      const role = document.getElementById("login-role");
      const error = document.getElementById("login-error");

      if (!cleanName(name.value)) {
        error.textContent = "Enter your name.";
        name.focus();
        return;
      }
      if (!emailOk(email.value)) {
        error.textContent = "Enter a valid email address.";
        email.focus();
        return;
      }
      if (password.value.length < 8) {
        error.textContent = password.value ? "Password must be at least 8 characters." : "Enter your password.";
        password.focus();
        return;
      }
      if (!role.value) {
        error.textContent = "Select a dashboard role.";
        role.focus();
        return;
      }

      error.textContent = "";
      setSession(name.value, email.value, role.value);
      showSuccessToast("Login successful. Redirecting to your dashboard...", role.value === "admin" ? "admin.html" : "client.html");
    });
  }

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("register-name");
      const email = document.getElementById("register-email");
      const password = document.getElementById("register-password");
      const role = document.getElementById("register-role");
      const error = document.getElementById("register-error");

      if (!cleanName(name.value)) {
        error.textContent = "Enter your name.";
        name.focus();
        return;
      }
      if (!emailOk(email.value)) {
        error.textContent = "Enter a valid email address.";
        email.focus();
        return;
      }
      if (password.value.length < 8) {
        error.textContent = "Password must be at least 8 characters.";
        password.focus();
        return;
      }
      if (!role.value) {
        error.textContent = "Select an account type.";
        role.focus();
        return;
      }
      const terms = document.getElementById("register-terms");
      if (terms && !terms.checked) {
        error.textContent = "Please agree to the Terms of Service and Privacy Policy.";
        terms.focus();
        return;
      }

      error.textContent = "";
      setSession(name.value, email.value, role.value);
      showSuccessToast("Account created successfully. Redirecting to sign in...", "login.html");
    });
  }
})();
