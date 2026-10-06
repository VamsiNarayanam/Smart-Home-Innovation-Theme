(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ——— AOS scroll reveals ——— */
  if (typeof AOS !== "undefined") {
    const groups = [
      [".hero__content", "fade-up", 0],
      [".stats li", "fade-up", 80],
      [".approach__copy", "fade-up", 0],
      [".approach__side", "fade-up", 80],
      [".section-head", "fade-up", 0],
      [".card", "fade-up", 70],
      [".process__grid li", "fade-up", 80],
      [".rooms__head", "fade-up", 0],
      [".rooms__stage", "fade-up", 0],
      [".reasons h2", "fade-up", 0],
      [".reasons__grid article", "fade-up", 60],
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
  }

  /* ——— GSAP text animation (overall) ——— */
  function initGsapText() {
    if (typeof gsap === "undefined") return;
    if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

    const targets = document.querySelectorAll([
      ".hero h1",
      ".section-head h2",
      ".rooms__head h2",
      ".reasons h2",
      ".visit h2",
      ".svc-hero h1",
      ".svc-block h2",
      ".abt-hero h1",
      ".abt-head h2",
      ".abt-close h2",
      ".ct-hero h1",
      ".ct-block h2",
      ".bl-hero h1",
      ".bl-section h2",
      ".missing__main h1"
    ].join(", "));

    function prepareText(el) {
      if (el.dataset.gsapText === "ready") return;
      const label = el.textContent.replace(/\s+/g, " ").trim();
      if (label) el.setAttribute("aria-label", label);

      const lines = el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML = lines
        .map((line) => {
          const holder = document.createElement("div");
          holder.innerHTML = line;
          const words = (holder.textContent || "").trim().split(/\s+/).filter(Boolean);
          if (!words.length) return "";
          const wordMarkup = words
            .map((word) => `<span class="gsap-line__word"><span>${word}</span></span>`)
            .join(" ");
          return `<span class="gsap-line">${wordMarkup}</span>`;
        })
        .filter(Boolean)
        .join("");

      el.dataset.gsapText = "ready";
    }

    targets.forEach((el) => {
      const words = (() => {
        const complex = Array.from(el.childNodes).some(
          (node) => node.nodeType === 1 && node.tagName !== "BR"
        );
        if (complex) return null;
        prepareText(el);
        return el.querySelectorAll(".gsap-line__word > span");
      })();

      if (reduced) {
        if (words) gsap.set(words, { clearProps: "all" });
        return;
      }

      const isHero = el.closest(".hero, .svc-hero, .abt-hero, .ct-hero, .bl-hero, .missing");

      if (!words || !words.length) {
        const tween = {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: isHero ? 0.55 : 0
        };
        if (isHero) gsap.from(el, tween);
        else if (typeof ScrollTrigger !== "undefined") {
          gsap.from(el, {
            ...tween,
            scrollTrigger: { trigger: el, start: "top 88%", once: true }
          });
        } else gsap.from(el, tween);
        return;
      }

      gsap.set(words, { yPercent: 110, opacity: 0 });

      const tween = {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.045,
        ease: "power3.out",
        delay: isHero ? 0.55 : 0
      };

      if (isHero) {
        gsap.to(words, tween);
      } else if (typeof ScrollTrigger !== "undefined") {
        gsap.to(words, {
          ...tween,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true
          }
        });
      } else {
        gsap.to(words, tween);
      }
    });
  }

  /* ——— Client perspectives pagination ——— */
  function initStoriesPagination() {
    const root = document.querySelector("[data-stories-slider]");
    if (!root) return;

    const cards = Array.from(root.querySelectorAll(".stories__grid > blockquote"));
    const dotsWrap = root.querySelector("[data-stories-dots]");
    const prevBtn = root.querySelector("[data-stories-prev]");
    const nextBtn = root.querySelector("[data-stories-next]");
    if (!cards.length || !dotsWrap || !prevBtn || !nextBtn) return;

    let page = 0;
    let pageCount = 1;
    let pageSize = 3;
    let animating = false;

    function getPageSize() {
      if (window.matchMedia("(max-width: 720px)").matches) return 1;
      if (window.matchMedia("(max-width: 980px)").matches) return 2;
      return 3;
    }

    function buildDots() {
      dotsWrap.innerHTML = "";
      for (let i = 0; i < pageCount; i += 1) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "stories__dot" + (i === page ? " is-active" : "");
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", "Page " + (i + 1));
        dot.setAttribute("aria-selected", i === page ? "true" : "false");
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    function syncChrome() {
      prevBtn.disabled = page <= 0;
      nextBtn.disabled = page >= pageCount - 1;
      dotsWrap.querySelectorAll(".stories__dot").forEach((dot, index) => {
        const active = index === page;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
      });
    }

    function visibleRange() {
      const start = page * pageSize;
      return { start, end: Math.min(start + pageSize, cards.length) };
    }

    function applyPage(animate) {
      const { start, end } = visibleRange();
      const show = [];
      const hide = [];

      cards.forEach((card, index) => {
        const onPage = index >= start && index < end;
        if (onPage) show.push(card);
        else hide.push(card);
      });

      hide.forEach((card) => {
        card.classList.add("is-story-hidden");
        card.setAttribute("aria-hidden", "true");
        if (typeof gsap !== "undefined") gsap.set(card, { clearProps: "opacity,transform" });
      });

      show.forEach((card) => {
        card.classList.remove("is-story-hidden");
        card.removeAttribute("aria-hidden");
      });

      syncChrome();

      if (!animate || reduced || typeof gsap === "undefined") return;

      animating = true;
      gsap.fromTo(
        show,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
          onComplete: () => {
            animating = false;
          }
        }
      );
    }

    function goTo(nextPage, animate) {
      if (animating) return;
      const clamped = Math.max(0, Math.min(nextPage, pageCount - 1));
      if (clamped === page && animate !== false) return;
      page = clamped;
      applyPage(animate !== false);
    }

    function layout(resetPage) {
      pageSize = getPageSize();
      pageCount = Math.max(1, Math.ceil(cards.length / pageSize));
      if (resetPage || page > pageCount - 1) page = 0;
      buildDots();
      applyPage(false);
    }

    prevBtn.addEventListener("click", () => goTo(page - 1));
    nextBtn.addEventListener("click", () => goTo(page + 1));

    let resizeTimer;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const nextSize = getPageSize();
        if (nextSize !== pageSize) layout(true);
      }, 120);
    });

    layout(true);

    if (!reduced && typeof gsap !== "undefined") {
      const first = cards.filter((card) => !card.classList.contains("is-story-hidden"));
      if (first.length) {
        gsap.from(first, {
          opacity: 0,
          y: 22,
          duration: 0.55,
          stagger: 0.09,
          ease: "power2.out",
          delay: 0.05
        });
      }
    }
  }

  /* ——— Selected work: pages open up / down ——— */
  function initProjectPageReveal() {
    const projects = document.querySelectorAll(".project");
    if (!projects.length) return;

    if (reduced || typeof gsap === "undefined") {
      projects.forEach((project) => project.classList.add("is-open"));
      return;
    }

    if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

    projects.forEach((project) => {
      const media = project.querySelector(".project__media");
      const img = project.querySelector(".project__media img");
      const top = project.querySelector(".project__shutter--top");
      const bot = project.querySelector(".project__shutter--bot");
      const meta = project.querySelector(".project__meta");
      if (!media || !img || !top || !bot) return;

      gsap.set(img, { scale: 1.14 });
      gsap.set(top, { yPercent: 0 });
      gsap.set(bot, { yPercent: 0 });
      if (meta) gsap.set(meta, { opacity: 0, y: 18 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: media,
          start: "top 78%",
          once: true
        },
        onComplete: () => project.classList.add("is-open")
      });

      tl.to(top, {
        yPercent: -101,
        duration: 1.15,
        ease: "power3.inOut"
      }, 0)
        .to(bot, {
          yPercent: 101,
          duration: 1.15,
          ease: "power3.inOut"
        }, 0)
        .to(img, {
          scale: 1,
          duration: 1.35,
          ease: "power2.out"
        }, 0.05);

      if (meta) {
        tl.to(meta, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out"
        }, 0.55);
      }
    });
  }

  initGsapText();
  initStoriesPagination();
  initProjectPageReveal();
})();
