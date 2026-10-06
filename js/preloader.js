(function () {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const MIN_MS = 700;
  const started = performance.now();
  let finished = false;

  function hide() {
    if (finished) return;
    finished = true;
    preloader.classList.add("is-done");
    document.body.classList.remove("is-loading");
    preloader.setAttribute("aria-busy", "false");
    window.setTimeout(() => {
      preloader.remove();
    }, 600);
  }

  function onReady() {
    const elapsed = performance.now() - started;
    const wait = Math.max(0, MIN_MS - elapsed);
    window.setTimeout(hide, wait);
  }

  document.body.classList.add("is-loading");

  if (document.readyState === "complete") {
    onReady();
  } else {
    window.addEventListener("load", onReady, { once: true });
  }

  window.setTimeout(hide, 4000);
})();
