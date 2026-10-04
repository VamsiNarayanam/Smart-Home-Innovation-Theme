(function () {
  if (typeof AOS === "undefined") return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const groups = [
    [".hero__content", "fade-up", 0],
    [".stats li", "fade-up", 80],
    [".approach__copy", "fade-up", 0],
    [".approach__side", "fade-up", 80],
    [".section-head", "fade-up", 0],
    [".card", "fade-up", 70],
    [".process__grid li", "fade-up", 80],
    [".project", "fade-up", 0],
    [".rooms__head", "fade-up", 0],
    [".rooms__stage", "fade-up", 0],
    [".reasons h2", "fade-up", 0],
    [".reasons__grid article", "fade-up", 60],
    [".stories__grid blockquote", "fade-up", 80],
    [".visit__intro", "fade-up", 0],
    [".visit__band", "fade-up", 80],
    [".footer__grid > div", "fade-up", 60],
    [".panel.is-active .metric", "fade-up", 70],
    [".panel.is-active .stat", "fade-up", 70],
    [".panel.is-active .card-block", "fade-up", 80],
    [".panel.is-active .zone", "fade-up", 60],
    [".panel.is-active .member", "fade-up", 70],
    [".missing__code", "zoom-in", 0],
    [".missing__main h1", "fade-up", 0],
    [".missing__main > p", "fade-up", 0],
    [".missing__actions", "fade-up", 0],
    [".svc-hero__copy", "fade-up", 0],
    [".svc-hero__aside", "fade-up", 80],
    [".svc-shot", "fade-up", 0],
    [".svc-stat", "fade-up", 70],
    [".svc-card", "fade-up", 60],
    [".svc-step", "fade-up", 70],
    [".svc-price", "fade-up", 80],
    [".abt-hero__top", "fade-up", 0],
    [".abt-hero__shot", "fade-up", 0],
    [".abt-stats li", "fade-up", 70],
    [".abt-tenets__grid article", "fade-up", 60],
    [".abt-show article", "fade-up", 80],
    [".abt-team article", "fade-up", 60],
    [".abt-phases article", "fade-up", 70],
    [".abt-badges li", "fade-up", 50],
    [".abt-close .abt-wrap", "fade-up", 0],
    [".ct-hero__copy", "fade-up", 0],
    [".ct-channel", "fade-up", 70],
    [".ct-form", "fade-up", 0],
    [".ct-side article", "fade-up", 70],
    [".ct-phase", "fade-up", 60],
    [".ct-studio", "fade-up", 60],
    [".ct-faq__item", "fade-up", 50],
    [".ct-rush__inner", "fade-up", 0],
    [".bl-hero__copy", "fade-up", 0],
    [".bl-feature", "fade-up", 0],
    [".bl-card", "fade-up", 70],
    [".bl-person", "fade-up", 60],
    [".bl-close__grid", "fade-up", 0]
  ];

  function tag(selector, effect, step) {
    document.querySelectorAll(selector).forEach((el, index) => {
      if (el.dataset.aos) return;
      el.dataset.aos = effect;
      if (step) el.dataset.aosDelay = String(Math.min(index * step, 280));
    });
  }

  groups.forEach(([selector, effect, step]) => tag(selector, effect, step));

  AOS.init({
    duration: 750,
    easing: "ease-out-cubic",
    once: true,
    offset: 40,
    disable: reduced
  });

  document.querySelectorAll(".side-nav button").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.dataset.panel);
      if (!panel) return;
      tag("#" + panel.id + " .card-block", "fade-up", 70);
      tag("#" + panel.id + " .zone", "fade-up", 60);
      tag("#" + panel.id + " .member", "fade-up", 70);
      tag("#" + panel.id + " .metric", "fade-up", 70);
      tag("#" + panel.id + " .stat", "fade-up", 70);
      requestAnimationFrame(() => AOS.refreshHard());
    });
  });
})();
